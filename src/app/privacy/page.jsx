import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | NOVA CART',
  description: 'Prototype Privacy Policy for NOVA CART PromptWars hackathon entry.',
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
          Effective Date: October 2026 • Prototype Disclaimer
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem', color: 'var(--slate-700)', lineHeight: '1.6' }}>
          <section>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              1. Prototype Notice
            </h2>
            <p>
              NOVA CART and NOVA Local Intelligence are fictional case-study applications developed strictly as a competitive hackathon prototype for the PromptWars Business Rescue Challenge. This application does not represent a commercial enterprise or live shopping service.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              2. Data Collection & Processing
            </h2>
            <p>
              This prototype operates entirely with mock catalog datasets and simulated in-memory inventory states. No personal identifying information (PII), payment credentials, physical addresses, or tracking cookies are collected, stored, or transmitted to third parties.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: 'var(--slate-900)', marginBottom: '0.35rem' }}>
              3. AI & Deterministic Reasoning
            </h2>
            <p>
              Inventory availability calculations utilize deterministic operational logic with optional AI reasoning layers. No customer conversations or private user inputs are utilized for machine learning model training.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
