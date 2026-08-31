import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Clock,
  Calendar,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Target,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Crosshair,
  Footprints,
  Brain,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { getMatchById, getMatchHistory } from '../lib/stratiq/playerHistory';
import { RadarOrBarChart } from '../components/ui/RadarOrBarChart';
import { DemoBadge } from '../components/ui/DemoBadge';

export const MatchDashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const match = getMatchById(id || 'match-05') || getMatchHistory()[0];

  if (!match) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm text-slate-400">Match analysis not found.</p>
        <Link to="/matches" className="text-xs text-cyan-400 font-mono hover:underline">
          Return to Match History
        </Link>
      </div>
    );
  }

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'High':
        return 'bg-rose-950/70 border-rose-500/40 text-rose-300';
      case 'Medium':
        return 'bg-amber-950/70 border-amber-500/40 text-amber-300';
      default:
        return 'bg-slate-800/80 border-slate-700 text-slate-300';
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'eliminated':
        return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
      case 'survived':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
      case 'disengaged':
        return 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30';
      default:
        return 'text-slate-400 bg-slate-800 border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/matches"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 font-mono transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Match Archives</span>
        </Link>

        <div className="flex items-center gap-2">
          <DemoBadge />
        </div>
      </div>

      {/* Match Overview Header Card */}
      <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Match #{match.matchNumber < 10 ? '0' + match.matchNumber : match.matchNumber}
              </span>
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Free Fire Match Analysis
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                Placement: #{match.placement || 2}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">{match.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                {match.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {match.duration}
              </span>
              <span>•</span>
              <span>Kills: <strong className="text-white">{match.kills || 5}</strong></span>
              {match.isDemoData && (
                <>
                  <span>•</span>
                  <span className="text-amber-400/90 font-medium">Sample Analysis — Demo Mode</span>
                </>
              )}
            </div>
          </div>

          {/* Big Score Gauge */}
          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-900/90 border border-slate-800 px-4 py-3 rounded-2xl">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Overall Score</span>
              <span className="text-xs font-semibold text-cyan-400 font-mono">Performance Benchmark</span>
            </div>
            <div className="text-3xl font-extrabold font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 rounded-xl">
              {match.overallScore}
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Category Scores</h2>
          <span className="text-[11px] font-mono text-slate-500">Free Fire Tactical Vector</span>
        </div>
        <RadarOrBarChart scores={match.categoryScores} overallScore={match.overallScore} />
      </div>

      {/* Next Match Goal & Improvement Recommendation */}
      <div className="bg-gradient-to-r from-[#141b2b] to-[#0f1422] border border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg shadow-cyan-500/5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400">Primary Focus</span>
              <h3 className="text-base font-bold text-white">{match.improvementPlan.primaryFocus}</h3>
            </div>
          </div>

          <Link
            to="/coach"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors"
          >
            <span>Open AI Coach Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>Next Match Goal:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed pl-5">
            "{match.improvementPlan.nextMatchGoal}"
          </p>
          <p className="text-[11px] text-slate-400 pl-5 leading-relaxed">
            <strong className="text-slate-300">Reason:</strong> {match.improvementPlan.reason}
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-[11px] font-mono uppercase text-slate-400">Training Action Items:</span>
          <div className="space-y-1.5">
            {match.improvementPlan.trainingGoals.map((goal, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Moments Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Key Moments & Decision Points ({match.keyMoments.length})
          </h2>
          <span className="text-[11px] font-mono text-cyan-400">Tap to inspect "What If?"</span>
        </div>

        <div className="space-y-3">
          {match.keyMoments.map((moment) => (
            <div
              key={moment.id}
              onClick={() => navigate(`/matches/${match.id}/moments/${moment.id}`)}
              className="bg-[#11141e]/90 hover:bg-[#151928] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-cyan-500/5 active:scale-[0.99] space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-md">
                    {moment.timestamp}
                  </span>
                  <h3 className="text-sm font-bold text-white">{moment.title}</h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${getImportanceBadge(moment.importance)}`}>
                    {moment.importance} Severity
                  </span>
                </div>
              </div>

              {/* Situation & Action */}
              <div className="space-y-1.5 text-xs">
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Situation:</strong> {moment.situation}
                </p>
                <p className="text-slate-400 leading-relaxed">
                  <strong className="text-slate-300">Player Action:</strong> {moment.playerAction}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border capitalize ${getOutcomeBadge(moment.outcome)}`}>
                    Outcome: {moment.outcome}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    Decision: {moment.decisionScore || 42}/100
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                  <span>View Decision & "What If?"</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recurring Mistakes Section */}
      <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Recurring Mistakes Detected</h2>
          <Link to="/coach" className="text-xs font-mono text-cyan-400 hover:underline">
            View AI Coach Memory
          </Link>
        </div>

        <div className="space-y-2">
          {match.recurringMistakes.map((mistake, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{mistake.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30 capitalize">
                    {mistake.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{mistake.description}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
                  {mistake.count}x
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
