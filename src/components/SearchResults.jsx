'use client';

import React from 'react';
import ProductIcon from './ProductIcon';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export default function SearchResults({
  results = [],
  query = '',
  isLoading = false,
  onSelectProductDetail,
  onAddToCart,
  onGoToStoreDashboard
}) {
  if (isLoading) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem' }}>
          Evaluating real-time store availability signals...
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="container" style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto', background: 'var(--white)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-default)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.35rem' }}>No matching products</h3>
          <p style={{ fontSize: '0.84rem', color: 'var(--slate-500)' }}>
            Search for <strong>Cold Coffee</strong>, <strong>Milk 1L</strong>, or choose a category above.
          </p>
        </div>
      </div>
    );
  }

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'HIGH_CONFIDENCE':
        return (
          <span className="status-indicator high">
            <span className="status-dot"></span>
            HIGH CONFIDENCE
          </span>
        );
      case 'MEDIUM_CONFIDENCE':
        return (
          <span className="status-indicator medium">
            <span className="status-dot"></span>
            MODERATE CONFIDENCE
          </span>
        );
      case 'UNCERTAIN':
        return (
          <span className="status-indicator uncertain">
            <span className="status-dot"></span>
            AVAILABILITY UNCERTAIN
          </span>
        );
      case 'LIKELY_UNAVAILABLE':
      default:
        return (
          <span className="status-indicator unavailable">
            <span className="status-dot"></span>
            LIKELY UNAVAILABLE
          </span>
        );
    }
  };

  return (
    <section className="container" style={{ padding: '1rem 1.25rem 3.5rem 1.25rem' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--slate-900)' }}>
            {query ? `Results for "${query}"` : 'Nearby Store Products'}
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
            {results.length} offers evaluated by availability risk signals
          </p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem' }}>
          <span className="status-indicator high" style={{ padding: '0.15rem 0.4rem' }}>High Confidence</span>
          <span className="status-indicator uncertain" style={{ padding: '0.15rem 0.4rem' }}>Uncertain</span>
          <span className="status-indicator unavailable" style={{ padding: '0.15rem 0.4rem' }}>Unavailable</span>
        </div>
      </div>

      {/* Grid */}
      <div className="results-grid-compact">
        {results.map((item, index) => {
          const { product, store, inventory, intelligence } = item;
          const isUncertain = intelligence.status === 'UNCERTAIN';
          const isHigh = intelligence.status === 'HIGH_CONFIDENCE';
          const isUnavailable = intelligence.status === 'LIKELY_UNAVAILABLE';

          const cardClass = isUncertain ? 'card-uncertain' : isHigh ? 'card-high' : isUnavailable ? 'card-unavailable' : '';
          const noteClass = isUncertain ? 'note-uncertain' : isHigh ? 'note-high' : isUnavailable ? 'note-unavailable' : '';

          return (
            <div key={`${store.id}-${product.id}-${index}`} className={`product-card ${cardClass}`}>
              <div>
                {/* Top Section */}
                <div className="card-top">
                  <div className="card-icon-box">
                    <ProductIcon iconType={product.iconType} size={18} />
                  </div>

                  <div className="card-title-area">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="store-meta">
                      {store.name}
                    </div>
                    <div className="meta-sub-row">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <MapPin size={11} />
                        {store.distanceKm} km
                      </span>
                      <span>•</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                        <Clock size={11} />
                        {store.avgFulfillmentMin} mins
                      </span>
                      <span>•</span>
                      <span>{product.volumeOrWeight}</span>
                    </div>
                  </div>
                </div>

                {/* Price and Status Badge */}
                <div className="price-row">
                  <div className="price-tag">
                    ₹{inventory.price}
                  </div>
                  <div>
                    {renderStatusBadge(intelligence.status)}
                  </div>
                </div>

                {/* Operational Explanation */}
                <div className={`operational-note ${noteClass}`}>
                  <strong>{isUncertain ? 'Attention: ' : isHigh ? 'Verified: ' : 'Risk: '}</strong>
                  {intelligence.reason}
                </div>
              </div>

              {/* Action Buttons */}
              <div>
                <div className="card-button-group">
                  {isHigh ? (
                    <>
                      <button
                        className="btn-card-primary"
                        onClick={() => onAddToCart(product, store, inventory)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn-card-secondary"
                        onClick={() => onSelectProductDetail(item)}
                      >
                        Details
                      </button>
                    </>
                  ) : isUncertain ? (
                    <>
                      <button
                        className="btn-card-warning"
                        onClick={() => onSelectProductDetail(item)}
                      >
                        View Alternatives
                      </button>
                      <button
                        className="btn-card-secondary"
                        onClick={() => onAddToCart(product, store, inventory)}
                        title="Order with potential cancellation risk"
                      >
                        Order Anyway
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn-card-secondary"
                      style={{ flex: 1, color: 'var(--status-unav-text)', borderColor: 'var(--status-unav-border)' }}
                      onClick={() => onSelectProductDetail(item)}
                    >
                      Out of Stock (Find Alternatives)
                    </button>
                  )}
                </div>

                {/* Direct shortcut to store console for demo inspection */}
                {isUncertain && (
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                    <span style={{ color: 'var(--slate-500)' }}>Requires store verification</span>
                    <button
                      onClick={() => onGoToStoreDashboard(store.id, product.id)}
                      style={{ color: 'var(--slate-900)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}
                    >
                      Open in Store Console
                      <ArrowRight size={11} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
