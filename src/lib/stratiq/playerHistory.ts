import { MatchAnalysis, PlayerProfileData, MistakeTrendPoint, KeyMoment } from './types';
import { extractKeyMoments } from './eventExtraction';
import { getDecisionAnalyses } from './decisionAnalysis';
import { getWhatIfAnalyses } from './whatIfAnalysis';
import { generateImprovementPlan } from './coaching';

const STORAGE_KEY_MATCHES = 'stratiq_matches_history_v1';
const STORAGE_KEY_FEEDBACK = 'stratiq_feedback_v1';

// Seeded 5 historical demo matches showing measurable tactical evolution
export const INITIAL_DEMO_MATCHES: MatchAnalysis[] = [
  {
    id: 'match-01',
    matchNumber: 1,
    gameId: 'free-fire',
    gameName: 'Free Fire',
    title: 'Bermuda Clash Squad - Rank Push',
    date: '2026-08-22 14:15',
    duration: '6m 12s',
    overallScore: 58,
    categoryScores: {
      combat: 59,
      positioning: 48,
      movement: 65,
      decisionMaking: 60,
    },
    keyMoments: [
      {
        id: 'm1-k1',
        timestamp: '02:10',
        seconds: 130,
        title: 'Open Field Duel',
        situation: 'Encountered enemy at Pochinok crossing without cover.',
        playerAction: 'Stood stationary in open road firing SMG spray.',
        outcome: 'eliminated',
        importance: 'High',
        category: 'positioning',
        tags: ['Exposed', 'No Cover'],
      },
      {
        id: 'm1-k2',
        timestamp: '04:45',
        seconds: 285,
        title: 'House Push Without Utility',
        situation: 'Enemy camping top floor with Vector.',
        playerAction: 'Direct sprint up stairs without check.',
        outcome: 'eliminated',
        importance: 'High',
        category: 'combat',
        tags: ['Chokepoint Rush'],
      },
    ],
    decisionAnalyses: {
      'm1-k1': {
        momentId: 'm1-k1',
        situationExplanation: 'Direct line of sight in open zone without obstacle.',
        playerDecisionExplanation: 'Player prioritized instantaneous weapon firing over securing cover.',
        outcomeExplanation: 'Opponent delivered headshot bursts unimpeded.',
        whyItMattered: 'Without cover, the engagement is purely a reaction-speed gamble with no margin for error.',
        confidenceNote: 'Demo benchmark data.',
      },
    },
    whatIfAnalyses: {
      'm1-k1': {
        momentId: 'm1-k1',
        originalDecision: 'Engaged while standing exposed in open road.',
        possibleAlternative: 'Crouch behind vehicle wreck before opening fire.',
        expectedDifference: 'Could have reduced exposed hitbox by 60% and permitted health recovery.',
        tacticalRationale: 'Using hard cover provides asymmetric peeking angles.',
        riskFactor: 'Low',
      },
    },
    improvementPlan: generateImprovementPlan('positioning'),
    recurringMistakes: [
      {
        title: 'Open Field Exposure',
        count: 8,
        category: 'positioning',
        description: 'Initiating engagements without accessible hard cover or Gloo Wall readiness.',
      },
      {
        title: 'Impulsive CQB Pushes',
        count: 4,
        category: 'combat',
        description: 'Rushing narrow staircases without utility softening.',
      },
    ],
    isDemoData: true,
  },
  {
    id: 'match-02',
    matchNumber: 2,
    gameId: 'free-fire',
    gameName: 'Free Fire',
    title: 'Purgatory Hot Drop - Brasilia',
    date: '2026-08-23 16:40',
    duration: '7m 05s',
    overallScore: 64,
    categoryScores: {
      combat: 63,
      positioning: 54,
      movement: 70,
      decisionMaking: 68,
    },
    keyMoments: [
      {
        id: 'm2-k1',
        timestamp: '03:30',
        seconds: 210,
        title: 'Brasilia Rooftop Crossfire',
        situation: 'Two squads fighting below; player on exposed roof ridge.',
        playerAction: 'Fired at squad 1 without covering rear balcony angle.',
        outcome: 'eliminated',
        importance: 'High',
        category: 'positioning',
        tags: ['Rear Vulnerability', 'Tunnel Vision'],
      },
    ],
    decisionAnalyses: {},
    whatIfAnalyses: {},
    improvementPlan: generateImprovementPlan('positioning'),
    recurringMistakes: [
      {
        title: 'Open Field Exposure',
        count: 7,
        category: 'positioning',
        description: 'Exposure from unmonitored angles during multi-squad engagements.',
      },
    ],
    isDemoData: true,
  },
  {
    id: 'match-03',
    matchNumber: 3,
    gameId: 'free-fire',
    gameName: 'Free Fire',
    title: 'Kalahari Ranked Scrim - Foundation',
    date: '2026-08-24 19:10',
    duration: '8m 20s',
    overallScore: 69,
    categoryScores: {
      combat: 67,
      positioning: 58,
      movement: 74,
      decisionMaking: 76,
    },
    keyMoments: [
      {
        id: 'm3-k1',
        timestamp: '05:15',
        seconds: 315,
        title: 'Ridge Disengage',
        situation: 'Pinched between safe zone boundary and sniper squad.',
        playerAction: 'Used smoke grenade and terrain dip to reposition.',
        outcome: 'disengaged',
        importance: 'Medium',
        category: 'movement',
        tags: ['Smart Reposition', 'Utility Use'],
      },
    ],
    decisionAnalyses: {},
    whatIfAnalyses: {},
    improvementPlan: generateImprovementPlan('positioning'),
    recurringMistakes: [
      {
        title: 'Open Field Exposure',
        count: 6,
        category: 'positioning',
        description: 'Occasional delay in placing Gloo Wall when caught in transit.',
      },
    ],
    isDemoData: true,
  },
  {
    id: 'match-04',
    matchNumber: 4,
    gameId: 'free-fire',
    gameName: 'Free Fire',
    title: 'Bermuda Solo vs Squads - Factory',
    date: '2026-08-25 11:30',
    duration: '7m 50s',
    overallScore: 72,
    categoryScores: {
      combat: 70,
      positioning: 60,
      movement: 76,
      decisionMaking: 80,
    },
    keyMoments: [
      {
        id: 'm4-k1',
        timestamp: '06:05',
        seconds: 365,
        title: 'Factory Perimeter Rotation',
        situation: 'Zone shrinking across open plain toward Factory containers.',
        playerAction: 'Deployed double Gloo Wall bridge to cross safely.',
        outcome: 'survived',
        importance: 'Medium',
        category: 'positioning',
        tags: ['Gloo Wall Micro-Cover', 'Safe Transition'],
      },
    ],
    decisionAnalyses: {},
    whatIfAnalyses: {},
    improvementPlan: generateImprovementPlan('positioning'),
    recurringMistakes: [
      {
        title: 'Open Field Exposure',
        count: 5,
        category: 'positioning',
        description: 'Isolated instances of premature engagement before solidifying cover.',
      },
    ],
    isDemoData: true,
  },
  {
    id: 'match-05',
    matchNumber: 5,
    gameId: 'free-fire',
    gameName: 'Free Fire',
    title: 'Bermuda Ranked Session - Pochinok & Clock Tower',
    date: '2026-08-26 18:45',
    duration: '8m 42s',
    overallScore: 74,
    categoryScores: {
      combat: 68,
      positioning: 61,
      movement: 78,
      decisionMaking: 72,
    },
    keyMoments: extractKeyMoments(),
    decisionAnalyses: getDecisionAnalyses(),
    whatIfAnalyses: getWhatIfAnalyses(),
    improvementPlan: generateImprovementPlan('positioning'),
    recurringMistakes: [
      {
        title: 'Open Field Exposure',
        count: 4,
        category: 'positioning',
        description: 'Engaging without first moving behind available permanent cover or deploying a Gloo Wall.',
      },
      {
        title: 'Chokepoint Utility Deficit',
        count: 2,
        category: 'combat',
        description: 'Breaching vertical staircases without flash or grenade preparation.',
      },
      {
        title: 'Airdrop Third-Party Vulnerability',
        count: 1,
        category: 'decisionMaking',
        description: 'Approaching central supply drops in late zone without surveillance.',
      },
    ],
    isDemoData: true,
  },
];

/**
 * Loads all matches from LocalStorage (or seeds initial 5 demo matches)
 */
export function getMatchHistory(): MatchAnalysis[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_MATCHES;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_MATCHES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(INITIAL_DEMO_MATCHES));
      return INITIAL_DEMO_MATCHES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_MATCHES;
  } catch (e) {
    console.error('Failed to read match history from localStorage', e);
    return INITIAL_DEMO_MATCHES;
  }
}

/**
 * Retrieves a single match by ID
 */
export function getMatchById(id: string): MatchAnalysis | undefined {
  const matches = getMatchHistory();
  return matches.find((m) => m.id === id);
}

/**
 * Saves a newly analyzed match to history
 */
export function saveNewMatchAnalysis(match: MatchAnalysis): MatchAnalysis[] {
  const matches = getMatchHistory();
  // Prepend or append
  const updated = [match, ...matches.filter((m) => m.id !== match.id)];
  try {
    localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save match analysis', e);
  }
  return updated;
}

/**
 * Resets local data back to initial 5 demo matches
 */
export function resetToDemoState(): void {
  try {
    localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(INITIAL_DEMO_MATCHES));
    localStorage.removeItem(STORAGE_KEY_FEEDBACK);
  } catch (e) {
    console.error('Failed to reset demo state', e);
  }
}

/**
 * Computes the 5-match recurring mistake trend (e.g. 8 -> 7 -> 6 -> 5 -> 4)
 */
export function getMistakeTrendData(): MistakeTrendPoint[] {
  const matches = getMatchHistory();
  // Sort by matchNumber ascending
  const sorted = [...matches].sort((a, b) => a.matchNumber - b.matchNumber);

  return sorted.map((match) => {
    const positioningMistake = match.recurringMistakes.find((m) => m.category === 'positioning');
    const mistakeCount = positioningMistake ? positioningMistake.count : 4;
    return {
      matchNumber: match.matchNumber,
      matchId: match.id,
      matchLabel: `Match #${match.matchNumber < 10 ? '0' + match.matchNumber : match.matchNumber}`,
      mistakes: mistakeCount,
      score: match.overallScore,
    };
  });
}

/**
 * Computes Personalized Decision Profile
 */
export function getPlayerProfile(): PlayerProfileData {
  const matches = getMatchHistory();
  const totalMatches = matches.length;

  const totalScore = matches.reduce((acc, m) => acc + m.overallScore, 0);
  const avgScore = Math.round(totalScore / (totalMatches || 1));

  // Calculate category averages
  const movementAvg = Math.round(matches.reduce((acc, m) => acc + m.categoryScores.movement, 0) / totalMatches);
  const combatAvg = Math.round(matches.reduce((acc, m) => acc + m.categoryScores.combat, 0) / totalMatches);
  const positioningAvg = Math.round(matches.reduce((acc, m) => acc + m.categoryScores.positioning, 0) / totalMatches);
  const decisionAvg = Math.round(matches.reduce((acc, m) => acc + m.categoryScores.decisionMaking, 0) / totalMatches);

  return {
    playerName: 'Vortex_FF',
    matchesAnalyzed: totalMatches,
    strongestArea: {
      name: 'Movement & Rotation',
      score: movementAvg || 78,
    },
    recurringWeakness: {
      name: 'Positioning Before Engagement',
      mistakeCount: 4,
      description: 'Engaging enemies from open/exposed terrain prior to establishing cover.',
    },
    currentFocus: 'Safer engagement positioning and cover discipline',
    overallAverageScore: avgScore,
    lastActive: matches[0]?.date || 'Today',
  };
}

/**
 * Saves user feedback on analysis usefulness
 */
export function saveAnalysisFeedback(momentId: string, matchId: string, rating: 'helpful' | 'not_accurate'): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
    const feedbackList = raw ? JSON.parse(raw) : [];
    feedbackList.push({
      momentId,
      matchId,
      rating,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(feedbackList));
  } catch (e) {
    console.error('Failed to save analysis feedback', e);
  }
}

/**
 * Checks if feedback was already provided for a key moment
 */
export function getFeedbackForMoment(momentId: string): 'helpful' | 'not_accurate' | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
    if (!raw) return null;
    const feedbackList = JSON.parse(raw);
    const item = feedbackList.find((f: any) => f.momentId === momentId);
    return item ? item.rating : null;
  } catch {
    return null;
  }
}
