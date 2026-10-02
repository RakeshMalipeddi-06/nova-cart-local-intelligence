'use client';

import React, { useState, useEffect } from 'react';
import ProductIcon from './ProductIcon';
import { X, ArrowRight, Check } from 'lucide-react';

export default function ProductDetailModal({
  selectedItem,
  onClose,
  onSelectAlternative,
  onGoToStoreAction
}) {
  const [alternatives, setAlternatives] = useState([]);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);

  useEffect(() => {
    if (!selectedItem) return;

    async function fetchAlternatives() {
      setLoadingAlternatives(true);
      try {
        const res = await fetch(`/api/products/${selectedItem.product.id}?storeId=${selectedItem.store.id}`);
        const data = await res.json();
        if (data.success && data.alternatives) {
          setAlternatives(data.alternatives);
        }
      } catch (err) {
        console.error('Failed to load alternatives', err);
      } finally {
        setLoadingAlternatives(false);
      }
    }

    fetchAlternatives();
  }, [selectedItem]);

  if (!selectedItem) return null;

  const { product, store, inventory, intelligence } = selectedItem;
  const isUncertain = intelligence.status === 'UNCERTAIN';
  const isHigh = intelligence.status === 'HIGH_CONFIDENCE';
  const isUnavailable = intelligence.status === 'LIKELY_UNAVAILABLE';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          <X size={16} />
        </button>

        {/* Product Heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div className="card-icon-box" style={{ width: '42px', height: '42px' }}>
            <ProductIcon iconType={product.iconType} size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--slate-900)' }}>
              {product.name}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.1rem' }}>
              {store.name} • ₹{inventory.price} • {product.volumeOrWeight}
            </div>
          </div>
        </div>

        {/* Status Box */}
        {isUncertain ? (
          <div
            style={{
              background: 'var(--status-unc-bg)',
              border: '1px solid var(--status-unc-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ color: 'var(--status-unc-text)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
              Availability uncertain
            </div>
            <p style={{ fontSize: '0.82rem', color: '#92400e', lineHeight: 1.45, marginBottom: '0.65rem' }}>
              We could not confidently verify this product at {store.name}. Placing an order now risks delayed fulfillment or cancellation.
            </p>

            <div style={{ background: '#ffffff', border: '1px solid var(--status-unc-border)', borderRadius: 'var(--radius-xs)', padding: '0.65rem', fontSize: '0.78rem', color: 'var(--slate-700)' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.2rem', color: 'var(--slate-900)' }}>Operational evidence:</div>
              <ul style={{ paddingLeft: '1.1rem', lineHeight: 1.5 }}>
                <li>Store inventory unverified for {inventory.lastUpdatedHoursAgo} hours</li>
                <li>{inventory.cancellationsCount || 4} recent cancellations and {inventory.substitutionsCount || 3} substitutions logged</li>
                <li>Elevated customer search demand in the neighborhood</li>
              </ul>
            </div>

            {/* Quick Demo Navigation */}
            <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => onGoToStoreAction(store.id, product.id)}
                style={{
                  background: 'var(--slate-900)',
                  color: '#ffffff',
                  fontSize: '0.76rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                Switch to Store Console to Confirm Stock
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ) : isHigh ? (
          <div
            style={{
              background: 'var(--status-high-bg)',
              border: '1px solid var(--status-high-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ color: 'var(--status-high-text)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
              High confidence verified
            </div>
            <p style={{ fontSize: '0.82rem', color: '#166534', lineHeight: 1.45 }}>
              This item was recently verified at {store.name} with consistent fulfillment completion.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--status-unav-bg)',
              border: '1px solid var(--status-unav-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem',
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ color: 'var(--status-unav-text)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
              Likely out of stock
            </div>
            <p style={{ fontSize: '0.82rem', color: '#991b1b', lineHeight: 1.45 }}>
              Recent operational reports indicate this product is depleted at {store.name}.
            </p>
          </div>
        )}

        {/* Recommended Alternatives */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
            <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--slate-900)' }}>
              Recommended Verified Alternatives
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--status-high-text)', fontWeight: '600' }}>
              Nearby Stores
            </span>
          </div>

          {loadingAlternatives ? (
            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--slate-500)', fontSize: '0.8rem' }}>
              Finding verified alternatives...
            </div>
          ) : alternatives.length === 0 ? (
            <div style={{ padding: '0.75rem', background: 'var(--slate-100)', borderRadius: 'var(--radius-xs)', fontSize: '0.78rem', color: 'var(--slate-500)' }}>
              No other stores in the immediate radius currently stock this item.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {alternatives.map((alt, idx) => (
                <div
                  key={`${alt.store.id}-${alt.product.id}-${idx}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    background: 'var(--white)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div className="card-icon-box" style={{ width: '32px', height: '32px' }}>
                      <ProductIcon iconType={alt.product.iconType} size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--slate-900)' }}>
                        {alt.product.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>
                        {alt.store.name} • {alt.store.distanceKm} km • <span style={{ color: 'var(--status-high-text)', fontWeight: '600' }}>High Confidence</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--slate-900)' }}>
                      ₹{alt.price}
                    </div>
                    <button
                      onClick={() => onSelectAlternative(alt)}
                      style={{
                        background: 'var(--slate-900)',
                        color: '#ffffff',
                        padding: '0.35rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: '0.76rem',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <Check size={12} />
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-default)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="btn-card-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
