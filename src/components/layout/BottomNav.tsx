import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, PlayCircle, History, TrendingUp, User, Sparkles } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
      exact: true,
    },
    {
      to: '/analyze',
      label: 'Analyze',
      icon: PlayCircle,
      highlight: true,
    },
    {
      to: '/matches',
      label: 'Matches',
      icon: History,
    },
    {
      to: '/progress',
      label: 'Progress',
      icon: TrendingUp,
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#090a0f]/95 backdrop-blur-lg border-t border-slate-800/90 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.to
            : location.pathname === item.to || location.pathname.startsWith(item.to + '/');

          const Icon = item.icon;

          if (item.highlight) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative -top-3 flex flex-col items-center group"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-black shadow-cyan-500/30'
                      : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span
                  className={`text-[10px] font-semibold mt-1 transition-colors ${
                    isActive ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all active:scale-95 ${
                isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-medium mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
