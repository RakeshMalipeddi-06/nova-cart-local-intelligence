'use client';

import React, { useState, useEffect } from 'react';
import ProductIcon from './ProductIcon';
import { 
  Store, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCw, 
  Check, 
  ArrowLeft 
} from 'lucide-react';

export default function StoreDashboard({
  selectedStoreId = 'store-3',
  onSelectStore,
  targetHighlightProductId = null,
  onReturnToCustomerView,
  onStockConfirmedCallback
}) {
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const fetchStoreHealth = async (storeId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/stores/${storeId}/inventory-health`);
      const data = await res.json();
      if (data.success) {
        setStoreData(data);
      }
    } catch (err) {
      console.error('Failed to load store health data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreHealth(selectedStoreId);
  }, [selectedStoreId]);

  const handleConfirmStock = async (item) => {
    setConfirmingId(item.productId);
    try {
      const res = await fetch('/api/store/confirm-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: selectedStoreId,
          productId: item.productId,
          updatedStock: 25
        })
      });

      const result = await res.json();
      if (result.success) {
        setNotification(`Stock confirmed for ${item.product.name}. Customer availability status updated to HIGH CONFIDENCE.`);
        setTimeout(() => setNotification(null), 3500);

        await fetchStoreHealth(selectedStoreId);

        if (onStockConfirmedCallback) {
          onStockConfirmedCallback(item.productId);
        }
      }
    } catch (err) {
      console.error('Stock confirmation failed', err);
    } finally {
      setConfirmingId(null);
    }
  };

  const storesList = [
    { id: 'store-3', name: 'XYZ Daily Needs (Demo Target)' },
    { id: 'store-2', name: 'ABC Bakery & Cafe' },
    { id: 'store-1', name: 'FreshMart Superstore' },
    { id: 'store-5', name: 'Local Cafe & Roastery' },
    { id: 'store-9', name: 'Smart Kirana' },
  ];

  return (
    <div className="container" style={{ padding: '1.5rem 1.25rem 4rem 1.25rem' }}>
      {/* Toast Notification */}
      {notification && (
        <div className="toast-box">
          <CheckCircle2 size={16} style={{ color: '#22c55e' }} />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          onClick={onReturnToCustomerView}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'var(--white)',
            border: '1px solid var(--border-default)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.8rem',
            fontWeight: '600',
            color: 'var(--slate-700)'
          }}
        >
          <ArrowLeft size={14} />
          Return to Customer Search
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="store-select" style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontWeight: '500' }}>
            Store Console:
          </label>
          <select
            id="store-select"
            value={selectedStoreId}
            onChange={(e) => onSelectStore(e.target.value)}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-default)',
              background: 'var(--white)',
              color: 'var(--slate-900)',
              fontWeight: '600'
            }}
          >
            {storesList.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Operations Console Header */}
      <div className="ops-console-header">
        <div className="ops-title-area">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Store size={13} />
            Partner Store Operations Console
          </div>
          <h2>{storeData?.store?.name || 'XYZ Daily Needs'}</h2>
          <p>
            {storeData?.store?.neighborhood} • {storeData?.store?.inventoryUpdateSchedule || 'Manual updates'}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => fetchStoreHealth(selectedStoreId)}
            className="btn-card-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}
          >
            <RotateCw size={12} className={isLoading ? 'animate-spin' : ''} />
            Sync Shelf Data
          </button>
        </div>
      </div>

      {/* Section: Inventory Health Overview */}
      <div className="metrics-overview-row">
        <div className="metric-box">
          <div className="metric-box-title">High Confidence SKUs</div>
          <div className="metric-box-value" style={{ color: 'var(--status-high-text)' }}>
            {storeData?.healthSummary?.highConfidence || 344}
          </div>
          <div className="metric-box-caption">Fulfillment completion verified</div>
        </div>

        <div className="metric-box">
          <div className="metric-box-title">Needs Confirmation</div>
          <div className="metric-box-value" style={{ color: 'var(--status-unc-text)' }}>
            {storeData?.healthSummary?.needsConfirmation || 30}
          </div>
          <div className="metric-box-caption">Approaching staleness threshold</div>
        </div>

        <div className="metric-box">
          <div className="metric-box-title">Action Required (High Risk)</div>
          <div className="metric-box-value" style={{ color: 'var(--status-unav-text)' }}>
            {storeData?.healthSummary?.highRisk || 19}
          </div>
          <div className="metric-box-caption">Cancellations or unverified stock</div>
        </div>
      </div>

      {/* Section: Action Required (Clean, Dense Table) */}
      <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--slate-900)' }}>
            Action Required Queue ({storeData?.actionItems?.length || 0})
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
            Items with stale inventory or recent cancellations. Confirm shelf stock to restore High Confidence status.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>Product</th>
              <th style={{ width: '16%' }}>Risk Level</th>
              <th style={{ width: '38%' }}>Operational Reason</th>
              <th style={{ width: '18%', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && !storeData ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--slate-500)' }}>
                  Loading queue...
                </td>
              </tr>
            ) : storeData?.actionItems?.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--slate-500)' }}>
                  No items currently require confirmation at this store.
                </td>
              </tr>
            ) : (
              storeData.actionItems.map((item) => {
                const isConfirmed = item.isConfirmedByStore;
                const isHighRisk = item.riskLevel === 'HIGH_RISK';
                const isHighlight = targetHighlightProductId === item.productId;

                return (
                  <tr key={item.inventoryId} style={{ background: isHighlight && !isConfirmed ? '#fffdf5' : undefined }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div className="card-icon-box" style={{ width: '32px', height: '32px' }}>
                          <ProductIcon iconType={item.product?.iconType} size={15} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: 'var(--slate-900)' }}>
                            {item.product?.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>
                            Declared Stock: {item.declaredStock} units
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      {isConfirmed ? (
                        <span className="status-indicator high">
                          <span className="status-dot"></span>
                          CONFIRMED
                        </span>
                      ) : isHighRisk ? (
                        <span className="status-indicator unavailable">
                          <span className="status-dot"></span>
                          HIGH RISK
                        </span>
                      ) : (
                        <span className="status-indicator uncertain">
                          <span className="status-dot"></span>
                          MEDIUM RISK
                        </span>
                      )}
                    </td>

                    <td>
                      <div style={{ fontSize: '0.78rem', color: isConfirmed ? 'var(--status-high-text)' : 'var(--slate-700)', fontWeight: isConfirmed ? '600' : 'normal' }}>
                        {isConfirmed ? 'Verified by store manager moments ago' : item.reason}
                      </div>
                      {!isConfirmed && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--slate-400)', marginTop: '0.15rem' }}>
                          Unverified for {item.lastUpdatedHoursAgo}h • {item.cancellationsCount} cancellations
                        </div>
                      )}
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      {isConfirmed ? (
                        <span className="btn-confirmed">
                          <Check size={13} />
                          STOCK CONFIRMED
                        </span>
                      ) : (
                        <button
                          className="btn-confirm"
                          disabled={confirmingId === item.productId}
                          onClick={() => handleConfirmStock(item)}
                        >
                          {confirmingId === item.productId ? (
                            <>
                              <RotateCw size={12} className="animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <>
                              <Check size={13} />
                              Confirm Stock
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Return to Customer Search Navigation */}
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onReturnToCustomerView}
          style={{
            background: 'var(--slate-900)',
            color: 'var(--white)',
            padding: '0.55rem 1.1rem',
            borderRadius: 'var(--radius-xs)',
            fontSize: '0.82rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          Check Customer Search Availability
          <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
    </div>
  );
}
