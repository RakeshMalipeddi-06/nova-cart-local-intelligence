'use client';

import React from 'react';
import { ShoppingCart, MapPin, ShieldCheck } from 'lucide-react';

export default function Header({ cartCount = 0, onCartClick, activeView }) {
  return (
    <header className="app-header">
      <div className="container header-inner">
        {/* Clean Text Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="brand-text">
            NOVA CART
          </div>
          <span className="brand-tag">
            Local Intelligence
          </span>
        </div>

        {/* Location & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className="location-indicator">
            <MapPin size={14} style={{ color: 'var(--slate-500)' }} />
            <span>Nearby stores</span>
          </div>

          {/* Cart Icon in Customer View */}
          {activeView === 'customer' && (
            <button
              onClick={onCartClick}
              style={{
                position: 'relative',
                background: 'var(--slate-100)',
                border: '1px solid var(--border-default)',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-xs)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--slate-800)'
              }}
              title="Cart items"
            >
              <ShoppingCart size={16} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: 'var(--slate-900)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
