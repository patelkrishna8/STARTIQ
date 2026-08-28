import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Crosshair,
  Footprints,
  Brain,
  Sparkles,
  ArrowRight,
  Info,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { getMistakeTrendData, getMatchHistory } from '../lib/stratiq/playerHistory';
import { DemoBadge } from '../components/ui/DemoBadge';

export const ProgressPage: React.FC = () => {
  const trendData = getMistakeTrendData();
  const matches = getMatchHistory();

  const categoryAverages = {
    combat: Math.round(matches.reduce((acc, m) => acc + m.categoryScores.combat, 0) / matches.length),
    positioning: Math.round(matches.reduce((acc, m) => acc + m.categoryScores.positioning, 0) / matches.length),
    movement: Math.round(matches.reduce((acc, m) => acc + m.categoryScores.movement, 0) / matches.length),
    decisionMaking: Math.round(matches.reduce((acc, m) => acc + m.categoryScores.decisionMaking, 0) / matches.length),
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Pattern Tracking</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Progress & Trend Analysis</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Tracking how tactical recommendations alter decision patterns and reduce mistakes across matches.
        </p>
      </div>

      {/* Featured Trend Card: Positioning Mistake Reduction */}
      <div className="bg-gradient-to-br from-[#111927] to-[#0d121c] border border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl shadow-cyan-500/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                50% Mistake Reduction
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Demo Data
              </span>
            </div>
            <h2 className="text-lg font-bold text-white">Open Field Positioning Errors</h2>
            <p className="text-xs text-slate-400">
              Evolution of exposed engagement mistakes following Cover-Priority recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl self-start sm:self-auto font-mono text-xs">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300">Trend: 8 → 4 Mistakes</span>
          </div>
        </div>

        {/* Visual Step-by-Step Trend Graph */}
        <div className="bg-slate-950/80 p-4 sm:p-5 rounded-xl border border-slate-800/80 space-y-4">
          <div className="grid grid-cols-5 gap-2 text-center">
            {trendData.slice(0, 5).map((point, index) => {
              const maxMistakes = 8;
              const heightPercent = Math.max(25, (point.mistakes / maxMistakes) * 100);
              const isLatest = index === trendData.length - 1;

              return (
                <div key={point.matchId} className="flex flex-col items-center justify-end h-40 group">
                  <span
                    className={`text-xs font-mono font-bold mb-1.5 transition-colors ${
                      isLatest ? 'text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    {point.mistakes} errors
                  </span>

                  {/* Vertical Bar */}
                  <div className="w-full max-w-[40px] bg-slate-900 rounded-t-lg overflow-hidden h-28 flex items-end p-0.5 border border-slate-800">
                    <div
                      className={`w-full rounded-t transition-all duration-700 ease-out ${
                        isLatest
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                          : 'bg-gradient-to-t from-cyan-600 to-blue-400 opacity-80'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 mt-2 font-medium">
                    {point.matchLabel}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    Score: {point.score}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Match 1 (Baseline): 8 mistakes</span>
            <span className="text-emerald-400 font-bold">Match 5 (Current): 4 mistakes (-50%)</span>
          </div>
        </div>

        {/* Tactical Explanation Loop */}
        <div className="bg-[#11141e] p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
            Behavioral Modification Loop
          </span>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Following consecutive recommendations to deploy Gloo Wall micro-cover before opening fire, open-field exposure errors dropped steadily across 5 logged matches.
          </p>
        </div>
      </div>

      {/* Category Performance Trends */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Category Score Evolution
          </h2>
          <span className="text-[10px] font-mono text-slate-500">5-Match Running Mean</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Movement */}
          <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Movement & Rotations</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">78 / 100</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-[11px] text-slate-400">
              Consistently high score due to terrain masking and safe circle rotation timing.
            </p>
          </div>

          {/* Decision Making */}
          <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white">Decision Making</span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">72 / 100</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-[11px] text-slate-400">
              Improved patience when assessing contested airdrop zones and third-party setups.
            </p>
          </div>

          {/* Combat Decisions */}
          <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-white">Combat Decisions</span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400">68 / 100</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-[11px] text-slate-400">
              Steadily rising as utility (flash/frag) usage increases before staircase pushes.
            </p>
          </div>

          {/* Positioning */}
          <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white">Positioning</span>
              </div>
              <span className="text-xs font-mono font-bold text-amber-400">61 / 100</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '61%' }} />
            </div>
            <p className="text-[11px] text-slate-400">
              Primary target area; improved from 48 (Match 1) to 61 (Match 5).
            </p>
          </div>
        </div>
      </div>

      {/* Demo Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Data Transparency:</strong> These figures represent deterministic demo trend benchmarks demonstrating the StratIQ feedback loop. No guaranteed skill improvement is claimed.
        </p>
      </div>
    </div>
  );
};
