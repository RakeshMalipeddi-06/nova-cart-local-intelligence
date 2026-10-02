'use client';

import React, { useState, useEffect } from 'react';
import { RotateCw, TrendingDown, TrendingUp, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export default function OpsDashboard() {
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/business/metrics');
      const data = await res.json();
      if (data.success) {
        setMetricsData(data.metrics);
      }
    } catch (err) {
      console.error('Failed to load metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const signals = metricsData?.caseStudySignals;
  const simulation = metricsData?.simulationMetrics;

  return (
    <div className="container" style={{ padding: '1.5rem 1.25rem 4rem 1.25rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: '600', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Empirical Case Study Analysis
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--slate-900)' }}>
            Case Study Signals & Prototype Simulation
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.82rem' }}>
            Documented NOVA CART operational baseline data compared against active local prototype simulation
          </p>
        </div>

        <button
          onClick={fetchMetrics}
          className="btn-card-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem' }}
        >
          <RotateCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh Simulation
        </button>
      </div>

      {/* SECTION 1: AUTHENTIC CASE STUDY SIGNALS */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--slate-900)' }}>
              Case Study Signals (Documented Evidence)
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
              Empirical metrics from the NOVA CART case brief documenting the inventory-retention hypothesis
            </p>
          </div>
          <span className="demo-badge-neutral" style={{ fontSize: '0.68rem' }}>
            Case Study Benchmark
          </span>
        </div>

        <div className="metrics-overview-row">
          <div className="metric-box">
            <div className="metric-box-title">Repeat Purchase Rate</div>
            <div className="metric-box-value" style={{ color: 'var(--status-unav-text)' }}>
              41% → 27%
            </div>
            <div className="metric-box-caption" style={{ color: 'var(--status-unav-text)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <TrendingDown size={12} />
              Repeat purchase rate declined 14 percentage points
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Order Cancellation Rate</div>
            <div className="metric-box-value" style={{ color: 'var(--status-unav-text)' }}>
              6% → 11%
            </div>
            <div className="metric-box-caption" style={{ color: 'var(--status-unav-text)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <TrendingUp size={12} />
              Order cancellation rate increased from 6% to 11%
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Unavailability Cancellation Share</div>
            <div className="metric-box-value" style={{ color: 'var(--status-unc-text)' }}>
              35%
            </div>
            <div className="metric-box-caption">
              Share of cancellations attributed to product unavailability
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Customer Availability Complaints</div>
            <div className="metric-box-value" style={{ color: 'var(--status-unc-text)' }}>
              29%
            </div>
            <div className="metric-box-caption">
              Of customers reported availability-related complaints
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Partner Maintenance Burden</div>
            <div className="metric-box-value" style={{ color: 'var(--slate-900)' }}>
              39%
            </div>
            <div className="metric-box-caption">
              Of partners reported inventory maintenance as a burden
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Average Delivery Time</div>
            <div className="metric-box-value" style={{ color: 'var(--slate-900)' }}>
              29 → 37 min
            </div>
            <div className="metric-box-caption">
              Average delivery time increased from 29 to 37 minutes
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Monthly Support Tickets</div>
            <div className="metric-box-value" style={{ color: 'var(--slate-900)' }}>
              3,100 → 5,900
            </div>
            <div className="metric-box-caption">
              Monthly support tickets increased from 3,100 to 5,900
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-box-title">Promotional Spend</div>
            <div className="metric-box-value" style={{ color: 'var(--slate-900)' }}>
              ₹9.5L → ₹17L
            </div>
            <div className="metric-box-caption">
              Promotional spend increased from ₹9.5L to ₹17L
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PROTOTYPE SIMULATION TELEMETRY */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--slate-900)' }}>
              Prototype Simulation Telemetry
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
              Live state metrics generated by the local in-memory simulation engine (clearly labeled as prototype data)
            </p>
          </div>
          <span className="status-indicator medium" style={{ fontSize: '0.68rem' }}>
            Prototype Simulation
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
          {/* Left: Simulation SKUs & Accuracy */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--slate-900)' }}>
              Catalog State in Active Memory
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontWeight: '600' }}>MONITORED SKUS</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--slate-900)' }}>
                  {simulation?.monitoredSkusCount || 12}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Across 10 stores</div>
              </div>

              <div style={{ background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontWeight: '600' }}>HIGH CONFIDENCE RATIO</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--status-high-text)' }}>
                  {simulation?.catalogAccuracyPercent || 80}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Verified fresh inventory</div>
              </div>

              <div style={{ background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-default)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontWeight: '600' }}>ACTION REQUIRED SKUS</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--status-unc-text)' }}>
                  {simulation?.actionRequiredCount || 2}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Flagged for confirmation</div>
              </div>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-default)' }}>
              <strong>Prototype Hypothesis:</strong> This simulation models a system that flags uncertain inventory before order placement. The case study documents that 35% of cancellations were attributed to product unavailability. Whether surfacing availability confidence reduces cancellations is the hypothesis this prototype explores.
            </div>
          </div>

          {/* Right: Auditable Mutation Log */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <FileText size={15} style={{ color: 'var(--slate-600)' }} />
                Simulation Audit Log
              </h3>
              <span style={{ fontSize: '0.68rem', color: 'var(--slate-500)' }}>State mutations</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
              {simulation?.auditLog && simulation.auditLog.length > 0 ? (
                simulation.auditLog.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      background: 'var(--slate-50)',
                      padding: '0.5rem 0.65rem',
                      borderRadius: 'var(--radius-xs)',
                      borderLeft: log.action === 'STORE_STOCK_CONFIRMED' ? '3px solid var(--status-high-dot)' : '3px solid var(--slate-400)',
                      fontSize: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
                      <span style={{ fontWeight: '600', color: log.action === 'STORE_STOCK_CONFIRMED' ? 'var(--status-high-text)' : 'var(--slate-800)' }}>
                        {log.action === 'STORE_STOCK_CONFIRMED' ? 'Stock Confirmed' : 'System Initialized'}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--slate-400)' }}>
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div style={{ color: 'var(--slate-600)' }}>
                      {log.productName ? `${log.productName} (${log.storeName})` : log.details}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.76rem', color: 'var(--slate-400)', padding: '1rem', textAlign: 'center' }}>
                  No state changes recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
