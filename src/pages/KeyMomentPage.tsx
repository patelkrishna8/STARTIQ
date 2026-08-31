import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Flame,
  Shield,
  HelpCircle,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  Info,
  Award,
  Zap,
} from 'lucide-react';
import { getMatchById, getMatchHistory } from '../lib/stratiq/playerHistory';
import { FeedbackWidget } from '../components/ui/FeedbackWidget';
import { DemoBadge } from '../components/ui/DemoBadge';

export const KeyMomentPage: React.FC = () => {
  const { id, momentId } = useParams<{ id: string; momentId: string }>();
  const navigate = useNavigate();

  const match = getMatchById(id || 'match-05') || getMatchHistory()[0];
  const moment = match?.keyMoments.find((m) => m.id === momentId) || match?.keyMoments[0];
  const analysis = match && moment ? match.decisionAnalyses[moment.id] : undefined;
  const whatIf = match && moment ? match.whatIfAnalyses[moment.id] : undefined;

  if (!match || !moment) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm text-slate-400">Moment analysis not found.</p>
        <Link to={`/matches/${id || 'match-05'}`} className="text-xs text-cyan-400 font-mono hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const currentIndex = match.keyMoments.findIndex((m) => m.id === moment.id);
  const prevMoment = currentIndex > 0 ? match.keyMoments[currentIndex - 1] : null;
  const nextMoment = currentIndex < match.keyMoments.length - 1 ? match.keyMoments[currentIndex + 1] : null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to={`/matches/${match.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Match #{match.matchNumber}</span>
        </Link>

        <DemoBadge />
      </div>

      {/* Moment Header Card */}
      <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {moment.timestamp}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                {moment.situationType || 'Encounter'}
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase">
                Moment {currentIndex + 1} of {match.keyMoments.length}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">{moment.title}</h1>
          </div>

          {/* Decision Score Badge */}
          <div className="flex items-center gap-3 self-start sm:self-auto bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Decision Score</span>
              <span className="text-[11px] font-semibold text-rose-400 font-mono">
                {analysis?.riskAssessment || 'Sub-optimal'}
              </span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-rose-400 bg-rose-950/60 border border-rose-500/40 px-3 py-1 rounded-xl">
              {analysis?.decisionScore || moment.decisionScore || 42}
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </div>
          </div>
        </div>

        {/* Tags & Outcome Strip */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {moment.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">Outcome:</span>
            <span
              className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-lg border capitalize ${
                moment.outcome === 'eliminated'
                  ? 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                  : 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
              }`}
            >
              {moment.outcome}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Part Structured Decision Breakdown */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
          Detailed Decision Breakdown & Context
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {/* 1. What happened? */}
          <div className="bg-[#11141e]/90 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
              01 // What happened? (Situation)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {analysis?.situationExplanation || moment.situation}
            </p>
          </div>

          {/* 2. What did the player decide? */}
          <div className="bg-[#11141e]/90 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              02 // What did the player decide? (Action)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {analysis?.playerDecisionExplanation || moment.playerAction}
            </p>
          </div>

          {/* 3. Why was it risky/bad? */}
          <div className="bg-gradient-to-br from-[#131929] to-[#0c101a] border border-cyan-500/40 rounded-xl p-4 sm:p-5 space-y-2 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>03 // Why was it risky/bad? (Tactical Context)</span>
            </span>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-normal">
              "{analysis?.whyItMattered}"
            </p>
            {analysis?.confidenceNote && (
              <p className="text-[11px] font-mono text-slate-500 pt-1">
                Context note: {analysis.confidenceNote}
              </p>
            )}
          </div>

          {/* 4. What was the consequence? */}
          <div className="bg-[#11141e]/90 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
              04 // What was the consequence? (Result)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {analysis?.outcomeExplanation || `Player resulted in state: ${moment.outcome}`}
            </p>
          </div>
        </div>
      </div>

      {/* "WHAT IF?" COUNTERFACTUAL ANALYSIS SECTION */}
      {whatIf && (
        <div className="bg-gradient-to-b from-[#141b2e] to-[#0d121f] border-2 border-cyan-500/50 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl shadow-cyan-500/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">What If? — Alternative Action</h3>
                <span className="text-[11px] font-mono text-cyan-400">Counterfactual Tactical Simulation</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs self-start sm:self-auto">
              <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                +{whatIf.survivalImprovementPct}% Est. Survival
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                Risk: {whatIf.riskFactor}
              </span>
            </div>
          </div>

          {/* Comparative Split Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Original Decision */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                  Original Decision Taken
                </span>
                <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950 px-2 py-0.5 rounded border border-rose-500/30">
                  Score: {whatIf.originalScore || 42}/100
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{whatIf.originalDecision}</p>
            </div>

            {/* Possible Alternative Action */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Possible Alternative Action
                </span>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  Score: {whatIf.alternativeScore || 88}/100
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                {whatIf.possibleAlternative}
              </p>
            </div>
          </div>

          {/* Expected Difference */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 space-y-2">
            <span className="text-[11px] font-mono uppercase text-cyan-300 font-bold block">
              Expected Tactical Difference
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              "{whatIf.expectedDifference}"
            </p>
            <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
              <strong className="text-slate-300">Tactical Rationale:</strong> {whatIf.tacticalRationale}
            </p>
          </div>

          {/* Caution Notice */}
          <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-tight">
              StartIQ provides counterfactual reasoning based on positional geometry, not guaranteed outcome predictions.
            </p>
          </div>
        </div>
      )}

      {/* User Feedback */}
      <FeedbackWidget momentId={moment.id} matchId={match.id} />

      {/* Pagination Between Key Moments */}
      <div className="flex items-center justify-between pt-2">
        {prevMoment ? (
          <button
            onClick={() => navigate(`/matches/${match.id}/moments/${prevMoment.id}`)}
            className="py-2 px-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Moment ({prevMoment.timestamp})</span>
          </button>
        ) : (
          <div />
        )}

        {nextMoment && (
          <button
            onClick={() => navigate(`/matches/${match.id}/moments/${nextMoment.id}`)}
            className="py-2 px-3.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-bold text-cyan-300 flex items-center gap-1.5 transition-all"
          >
            <span>Next Moment ({nextMoment.timestamp})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
