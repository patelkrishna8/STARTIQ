import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Target,
  Play,
  TrendingUp,
  Flame,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
  Crosshair,
  Footprints,
  Brain,
  Award,
  Zap,
  Activity,
  Sliders,
  AlertTriangle,
  HeartPulse,
  Timer,
  User,
} from 'lucide-react';
import { getMatchHistory, getPlayerProfile } from '../lib/stratiq/playerHistory';
import { DemoBadge } from '../components/ui/DemoBadge';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const matches = getMatchHistory();
  const profile = getPlayerProfile();
  const latestMatch = matches[0];

  const metrics = [
    { label: 'Overall Skill', score: profile.overallAverageScore, icon: Target, color: 'text-cyan-400', bg: 'bg-cyan-500' },
    { label: 'Survival Time', score: 82, icon: HeartPulse, color: 'text-emerald-400', bg: 'bg-emerald-500' },
    { label: 'Movement & Rotations', score: 78, icon: Footprints, color: 'text-blue-400', bg: 'bg-blue-500' },
    { label: 'Aim & Drag Headshot', score: 76, icon: Crosshair, color: 'text-purple-400', bg: 'bg-purple-500' },
    { label: 'Reaction & Response', score: 75, icon: Timer, color: 'text-teal-400', bg: 'bg-teal-500' },
    { label: 'Decision Making', score: 72, icon: Brain, color: 'text-indigo-400', bg: 'bg-indigo-500' },
    { label: 'Combat Trades', score: 68, icon: Flame, color: 'text-rose-400', bg: 'bg-rose-500' },
    { label: 'Positioning & Cover', score: 61, icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Top Banner: Player Overview */}
      <div className="bg-gradient-to-br from-[#121929] via-[#101420] to-[#090b12] border border-cyan-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-xl shadow-cyan-500/20 shrink-0">
              <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center text-cyan-400 font-extrabold text-2xl">
                VF
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{profile.playerName}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  iQOO 15 Gamer
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Primary Title: <strong className="text-amber-400">Free Fire</strong> • Analyzed: {profile.matchesAnalyzed} Matches
              </p>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-3 gap-2 font-mono text-center">
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">Performance</span>
              <span className="text-lg font-bold text-cyan-300">{profile.overallAverageScore}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">Improvement</span>
              <span className="text-lg font-bold text-emerald-400">+{profile.improvementPercentage}%</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block">Streak</span>
              <span className="text-lg font-bold text-amber-400">{profile.improvementStreak}W</span>
            </div>
          </div>
        </div>

        {/* Most Common Mistake & Goal Strip */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">
              <strong className="text-slate-400">Common Flaw:</strong> {profile.mostCommonMistake}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <Target className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">
              <strong className="text-slate-400">Next Focus:</strong> Prioritize cover before shooting
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Link
          to="/analyze"
          className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm flex items-center justify-between shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div className="text-left">
              <span className="block font-bold">Analyze Gameplay</span>
              <span className="text-[11px] font-normal opacity-80">Upload or Capture Session</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/coach"
          className="p-4 rounded-2xl bg-[#11141e] hover:bg-[#151928] border border-cyan-500/40 text-white font-bold text-sm flex items-center justify-between shadow-sm active:scale-98 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Brain className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-bold">AI Coach & Settings</span>
              <span className="text-[11px] font-normal text-slate-400">iQOO 15 DPI & Controls</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-cyan-400" />
        </Link>

        <Link
          to="/progress"
          className="p-4 rounded-2xl bg-[#11141e] hover:bg-[#151928] border border-slate-800 text-white font-bold text-sm flex items-center justify-between shadow-sm active:scale-98 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center border border-slate-800">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block font-bold">Track Progress</span>
              <span className="text-[11px] font-normal text-slate-400">Mistake Reduction Curves</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </Link>
      </div>

      {/* 8 Performance Metrics Cards Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Performance Metrics</h2>
            <DemoBadge />
          </div>
          <span className="text-[11px] font-mono text-cyan-400">Tactical Vector Radar</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="bg-[#11141e]/90 border border-slate-800/80 rounded-2xl p-3.5 space-y-2 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl bg-slate-900 ${m.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-mono font-extrabold text-white">{m.score}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-300 block truncate">{m.label}</span>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className={`${m.bg} h-full rounded-full`} style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Matches Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Recent Analyzed Matches</h2>
          <Link to="/matches" className="text-xs font-mono text-cyan-400 hover:underline">
            View All ({matches.length})
          </Link>
        </div>

        <div className="space-y-3">
          {matches.slice(0, 3).map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/matches/${m.id}`)}
              className="bg-[#11141e]/90 hover:bg-[#151928] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 transition-all cursor-pointer shadow-sm active:scale-[0.99] space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-900 px-2 py-0.5 rounded text-cyan-400 border border-slate-800">
                      Match #{m.matchNumber < 10 ? '0' + m.matchNumber : m.matchNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      {m.gameName}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">
                      Placement: #{m.placement}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{m.title}</h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-base font-mono font-extrabold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-1 rounded-xl block">
                    {m.overallScore}
                    <span className="text-[10px] font-normal text-slate-400">/100</span>
                  </span>
                </div>
              </div>

              {/* Match Stats Strip */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                  <span>Kills: <strong className="text-white">{m.kills}</strong></span>
                  <span>•</span>
                  <span>Mistakes: <strong className="text-rose-400">{m.recurringMistakes.length + 1}x</strong></span>
                  <span>•</span>
                  <span>Key Moments: <strong className="text-cyan-300">{m.keyMoments.length}</strong></span>
                </div>

                <div className="flex items-center gap-1 text-cyan-400 font-sans font-semibold text-xs">
                  <span>View Breakdown</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
