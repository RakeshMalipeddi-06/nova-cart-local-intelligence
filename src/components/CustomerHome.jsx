'use client';

import React from 'react';
import { Search } from 'lucide-react';

export default function CustomerHome({
  searchQuery,
  setSearchQuery,
  onSearch,
  onSelectCategory,
  selectedCategory,
  onQuickDemoSearch
}) {
  const suggestedQueries = [
    { label: "Cold Coffee", isDemo: true },
    { label: "Amul Taaza Milk 1L", isDemo: false },
    { label: "Farm Fresh Eggs", isDemo: false },
    { label: "Whole Wheat Bread", isDemo: false },
    { label: "Vanilla Ice Cream", isDemo: false },
  ];

  const categories = [
    { id: "All", name: "All Products" },
    { id: "Beverages", name: "Beverages" },
    { id: "Dairy & Breakfast", name: "Dairy & Breakfast" },
    { id: "Bakery", name: "Bakery" },
    { id: "Snacks", name: "Snacks" },
    { id: "Fruits & Vegetables", name: "Produce" },
    { id: "Staples", name: "Staples" },
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="section-hero">
      <div className="container">
        {/* Evidence-Driven Concise Copy */}
        <h1 className="hero-heading">
          Know what is actually available.
        </h1>
        <p className="hero-subheading">
          Availability intelligence helps identify products whose current stock status may be unreliable.
        </p>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-input-box">
            <Search size={18} style={{ color: 'var(--slate-400)', marginRight: '0.65rem' }} />
            <input
              type="text"
              className="search-input-field"
              placeholder="Search products (e.g., Cold Coffee, Milk 1L, Bread)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              id="product-search-input"
            />
            <button
              className="btn-search"
              onClick={() => onSearch(searchQuery)}
              id="search-submit-btn"
            >
              Search
            </button>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="quick-queries">
          <span style={{ color: 'var(--slate-500)', fontWeight: '500' }}>Quick searches:</span>
          {suggestedQueries.map((q) => (
            <button
              key={q.label}
              className={`query-chip ${q.isDemo ? 'active-demo' : ''}`}
              onClick={() => onQuickDemoSearch(q.label)}
            >
              {q.label}
              {q.isDemo && (
                <span style={{ fontSize: '0.68rem', color: 'var(--slate-500)', marginLeft: '0.35rem' }}>
                  (Demo Scenario)
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Category Filter Chips */}
        <div className="category-filter-row">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`category-btn ${selectedCategory === cat.id ? 'selected' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
