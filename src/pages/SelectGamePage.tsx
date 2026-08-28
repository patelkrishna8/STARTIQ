import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Shield, Crosshair, Swords, ChevronRight, Lock } from 'lucide-react';
import { DemoBadge } from '../components/ui/DemoBadge';

export const SelectGamePage: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'free-fire',
      name: 'Free Fire (Garena)',
      platform: 'Mobile / Android / iOS',
      icon: Flame,
      status: 'supported',
      features: ['Bermuda & Purgatory Analysis', 'Gloo Wall & Cover Metrics', 'What-If Counterfactuals'],
    },
    {
      id: 'bgmi',
      name: 'BGMI (Battlegrounds Mobile India)',
      platform: 'Mobile',
      icon: Shield,
      status: 'coming-soon',
      features: ['Erangel/Livik Rotations', 'Recoil Control Diagnostics', 'Zone Edge Positioning'],
    },
    {
      id: 'valorant',
      name: 'Valorant (Riot Games)',
      platform: 'PC / Console',
      icon: Crosshair,
      status: 'coming-soon',
      features: ['Crosshair Height Tracking', 'Ability Trade Efficiency', 'Site Retake Timing'],
    },
    {
      id: 'cod',
      name: 'Call of Duty: Mobile',
      platform: 'Mobile',
      icon: Swords,
      status: 'coming-soon',
      features: ['Slide-Cancel Movement', 'Spawn Flip Prediction', 'Gunsmith TTK Analysis'],
    },
  ];

  const handleSelectGame = (gameId: string) => {
    if (gameId === 'free-fire') {
      navigate('/analyze/input', { state: { selectedGame: 'free-fire' } });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Step 01 // Input Setup</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Select Game</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Choose the competitive title to analyze. Free Fire is supported in the current MVP.
        </p>
      </div>

      {/* Game Cards */}
      <div className="space-y-3">
        {games.map((g) => {
          const isSupported = g.status === 'supported';
          const Icon = g.icon;

          return (
            <div
              key={g.id}
              onClick={() => isSupported && handleSelectGame(g.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isSupported
                  ? 'bg-gradient-to-r from-[#141824] to-[#0e111a] border-cyan-500/50 hover:border-cyan-400 shadow-lg shadow-cyan-500/10 cursor-pointer active:scale-[0.99]'
                  : 'bg-[#0b0d14]/70 border-slate-800/60 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSupported
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">{g.name}</h3>
                      {isSupported ? (
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{g.platform}</p>
                  </div>
                </div>

                {isSupported ? (
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="text-slate-600">
                    <Lock className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Feature pills */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                {g.features.map((f, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
