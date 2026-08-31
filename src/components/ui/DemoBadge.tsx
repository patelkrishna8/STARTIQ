import React, { useState } from 'react';
import { Sparkles, Info, X } from 'lucide-react';
import { isDemoMode } from '../../lib/stratiq/modelProvider';

interface DemoBadgeProps {
  variant?: 'pill' | 'subtle' | 'compact';
  className?: string;
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ variant = 'pill', className = '' }) => {
  const [showModal, setShowModal] = useState(false);
  const demo = isDemoMode();

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        type="button"
        className={`inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-wide transition-all rounded-full px-2.5 py-1 ${
          demo
            ? 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60 hover:border-cyan-400'
            : 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
        } ${className}`}
        title="Click to view Demo Mode explanation"
      >
        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${demo ? 'bg-cyan-400' : 'bg-emerald-400'}`} />
        <span>{demo ? 'DEMO MODE' : 'MODEL MODE'}</span>
        <Info className="w-3 h-3 opacity-70" />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/50"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Demo Mode Active</h3>
                <p className="text-xs font-mono text-cyan-400">Deterministic Sample Pipeline</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-white">StartIQ Demo Mode</strong> utilizes sample analysis heuristics and pre-validated tactical models when a live AI/vision model endpoint is not connected.
              </p>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Detection:</span>
                  <span className="text-cyan-300">Deterministic Heuristic</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Processing:</span>
                  <span className="text-cyan-300">Simulated 6-Stage Telemetry</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Supported Game:</span>
                  <span className="text-emerald-300 font-semibold">Free Fire MVP</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                In a production deployment, this pipeline transitions to an on-device/cloud hybrid computer vision engine without changing the UX.
              </p>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-xl text-sm transition-all"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
