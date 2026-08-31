import React, { useState } from 'react';
import { Sliders, Sparkles, Smartphone, ShieldCheck, Zap, Info } from 'lucide-react';
import { OptimizationStyle, SensitivitySettings } from '../../lib/stratiq/types';
import { getSensitivityForStyle, DEFAULT_IQOO_DEVICE } from '../../lib/stratiq/settingsEngine';

interface SensitivityCardProps {
  initialStyle?: OptimizationStyle;
  onStyleChange?: (style: OptimizationStyle) => void;
}

export const SensitivityCard: React.FC<SensitivityCardProps> = ({
  initialStyle = 'Headshot',
  onStyleChange,
}) => {
  const [activeStyle, setActiveStyle] = useState<OptimizationStyle>(initialStyle);
  const settings = getSensitivityForStyle(activeStyle);

  const handleStyleSelect = (style: OptimizationStyle) => {
    setActiveStyle(style);
    if (onStyleChange) onStyleChange(style);
  };

  const sliders = [
    { label: 'General', value: settings.general, desc: 'Camera & hip-fire drag sensitivity' },
    { label: 'Red Dot', value: settings.redDot, desc: 'Non-scoped close-range tracking' },
    { label: '2x Scope', value: settings.scope2x, desc: 'Mid-range burst tap accuracy' },
    { label: '4x Scope', value: settings.scope4x, desc: 'Long-range AR spray control' },
    { label: 'Sniper Scope', value: settings.sniper, desc: 'AWM / Kar98k flick precision' },
    { label: 'Free Look', value: settings.freeLook, desc: 'Surrounding situational awareness eye' },
  ];

  return (
    <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
      {/* Header with Style Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">AI Sensitivity Recommendation</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Demo Values
              </span>
            </div>
            <p className="text-xs text-slate-400">Calibrated for {DEFAULT_IQOO_DEVICE.deviceModel} 144Hz panel</p>
          </div>
        </div>

        {/* Style Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start sm:self-auto">
          {(['Headshot', 'Balanced', 'Rush'] as OptimizationStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => handleStyleSelect(style)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeStyle === style
                  ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Rationale Banner */}
      <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-bold text-cyan-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeStyle} Profile Rationale</span>
          </span>
          <span className="font-mono text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
            DPI: {settings.recommendedDPI} (Std: 440)
          </span>
        </div>
        <p className="text-slate-400 leading-relaxed text-[11px] pt-0.5">{settings.rationale}</p>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {sliders.map((s) => (
          <div key={s.label} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{s.label}</span>
              <span className="font-mono font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {s.value}
              </span>
            </div>
            {/* Range Track Bar */}
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${s.value}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-500 font-sans">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Manual Application Notice */}
      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-tight">
          StratIQ recommends these values based on your gameplay profile. Manually apply them inside <em>Free Fire &gt; Settings &gt; Sensitivity</em>.
        </p>
      </div>
    </div>
  );
};
