import { SCORING_CONFIG } from './config/scoringConfig.js';

/**
 * Deterministic Availability Risk Scoring Engine
 * Analyzes empirical operational signals to produce a transparent confidence score.
 */
export function calculateAvailabilityRisk(inventoryItem) {
  const {
    declaredAvailable = true,
    lastUpdatedHoursAgo = 24,
    recentOrdersCount = 10,
    cancellationsCount = 0,
    substitutionsCount = 0,
    availabilityIncidentsCount = 0,
    recentSearchDemand = 20,
    isConfirmedByStore = false,
  } = inventoryItem;

  // 1. Explicit Out-of-Stock Override
  if (!declaredAvailable) {
    return {
      status: "LIKELY_UNAVAILABLE",
      confidence: 0.05,
      score100: 5,
      customer_action: "SHOW_ALTERNATIVES",
      store_action: "CONFIRM_STOCK",
      reason: "Store marked this item as out-of-stock or delivery partner reported zero inventory.",
      alternative_strategy: "Redirect to closest in-stock partner store immediately.",
      signalsBreakdown: {
        freshness: 0,
        fulfillmentReliability: 10,
        incidentImpact: 0,
        demandRisk: "HIGH_DEFICIT"
      }
    };
  }

  // If store recently confirmed stock during active session
  if (isConfirmedByStore) {
    return {
      status: "HIGH_CONFIDENCE",
      confidence: 0.95,
      score100: 95,
      customer_action: "SHOW_PRODUCT",
      store_action: "NO_ACTION",
      reason: "Stock was manually verified by store manager just moments ago.",
      alternative_strategy: "Featured for immediate checkout with zero cancellation risk.",
      signalsBreakdown: {
        freshness: 100,
        fulfillmentReliability: 95,
        incidentImpact: 90,
        demandRisk: "VERIFIED"
      }
    };
  }

  // 2. Freshness Score (35 pts)
  let freshnessPoints = 0;
  if (lastUpdatedHoursAgo <= SCORING_CONFIG.freshness.freshHours) {
    freshnessPoints = 35;
  } else if (lastUpdatedHoursAgo <= SCORING_CONFIG.freshness.moderateHours) {
    // 6h to 24h
    const ratio = (lastUpdatedHoursAgo - 6) / 18;
    freshnessPoints = Math.round(35 - ratio * 12);
  } else if (lastUpdatedHoursAgo <= SCORING_CONFIG.freshness.staleHours) {
    // 24h to 36h
    const ratio = (lastUpdatedHoursAgo - 24) / 12;
    freshnessPoints = Math.round(23 - ratio * 9);
  } else {
    // > 36h
    freshnessPoints = Math.max(5, Math.round(14 - (lastUpdatedHoursAgo - 36) * 0.4));
  }

  // 3. Fulfillment Reliability Score (Cancellations & Substitutions) (40 pts)
  const totalOrders = Math.max(recentOrdersCount, 1);
  const weightedFailures = (cancellationsCount * 1.2) + (substitutionsCount * 0.6);
  const failureRate = weightedFailures / totalOrders;

  let reliabilityPoints = 0;
  if (failureRate === 0) {
    reliabilityPoints = 40;
  } else if (failureRate < 0.15) {
    reliabilityPoints = 32;
  } else if (failureRate < 0.35) {
    reliabilityPoints = 22;
  } else if (failureRate < 0.55) {
    reliabilityPoints = 16;
  } else {
    reliabilityPoints = 6;
  }

  // 4. Availability Incident Deductions (15 pts)
  let incidentPoints = 15;
  if (availabilityIncidentsCount === 1) {
    incidentPoints = 8;
  } else if (availabilityIncidentsCount >= 2) {
    incidentPoints = 4;
  }

  // 5. Demand Pressure vs Freshness (10 pts)
  let demandPoints = 10;
  if (recentSearchDemand > 50 && lastUpdatedHoursAgo > 24) {
    demandPoints = 5;
  } else if (recentSearchDemand > 30 && lastUpdatedHoursAgo > 12) {
    demandPoints = 7;
  }

  // Total Score
  const totalScore = Math.max(5, Math.min(99, freshnessPoints + reliabilityPoints + incidentPoints + demandPoints));
  const normalizedConfidence = Number((totalScore / 100).toFixed(2));

  // Determine Classification Status
  let status = "UNCERTAIN";
  let customer_action = "SHOW_WARNING";
  let store_action = "CONFIRM_STOCK";
  let reason = "";
  let alternative_strategy = "";

  if (totalScore >= SCORING_CONFIG.thresholds.highConfidence) {
    status = "HIGH_CONFIDENCE";
    customer_action = "SHOW_PRODUCT";
    store_action = "NO_ACTION";
    reason = lastUpdatedHoursAgo < 6
      ? `Inventory verified ${lastUpdatedHoursAgo.toFixed(1)}h ago with excellent completion rate (${recentOrdersCount} orders, 0 cancels).`
      : "Consistent fulfillment track record and steady stock level.";
    alternative_strategy = "Proceed with standard quick-commerce dispatch.";
  } else if (totalScore >= SCORING_CONFIG.thresholds.mediumConfidence) {
    status = "MEDIUM_CONFIDENCE";
    customer_action = "SHOW_PRODUCT";
    store_action = "MONITOR";
    reason = `Inventory last updated ${lastUpdatedHoursAgo.toFixed(1)}h ago; minor fulfillment variance observed.`;
    alternative_strategy = "Offer optional substitute pre-authorization at checkout.";
  } else if (totalScore >= SCORING_CONFIG.thresholds.uncertain) {
    status = "UNCERTAIN";
    customer_action = "SHOW_ALTERNATIVES";
    store_action = "CONFIRM_STOCK";
    reason = `Inventory unverified for ${lastUpdatedHoursAgo.toFixed(0)}h with ${cancellationsCount} cancellations and ${substitutionsCount} substitutions recently.`;
    alternative_strategy = "Warn customer and present pre-verified nearby store alternatives.";
  } else {
    status = "LIKELY_UNAVAILABLE";
    customer_action = "SHOW_ALTERNATIVES";
    store_action = "CONFIRM_STOCK";
    reason = `Extremely stale inventory (${lastUpdatedHoursAgo.toFixed(0)}h) compounded by ${availabilityIncidentsCount} availability failures.`;
    alternative_strategy = "Do not accept order for this store; reroute customer to verified stock.";
  }

  return {
    status,
    confidence: normalizedConfidence,
    score100: totalScore,
    customer_action,
    store_action,
    reason,
    alternative_strategy,
    signalsBreakdown: {
      freshness: freshnessPoints,
      fulfillmentReliability: reliabilityPoints,
      incidentImpact: incidentPoints,
      demandRisk: demandPoints
    }
  };
}
