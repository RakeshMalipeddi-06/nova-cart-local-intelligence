import { INITIAL_STORES, INITIAL_PRODUCTS, INITIAL_INVENTORY, OPERATIONAL_INCIDENTS, CASE_STUDY_SIGNALS } from './data/mockData.js';
import { calculateAvailabilityRisk } from './scoringEngine.js';
import { getAvailabilityIntelligence } from './aiReasoning.js';

// In-memory persistent state container (persists across API calls in the Node process)
class NovaLocalState {
  constructor() {
    this.reset();
  }

  reset() {
    this.stores = JSON.parse(JSON.stringify(INITIAL_STORES));
    this.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
    this.inventory = JSON.parse(JSON.stringify(INITIAL_INVENTORY));
    this.incidents = JSON.parse(JSON.stringify(OPERATIONAL_INCIDENTS));
    this.auditLog = [
      {
        id: "audit-init",
        action: "SYSTEM_INITIALIZED",
        details: "Mock database initialized with 10 local stores.",
        timestamp: new Date().toISOString()
      }
    ];
  }

  getStores() {
    return this.stores;
  }

  getStore(storeId) {
    return this.stores.find(s => s.id === storeId) || null;
  }

  getProducts() {
    return this.products;
  }

  getProduct(productId) {
    return this.products.find(p => p.id === productId) || null;
  }

  getInventoryItem(storeId, productId) {
    return this.inventory.find(i => i.storeId === storeId && i.productId === productId) || null;
  }

  /**
   * Search products across stores with intelligent availability evaluation
   */
  async search(query = "") {
    const q = (query || "").trim().toLowerCase();
    
    // Filter matching products
    const matchingProducts = this.products.filter(p => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    });

    const results = [];

    for (const prod of matchingProducts) {
      // Find all stores offering this product
      const storeInventories = this.inventory.filter(i => i.productId === prod.id);

      for (const inv of storeInventories) {
        const store = this.getStore(inv.storeId);
        if (!store) continue;

        // Run intelligence analysis
        const intelligence = await getAvailabilityIntelligence(prod, store, inv);

        results.push({
          product: prod,
          store: store,
          inventory: {
            ...inv,
            price: inv.price,
            declaredStock: inv.declaredStock,
            lastUpdatedHoursAgo: inv.lastUpdatedHoursAgo,
            isConfirmedByStore: inv.isConfirmedByStore || false,
          },
          intelligence
        });
      }
    }

    // Sort: High confidence first, then lowest distance
    results.sort((a, b) => {
      const statusWeight = {
        HIGH_CONFIDENCE: 4,
        MEDIUM_CONFIDENCE: 3,
        UNCERTAIN: 2,
        LIKELY_UNAVAILABLE: 1
      };
      const diff = (statusWeight[b.intelligence.status] || 0) - (statusWeight[a.intelligence.status] || 0);
      if (diff !== 0) return diff;
      return a.store.distanceKm - b.store.distanceKm;
    });

    return results;
  }

  /**
   * Fetch reliable alternatives when a customer views an uncertain/unavailable product
   */
  async getAlternatives(productId, excludeStoreId) {
    const product = this.getProduct(productId);
    if (!product) return [];

    // 1. Same product at other nearby stores
    const otherStoreInventories = this.inventory.filter(
      i => i.productId === productId && i.storeId !== excludeStoreId
    );

    const candidates = [];

    for (const inv of otherStoreInventories) {
      const store = this.getStore(inv.storeId);
      if (!store) continue;

      const risk = calculateAvailabilityRisk(inv);
      if (risk.status === 'HIGH_CONFIDENCE' || risk.status === 'MEDIUM_CONFIDENCE') {
        candidates.push({
          type: "SAME_PRODUCT_OTHER_STORE",
          badge: "Same Item • Verified Store",
          product,
          store,
          price: inv.price,
          intelligence: risk
        });
      }
    }

    // 2. Similar products in the same category across stores
    const relatedProducts = this.products.filter(
      p => p.category === product.category && p.id !== productId
    );

    for (const relProd of relatedProducts) {
      const relInvs = this.inventory.filter(i => i.productId === relProd.id);
      for (const inv of relInvs) {
        const store = this.getStore(inv.storeId);
        if (!store) continue;

        const risk = calculateAvailabilityRisk(inv);
        if (risk.status === 'HIGH_CONFIDENCE') {
          candidates.push({
            type: "SIMILAR_PRODUCT",
            badge: "Similar Category • High Confidence",
            product: relProd,
            store,
            price: inv.price,
            intelligence: risk
          });
        }
      }
    }

    // Sort by confidence descending, then distance
    candidates.sort((a, b) => {
      const confDiff = b.intelligence.confidence - a.intelligence.confidence;
      if (confDiff !== 0) return confDiff;
      return a.store.distanceKm - b.store.distanceKm;
    });

    return candidates.slice(0, 4);
  }

  /**
   * Partner Store Inventory Health & Action Queue
   */
  getStoreInventoryHealth(storeId) {
    const store = this.getStore(storeId);
    if (!store) return null;

    const storeInvs = this.inventory.filter(i => i.storeId === storeId);
    const actionItems = [];

    let highConfidenceCount = 0;
    let needsConfirmationCount = 0;
    let highRiskCount = 0;

    for (const inv of storeInvs) {
      const product = this.getProduct(inv.productId);
      const risk = calculateAvailabilityRisk(inv);

      if (risk.status === 'HIGH_CONFIDENCE') {
        highConfidenceCount++;
      } else if (risk.status === 'MEDIUM_CONFIDENCE') {
        needsConfirmationCount++;
        actionItems.push({
          inventoryId: inv.id,
          productId: inv.productId,
          product,
          riskLevel: "MEDIUM_RISK",
          riskBadge: "Needs Monitoring",
          status: risk.status,
          confidence: risk.confidence,
          reason: risk.reason,
          lastUpdatedHoursAgo: inv.lastUpdatedHoursAgo,
          declaredStock: inv.declaredStock,
          recentOrdersCount: inv.recentOrdersCount,
          cancellationsCount: inv.cancellationsCount,
          substitutionsCount: inv.substitutionsCount,
          isConfirmedByStore: !!inv.isConfirmedByStore
        });
      } else {
        // UNCERTAIN or LIKELY_UNAVAILABLE = HIGH RISK
        highRiskCount++;
        actionItems.push({
          inventoryId: inv.id,
          productId: inv.productId,
          product,
          riskLevel: "HIGH_RISK",
          riskBadge: "Action Required",
          status: risk.status,
          confidence: risk.confidence,
          reason: risk.reason,
          lastUpdatedHoursAgo: inv.lastUpdatedHoursAgo,
          declaredStock: inv.declaredStock,
          recentOrdersCount: inv.recentOrdersCount,
          cancellationsCount: inv.cancellationsCount,
          substitutionsCount: inv.substitutionsCount,
          isConfirmedByStore: !!inv.isConfirmedByStore
        });
      }
    }

    // Sort action items: High risk first, then by cancellations
    actionItems.sort((a, b) => {
      if (a.riskLevel === 'HIGH_RISK' && b.riskLevel !== 'HIGH_RISK') return -1;
      if (b.riskLevel === 'HIGH_RISK' && a.riskLevel !== 'HIGH_RISK') return 1;
      return b.cancellationsCount - a.cancellationsCount;
    });

    // Realistic scaled metrics for the store view
    // (A typical store has ~400 SKUs; we show calibrated baseline stats + live actions)
    return {
      store,
      healthSummary: {
        highConfidence: 342 + highConfidenceCount,
        needsConfirmation: 28 + needsConfirmationCount,
        highRisk: 17 + highRiskCount,
        confidencePercent: 88.5
      },
      actionItems,
      allTrackedItemsCount: storeInvs.length
    };
  }

  /**
   * CRITICAL MUTATION: Confirm stock from store dashboard
   * Instantly transitions state from UNCERTAIN -> HIGH_CONFIDENCE
   */
  confirmStock(storeId, productId, updatedStock = null) {
    const inv = this.getInventoryItem(storeId, productId);
    if (!inv) {
      throw new Error(`Inventory record not found for store ${storeId} and product ${productId}`);
    }

    const store = this.getStore(storeId);
    const product = this.getProduct(productId);

    // Apply updates
    inv.isConfirmedByStore = true;
    inv.lastUpdatedHoursAgo = 0.05; // Just now
    inv.declaredAvailable = true;
    if (updatedStock !== null && !isNaN(updatedStock)) {
      inv.declaredStock = Number(updatedStock);
    } else {
      inv.declaredStock = Math.max(inv.declaredStock, 15);
    }
    inv.lastConfirmedAt = new Date().toISOString();
    inv.cancellationsCount = 0; // Cleared operational deficit for current window
    inv.substitutionsCount = 0;

    // Recalculate new confidence
    const updatedRisk = calculateAvailabilityRisk(inv);

    // Log audit trail
    const auditEntry = {
      id: `audit-${Date.now()}`,
      action: "STORE_STOCK_CONFIRMED",
      storeId,
      storeName: store?.name || storeId,
      productId,
      productName: product?.name || productId,
      newStatus: updatedRisk.status,
      newConfidence: updatedRisk.confidence,
      timestamp: new Date().toISOString()
    };
    this.auditLog.unshift(auditEntry);

    return {
      success: true,
      message: `Stock confirmed successfully for ${product?.name} at ${store?.name}`,
      updatedInventory: inv,
      updatedRisk,
      auditEntry
    };
  }

  /**
   * Business & Operations View Metrics
   * Clearly separates documented case study evidence from prototype simulation metrics.
   */
  getBusinessMetrics() {
    let totalItems = 0;
    let highConfItems = 0;
    let highRiskItems = 0;

    for (const inv of this.inventory) {
      totalItems++;
      const risk = calculateAvailabilityRisk(inv);
      if (risk.status === 'HIGH_CONFIDENCE') highConfItems++;
      if (risk.status === 'UNCERTAIN' || risk.status === 'LIKELY_UNAVAILABLE') highRiskItems++;
    }

    const liveAvailabilityAccuracy = totalItems > 0 
      ? Number(((highConfItems / totalItems) * 100).toFixed(1))
      : 80.0;

    return {
      caseStudySignals: CASE_STUDY_SIGNALS,
      simulationMetrics: {
        label: "Prototype Simulation Data",
        catalogAccuracyPercent: liveAvailabilityAccuracy,
        monitoredSkusCount: totalItems,
        actionRequiredCount: highRiskItems,
        auditLog: this.auditLog.slice(0, 10),
        recentIncidents: this.incidents.slice(0, 5)
      }
    };
  }
}

// Global singleton instance across Next.js API requests
const globalStateKey = Symbol.for("nova.cart.state.v1");
if (!global[globalStateKey]) {
  global[globalStateKey] = new NovaLocalState();
}

export const novaState = global[globalStateKey];
