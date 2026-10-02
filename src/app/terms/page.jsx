import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | NOVA CART',
  description: 'Prototype Terms & Conditions for NOVA CART PromptWars hackathon entry.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '3rem 1.25rem', maxWidth: '780px' }}>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.84rem',
          fontWeight: '600',
          color: 'var(--slate-600)',
          marginBottom: '1.5rem'
        }}
      >
        <ArrowLeft size={14} />
        Back to Application
      </Link>

      <div style={{ background: 'var(--white)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--slate-900)' }}>
          Terms & Conditions
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
          Effective Date: October 2026 • Prototype Demonstration
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem', color: 'var(--slate-700)', lineHeight: '1.6' }}>
          <section>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              1. Demonstration Purposes Only
            </h2>
            <p>
              The NOVA CART software is provided exclusively for review, testing, and evaluation within the context of the PromptWars Business Rescue Challenge. All catalog items, prices, fulfillment times, store identities, and inventories are simulated constructs.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              2. No Commercial Liability
            </h2>
            <p>
              This software is provided "as is" without warranty of any kind. No actual orders will be fulfilled, dispatched, or billed. Users should not attempt to execute real commercial transactions.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              3. Intellectual Property
            </h2>
            <p>
              NOVA Local Intelligence concepts, deterministic scoring logic, and UI architecture were created for the hackathon prototype solution.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
