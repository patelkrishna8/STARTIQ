import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Smartphone, ShieldCheck, Flame } from 'lucide-react';
import { DemoBadge } from '../ui/DemoBadge';

export const Header: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/analyze', label: 'Analyze' },
    { path: '/matches', label: 'Matches' },
    { path: '/progress', label: 'Progress' },
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090a0f]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center">
              <Target className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                StratIQ
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-mono uppercase bg-slate-800/80 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                AI Gaming Coach
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/60">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status Badges */}
        <div className="flex items-center gap-2.5">
          {/* Active Game Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-full">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">Free Fire</span>
          </div>

          <DemoBadge />
        </div>
      </div>
    </header>
  );
};
