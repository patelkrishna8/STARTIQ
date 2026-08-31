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
  HeartPulse,
  Award,
  Zap,
  Activity,
} from 'lucide-react';
import { getMistakeTrendData, getMatchHistory } from '../lib/stratiq/playerHistory';
import { DemoBadge } from '../components/ui/DemoBadge';

export const ProgressPage: React.FC = () => {
  const trendData = getMistakeTrendData();
  const matches = getMatchHistory();

  const beforeVsAfter = [
    { metric: 'Decision Making', before: 62, current: 78, diff: '+16', icon: Brain, color: 'text-indigo-400', bg: 'bg-indigo-500' },
    { metric: 'Positioning & Cover', before: 55, current: 71, diff: '+16', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500' },
    { metric: 'Combat Trades', before: 68, current: 76, diff: '+8', icon: Zap, color: 'text-rose-400', bg: 'bg-rose-500' },
    { metric: 'Aim & Drag Headshot', before: 65, current: 76, diff: '+11', icon: Crosshair, color: 'text-purple-400', bg: 'bg-purple-500' },
    { metric: 'Survival & Zone Timing', before: 70, current: 82, diff: '+12', icon: HeartPulse, color: 'text-emerald-400', bg: 'bg-emerald-500' },
    { metric: 'Movement Agility', before: 65, current: 78, diff: '+13', icon: Footprints, color: 'text-blue-400', bg: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Multi-Match Analytics</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Progress & Trend Tracking</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Empirical verification of how AI tactical coaching and iQOO 15 settings modify gameplay performance.
        </p>
      </div>

      {/* "Am I Actually Improving?" Before vs After Hero */}
      <div className="bg-gradient-to-br from-[#121929] via-[#101420] to-[#090b12] border border-cyan-500/40 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">"Am I Actually Improving?" — Before vs After</h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                +28% Overall Gain
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing baseline (Match #01) vs latest post-coaching performance (Match #05).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            <span className="text-slate-400">Baseline Score: 58</span>
            <span>→</span>
            <span className="text-cyan-300 font-bold text-sm">Current: 74</span>
          </div>
        </div>

        {/* Before vs After Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {beforeVsAfter.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.metric} className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg bg-slate-900 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-white">{item.metric}</span>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    {item.diff}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Before: <strong className="text-slate-200">{item.before}</strong></span>
                  <span>→</span>
                  <span>Current: <strong className="text-cyan-300 font-bold">{item.current}</strong></span>
                </div>

                {/* Comparative Double Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-slate-600 h-full rounded-full" style={{ width: `${item.before}%` }} />
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className={`${item.bg} h-full rounded-full`} style={{ width: `${item.current}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Trend Card: Positioning Mistake Reduction */}
      <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                50% Error Reduction
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                Demo Data
              </span>
            </div>
            <h2 className="text-base font-bold text-white">Open-Field Exposure Frequency</h2>
            <p className="text-xs text-slate-400">
              Logged mistakes per match following Cover-Priority & Gloo Wall recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl self-start sm:self-auto font-mono text-xs">
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
