# NOVA LOCAL INTELLIGENCE
### AI-Assisted Availability Intelligence Layer for NOVA CART
*PromptWars Business Rescue Challenge Prototype*

---

## 1. Problem & Case-Study Evidence

NOVA CART is a high-growth quick-commerce and local-shopping platform experiencing a critical disconnect between top-line expansion and retention:

* **Growth vs Retention Paradox**:
  - Registered users grew **+46.3%** (82k → 120k) and monthly orders grew **+23.4%** (31.2k → 38.5k).
  - However, repeat purchase rates plummeted from **41% to 27%**.
  - Average delivery times degraded from **29 to 37 minutes**, cancellations surged from **6% to 11%**, and support tickets escalated from **3,100 to 5,900/month**.
  - Promotional spend nearly doubled from **₹9.5L to ₹17L** just to maintain volume.

* **The Inventory Root Cause**:
  - **29% of customers** specifically experienced product availability failures.
  - **35% of all cancellations** occurred because ordered items were out of stock upon partner arrival.
  - **39% of partner stores** reported that manually keeping inventory synced requires too much daily operational effort, with some updating stock only every 1–3 days.

**Strategic Hypothesis**: NOVA CART's local-store network is its greatest competitive moat, but uncoordinated manual inventory management causes severe availability drift. Eliminating false stock declarations restores customer trust and curbs cancellation-driven churn.

---

## 2. Product Solution: NOVA Local Intelligence

Instead of building a passive dashboard or a conversational chatbot, **NOVA Local Intelligence** introduces an active operational loop:

$$\text{INPUT (Search \& Location)} \longrightarrow \text{PROCESSING (Multi-Signal Risk Scoring)} \longrightarrow \text{RECOMMENDATION (Verified Alternatives)} \longrightarrow \text{ACTION (Store 1-Click Confirmation)} \longrightarrow \text{STATE MUTATION}$$

### Key Capabilities:
1. **Real-time Confidence Classification**: Classifies every store SKU into:
   - `HIGH_CONFIDENCE`: Fresh stock log, high completion track record.
   - `MEDIUM_CONFIDENCE`: Moderately fresh stock, low fulfillment variance.
   - `UNCERTAIN`: Stale data (>24h), recent cancellations/substitutions, or demand spikes.
   - `LIKELY_UNAVAILABLE`: Partner-reported out-of-stock or extreme data staleness.
2. **Customer Warning & Pre-Emptive Routing**: Protects buyers before checkout by clearly explaining availability risk and providing 1-click verified substitutes from nearby stores.
3. **Closed-Loop Store Queue**: Identifies high-risk items requiring physical confirmation at each store, allowing merchants to verify stock in 1 click and instantly flip customer-facing status to High Confidence.
4. **Operations Intelligence**: Tracks availability accuracy, prevented cancellations, and root cause distributions without making fabricated financial claims.

---

## 3. Why This Is Not Just an AI Wrapper

1. **Deterministic Guardrails First**: Basic arithmetic and rule-based thresholds (inventory age, cancellation rates, incident count) are handled by a transparent deterministic scoring engine (`src/lib/scoringEngine.js`).
2. **AI as an Intelligence & Reasoning Layer**: An LLM (Google Gemini or OpenAI) is used strictly for holistic multi-signal reasoning, unstructured store-signal synthesis, and customer-friendly explanatory generation.
3. **Structured JSON Validation**: All AI outputs conform to a strict JSON schema (`status`, `confidence`, `customer_action`, `store_action`, `reason`, `alternative_strategy`). If invalid or offline, deterministic fallback triggers automatically with **zero UI breakage**.
4. **Real Operational State Mutations**: Confirming stock actually mutates local store inventory state, logs an immutable audit event, and updates downstream customer search results in real time.

---

## 4. Architecture

```
NOVA-CART/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── search/route.js        # GET /api/products/search?q=
│   │   │   │   └── [id]/route.js          # GET /api/products/:id?storeId=
│   │   │   ├── stores/[id]/
│   │   │   │   └── inventory-health/route.js # GET /api/stores/:id/inventory-health
│   │   │   ├── availability/
│   │   │   │   └── analyze/route.js       # POST /api/availability/analyze
│   │   │   ├── store/
│   │   │   │   └── confirm-stock/route.js # POST /api/store/confirm-stock
│   │   │   ├── business/
│   │   │   │   └── metrics/route.js       # GET /api/business/metrics
│   │   │   └── demo/
│   │   │       └── reset/route.js         # POST /api/demo/reset
│   │   ├── globals.css                    # Vanilla CSS Design System
│   │   ├── layout.jsx                     # Root Layout & Metadata
│   │   └── page.jsx                       # Unified Reactive App View
│   ├── components/
│   │   ├── DemoController.jsx             # Hackathon Demo & Role Bar
│   │   ├── Header.jsx                     # Brand, Location, Cart
│   │   ├── CustomerHome.jsx               # Screen 1: Customer Search
│   │   ├── SearchResults.jsx              # Screen 2: Intelligent Results
│   │   ├── ProductDetailModal.jsx         # Screen 3: Risk & Alternatives
│   │   ├── StoreDashboard.jsx             # Screen 4: Partner Store Action Queue
│   │   └── OpsDashboard.jsx               # Screen 5: Business Operations View
│   └── lib/
│       ├── config/scoringConfig.js        # Centralized thresholds & weights
│       ├── data/mockData.js               # 10 stores, 35+ products, calibrated inventory
│       ├── scoringEngine.js               # Deterministic scoring engine
│       ├── aiReasoning.js                 # LLM engine + strict fallback
│       └── storeState.js                  # In-memory reactive state manager
├── package.json
└── jsconfig.json
```

---

## 5. Setup & Running Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm

### Installation & Run
```bash
# Install dependencies
npm install

# Run the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Environment Variables

The application runs **100% locally with zero paid APIs** using the deterministic fallback engine.

To optionally connect a live Gemini or OpenAI key:
```env
# Optional: Add to .env.local
GEMINI_API_KEY="your-gemini-api-key"
# or
OPENAI_API_KEY="your-openai-api-key"
```

If neither key is present, fallback mode activates seamlessly with identical response schemas.

---

## 7. The 90-Second Hackathon Demo Flow

1. **Step 1 — Search "Cold Coffee"**:
   - The customer sees results across nearby Bangalore stores.
   - **Store A (ABC Bakery)**: `HIGH CONFIDENCE • 99%` (verified 1.5h ago, 0 cancels).
   - **Store B (XYZ Daily Needs)**: `AVAILABILITY UNCERTAIN • 49%` (39h stale, 4 cancellations).
   - **Store C (Local Cafe)**: `HIGH CONFIDENCE • 92%` (freshly logged).
2. **Step 2 — Click "Show Alternatives" on Store B**:
   - Modal explains: *"Availability uncertain. Ordering now has an estimated 28% risk of cancellation."*
   - Displays verified alternatives from ABC Bakery and Local Cafe.
3. **Step 3 — Switch to Partner Store Dashboard**:
   - Open XYZ Daily Needs view.
   - Observe **INVENTORY HEALTH**: 344 High Confidence, 30 Needs Confirmation, 19 High Risk.
   - Under **ACTION REQUIRED**, `Cold Coffee` is flagged with `🔴 HIGH RISK`.
4. **Step 4 — Click "CONFIRM STOCK"**:
   - The button instantly flips to `✓ STOCK CONFIRMED`.
   - Inventory health counts update in real time.
5. **Step 5 — Return to Customer Search**:
   - Search "Cold Coffee" again.
   - **Store B (XYZ Daily Needs)** is now displayed as `HIGH CONFIDENCE • 95%`!
6. **Step 6 — Inspect Operations View**:
   - View catalog accuracy (82.4%), prevented cancellations, and the live audit log showing the confirmation timestamp.

---

## 8. Business KPIs (Measurement Targets)

- **Primary KPI**: Catalog Availability Accuracy (target: >85%).
- **Secondary KPIs**:
  - Post-order cancellation rate (target reduction: 11% → 5.5%).
  - Share of cancellations attributed to unavailability (target: <15%).
  - Delivery partner wait time at stores (target: 37 min → <25 min).
  - Store inventory update effort (<2 minutes per day via proactive targeted nudges).
  - Customer repeat purchase recovery (target goal: 38%).

---

## 9. Verification & Automated Testing

An automated verification script tests the exact end-to-end flow:
```bash
node test_workflow.mjs
```
Expected output:
```
=== STEP 1: Search 'Cold Coffee' ===
Store 3 (XYZ Daily Needs) status before confirmation: UNCERTAIN
=== STEP 2: Fetch Store 3 Inventory Health ===
Cold Coffee in Store Action Queue: HIGH_RISK
=== STEP 3: Confirm Stock for Store 3 Cold Coffee ===
New Status: HIGH_CONFIDENCE New Confidence: 0.95
=== STEP 4: Re-Search 'Cold Coffee' (Customer View Verification) ===
Store 3 (XYZ Daily Needs) status AFTER confirmation: HIGH_CONFIDENCE
>>> SUCCESS: END-TO-END STATE CHANGE VERIFIED PERFECTLY! <<<
```
