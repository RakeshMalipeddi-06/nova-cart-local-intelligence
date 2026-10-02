/**
 * NOVA CART Realistic Mock Data
 * Fictional Quick-Commerce & Local Shopping Platform
 * Case study: Bangalore local commerce ecosystem
 * Clean professional dataset (no emojis, no fake social proof)
 */

export const INITIAL_STORES = [
  {
    id: "store-1",
    name: "FreshMart Superstore",
    category: "Supermarket & Grocery",
    neighborhood: "Indiranagar 100ft Rd",
    distanceKm: 2.1,
    avgFulfillmentMin: 22,
    inventoryUpdateSchedule: "Automated POS Sync (hourly)",
    phone: "+91 98450 12345"
  },
  {
    id: "store-2",
    name: "ABC Bakery & Cafe",
    category: "Bakery & Desserts",
    neighborhood: "Koramangala 4th Block",
    distanceKm: 1.2,
    avgFulfillmentMin: 18,
    inventoryUpdateSchedule: "Twice Daily Manual Check",
    phone: "+91 98450 23456"
  },
  {
    id: "store-3",
    name: "XYZ Daily Needs",
    category: "General Grocery & Kirana",
    neighborhood: "Koramangala 5th Block",
    distanceKm: 0.8,
    avgFulfillmentMin: 34,
    inventoryUpdateSchedule: "Manual (Updates every 1-3 days)",
    phone: "+91 98450 34567"
  },
  {
    id: "store-4",
    name: "Sri Lakshmi Stores",
    category: "Provisions & Dairy",
    neighborhood: "HSR Layout Sector 1",
    distanceKm: 2.8,
    avgFulfillmentMin: 24,
    inventoryUpdateSchedule: "Daily Morning Reconciliation",
    phone: "+91 98450 45678"
  },
  {
    id: "store-5",
    name: "Local Cafe & Roastery",
    category: "Specialty Beverages & Bakes",
    neighborhood: "Koramangala 6th Block",
    distanceKm: 1.5,
    avgFulfillmentMin: 15,
    inventoryUpdateSchedule: "Active Barista Tablet Log",
    phone: "+91 98450 56789"
  },
  {
    id: "store-6",
    name: "Green Basket Organics",
    category: "Organic Grocery & Produce",
    neighborhood: "Koramangala 1st Block",
    distanceKm: 1.9,
    avgFulfillmentMin: 20,
    inventoryUpdateSchedule: "Batch Delivery Sync",
    phone: "+91 98450 67890"
  },
  {
    id: "store-7",
    name: "City Supermart",
    category: "Hyperlocal Superstore",
    neighborhood: "BTM Layout 2nd Stage",
    distanceKm: 3.2,
    avgFulfillmentMin: 28,
    inventoryUpdateSchedule: "Daily Closing Sync",
    phone: "+91 98450 78901"
  },
  {
    id: "store-8",
    name: "Fresh Corner Express",
    category: "Quick Provisions",
    neighborhood: "Ejipura Main Road",
    distanceKm: 1.1,
    avgFulfillmentMin: 32,
    inventoryUpdateSchedule: "Irregular Manual Check",
    phone: "+91 98450 89012"
  },
  {
    id: "store-9",
    name: "Smart Kirana",
    category: "Local Neighborhood Store",
    neighborhood: "Tavarekere Hub",
    distanceKm: 2.4,
    avgFulfillmentMin: 38,
    inventoryUpdateSchedule: "Weekly Manual Audit",
    phone: "+91 98450 90123"
  },
  {
    id: "store-10",
    name: "Neighborhood Foods",
    category: "Gourmet & Daily Needs",
    neighborhood: "Jayanagar 4th T Block",
    distanceKm: 3.5,
    avgFulfillmentMin: 26,
    inventoryUpdateSchedule: "Daily POS Reconciliation",
    phone: "+91 98450 01234"
  }
];

export const INITIAL_PRODUCTS = [
  // Beverages
  {
    id: "prod-cold-coffee",
    name: "Cold Coffee",
    category: "Beverages",
    description: "Chilled espresso brewed with fresh toned milk and subtle vanilla extract.",
    volumeOrWeight: "300 ml",
    iconType: "coffee",
    tags: ["coffee", "cold coffee", "beverage", "chilled", "iced coffee"]
  },
  {
    id: "prod-choc-cold-coffee",
    name: "Chocolate Cold Coffee",
    category: "Beverages",
    description: "Cold coffee blended with dark chocolate syrup.",
    volumeOrWeight: "350 ml",
    iconType: "coffee",
    tags: ["coffee", "cold coffee", "chocolate", "mocha", "beverage"]
  },
  {
    id: "prod-iced-coffee",
    name: "Iced Coffee",
    category: "Beverages",
    description: "Cold brew served over chilled milk.",
    volumeOrWeight: "250 ml",
    iconType: "coffee",
    tags: ["coffee", "iced coffee", "cold brew", "beverage"]
  },
  {
    id: "prod-orange-juice",
    name: "Fresh Orange Juice",
    category: "Beverages",
    description: "Cold-pressed Valencia oranges without added sugar.",
    volumeOrWeight: "300 ml",
    iconType: "beverage",
    tags: ["juice", "orange", "fresh juice", "beverage"]
  },
  {
    id: "prod-filter-coffee",
    name: "Filter Coffee Decoction",
    category: "Beverages",
    description: "Traditional chicory-blend coffee decoction.",
    volumeOrWeight: "200 ml",
    iconType: "coffee",
    tags: ["coffee", "filter coffee", "decoction", "beverage"]
  },
  {
    id: "prod-diet-cola",
    name: "Diet Cola Can",
    category: "Beverages",
    description: "Zero calorie sparkling beverage.",
    volumeOrWeight: "330 ml",
    iconType: "beverage",
    tags: ["cola", "soft drink", "beverage", "can"]
  },

  // Dairy & Breakfast
  {
    id: "prod-milk-1l",
    name: "Amul Taaza Milk 1L",
    category: "Dairy & Breakfast",
    description: "Pasteurised toned milk with 3.0% fat content.",
    volumeOrWeight: "1 Litre",
    iconType: "milk",
    tags: ["milk", "amul", "dairy", "taaza", "milk 1l"]
  },
  {
    id: "prod-nandini-milk",
    name: "Nandini Toned Milk",
    category: "Dairy & Breakfast",
    description: "Pasteurised daily toned milk.",
    volumeOrWeight: "500 ml",
    iconType: "milk",
    tags: ["milk", "nandini", "dairy", "toned milk"]
  },
  {
    id: "prod-eggs-pack6",
    name: "Farm Fresh Eggs",
    category: "Dairy & Breakfast",
    description: "Graded, farm-washed white table eggs.",
    volumeOrWeight: "Pack of 6",
    iconType: "egg",
    tags: ["eggs", "egg", "breakfast", "poultry"]
  },
  {
    id: "prod-curd-400g",
    name: "Fresh Curd (Dahi)",
    category: "Dairy & Breakfast",
    description: "Naturally set probiotic Indian curd.",
    volumeOrWeight: "400 g",
    iconType: "milk",
    tags: ["curd", "dahi", "yogurt", "dairy"]
  },
  {
    id: "prod-amul-butter",
    name: "Amul Salted Butter",
    category: "Dairy & Breakfast",
    description: "Pasteurised table butter.",
    volumeOrWeight: "100 g",
    iconType: "milk",
    tags: ["butter", "amul", "dairy", "breakfast"]
  },
  {
    id: "prod-fresh-paneer",
    name: "Fresh Paneer",
    category: "Dairy & Breakfast",
    description: "Fresh cottage cheese block.",
    volumeOrWeight: "200 g",
    iconType: "milk",
    tags: ["paneer", "cottage cheese", "dairy"]
  },

  // Bakery
  {
    id: "prod-sourdough-bread",
    name: "Whole Wheat Bread",
    category: "Bakery",
    description: "Freshly baked whole wheat loaf.",
    volumeOrWeight: "400 g",
    iconType: "bread",
    tags: ["bread", "sourdough", "bakery", "whole wheat"]
  },
  {
    id: "prod-sandwich-bread",
    name: "White Sandwich Bread",
    category: "Bakery",
    description: "Sliced white bread loaf.",
    volumeOrWeight: "400 g",
    iconType: "bread",
    tags: ["bread", "sandwich", "bakery", "white bread"]
  },
  {
    id: "prod-choco-croissant",
    name: "Chocolate Croissant",
    category: "Bakery",
    description: "Flaky pastry filled with chocolate.",
    volumeOrWeight: "1 pc (110 g)",
    iconType: "bread",
    tags: ["croissant", "bakery", "pastry", "chocolate"]
  },

  // Snacks & Staples
  {
    id: "prod-maggi",
    name: "Instant Noodles",
    category: "Snacks",
    description: "Masala flavored noodles pack.",
    volumeOrWeight: "4-Pack (280g)",
    iconType: "snack",
    tags: ["maggi", "noodles", "instant noodles", "snacks"]
  },
  {
    id: "prod-potato-wafers",
    name: "Salted Potato Chips",
    category: "Snacks",
    description: "Crispy sliced potato wafers.",
    volumeOrWeight: "115 g",
    iconType: "snack",
    tags: ["chips", "potato wafers", "snacks", "crisps"]
  },
  {
    id: "prod-dark-chocolate",
    name: "Dark Chocolate 70%",
    category: "Snacks",
    description: "Single origin dark chocolate bar.",
    volumeOrWeight: "80 g",
    iconType: "snack",
    tags: ["chocolate", "dark chocolate", "dessert", "snacks"]
  },
  {
    id: "prod-ice-cream-vanilla",
    name: "Vanilla Ice Cream",
    category: "Ice Creams & Desserts",
    description: "Madagascar vanilla dairy ice cream tub.",
    volumeOrWeight: "500 ml",
    iconType: "snack",
    tags: ["ice cream", "vanilla", "dessert", "cold"]
  },
  {
    id: "prod-bananas",
    name: "Fresh Bananas",
    category: "Fruits & Vegetables",
    description: "Naturally ripened Robusta bananas.",
    volumeOrWeight: "500 g",
    iconType: "produce",
    tags: ["banana", "fruits", "fresh", "produce"]
  },
  {
    id: "prod-apples",
    name: "Red Apples",
    category: "Fruits & Vegetables",
    description: "Fresh mountain-grown red apples.",
    volumeOrWeight: "Pack of 4",
    iconType: "produce",
    tags: ["apple", "apples", "fruits", "fresh"]
  },
  {
    id: "prod-tomatoes",
    name: "Fresh Tomatoes",
    category: "Fruits & Vegetables",
    description: "Local farm cooking tomatoes.",
    volumeOrWeight: "1 kg",
    iconType: "produce",
    tags: ["tomatoes", "tomato", "vegetables", "fresh"]
  },
  {
    id: "prod-cooking-oil",
    name: "Sunflower Cooking Oil",
    category: "Staples",
    description: "Refined sunflower oil for daily cooking.",
    volumeOrWeight: "1 Litre Pouch",
    iconType: "staple",
    tags: ["oil", "cooking oil", "sunflower oil", "staples"]
  },
  {
    id: "prod-sona-rice",
    name: "Sona Masoori Rice",
    category: "Staples",
    description: "Aged medium-grain South Indian rice.",
    volumeOrWeight: "5 kg",
    iconType: "staple",
    tags: ["rice", "sona masoori", "staples", "grains"]
  }
];

export const INITIAL_INVENTORY = [
  // COLD COFFEE (Primary Demo Anchor)
  {
    id: "inv-cc-store2",
    storeId: "store-2", // ABC Bakery
    productId: "prod-cold-coffee",
    price: 120,
    declaredStock: 18,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 1.5,
    recentOrdersCount: 28,
    cancellationsCount: 0,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 45,
    lastConfirmedAt: "2026-10-02T09:30:00Z"
  },
  {
    id: "inv-cc-store3",
    storeId: "store-3", // XYZ Daily Needs - Demo Target
    productId: "prod-cold-coffee",
    price: 110,
    declaredStock: 8,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 39.0, // Stale
    recentOrdersCount: 14,
    cancellationsCount: 4,      // 4 cancellations
    substitutionsCount: 3,      // 3 substitutions
    availabilityIncidentsCount: 0,
    recentSearchDemand: 62,
    lastConfirmedAt: "2026-09-30T18:00:00Z"
  },
  {
    id: "inv-cc-store5",
    storeId: "store-5", // Local Cafe
    productId: "prod-cold-coffee",
    price: 125,
    declaredStock: 25,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 2.8,
    recentOrdersCount: 35,
    cancellationsCount: 1,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 50,
    lastConfirmedAt: "2026-10-02T08:15:00Z"
  },
  {
    id: "inv-cc-store1",
    storeId: "store-1",
    productId: "prod-cold-coffee",
    price: 115,
    declaredStock: 12,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 18.5,
    recentOrdersCount: 16,
    cancellationsCount: 1,
    substitutionsCount: 1,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 30,
    lastConfirmedAt: "2026-10-01T16:30:00Z"
  },
  {
    id: "inv-cc-store9",
    storeId: "store-9",
    productId: "prod-cold-coffee",
    price: 99,
    declaredStock: 2,
    declaredAvailable: false, // Out of stock
    lastUpdatedHoursAgo: 74.0,
    recentOrdersCount: 6,
    cancellationsCount: 5,
    substitutionsCount: 2,
    availabilityIncidentsCount: 4,
    recentSearchDemand: 40,
    lastConfirmedAt: "2026-09-29T09:00:00Z"
  },

  // Alternative Cold Coffee Items
  {
    id: "inv-ccc-store5",
    storeId: "store-5",
    productId: "prod-choc-cold-coffee",
    price: 135,
    declaredStock: 15,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 2.2,
    recentOrdersCount: 22,
    cancellationsCount: 0,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 28,
    lastConfirmedAt: "2026-10-02T08:45:00Z"
  },
  {
    id: "inv-ic-store2",
    storeId: "store-2",
    productId: "prod-iced-coffee",
    price: 125,
    declaredStock: 10,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 3.1,
    recentOrdersCount: 19,
    cancellationsCount: 0,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 20,
    lastConfirmedAt: "2026-10-02T07:50:00Z"
  },

  // STORE 3 (XYZ Daily Needs) - OTHER ITEMS
  {
    id: "inv-milk1l-store3",
    storeId: "store-3",
    productId: "prod-milk-1l",
    price: 54,
    declaredStock: 5,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 48.0,
    recentOrdersCount: 24,
    cancellationsCount: 7,
    substitutionsCount: 5,
    availabilityIncidentsCount: 3,
    recentSearchDemand: 95,
    lastConfirmedAt: "2026-09-30T10:00:00Z"
  },
  {
    id: "inv-bread-store3",
    storeId: "store-3",
    productId: "prod-sandwich-bread",
    price: 45,
    declaredStock: 14,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 31.0,
    recentOrdersCount: 18,
    cancellationsCount: 2,
    substitutionsCount: 2,
    availabilityIncidentsCount: 1,
    recentSearchDemand: 42,
    lastConfirmedAt: "2026-10-01T04:00:00Z"
  },
  {
    id: "inv-eggs-store3",
    storeId: "store-3",
    productId: "prod-eggs-pack6",
    price: 52,
    declaredStock: 20,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 26.0,
    recentOrdersCount: 30,
    cancellationsCount: 2,
    substitutionsCount: 1,
    availabilityIncidentsCount: 1,
    recentSearchDemand: 55,
    lastConfirmedAt: "2026-10-01T09:00:00Z"
  },
  {
    id: "inv-maggi-store3",
    storeId: "store-3",
    productId: "prod-maggi",
    price: 56,
    declaredStock: 40,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 5.0,
    recentOrdersCount: 45,
    cancellationsCount: 0,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 70,
    lastConfirmedAt: "2026-10-02T06:00:00Z"
  },
  {
    id: "inv-butter-store3",
    storeId: "store-3",
    productId: "prod-amul-butter",
    price: 58,
    declaredStock: 25,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 6.5,
    recentOrdersCount: 22,
    cancellationsCount: 0,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 38,
    lastConfirmedAt: "2026-10-02T04:30:00Z"
  },

  // STORE 1 (FreshMart)
  {
    id: "inv-milk1l-store1",
    storeId: "store-1",
    productId: "prod-milk-1l",
    price: 54,
    declaredStock: 60,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 2.0,
    recentOrdersCount: 85,
    cancellationsCount: 1,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 110,
    lastConfirmedAt: "2026-10-02T09:00:00Z"
  },
  {
    id: "inv-eggs-store1",
    storeId: "store-1",
    productId: "prod-eggs-pack6",
    price: 50,
    declaredStock: 45,
    declaredAvailable: true,
    lastUpdatedHoursAgo: 1.0,
    recentOrdersCount: 65,
    cancellationsCount: 0,
    substitutionsCount: 0,
    availabilityIncidentsCount: 0,
    recentSearchDemand: 80,
    lastConfirmedAt: "2026-10-02T10:00:00Z"
  }
];

export const OPERATIONAL_INCIDENTS = [
  {
    id: "inc-101",
    storeId: "store-3",
    productId: "prod-cold-coffee",
    type: "UNAVAILABLE_AT_PICKUP",
    details: "Delivery partner reported item was out of stock after acceptance.",
    timestamp: "2026-10-02T08:12:00Z"
  },
  {
    id: "inc-102",
    storeId: "store-3",
    productId: "prod-cold-coffee",
    type: "UNAUTHORIZED_SUBSTITUTION",
    details: "Store substituted with hot beverage without customer confirmation.",
    timestamp: "2026-10-01T21:40:00Z"
  },
  {
    id: "inc-103",
    storeId: "store-3",
    productId: "prod-milk-1l",
    type: "STOCKOUT_DURING_RUSH",
    details: "Crate depleted during morning order surge.",
    timestamp: "2026-10-02T07:05:00Z"
  }
];

/**
 * Documented Case Study Evidence Signals (Section 1)
 * These are the empirical baseline figures from the case study.
 */
export const CASE_STUDY_SIGNALS = {
  repeatPurchase: {
    before: 41,
    after: 27,
    unit: "%",
    label: "Repeat Purchase Rate"
  },
  cancellationRate: {
    before: 6,
    after: 11,
    unit: "%",
    label: "Order Cancellation Rate"
  },
  deliveryTimeMin: {
    before: 29,
    after: 37,
    unit: "mins",
    label: "Average Delivery Time"
  },
  supportTickets: {
    before: 3100,
    after: 5900,
    unit: "/mo",
    label: "Monthly Support Tickets"
  },
  availabilityShareOfCancellations: {
    value: 35,
    unit: "%",
    label: "Cancellations Due to Product Unavailability"
  },
  customerAvailabilityComplaints: {
    value: 29,
    unit: "%",
    label: "Customers Reporting Availability Issues"
  },
  partnerMaintenanceBurden: {
    value: 39,
    unit: "%",
    label: "Stores Stating Inventory Updates Require Too Much Effort"
  },
  promotionalSpendGrowth: {
    before: 9.5,
    after: 17.0,
    unit: "L INR",
    label: "Promotional Spend"
  }
};
