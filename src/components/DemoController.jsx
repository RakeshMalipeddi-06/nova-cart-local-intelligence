'use client';

import React from 'react';
import { Store, ShoppingBag, BarChart2, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

export default function DemoController({
  activeView,
  setActiveView,
  onResetDemo,
  onGuidedDemoStep,
  guidedStep,
  isResetting
}) {
  return (
    <div className="demo-control-bar">
      <div className="demo-control-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span className="demo-badge-neutral">Demo Console</span>
          <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={14} style={{ color: '#16a34a' }} />
            NOVA Local Intelligence
          </span>
        </div>

        {/* View Switcher */}
        <div className="demo-view-nav">
          <button
            className={`demo-view-btn ${activeView === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveView('customer')}
          >
            <ShoppingBag size={13} />
            1. Customer Search
          </button>
          <button
            className={`demo-view-btn ${activeView === 'store' ? 'active' : ''}`}
            onClick={() => setActiveView('store')}
          >
            <Store size={13} />
            2. Store Console
          </button>
          <button
            className={`demo-view-btn ${activeView === 'ops' ? 'active' : ''}`}
            onClick={() => setActiveView('ops')}
          >
            <BarChart2 size={13} />
            3. Case Study Signals
          </button>
        </div>

        {/* Fast Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {guidedStep !== null ? (
            <button
              onClick={onGuidedDemoStep}
              className="btn-utility"
              style={{ background: '#334155', color: '#ffffff', borderColor: '#475569' }}
            >
              Step {guidedStep}/4: Next
              <ArrowRight size={12} />
            </button>
          ) : (
            <button
              onClick={onGuidedDemoStep}
              className="btn-utility"
            >
              Guided Walkthrough
            </button>
          )}

          <button
            className="btn-utility"
            onClick={onResetDemo}
            disabled={isResetting}
            title="Reset dataset to initial state"
          >
            <RotateCcw size={12} />
            {isResetting ? 'Resetting...' : 'Reset State'}
          </button>
        </div>
      </div>
    </div>
  );
}
