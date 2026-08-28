import React from 'react';
import {
  Smartphone,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ExternalLink,
  Code,
  FileText,
  Video,
  Figma,
  Github,
  Info,
  Flame,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { DemoBadge } from '../components/ui/DemoBadge';

export const AboutPage: React.FC = () => {
  const links = [
    { label: 'Live Prototype', url: '#', icon: ExternalLink, status: 'Active (Current App)' },
    { label: 'Demo Walkthrough Video', url: '#', icon: Video, status: '[ADD LINK]' },
    { label: 'GitHub Repository', url: '#', icon: Github, status: '[ADD LINK]' },
    { label: 'Figma UI Mockups', url: '#', icon: Figma, status: '[ADD LINK]' },
    { label: 'System Architecture Spec', url: '#', icon: Layers, status: '[ADD LINK]' },
    { label: 'Research & References', url: '#', icon: FileText, status: '[ADD LINK]' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Technology & Vision</span>
          <DemoBadge />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Designed for a Phone-First Gaming Workflow
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          StratIQ brings professional post-match tactical analysis directly to competitive mobile gamers on high-performance devices.
        </p>
      </div>

      {/* 6-Step Phone-First Loop */}
      <div className="bg-[#11141e] border border-cyan-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
          Mobile Gaming Lifecycle
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {[
            { step: 'PLAY', desc: 'Ranked match on mobile' },
            { step: 'CAPTURE', desc: 'Screen recording / clip' },
            { step: 'ANALYZE', desc: 'Extract key moments' },
            { step: 'REVIEW', desc: 'Inspect decision pivots' },
            { step: 'COACH', desc: 'Counterfactual What-Ifs' },
            { step: 'TRACK', desc: 'Multi-match trend goals' },
          ].map((item, idx) => (
            <div key={item.step} className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-center space-y-1">
              <div className="text-[10px] font-mono text-cyan-400">0{idx + 1}</div>
              <div className="text-xs font-extrabold text-white">{item.step}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* iQOO Device Thinking & Vivo Office Kit */}
      <div className="bg-gradient-to-br from-[#121827] to-[#0c101a] border border-cyan-500/40 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl shadow-cyan-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">iQOO Device & Hardware Integration Thinking</h2>
            <p className="text-xs text-slate-400">Optimized for high-performance mobile gaming hardware</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Local Preprocessing & Frame Sampling</span>
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              High-refresh iQOO gaming devices can capture gameplay at 60–120 FPS. StratIQ down-samples to critical engagement windows locally before transmission, reducing bandwidth and latency.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>On-Device NPU Acceleration (Planned)</span>
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Future roadmap explores quantized on-device computer-vision models leveraging dedicated NPU cores for instant HUD and kill-feed parsing directly on the handset.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5 sm:col-span-2">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vivo Office Kit / Multi-Screen Synchronicity (Future)</span>
            </span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Allows seamless session transfer: play and capture on an iQOO phone, then broadcast full-screen tactical analysis dashboards to a connected PC screen via Vivo Office Kit for in-depth squad reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Hybrid Architecture: On-Device vs Cloud AI */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
          Hybrid System Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Local / Device Side */}
          <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              <span>Device-Side / Local Pipeline</span>
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Screen capture & MediaRecorder stream</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Video metadata & local thumbnail generation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Client-side verification & format checks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero-latency tactile UI navigation</span>
              </li>
            </ul>
          </div>

          {/* AI / Cloud Side */}
          <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-2.5">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>AI / Server-Side Pipeline</span>
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Vision classification & event timestamping</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Tactical reasoning & geometric line-of-sight</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Counterfactual "What If?" action synthesis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Multi-match recurring mistake aggregation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Current MVP Scope vs Limitations */}
      <div className="bg-[#11141e] border border-slate-800 rounded-2xl p-5 space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Hackathon MVP Scope & Limitations
        </h2>

        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 space-y-1">
            <span className="text-white font-bold">What is implemented now:</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Full end-to-end Free Fire post-match analysis pipeline, deterministic demo heuristics, game verification mismatch test, 6-stage telemetry processing, 5-match recurring pattern tracking, counterfactual What-If recommendations, and responsive mobile-first UI.
            </p>
          </div>

          <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 space-y-1">
            <span className="text-white font-bold">What is planned for future phases:</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Real-time deep learning computer vision model integration, live NPU execution on iQOO phones, multi-game support for BGMI/Valorant/CoD, and multi-player squad synchronization.
            </p>
          </div>
        </div>
      </div>

      {/* Supporting & Project Links */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
          Supporting Artifacts & Links
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#11141e] border border-slate-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">{link.label}</span>
                    <span className="text-[10px] font-mono text-slate-500">{link.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
