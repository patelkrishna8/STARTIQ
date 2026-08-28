import { WhatIfAction } from './types';

/**
 * "What If?" Counterfactual Action Engine
 * 
 * Generates believable, non-guaranteed tactical alternatives.
 * Adheres strictly to cautious phrasing:
 * - "This could reduce exposure..."
 * - "May have provided a safer engagement opportunity..."
 * - "Possible alternative action..."
 */
export function getWhatIfAnalyses(): Record<string, WhatIfAction> {
  return {
    'moment-1': {
      momentId: 'moment-1',
      originalDecision: 'Engage immediately while exposed in the open meadow.',
      possibleAlternative: 'Deploy a Gloo Wall or shift 3 meters left behind the stone fence before initiating fire.',
      expectedDifference: 'This could reduce exposed hitbox area and provide a safer engagement opportunity, allowing controlled peek-shooting.',
      tacticalRationale: 'In Free Fire gunfights, cover dictates peek advantage. Having an immediate barrier allows reset and healing if the initial spray fails.',
      riskFactor: 'Low',
    },
    'moment-2': {
      momentId: 'moment-2',
      originalDecision: 'Direct sprint push up the straight staircase without utility.',
      possibleAlternative: 'Bank a frag grenade or flashbang off the second-floor doorframe, or bait a shot with a quick shoulder peek.',
      expectedDifference: 'Softening or disorienting the defender could force them out of their pre-aim crosshair angle before entering the chokepoint.',
      tacticalRationale: 'Breaching high ground through single doors requires utility to disrupt enemy crosshair placement.',
      riskFactor: 'Moderate',
    },
    'moment-3': {
      momentId: 'moment-3',
      originalDecision: 'Zigzag rotation using terrain dips followed by Gloo Wall cover.',
      possibleAlternative: 'Attempting to stop and fight the ridge shooter while outside the safe zone.',
      expectedDifference: 'Stopping to fight while outside the zone would likely have resulted in compounding zone damage and pinned positioning.',
      tacticalRationale: 'The chosen action was the optimal tactical choice. Continuing rotation into safe zone secured late-game survival.',
      riskFactor: 'High',
    },
    'moment-4': {
      momentId: 'moment-4',
      originalDecision: 'Directly rush the center airdrop in low riverbed upon touchdown.',
      possibleAlternative: 'Take elevated ridge position overlooking the drop for 20 seconds, allowing enemy squads to engage first.',
      expectedDifference: 'Positioning as the third party allows cleaning up weakened survivors rather than becoming the central target.',
      tacticalRationale: 'High-tier airdrops in late circles serve as natural focal points for multiple squads.',
      riskFactor: 'Moderate',
    },
  };
}
