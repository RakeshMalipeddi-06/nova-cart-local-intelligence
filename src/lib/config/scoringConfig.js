/**
 * Availability Risk Scoring Configuration
 * Centralized thresholds and weights for the deterministic scoring engine.
 */
export const SCORING_CONFIG = {
  // Freshness thresholds in hours
  freshness: {
    freshHours: 6,         // Full freshness score
    moderateHours: 24,     // Acceptable freshness
    staleHours: 36,        // Risk of drift
    criticalHours: 48,     // High likelihood of inventory drift
  },

  // Scoring weights (total: 100)
  weights: {
    freshness: 35,
    cancellationRate: 25,
    substitutions: 15,
    incidentPenalty: 15,
    demandPressure: 10,
  },

  // Status classification thresholds (confidence score out of 100)
  thresholds: {
    highConfidence: 75,
    mediumConfidence: 55,
    uncertain: 25,
    // Below 25 or explicit out-of-stock = LIKELY_UNAVAILABLE
  },

  // Penalties
  penalties: {
    explicitUnavailableScore: 10,
    highDemandUnverifiedDrop: 10,
  }
};
