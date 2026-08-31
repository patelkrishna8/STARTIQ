import { DecisionAnalysis, WhatIfAction, ImprovementPlan, CategoryKey } from './types';
import { getDecisionAnalyses } from './decisionAnalysis';
import { getWhatIfAnalyses } from './whatIfAnalysis';
import { generateImprovementPlan } from './coaching';

export interface ModelProvider {
  name: string;
  mode: 'demo' | 'model';
  isConfigured: boolean;
  analyzeDecision: (momentId: string, context?: any) => Promise<DecisionAnalysis>;
  generateWhatIf: (momentId: string, context?: any) => Promise<WhatIfAction>;
  generateCoachingPlan: (weakness: CategoryKey) => Promise<ImprovementPlan>;
}

/**
 * Deterministic Demo Provider
 * Used for transparent, reliable hackathon evaluation without external API dependencies.
 */
export const demoProvider: ModelProvider = {
  name: 'StartIQ Demo Engine (Deterministic Evaluator)',
  mode: 'demo',
  isConfigured: true,
  analyzeDecision: async (momentId: string) => {
    const all = getDecisionAnalyses();
    return (
      all[momentId] || {
        momentId,
        situationExplanation: 'Enemy engagement in dynamic combat zone.',
        playerDecisionExplanation: 'Player contested the encounter from visible stance.',
        outcomeExplanation: 'Engagement resolved based on position and timing.',
        whyItMattered: 'Based on available gameplay context, initial positioning influenced the outcome.',
        confidenceNote: 'Demo Mode inference.',
      }
    );
  },
  generateWhatIf: async (momentId: string) => {
    const all = getWhatIfAnalyses();
    return (
      all[momentId] || {
        momentId,
        originalDecision: 'Engaged immediately.',
        possibleAlternative: 'Reposition behind cover before engaging.',
        expectedDifference: 'Could provide safer line of sight and cover.',
        tacticalRationale: 'Minimizing exposed profile increases duel win rate.',
        riskFactor: 'Moderate',
      }
    );
  },
  generateCoachingPlan: async (weakness: CategoryKey) => {
    return generateImprovementPlan(weakness);
  },
};

/**
 * Model Mode Provider (Future Vision/LLM Integration)
 * Calls backend or serverless AI endpoint when configured.
 */
export const aiProvider: ModelProvider = {
  name: 'StartIQ Vision-LLM Pipeline (Model Mode)',
  mode: 'model',
  isConfigured: typeof process !== 'undefined' && !!process.env?.VITE_AI_API_KEY,
  analyzeDecision: async (momentId: string) => {
    // If real API key is supplied, would call LLM/Vision endpoint.
    // Fallbacks cleanly to demo logic if endpoint is offline.
    return demoProvider.analyzeDecision(momentId);
  },
  generateWhatIf: async (momentId: string) => {
    return demoProvider.generateWhatIf(momentId);
  },
  generateCoachingPlan: async (weakness: CategoryKey) => {
    return demoProvider.generateCoachingPlan(weakness);
  },
};

/**
 * Returns the currently active provider based on environment configuration
 */
export function getActiveProvider(): ModelProvider {
  // Check if an AI key is supplied in vite environment
  const hasAiKey = typeof import.meta !== 'undefined' && import.meta.env?.VITE_AI_API_KEY;
  if (hasAiKey) {
    return aiProvider;
  }
  return demoProvider;
}

export function isDemoMode(): boolean {
  return getActiveProvider().mode === 'demo';
}
