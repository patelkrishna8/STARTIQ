import React, { useState } from 'react';
import {
  User,
  Shield,
  Footprints,
  Crosshair,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Info,
  Flame,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { getPlayerProfile, resetToDemoState } from '../lib/stratiq/playerHistory';
import { DemoBadge } from '../components/ui/DemoBadge';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState(getPlayerProfile());
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const handleResetData = () => {
    resetToDemoState();
    setProfile(getPlayerProfile());
    setShowResetSuccess(true);
    setTimeout(() => setShowResetSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Player Insights</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Personalized Decision Profile</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Synthesized decision strengths, recurring blind spots, and current training priorities.
        </p>
      </div>

      {/* Main Profile Identity Card */}
      <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0d0f17] rounded-[14px] flex items-center justify-center text-cyan-400 font-extrabold text-xl">
                VF
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{profile.playerName}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Guest Demo
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Primary Game: <strong className="text-amber-400">Free Fire</strong> • Analyzed Matches: {profile.matchesAnalyzed}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-xl self-start sm:self-auto">
            <span className="text-slate-400">Career Average:</span>
            <span className="text-cyan-300 font-bold text-sm">{profile.overallAverageScore} / 100</span>
          </div>
        </div>

        {/* Tactical Strengths & Weaknesses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Strongest Area */}
          <div className="bg-gradient-to-b from-[#111927] to-[#0c121e] border border-emerald-500/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Strongest Tactical Area</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                Score: {profile.strongestArea.score}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{profile.strongestArea.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Effective line-of-sight breaking and zone contour traversal during mid-to-late circle transitions.
            </p>
          </div>

          {/* Recurring Weakness */}
          <div className="bg-gradient-to-b from-[#221215] to-[#12080a] border border-amber-500/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Recurring Weakness</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                {profile.recurringWeakness.mistakeCount}x Last Match
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{profile.recurringWeakness.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {profile.recurringWeakness.description}
            </p>
          </div>
        </div>

        {/* Current Focus Banner */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-cyan-500/20 space-y-1">
          <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Current Focus Target</span>
          <p className="text-xs sm:text-sm text-slate-200 font-medium">"{profile.currentFocus}"</p>
        </div>
      </div>

      {/* Demo State & Data Management */}
      <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Guest Session & Privacy Management</h3>
            <p className="text-xs text-slate-400">Manage locally cached match history and feedback telemetry</p>
          </div>
        </div>

        {showResetSuccess && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Demo data successfully reset to default 5 Free Fire benchmark matches.</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleResetData}
            type="button"
            className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Matches (Seed Data)</span>
          </button>
          <button
            onClick={handleResetData}
            type="button"
            className="py-2.5 px-4 rounded-xl bg-rose-950/40 border border-rose-500/30 hover:border-rose-500/60 text-xs font-semibold text-rose-300 flex items-center justify-center gap-2 transition-all active:scale-98"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Uploaded Gameplay Data</span>
          </button>
        </div>
      </div>

      {/* Profile Disclaimer Note */}
      <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Methodology Note:</strong> Decision profiles are calculated from stored match analyses and observable event frequencies. They represent empirical gameplay records rather than speculative black-box predictions.
        </p>
      </div>
    </div>
  );
};
