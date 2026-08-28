import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Smartphone, Monitor } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [phoneFrameMode, setPhoneFrameMode] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      <Header />

      {/* Optional Desktop Mode Switcher */}
      <div className="hidden lg:flex fixed bottom-4 right-4 z-50 items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1.5 rounded-full shadow-2xl backdrop-blur-md">
        <button
          onClick={() => setPhoneFrameMode(false)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            !phoneFrameMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
          title="Full Responsive Mode"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
        <button
          onClick={() => setPhoneFrameMode(true)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all ${
            phoneFrameMode ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
          }`}
          title="Phone Simulator Frame"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Phone Frame</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full mx-auto transition-all ${
          phoneFrameMode
            ? 'max-w-md my-6 rounded-[2.5rem] border-[6px] border-slate-800 bg-[#0d0f17] shadow-2xl overflow-hidden min-h-[840px] relative'
            : 'max-w-4xl pb-24 md:pb-12'
        }`}
      >
        <div className="px-3.5 sm:px-6 py-5 md:py-8">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
