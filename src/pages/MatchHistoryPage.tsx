import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flame,
  Calendar,
  Clock,
  ChevronRight,
  TrendingUp,
  Target,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { getMatchHistory, resetToDemoState } from '../lib/stratiq/playerHistory';
import { DemoBadge } from '../components/ui/DemoBadge';

export const MatchHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(getMatchHistory());

  const handleReset = () => {
    resetToDemoState();
    setMatches(getMatchHistory());
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-300 bg-emerald-950/70 border-emerald-500/40';
    if (score >= 65) return 'text-cyan-300 bg-cyan-950/70 border-cyan-500/40';
    return 'text-amber-300 bg-amber-950/70 border-amber-500/40';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Match Archives</span>
            <DemoBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Match History</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Chronological log of analyzed Free Fire matches, scores, and tactical focus points.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleReset}
            type="button"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all"
            title="Reset to 5 Seeded Demo Matches"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>
          <Link
            to="/analyze"
            className="py-2 px-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Analyze New</span>
          </Link>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {matches.map((match) => (
          <div
            key={match.id}
            onClick={() => navigate(`/matches/${match.id}`)}
            className="bg-[#11141e]/90 hover:bg-[#151928] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer shadow-sm hover:shadow-lg hover:shadow-cyan-500/5 active:scale-[0.99] space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold bg-slate-900 px-2 py-0.5 rounded text-cyan-400 border border-slate-800">
                    Match #{match.matchNumber < 10 ? '0' + match.matchNumber : match.matchNumber}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    {match.gameName}
                  </span>
                  {match.isDemoData && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                      Demo
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">{match.title}</h3>
              </div>

              {/* Score Badge */}
              <div className="text-right shrink-0">
                <div className={`text-base font-mono font-extrabold px-2.5 py-1 rounded-xl border ${getScoreColor(match.overallScore)}`}>
                  {match.overallScore}
                  <span className="text-[10px] font-normal text-slate-400">/100</span>
                </div>
              </div>
            </div>

            {/* Tactical Focus & Meta */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3 text-slate-400 font-mono text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  {match.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {match.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">
                  Focus: <strong className="text-cyan-300 font-medium">{match.improvementPlan.primaryFocus}</strong>
                </span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
