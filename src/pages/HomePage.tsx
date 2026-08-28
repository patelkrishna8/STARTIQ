import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Play, TrendingUp, Flame, Shield, Sparkles, ArrowRight, CheckCircle, Clock, ChevronRight } from 'lucide-react';
import { DemoBadge } from '../components/ui/DemoBadge';

export const HomePage: React.FC = () => {
  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire',
      genre: 'Battle Royale',
      status: 'supported',
      desc: 'Full post-match decision analysis, counterfactual What-Ifs, and positioning metrics.',
    },
    {
      id: 'bgmi',
      name: 'BGMI',
      genre: 'Battle Royale',
      status: 'coming-soon',
      desc: 'Krafton HUD classifier & zone rotation modeling.',
    },
    {
      id: 'valorant',
      name: 'Valorant',
      genre: 'Tactical FPS',
      status: 'coming-soon',
      desc: 'First-person crosshair & utility trade analysis.',
    },
    {
      id: 'cod',
      name: 'Call of Duty',
      genre: 'Action FPS',
      status: 'coming-soon',
      desc: 'CQB slide-cancel & gunfight pacing evaluation.',
    },
  ];

  const steps = [
    { label: 'Gameplay', sub: 'Upload or Capture' },
    { label: 'Analyze', sub: 'Event Extraction' },
    { label: 'Understand', sub: 'Decision Reasoning' },
    { label: 'Recommend', sub: '"What If?" Actions' },
    { label: 'Track', sub: 'Recurring Patterns' },
    { label: 'Improve', sub: 'Targeted Goals' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-2">
        <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-slate-300 font-mono">
          <Target className="w-4 h-4 text-cyan-400" />
          <span>STRATIQ // AI GAMING COACH</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Turn Every Match <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Into a Lesson.
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Analyze gameplay footage to identify key decision-making moments, explain tactical mistakes, suggest counterfactual alternatives, and track recurring patterns across matches.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/analyze"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-98 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Analyze Gameplay</span>
          </Link>
          <Link
            to="/progress"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 text-slate-200 font-semibold text-sm transition-all"
          >
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>View Progress</span>
          </Link>
        </div>
      </div>

      {/* Demo Mode Notice Box */}
      <div className="bg-[#11141e]/95 border border-cyan-500/20 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <DemoBadge />
              <span className="text-xs font-semibold text-white">Deterministic Evaluation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Demo Mode uses sample analysis data and deterministic heuristic verification when a real AI/vision model is not connected.
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <span>Architecture & Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Core Flow Pipeline Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Analysis Methodology</h2>
          <span className="text-[11px] font-mono text-cyan-400">Post-Match Loop</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className="bg-slate-900/60 border border-slate-800/70 rounded-xl p-2.5 text-center flex flex-col justify-center"
            >
              <div className="text-[10px] font-mono text-cyan-400/80 mb-0.5">0{idx + 1}</div>
              <div className="text-xs font-bold text-slate-200">{step.label}</div>
              <div className="text-[10px] text-slate-500 truncate">{step.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Games Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">Supported Games</h2>
          <span className="text-[11px] font-mono text-emerald-400">Free Fire First</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {games.map((g) => {
            const isSupported = g.status === 'supported';
            return (
              <div
                key={g.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isSupported
                    ? 'bg-gradient-to-b from-[#141824] to-[#0e111a] border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-[#0d0f17]/60 border-slate-800/50 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSupported
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{g.name}</h3>
                      <span className="text-[11px] text-slate-400">{g.genre}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                      isSupported
                        ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
                    }`}
                  >
                    {isSupported ? 'Supported' : 'Coming Soon'}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">{g.desc}</p>

                {isSupported ? (
                  <Link
                    to="/analyze"
                    className="w-full py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Start Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-600 text-xs font-mono cursor-not-allowed text-center"
                  >
                    Planned in Multi-Game Phase
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
