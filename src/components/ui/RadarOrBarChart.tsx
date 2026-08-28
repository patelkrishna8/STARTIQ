import React from 'react';
import { Shield, Crosshair, Footprints, Brain } from 'lucide-react';

interface CategoryScores {
  combat: number;
  positioning: number;
  movement: number;
  decisionMaking: number;
}

interface RadarOrBarChartProps {
  scores: CategoryScores;
  overallScore: number;
  showLabels?: boolean;
}

export const RadarOrBarChart: React.FC<RadarOrBarChartProps> = ({ scores, overallScore, showLabels = true }) => {
  const categories = [
    {
      key: 'combat',
      label: 'Combat Decisions',
      score: scores.combat,
      icon: Crosshair,
      color: 'text-rose-400',
      bg: 'bg-rose-500',
      description: 'Fight timing, peek trades, engagement initiation',
    },
    {
      key: 'positioning',
      label: 'Positioning',
      score: scores.positioning,
      icon: Shield,
      color: 'text-amber-400',
      bg: 'bg-amber-500',
      description: 'Cover utilization, angle safety, exposed surface',
    },
    {
      key: 'movement',
      label: 'Movement',
      score: scores.movement,
      icon: Footprints,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500',
      description: 'Zone rotations, terrain masking, zigzag routes',
    },
    {
      key: 'decisionMaking',
      label: 'Decision Making',
      score: scores.decisionMaking,
      icon: Brain,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500',
      description: 'Drop pacing, third-party assessment, disengagements',
    },
  ];

  const getScoreBadgeColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30';
    if (score >= 65) return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-950/60 border-amber-500/30';
    return 'text-rose-400 bg-rose-950/60 border-rose-500/30';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.key}
              className="bg-[#11141e]/90 border border-slate-800/80 rounded-xl p-3.5 hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-slate-900 ${cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200">{cat.label}</span>
                  </div>
                </div>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${getScoreBadgeColor(cat.score)}`}>
                  {cat.score}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${cat.bg}`}
                  style={{ width: `${Math.min(100, Math.max(5, cat.score))}%` }}
                />
              </div>

              {showLabels && (
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-sans">{cat.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
