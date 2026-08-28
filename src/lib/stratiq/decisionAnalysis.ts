import { DecisionAnalysis } from './types';

/**
 * Decision Analysis Engine
 * 
 * Provides nuanced, contextual explanations for why decisions mattered,
 * adhering strictly to non-exaggerated probabilistic language.
 */
export function getDecisionAnalyses(): Record<string, DecisionAnalysis> {
  return {
    'moment-1': {
      momentId: 'moment-1',
      situationExplanation: 'Enemy encountered near an open meadow without pre-existing obstacle coverage.',
      playerDecisionExplanation: 'Player initiated full automatic fire from an exposed position rather than seeking nearby perimeter cover or placing a defensive Gloo Wall.',
      outcomeExplanation: 'Opponent was able to return fire with clear line of sight, eliminating the player in approximately 1.4 seconds.',
      whyItMattered: 'Based on the visible gameplay context, entering combat from an exposed angle allowed the opponent an unobstructed line of fire. In competitive Free Fire, initiating fights without immediate cover drastically lowers survivability.',
      confidenceNote: 'Analysis derived from geometric line of sight and position relative to cover.',
    },
    'moment-2': {
      momentId: 'moment-2',
      situationExplanation: 'Enemy holding second-floor stairs with high-ground advantage and narrower reticle angle.',
      playerDecisionExplanation: 'Player pushed directly up the staircase without utility (flashbang/grenade) or shoulder-peeking to bait shots.',
      outcomeExplanation: 'Player survived with critically low HP (18 HP remaining) due to enemy missing a single pellet spread.',
      whyItMattered: 'Although the player survived this exchange, pushing high ground through a linear chokepoint heavily favors the defender. The success appears to rely on the opponent misfiring rather than positional superiority.',
      confidenceNote: 'Contextual risk assessment based on vertical angle disadvantage.',
    },
    'moment-3': {
      momentId: 'moment-3',
      situationExplanation: 'Zone 3 boundary closing fast with hostile fire incoming from high ridge.',
      playerDecisionExplanation: 'Player prioritized terrain contouring and cover over greedily returning fire into a zone-pressured disadvantage.',
      outcomeExplanation: 'Successfully broke enemy tracking and safely crossed the zone threshold.',
      whyItMattered: 'This decision preserved HP pool and positioning for the endgame circle rather than taking a low-percentage fight against zone timer.',
      confidenceNote: 'Positive decision model validation.',
    },
    'moment-4': {
      momentId: 'moment-4',
      situationExplanation: 'Airdrop crate in low river valley with audio cues indicating multiple surrounding hostile squads.',
      playerDecisionExplanation: 'Direct linear approach to loot the crate without establishing perimeter control or waiting for nearby squads to engage each other.',
      outcomeExplanation: 'Third-partied from north ridge and eliminated while standing static at the crate.',
      whyItMattered: 'Looting contested airdrops without perimeter reconnaissance creates severe vulnerability to third-party ambushes.',
      confidenceNote: 'Situational awareness & tactical timing evaluation.',
    },
  };
}
