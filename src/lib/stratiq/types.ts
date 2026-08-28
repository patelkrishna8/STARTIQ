export type GameId = 'free-fire' | 'bgmi' | 'valorant' | 'cod';

export interface GameInfo {
  id: GameId;
  name: string;
  category: string;
  status: 'supported' | 'coming-soon';
  badge?: string;
  iconName: string;
  description: string;
}

export type InputMode = 'upload' | 'capture';

export interface VideoMetadata {
  name: string;
  size: number; // in bytes
  duration: number; // in seconds
  format: string;
  previewUrl?: string;
  isSample?: boolean;
}

export interface GameDetectionResult {
  detectedGame: string;
  selectedGame: string;
  confidence: number; // e.g. 0.96 for 96%
  isMatch: boolean;
  verificationStatus: 'verified' | 'mismatch' | 'uncertain';
  detectedFeatures: string[];
  reason: string;
}

export type MomentOutcome = 'eliminated' | 'survived' | 'disengaged' | 'advantage_gained';
export type MomentImportance = 'High' | 'Medium' | 'Low';
export type CategoryKey = 'combat' | 'positioning' | 'movement' | 'decisionMaking';

export interface KeyMoment {
  id: string;
  timestamp: string; // e.g. "06:42"
  seconds: number;
  title: string;
  situation: string;
  playerAction: string;
  outcome: MomentOutcome;
  importance: MomentImportance;
  category: CategoryKey;
  tags: string[];
  thumbnailUrl?: string;
}

export interface DecisionAnalysis {
  momentId: string;
  situationExplanation: string;
  playerDecisionExplanation: string;
  outcomeExplanation: string;
  whyItMattered: string; // non-exaggerated rationale: "Based on visible gameplay context..."
  confidenceNote: string;
}

export interface WhatIfAction {
  momentId: string;
  originalDecision: string;
  possibleAlternative: string;
  expectedDifference: string; // "This could reduce exposure and provide a safer engagement opportunity."
  tacticalRationale: string;
  riskFactor: 'Low' | 'Moderate' | 'High';
}

export interface ImprovementPlan {
  primaryFocus: string; // e.g. "Positioning"
  reason: string; // "Repeated exposure during enemy engagements."
  nextMatchGoal: string; // "Prioritize cover before initiating an engagement."
  trainingGoals: string[];
  recommendedDrills: string[];
}

export interface MatchAnalysis {
  id: string;
  matchNumber: number;
  gameId: GameId;
  gameName: string;
  title: string;
  date: string;
  duration: string;
  videoMetadata?: VideoMetadata;
  overallScore: number; // e.g. 74
  categoryScores: {
    combat: number; // e.g. 68
    positioning: number; // e.g. 61
    movement: number; // e.g. 78
    decisionMaking: number; // e.g. 72
  };
  keyMoments: KeyMoment[];
  decisionAnalyses: Record<string, DecisionAnalysis>;
  whatIfAnalyses: Record<string, WhatIfAction>;
  improvementPlan: ImprovementPlan;
  recurringMistakes: {
    title: string;
    count: number;
    category: CategoryKey;
    description: string;
  }[];
  isDemoData?: boolean;
}

export interface PlayerProfileData {
  playerName: string;
  matchesAnalyzed: number;
  strongestArea: {
    name: string;
    score: number;
  };
  recurringWeakness: {
    name: string;
    mistakeCount: number;
    description: string;
  };
  currentFocus: string;
  overallAverageScore: number;
  lastActive: string;
}

export interface AnalysisFeedback {
  momentId: string;
  matchId: string;
  rating: 'helpful' | 'not_accurate';
  comment?: string;
  createdAt: string;
}

export interface MistakeTrendPoint {
  matchNumber: number;
  matchId: string;
  matchLabel: string;
  mistakes: number;
  score: number;
}
