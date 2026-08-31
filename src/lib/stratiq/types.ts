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
  situationType: 'Close Combat' | 'Open Field' | 'Chokepoint' | 'Zone Rotation' | 'Airdrop Contest';
  playerAction: string;
  outcome: MomentOutcome;
  importance: MomentImportance;
  impact: 'High' | 'Medium' | 'Low';
  decisionScore: number; // 0 - 100
  category: CategoryKey;
  tags: string[];
  thumbnailUrl?: string;
}

export interface DecisionAnalysis {
  momentId: string;
  situationExplanation: string;
  playerDecisionExplanation: string;
  outcomeExplanation: string;
  whyItMattered: string; // non-exaggerated rationale
  confidenceNote: string;
  decisionScore: number; // 0 - 100
  riskAssessment: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Extreme Vulnerability';
}

export interface WhatIfAction {
  momentId: string;
  originalDecision: string;
  originalScore: number; // e.g. 42
  possibleAlternative: string;
  alternativeScore: number; // e.g. 88
  expectedDifference: string; // "This could reduce exposure..."
  survivalImprovementPct: number; // e.g. +65%
  tacticalRationale: string;
  riskFactor: 'Low' | 'Moderate' | 'High';
}

export interface ImprovementPlan {
  primaryFocus: string; // e.g. "Positioning & Hard Cover Utilization"
  reason: string;
  nextMatchGoal: string;
  trainingGoals: string[];
  recommendedDrills: string[];
  settingsRecommendationSummary?: string;
}

export interface PerformanceMetricsExtended {
  aim: number; // e.g. 76
  movement: number; // e.g. 78
  positioning: number; // e.g. 61
  decisionMaking: number; // e.g. 72
  combat: number; // e.g. 68
  survival: number; // e.g. 82
  reaction: number; // e.g. 75
  overall: number; // e.g. 74
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
  kills: number; // e.g. 5
  placement: number; // e.g. 2 for #2
  improvementScoreChange: number; // e.g. +6%
  categoryScores: {
    combat: number;
    positioning: number;
    movement: number;
    decisionMaking: number;
  };
  performanceMetrics: PerformanceMetricsExtended;
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

export interface RecurringMistakeDetail {
  id: string;
  title: string;
  category: CategoryKey;
  description: string;
  occurrences: number;
  matchCount: number;
  matchPercentage: number; // e.g. 58 for 58%
  severity: 'High' | 'Medium' | 'Low';
  trend: 'improving' | 'stable' | 'worsening';
  trendLabel: string; // e.g. "Improving (8 → 4 errors)"
  recommendedImprovement: string;
  recommendedDrill: string;
}

export type OptimizationStyle = 'Headshot' | 'Balanced' | 'Rush';

export interface SensitivitySettings {
  general: number;
  redDot: number;
  scope2x: number;
  scope4x: number;
  sniper: number;
  freeLook: number;
  optimizationStyle: OptimizationStyle;
  recommendedDPI: number;
  rationale: string;
}

export interface DeviceProfile {
  deviceModel: string; // e.g. "iQOO 15"
  chipset: string; // e.g. "Snapdragon 8 Elite + Supercomputing Chip Q2"
  displayResolution: string; // e.g. "3200 x 1440 (2K 144Hz AMOLED)"
  screenSize: string; // e.g. "6.78 inches"
  touchSamplingRate: string; // e.g. "300Hz standard / 1200Hz Instant Touch"
  gamingPerformanceProfile: string; // e.g. "Monster Mode / Ultra Frame Interpolation"
  standardDPI: number; // e.g. 440
  recommendedDPI: number; // e.g. 480
}

export interface HUDControlItem {
  id: string;
  label: string;
  currentSize: number; // percentage e.g. 40
  recommendedSize: number; // percentage e.g. 52
  currentPosition: string; // e.g. "Lower Right"
  recommendedPosition: string; // e.g. "Lower Right - Adjusted 15px up for thumb arc"
  notes: string;
}

export interface PlayerProfileData {
  playerName: string;
  preferredPlayStyle: OptimizationStyle;
  matchesAnalyzed: number;
  overallAverageScore: number;
  improvementPercentage: number; // e.g. +28%
  improvementStreak: number; // e.g. 3 matches
  mostCommonMistake: string;
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
  deviceProfile: DeviceProfile;
  sensitivitySettings: SensitivitySettings;
  lastActive: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  suggestedAction?: string;
  relatedCategory?: CategoryKey;
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
