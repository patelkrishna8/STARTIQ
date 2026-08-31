import {
  MatchAnalysis,
  PlayerProfileData,
  MistakeTrendPoint,
  KeyMoment,
  PerformanceMetricsExtended,
} from './types';
import { extractKeyMoments } from './eventExtraction';
import { getDecisionAnalyses } from './decisionAnalysis';
import { getWhatIfAnalyses } from './whatIfAnalysis';
import { generateImprovementPlan } from './coaching';
import { DEFAULT_IQOO_DEVICE, SENSITIVITY_PROFILES } from './settingsEngine';

const STORAGE_KEY_MATCHES = 'stratiq_matches_history_v2';
const STORAGE_KEY_FEEDBACK = 'stratiq_feedback_v2';

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
    kills: 2,
    placement: 8,
    improvementScoreChange: 0,
    categoryScores: {
      combat: 59,
      positioning: 48,
      movement: 65,
      decisionMaking: 60,
    },
    performanceMetrics: {
      aim: 65,
      movement: 65,
      positioning: 48,
      decisionMaking: 60,
      combat: 59,
      survival: 55,
      reaction: 62,
      overall: 58,
    },
    keyMoments: [
      {
        id: 'm1-k1',
        timestamp: '02:10',
        seconds: 130,
        title: 'Open Field Duel',
        situation: 'Encountered enemy at Pochinok crossing without cover.',
        situationType: 'Open Field',
        playerAction: 'Stood stationary in open road firing SMG spray.',
        outcome: 'eliminated',
        importance: 'High',
        impact: 'High',
        decisionScore: 35,
        category: 'positioning',
        tags: ['Exposed', 'No Cover'],
      },
      {
        id: 'm1-k2',
        timestamp: '04:45',
        seconds: 285,
        title: 'House Push Without Utility',
        situation: 'Enemy camping top floor with Vector.',
        situationType: 'Chokepoint',
        playerAction: 'Direct sprint up stairs without check.',
        outcome: 'eliminated',
        importance: 'High',
        impact: 'High',
        decisionScore: 42,
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
        decisionScore: 35,
        riskAssessment: 'Extreme Vulnerability',
      },
    },
    whatIfAnalyses: {
      'm1-k1': {
        momentId: 'm1-k1',
        originalDecision: 'Engaged while standing exposed in open road.',
        originalScore: 35,
        possibleAlternative: 'Crouch behind vehicle wreck before opening fire.',
        alternativeScore: 82,
        expectedDifference: 'Could have reduced exposed hitbox by 60% and permitted health recovery.',
        survivalImprovementPct: 70,
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
    kills: 3,
    placement: 6,
    improvementScoreChange: 6,
    categoryScores: {
      combat: 63,
      positioning: 54,
      movement: 70,
      decisionMaking: 68,
    },
    performanceMetrics: {
      aim: 68,
      movement: 70,
      positioning: 54,
      decisionMaking: 68,
      combat: 63,
      survival: 62,
      reaction: 66,
      overall: 64,
    },
    keyMoments: [
      {
        id: 'm2-k1',
        timestamp: '03:30',
        seconds: 210,
        title: 'Brasilia Rooftop Crossfire',
        situation: 'Two squads fighting below; player on exposed roof ridge.',
        situationType: 'Open Field',
        playerAction: 'Fired at squad 1 without covering rear balcony angle.',
        outcome: 'eliminated',
        importance: 'High',
        impact: 'High',
        decisionScore: 48,
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
    kills: 4,
    placement: 4,
    improvementScoreChange: 5,
    categoryScores: {
      combat: 67,
      positioning: 58,
      movement: 74,
      decisionMaking: 76,
    },
    performanceMetrics: {
      aim: 72,
      movement: 74,
      positioning: 58,
      decisionMaking: 76,
      combat: 67,
      survival: 72,
      reaction: 70,
      overall: 69,
    },
    keyMoments: [
      {
        id: 'm3-k1',
        timestamp: '05:15',
        seconds: 315,
        title: 'Ridge Disengage',
        situation: 'Pinched between safe zone boundary and sniper squad.',
        situationType: 'Zone Rotation',
        playerAction: 'Used smoke grenade and terrain dip to reposition.',
        outcome: 'disengaged',
        importance: 'Medium',
        impact: 'Medium',
        decisionScore: 78,
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
    kills: 4,
    placement: 3,
    improvementScoreChange: 3,
    categoryScores: {
      combat: 70,
      positioning: 60,
      movement: 76,
      decisionMaking: 80,
    },
    performanceMetrics: {
      aim: 74,
      movement: 76,
      positioning: 60,
      decisionMaking: 80,
      combat: 70,
      survival: 78,
      reaction: 72,
      overall: 72,
    },
    keyMoments: [
      {
        id: 'm4-k1',
        timestamp: '06:05',
        seconds: 365,
        title: 'Factory Perimeter Rotation',
        situation: 'Zone shrinking across open plain toward Factory containers.',
        situationType: 'Zone Rotation',
        playerAction: 'Deployed double Gloo Wall bridge to cross safely.',
        outcome: 'survived',
        importance: 'Medium',
        impact: 'Medium',
        decisionScore: 82,
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
    kills: 5,
    placement: 2,
    improvementScoreChange: 2,
    categoryScores: {
      combat: 68,
      positioning: 61,
      movement: 78,
      decisionMaking: 72,
    },
    performanceMetrics: {
      aim: 76,
      movement: 78,
      positioning: 61,
      decisionMaking: 72,
      combat: 68,
      survival: 82,
      reaction: 75,
      overall: 74,
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

export function getMatchById(id: string): MatchAnalysis | undefined {
  const matches = getMatchHistory();
  return matches.find((m) => m.id === id);
}

export function saveNewMatchAnalysis(match: MatchAnalysis): MatchAnalysis[] {
  const matches = getMatchHistory();
  const updated = [match, ...matches.filter((m) => m.id !== match.id)];
  try {
    localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save match analysis', e);
  }
  return updated;
}

export function resetToDemoState(): void {
  try {
    localStorage.setItem(STORAGE_KEY_MATCHES, JSON.stringify(INITIAL_DEMO_MATCHES));
    localStorage.removeItem(STORAGE_KEY_FEEDBACK);
  } catch (e) {
    console.error('Failed to reset demo state', e);
  }
}

export function getMistakeTrendData(): MistakeTrendPoint[] {
  const matches = getMatchHistory();
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

export function getPlayerProfile(): PlayerProfileData {
  const matches = getMatchHistory();
  const totalMatches = matches.length;

  const totalScore = matches.reduce((acc, m) => acc + m.overallScore, 0);
  const avgScore = Math.round(totalScore / (totalMatches || 1));

  const movementAvg = Math.round(matches.reduce((acc, m) => acc + m.categoryScores.movement, 0) / totalMatches);

  return {
    playerName: 'Vortex_FF',
    preferredPlayStyle: 'Headshot',
    matchesAnalyzed: totalMatches,
    overallAverageScore: avgScore,
    improvementPercentage: 28, // +28% improvement from Match 1 (58) to Match 5 (74)
    improvementStreak: 3,
    mostCommonMistake: 'Over-Aggressive Open Pushes (58% of matches)',
    strongestArea: {
      name: 'Movement & Rotation',
      score: movementAvg || 78,
    },
    recurringWeakness: {
      name: 'Positioning Before Engagement',
      mistakeCount: 4,
      description: 'Engaging enemies from open/exposed terrain prior to establishing cover.',
    },
    currentFocus: 'Prioritize cover or instant Gloo Wall placement before initiating any gunfight',
    deviceProfile: DEFAULT_IQOO_DEVICE,
    sensitivitySettings: SENSITIVITY_PROFILES.Headshot,
    lastActive: matches[0]?.date || 'Today',
  };
}

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
