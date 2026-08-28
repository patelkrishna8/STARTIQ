import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  ArrowRight,
  RefreshCw,
  Info,
  CheckCircle2,
  XCircle,
  Cpu,
  Layers,
} from 'lucide-react';
import { detectGame } from '../lib/stratiq/gameDetection';
import { GameDetectionResult, VideoMetadata } from '../lib/stratiq/types';
import { DemoBadge } from '../components/ui/DemoBadge';

export const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedGame = location.state?.selectedGame || 'free-fire';
  const videoMetadata: VideoMetadata | undefined = location.state?.videoMetadata;

  const [isVerifying, setIsVerifying] = useState(true);
  const [result, setResult] = useState<GameDetectionResult | null>(null);

  useEffect(() => {
    if (!videoMetadata) {
      navigate('/analyze/input');
      return;
    }

    let isMounted = true;
    setIsVerifying(true);

    detectGame(videoMetadata, selectedGame)
      .then((res) => {
        if (isMounted) {
          setResult(res);
          setIsVerifying(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setIsVerifying(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [videoMetadata, selectedGame, navigate]);

  const handleContinue = () => {
    if (!result || !result.isMatch) return;
    navigate('/analyze/processing', {
      state: {
        selectedGame,
        videoMetadata,
        verificationResult: result,
      },
    });
  };

  if (!videoMetadata) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Step 03 // Verification</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Game Verification</h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Verifying video stream to ensure HUD markers and gameplay match Free Fire specifications.
        </p>
      </div>

      {isVerifying ? (
        /* Verification in Progress */
        <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
            <Cpu className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Analyzing Video Signature...</h3>
            <p className="text-xs font-mono text-cyan-400">Inspecting HUD layout & spatial geometry</p>
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Checking minimap placement, Gloo Wall interface, and health bar configuration.
          </p>
        </div>
      ) : result ? (
        /* Verification Results Card */
        <div className="space-y-4">
          <div
            className={`rounded-2xl border p-5 sm:p-6 space-y-5 transition-all ${
              result.isMatch
                ? 'bg-gradient-to-b from-[#111927] to-[#0c121e] border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                : 'bg-gradient-to-b from-[#221013] to-[#14080a] border-rose-500/60 shadow-lg shadow-rose-500/10'
            }`}
          >
            {/* Status Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    result.isMatch
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {result.isMatch ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {result.isMatch ? 'Game Verified Successfully' : 'Game Mismatch Detected'}
                  </h3>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      result.isMatch ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {result.isMatch ? 'Verification Status: Verified' : 'Verification Status: Mismatch'}
                  </span>
                </div>
              </div>

              {/* Confidence Score Pill */}
              <div className="text-right">
                <div
                  className={`text-sm font-mono font-extrabold px-2.5 py-1 rounded-lg border ${
                    result.isMatch
                      ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {(result.confidence * 100).toFixed(0)}% Match
                </div>
                <span className="text-[10px] font-mono text-slate-500">Confidence</span>
              </div>
            </div>

            {/* Verification Metadata Grid */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">Selected Game:</span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Free Fire
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Detected Game:</span>
                <span className={`font-semibold mt-0.5 block truncate ${result.isMatch ? 'text-emerald-300' : 'text-rose-400'}`}>
                  {result.detectedGame}
                </span>
              </div>
            </div>

            {/* Reason / Explanation */}
            <div className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-white/5">
              <p>{result.reason}</p>
            </div>

            {/* Detected Visual Features */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Identified Signatures</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {result.detectedFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300"
                  >
                    {result.isMatch ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    )}
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
              {result.isMatch ? (
                <button
                  onClick={handleContinue}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
                >
                  <span>Continue to Analysis Processing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-200">
                    <p className="font-semibold">Analysis Blocked:</p>
                    <p className="text-[11px] text-rose-300/80 mt-0.5">
                      This gameplay appears to belong to a different game ({result.detectedGame}). StratIQ Free Fire engine cannot process non-Free Fire gameplay.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate('/analyze')}
                      type="button"
                      className="flex-1 py-2.5 px-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all text-center"
                    >
                      Switch Selected Game
                    </button>
                    <button
                      onClick={() => navigate('/analyze/input')}
                      type="button"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all text-center"
                    >
                      Choose Another Video
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Model Architecture Note */}
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-300">Technical Note:</strong> Vision-based automatic game recognition will replace the demo detector in a model-backed implementation. Mismatches are blocked to maintain analytical integrity.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
