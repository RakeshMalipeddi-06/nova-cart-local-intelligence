'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import DemoController from '@/components/DemoController';
import Header from '@/components/Header';
import CustomerHome from '@/components/CustomerHome';
import SearchResults from '@/components/SearchResults';
import ProductDetailModal from '@/components/ProductDetailModal';
import StoreDashboard from '@/components/StoreDashboard';
import OpsDashboard from '@/components/OpsDashboard';
import { CheckCircle2, ShoppingCart, X } from 'lucide-react';

export default function NovaCartApp() {
  // Navigation & Role Views
  const [activeView, setActiveView] = useState('customer'); // 'customer' | 'store' | 'ops'

  // Customer State
  const [searchQuery, setSearchQuery] = useState('Cold Coffee');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);

  // Store View State
  const [selectedStoreId, setSelectedStoreId] = useState('store-3'); // XYZ Daily Needs
  const [targetHighlightProductId, setTargetHighlightProductId] = useState('prod-cold-coffee');

  // Demo Walkthrough Mode
  const [guidedStep, setGuidedStep] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Search Function
  const performSearch = useCallback(async (query = searchQuery) => {
    setIsLoadingSearch(true);
    try {
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setSearchResults(data.results);
      }
    } catch (err) {
      console.error('Failed to perform search:', err);
    } finally {
      setIsLoadingSearch(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    performSearch('Cold Coffee');
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset Demo State
  const handleResetDemo = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/demo/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSearchQuery('Cold Coffee');
        setSelectedStoreId('store-3');
        setTargetHighlightProductId('prod-cold-coffee');
        setSelectedProductDetail(null);
        setGuidedStep(1);
        await performSearch('Cold Coffee');
        showToast('Dataset reset to baseline scenario.');
      }
    } catch (err) {
      console.error('Failed to reset demo:', err);
    } finally {
      setIsResetting(false);
    }
  };

  // Add to Cart
  const handleAddToCart = (product, store, inventory) => {
    const item = {
      product,
      store,
      inventory,
      cartId: `${store.id}-${product.id}-${Date.now()}`
    };
    setCartItems(prev => [...prev, item]);
    showToast(`Added ${product.name} (${store.name}) to cart.`);
  };

  // Switch to Store View from Product Card or Modal
  const handleGoToStoreAction = (storeId, productId) => {
    setSelectedStoreId(storeId);
    setTargetHighlightProductId(productId);
    setSelectedProductDetail(null);
    setActiveView('store');
    setGuidedStep(3);
  };

  // Stock Confirmed Callback
  const handleStockConfirmed = async (productId) => {
    await performSearch(searchQuery);
    setGuidedStep(4);
    showToast(`Stock confirmed! Customer availability updated to High Confidence.`);
  };

  // Handle Alternative Selected
  const handleSelectAlternative = (alt) => {
    handleAddToCart(alt.product, alt.store, { price: alt.price });
    setSelectedProductDetail(null);
    showToast(`Selected verified alternative: ${alt.product.name} at ${alt.store.name}`);
  };

  // Guided Walkthrough Stepper
  const handleGuidedDemoStep = () => {
    if (guidedStep === 1) {
      setActiveView('customer');
      setSearchQuery('Cold Coffee');
      performSearch('Cold Coffee');
      const uncertainItem = searchResults.find(r => r.store.id === 'store-3');
      if (uncertainItem) {
        setSelectedProductDetail(uncertainItem);
      }
      setGuidedStep(2);
      showToast('Step 2: Inspecting Availability Warning and Alternatives for Store B.');
    } else if (guidedStep === 2) {
      setSelectedProductDetail(null);
      setSelectedStoreId('store-3');
      setTargetHighlightProductId('prod-cold-coffee');
      setActiveView('store');
      setGuidedStep(3);
      showToast('Step 3: Partner Store view. Click "Confirm Stock" on Cold Coffee.');
    } else if (guidedStep === 3) {
      setActiveView('customer');
      performSearch('Cold Coffee');
      setGuidedStep(4);
      showToast('Step 4: Cold Coffee at Store B is now verified HIGH CONFIDENCE.');
    } else {
      setActiveView('ops');
      setGuidedStep(1);
      showToast('Step 5: Case Study Signals and simulation audit log.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Global Demo Controller Bar */}
      <DemoController
        activeView={activeView}
        setActiveView={setActiveView}
        onResetDemo={handleResetDemo}
        onGuidedDemoStep={handleGuidedDemoStep}
        guidedStep={guidedStep}
        isResetting={isResetting}
      />

      {/* 2. Global Header */}
      <Header
        cartCount={cartItems.length}
        onCartClick={() => setShowCartDrawer(true)}
        activeView={activeView}
      />

      {/* 3. Toast Notifications */}
      {toastMessage && (
        <div className="toast-box">
          <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 4. Active View Rendering */}
      <main style={{ flex: 1 }}>
        {activeView === 'customer' && (
          <>
            {/* Screen 1: Customer Home & Search */}
            <CustomerHome
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={performSearch}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                if (cat === 'All') performSearch('');
                else performSearch(cat);
              }}
              selectedCategory={selectedCategory}
              onQuickDemoSearch={(q) => {
                setSearchQuery(q);
                performSearch(q);
              }}
            />

            {/* Screen 2: Intelligent Search Results */}
            <SearchResults
              results={searchResults}
              query={searchQuery}
              isLoading={isLoadingSearch}
              onSelectProductDetail={(item) => setSelectedProductDetail(item)}
              onAddToCart={handleAddToCart}
              onGoToStoreDashboard={handleGoToStoreAction}
            />

            {/* Screen 3: Product Detail Modal */}
            {selectedProductDetail && (
              <ProductDetailModal
                selectedItem={selectedProductDetail}
                onClose={() => setSelectedProductDetail(null)}
                onSelectAlternative={handleSelectAlternative}
                onGoToStoreAction={handleGoToStoreAction}
              />
            )}
          </>
        )}

        {/* Screen 4: Partner Store Operations Console */}
        {activeView === 'store' && (
          <StoreDashboard
            selectedStoreId={selectedStoreId}
            onSelectStore={(id) => setSelectedStoreId(id)}
            targetHighlightProductId={targetHighlightProductId}
            onReturnToCustomerView={() => {
              setActiveView('customer');
              performSearch(searchQuery);
            }}
            onStockConfirmedCallback={handleStockConfirmed}
          />
        )}

        {/* Screen 5: Business / Operations View */}
        {activeView === 'ops' && (
          <OpsDashboard />
        )}
      </main>

      {/* Cart Drawer */}
      {showCartDrawer && (
        <div className="modal-overlay" onClick={() => setShowCartDrawer(false)}>
          <div className="modal-card" style={{ maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShoppingCart size={18} />
                Order Review ({cartItems.length})
              </h3>
              <button className="modal-close-btn" onClick={() => setShowCartDrawer(false)}>
                <X size={16} />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--slate-500)', fontSize: '0.85rem' }}>
                Your cart is empty. Add verified in-stock items from search.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {cartItems.map((c, i) => (
                  <div
                    key={c.cartId || i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      background: 'var(--slate-50)',
                      border: '1px solid var(--border-default)',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.84rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--slate-900)' }}>{c.product.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>
                        {c.store.name} • ₹{c.inventory.price}
                      </div>
                    </div>
                    <span className="status-indicator high" style={{ fontSize: '0.68rem', padding: '0.15rem 0.4rem' }}>
                      Verified
                    </span>
                  </div>
                ))}

                <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
                  <span style={{ fontWeight: '500', color: 'var(--slate-600)' }}>Estimated Delivery:</span>
                  <span style={{ fontWeight: '700', color: 'var(--slate-900)' }}>15-25 mins</span>
                </div>

                <button
                  className="btn-search"
                  style={{ width: '100%', marginTop: '0.5rem', textAlign: 'center', padding: '0.65rem' }}
                  onClick={() => {
                    showToast('Order simulated successfully. Dispatched to local partner store.');
                    setCartItems([]);
                    setShowCartDrawer(false);
                  }}
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Footer */}
      <footer className="app-footer">
        <div className="container footer-inner">
          <div>
            <strong>NOVA Local Intelligence</strong> • Prototype developed for the PromptWars Business Rescue Challenge.
            <div style={{ fontSize: '0.72rem', color: 'var(--slate-400)', marginTop: '0.2rem' }}>
              NOVA CART is a fictional case-study platform. All catalog data and operations are simulated.
            </div>
          </div>

          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
