import { ImprovementPlan, CategoryKey } from './types';

/**
 * Coaching & Improvement Plan Generator
 * 
 * Synthesizes identified tactical flaws into concrete, actionable training goals.
 */
export function generateImprovementPlan(categoryWeakness: CategoryKey = 'positioning'): ImprovementPlan {
  switch (categoryWeakness) {
    case 'positioning':
      return {
        primaryFocus: 'Positioning & Hard Cover Utilization',
        reason: 'Repeated open-ground exposure during initial enemy engagements.',
        nextMatchGoal: 'Prioritize cover or instant Gloo Wall placement before initiating any gunfight.',
        trainingGoals: [
          'Scan for at least one permanent cover object (rock, tree, building) before traversing open zones.',
          'Equip Gloo Wall slot to immediate thumb reach for reflex deployment under fire.',
          'Avoid lingering in exposed fields after eliminating an opponent; immediately reset to covered angles.',
        ],
        recommendedDrills: [
          'Training Grounds: Practice 180° flick-deploy Gloo Wall drills.',
          'Custom Room: 1v1 Cover-peeking restriction drill (only shoot while adjacent to cover).',
        ],
      };
    case 'combat':
      return {
        primaryFocus: 'Crosshair Placement & CQB Timing',
        reason: 'Rushing tight chokepoints without utility or pre-aim preparation.',
        nextMatchGoal: 'Use throwable utility (flash/frag) before breaching indoor or upstairs positions.',
        trainingGoals: [
          'Bank grenades off angles rather than face-checking closed rooms.',
          'Shoulder peek corners to force enemy weapon discharge before committing.',
          'Maintain crosshair at head height when rounding corners.',
        ],
        recommendedDrills: [
          'Clash Squad: Warm-up with shotgun and SMG pre-fire angles.',
        ],
      };
    case 'movement':
      return {
        primaryFocus: 'Zone Rotation Paths & Line of Sight',
        reason: 'Linear sprint routes across elevated sightlines during circle shrink.',
        nextMatchGoal: 'Use terrain contours and depressions to break distant sightlines during late-circle rotations.',
        trainingGoals: [
          'Plan rotation 30 seconds before safe zone starts collapsing.',
          'Use zigzag movement when crossing open choke points.',
          'Never run in straight lines when snipers are active in the area.',
        ],
        recommendedDrills: [
          'Bermuda map study: Identify low-elevation riverbed and ditch routes.',
        ],
      };
    case 'decisionMaking':
    default:
      return {
        primaryFocus: 'Third-Party Awareness & Drop Discipline',
        reason: 'Prematurely contesting high-risk airdrops without perimeter control.',
        nextMatchGoal: 'Hold high-ground surveillance for 15 seconds before approaching contested crates.',
        trainingGoals: [
          'Listen for gunfight audio cues before entering hot loot zones.',
          'Let opposing squads engage first to secure high-percentage cleanup opportunities.',
          'Assess escape routes before committing to a stationary position.',
        ],
        recommendedDrills: [
          'Solo vs Squad practice: Practice patience and late-fight third-partying.',
        ],
      };
  }
}
