import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ArrowRight, Eye, Layout, ShieldAlert } from 'lucide-react';
import { DEFAULT_HUD_RECOMMENDATIONS } from '../../lib/stratiq/settingsEngine';

export const HUDComparisonMockup: React.FC = () => {
  const [hudMode, setHudMode] = useState<'recommended' | 'current'>('recommended');
  const recommendations = DEFAULT_HUD_RECOMMENDATIONS;

  return (
    <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">HUD & Control Layout Optimization</h3>
            <p className="text-xs text-slate-400">Ergonomic button scaling for 6.78" display</p>
          </div>
        </div>

        <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setHudMode('current')}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              hudMode === 'current' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Current HUD (Default)
          </button>
          <button
            onClick={() => setHudMode('recommended')}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              hudMode === 'recommended'
                ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recommended iQOO HUD
          </button>
        </div>
      </div>

      {/* Visual Screen Mockup */}
      <div className="relative w-full aspect-[16/9] max-h-72 bg-gradient-to-br from-[#0c0f18] to-[#080a10] rounded-2xl border-2 border-slate-700/80 overflow-hidden shadow-inner flex flex-col justify-between p-4 sm:p-6 select-none">
        {/* Background Grid Lines & Minimap Simulator */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

        {/* Top Bar: Minimap & Killfeed Simulator */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="w-16 h-16 rounded-full border border-cyan-500/30 bg-slate-950/80 flex items-center justify-center text-[9px] font-mono text-cyan-400 shadow-md">
            <span>Bermuda</span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-lg text-[10px] font-mono text-slate-300">
            <span>Alive: 28 • Kills: 4</span>
          </div>

          <div className="w-14 h-8 rounded-lg border border-slate-800 bg-slate-950/80 flex items-center justify-center text-[9px] font-mono text-slate-400">
            <span>HP 200</span>
          </div>
        </div>

        {/* HUD Center Crosshair */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 border border-cyan-400/40 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-cyan-400 rounded-full" />
          </div>
        </div>

        {/* Interactive Simulated Controls Layer */}
        <div className="relative z-10 flex items-end justify-between">
          {/* Left Controls: Movement Joystick & Gloo Wall Slot */}
          <div className="space-y-3">
            {/* Gloo Wall Slot */}
            <div
              className={`rounded-xl border transition-all flex items-center justify-center text-[10px] font-mono font-bold shadow-lg ${
                hudMode === 'recommended'
                  ? 'w-14 h-14 bg-cyan-500/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40 animate-pulse-subtle'
                  : 'w-10 h-10 bg-slate-900/80 border-slate-700 text-slate-400'
              }`}
            >
              <span>Gloo (58%)</span>
            </div>

            {/* Movement Joystick */}
            <div
              className={`rounded-full border transition-all flex items-center justify-center text-[10px] font-mono shadow-md ${
                hudMode === 'recommended'
                  ? 'w-14 h-14 bg-slate-900/90 border-cyan-500/50 text-cyan-300'
                  : 'w-18 h-18 bg-slate-900/60 border-slate-700 text-slate-400'
              }`}
            >
              <span>Joy ({hudMode === 'recommended' ? '65%' : '85%'})</span>
            </div>
          </div>

          {/* Right Controls: Scope, Jump, and Primary Fire Button */}
          <div className="flex flex-col items-end space-y-2">
            <div
              className={`rounded-xl border transition-all flex items-center justify-center text-[10px] font-mono ${
                hudMode === 'recommended'
                  ? 'w-12 h-12 bg-slate-900/90 border-cyan-500/40 text-cyan-300'
                  : 'w-10 h-10 bg-slate-900/60 border-slate-700 text-slate-400'
              }`}
            >
              <span>Scope</span>
            </div>

            {/* Right Fire Button */}
            <div
              className={`rounded-full border transition-all flex items-center justify-center text-xs font-mono font-bold shadow-2xl ${
                hudMode === 'recommended'
                  ? 'w-18 h-18 bg-gradient-to-tr from-cyan-600 to-blue-500 border-white text-black ring-4 ring-cyan-500/30 scale-105'
                  : 'w-12 h-12 bg-slate-800 border-slate-600 text-slate-300'
              }`}
            >
              <span>Fire {hudMode === 'recommended' ? '52%' : '40%'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Changes Breakdown */}
      <div className="space-y-2.5">
        <span className="text-xs font-mono uppercase text-slate-400 block">Optimized HUD Adjustments</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{rec.label}</span>
                <span className="font-mono text-[11px] text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-500/30">
                  {rec.currentSize}% → {rec.recommendedSize}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{rec.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
