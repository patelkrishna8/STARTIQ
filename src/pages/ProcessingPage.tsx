import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Crosshair,
  Shield,
  Activity,
  Film,
} from 'lucide-react';
import { VideoMetadata, MatchAnalysis } from '../lib/stratiq/types';
import { extractKeyMoments } from '../lib/stratiq/eventExtraction';
import { getDecisionAnalyses } from '../lib/stratiq/decisionAnalysis';
import { getWhatIfAnalyses } from '../lib/stratiq/whatIfAnalysis';
import { generateImprovementPlan } from '../lib/stratiq/coaching';
import { saveNewMatchAnalysis, getMatchHistory } from '../lib/stratiq/playerHistory';
import { DemoBadge } from '../components/ui/DemoBadge';

export const ProcessingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const videoMetadata: VideoMetadata | undefined = location.state?.videoMetadata;

  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [progressPercent, setProgressPercent] = useState(10);
  const [generatedMatchId, setGeneratedMatchId] = useState<string | null>(null);

  const stages = [
    { id: 1, title: 'Processing gameplay', desc: 'Decoding video stream and normalizing framerate', durationMs: 700 },
    { id: 2, title: 'Sampling relevant frames / segments', desc: 'Isolating engagement zones and combat encounters', durationMs: 800 },
    { id: 3, title: 'Identifying gameplay events', desc: 'Detecting kill feed, Gloo Wall placements, and health drops', durationMs: 900 },
    { id: 4, title: 'Finding key moments', desc: 'Pinpointing critical decision pivots and exposed positions', durationMs: 800 },
    { id: 5, title: 'Analyzing player decisions', desc: 'Evaluating cover geometry, crosshair stance, and timing', durationMs: 900 },
    { id: 6, title: 'Generating recommendations', desc: 'Formulating counterfactual What-Ifs and Next Match Goal', durationMs: 700 },
  ];

  useEffect(() => {
    let timeoutId: any;
    let stage = 0;

    const runStages = (idx: number) => {
      if (idx >= stages.length) {
        // Complete processing and save match analysis
        const history = getMatchHistory();
        const nextMatchNum = history.length + 1;
        const newMatchId = `match-0${nextMatchNum}`;

        const newMatch: MatchAnalysis = {
          id: newMatchId,
          matchNumber: nextMatchNum,
          gameId: 'free-fire',
          gameName: 'Free Fire',
          title: `Free Fire Session #${nextMatchNum} — Bermuda`,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          duration: videoMetadata ? `${Math.floor(videoMetadata.duration / 60)}m ${videoMetadata.duration % 60}s` : '8m 42s',
          videoMetadata,
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
          keyMoments: extractKeyMoments(videoMetadata),
          decisionAnalyses: getDecisionAnalyses(),
          whatIfAnalyses: getWhatIfAnalyses(),
          improvementPlan: generateImprovementPlan('positioning'),
          recurringMistakes: [
            {
              title: 'Open Field Exposure',
              count: 4,
              category: 'positioning',
              description: 'Initiating engagements without accessible permanent cover or Gloo Wall readiness.',
            },
            {
              title: 'Chokepoint Utility Deficit',
              count: 2,
              category: 'combat',
              description: 'Breaching staircases without flash or grenade preparation.',
            },
          ],
          isDemoData: true,
        };

        saveNewMatchAnalysis(newMatch);
        setGeneratedMatchId(newMatchId);
        setProgressPercent(100);
        return;
      }

      setCurrentStageIndex(idx);
      setProgressPercent(Math.round(((idx + 1) / stages.length) * 95));

      timeoutId = setTimeout(() => {
        setCompletedStages((prev) => [...prev, idx]);
        runStages(idx + 1);
      }, stages[idx].durationMs);
    };

    runStages(0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleViewDashboard = () => {
    if (generatedMatchId) {
      navigate(`/matches/${generatedMatchId}`);
    } else {
      navigate('/matches/match-05');
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="space-y-1.5 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <DemoBadge />
          <span className="text-xs font-mono text-cyan-400">Pipeline Stage 04</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {generatedMatchId ? 'Analysis Complete' : 'Analyzing Gameplay'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {generatedMatchId
            ? 'Session moments categorized and counterfactual recommendations generated.'
            : 'Extracting combat geometry, movement vectors, and cover utilization.'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg shadow-cyan-500/5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Telemetry Pipeline Progress</span>
          </span>
          <span className="text-cyan-400 font-bold">{progressPercent}%</span>
        </div>

        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>File: {videoMetadata?.name || 'freefire_bermuda_session.mp4'}</span>
          <span>Target: Free Fire</span>
        </div>
      </div>

      {/* 6 Staged Execution List */}
      <div className="space-y-2 bg-[#11141e]/90 border border-slate-800/80 rounded-2xl p-4 sm:p-5">
        {stages.map((stage, idx) => {
          const isDone = completedStages.includes(idx) || generatedMatchId !== null;
          const isCurrent = currentStageIndex === idx && !generatedMatchId;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border transition-all flex items-start gap-3 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[9px] font-mono">
                    {stage.id}
                  </div>
                )}
              </div>

              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isCurrent ? 'text-cyan-300 font-bold' : ''}`}>
                    {stage.id}. {stage.title}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-cyan-400 animate-pulse">Processing...</span>
                  )}
                  {isDone && <span className="text-[10px] font-mono text-emerald-400">Done</span>}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Action */}
      {generatedMatchId ? (
        <button
          onClick={handleViewDashboard}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-98 transition-all animate-bounce"
        >
          <span>Open Match Analysis Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <div className="text-center">
          <span className="text-[11px] font-mono text-slate-500">
            Demo Mode — simulated analysis pipeline
          </span>
        </div>
      )}
    </div>
  );
};
