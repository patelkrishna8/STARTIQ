import React, { useState } from 'react';
import {
  Brain,
  Sliders,
  AlertTriangle,
  MessageSquare,
  Target,
  Smartphone,
  CheckCircle2,
  Zap,
  TrendingDown,
  Sparkles,
  Award,
  ChevronRight,
  Info,
  Shield,
  Crosshair,
  Flame,
} from 'lucide-react';
import { SensitivityCard } from '../components/ui/SensitivityCard';
import { HUDComparisonMockup } from '../components/ui/HUDComparisonMockup';
import { CoachChatPanel } from '../components/ui/CoachChatPanel';
import { RECURRING_MISTAKES_CATALOG } from '../lib/stratiq/coachService';
import { getPlayerProfile, getMatchHistory } from '../lib/stratiq/playerHistory';
import { DEFAULT_IQOO_DEVICE } from '../lib/stratiq/settingsEngine';
import { DemoBadge } from '../components/ui/DemoBadge';

export const CoachPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'coaching' | 'settings' | 'mistakes' | 'chat'>('coaching');
  const profile = getPlayerProfile();
  const matches = getMatchHistory();
  const latestMatch = matches[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">AI Coaching Hub</span>
            <DemoBadge />
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full">
            Active Student: {profile.playerName}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Coach & Settings</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Personalized tactical diagnosis, recurring pattern mitigation, and device-aware iQOO controls.
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 p-1 bg-slate-900/90 border border-slate-800 rounded-2xl gap-1">
        <button
          onClick={() => setActiveTab('coaching')}
          type="button"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'coaching'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Personalized Coaching</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          type="button"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'settings'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>AI Settings & iQOO</span>
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          type="button"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'mistakes'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Recurring Mistakes</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          type="button"
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'chat'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>AI Coach Chat</span>
        </button>
      </div>

      {/* Tab 1: Personalized Coaching */}
      {activeTab === 'coaching' && (
        <div className="space-y-5">
          {/* Primary Diagnosis Hero */}
          <div className="bg-gradient-to-br from-[#131a2b] to-[#0c101a] border border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl shadow-cyan-500/5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                    Primary Tactical Diagnosis
                  </span>
                  <h2 className="text-lg font-bold text-white">
                    Biggest Recurring Weakness: Over-Aggressive Combat & Open Exposure
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/40 shrink-0">
                Severity: High
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Based on analyzing your last {matches.length} Free Fire matches, your mechanical gunplay and zigzag rotation speed (78/100) are solid, but your combat initiation stance (61/100) creates high vulnerability. You engage enemies from open ground before establishing cover.
            </p>
          </div>

          {/* 5-Pillar Structured Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. What You Are Doing Wrong */}
            <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>01 // What You Are Doing Wrong</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Opening fire the exact millisecond an enemy appears on screen while standing in wide-open fields, rather than sliding behind an adjacent rock or placing a Gloo Wall first.
              </p>
            </div>

            {/* 2. Why It Happens */}
            <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>02 // Why It Happens</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trigger urgency: You rely on out-aiming opponents in raw 50/50 spray duels rather than utilizing asymmetric peek angles to control the gunfight.
              </p>
            </div>

            {/* 3. What You Should Practice */}
            <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>03 // What You Should Practice</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                180° flick-deploy Gloo Wall drills in Training Grounds. Make it second nature to place cover before firing your first AR burst.
              </p>
            </div>

            {/* 4. What Settings May Help */}
            <div className="bg-[#11141e] border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>04 // What Settings May Help</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Scale your Gloo Wall quick-slot to 58% and configure iQOO 15 480 DPI with General Sensitivity 92 for faster drag-flick recovery.
              </p>
            </div>
          </div>

          {/* 5. Focus For Next Match */}
          <div className="bg-gradient-to-r from-[#111b2b] to-[#0c121e] border-2 border-cyan-500/40 rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">05 // Focus For Next Match</h3>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              "{latestMatch.improvementPlan.nextMatchGoal}"
            </div>

            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-slate-400">Match Checklist:</span>
              <div className="space-y-1.5">
                {[
                  'Avoid unnecessary open-field fights without a designated escape rock/wall.',
                  'Use hard cover or instant Gloo Wall before pushing aggressive angles.',
                  'Wait for opponent reload or third-party crossfire before committing to close-quarters duels.',
                  'Focus on controlled movement and break line-of-sight during zone rotations.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI Settings & iQOO Device Profile */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Detected Device Card */}
          <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center text-cyan-400">
                    <Smartphone className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">Detected Device: {DEFAULT_IQOO_DEVICE.deviceModel}</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      Calibrated
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">High-refresh esports hardware profile</p>
                </div>
              </div>

              <div className="text-left sm:text-right bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl font-mono text-xs">
                <span className="text-slate-400 text-[10px] block">Recommended DPI</span>
                <span className="text-cyan-300 font-extrabold text-sm">{DEFAULT_IQOO_DEVICE.recommendedDPI} DPI</span>
                <span className="text-[9px] text-slate-500 block">(Default: {DEFAULT_IQOO_DEVICE.standardDPI})</span>
              </div>
            </div>

            {/* Hardware Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 text-[10px] block">Display:</span>
                <span className="text-slate-200">{DEFAULT_IQOO_DEVICE.displayResolution}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Touch Sampling:</span>
                <span className="text-cyan-300">{DEFAULT_IQOO_DEVICE.touchSamplingRate}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Chipset:</span>
                <span className="text-slate-200">Snapdragon 8 Elite</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Profile:</span>
                <span className="text-emerald-300">{DEFAULT_IQOO_DEVICE.gamingPerformanceProfile}</span>
              </div>
            </div>
          </div>

          {/* AI Sensitivity Card */}
          <SensitivityCard initialStyle={profile.preferredPlayStyle} />

          {/* HUD Comparison Mockup */}
          <HUDComparisonMockup />

          {/* Safety Notice */}
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300">Safety & Anti-Cheat Compliance:</strong> StratIQ recommendations are completely non-invasive. The application never modifies Free Fire game files, memory, or device settings automatically. Settings are applied manually by the player.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Recurring Mistakes Tracker */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-2">
            <h2 className="text-base font-bold text-white">Cross-Match Mistake Memory</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              StratIQ continuously indexes your match archives to track recurring tactical errors and verify whether you are correcting them across sessions.
            </p>
          </div>

          <div className="space-y-3">
            {RECURRING_MISTAKES_CATALOG.map((m) => (
              <div
                key={m.id}
                className="bg-[#11141e]/90 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-cyan-500/40 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{m.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
                        {m.matchPercentage}% of Matches
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      Detected in {m.occurrences} of the last {m.matchCount} matches
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                      {m.trendLabel}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>

                {/* Recommended Improvement & Drill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                      Recommended Fix
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{m.recommendedImprovement}</p>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                      Practice Drill
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{m.recommendedDrill}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: AI Coach Chat */}
      {activeTab === 'chat' && <CoachChatPanel />}
    </div>
  );
};
