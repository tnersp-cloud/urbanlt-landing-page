import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useMagneticButton } from '../hooks/useMagneticButton';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const magnetic = useMagneticButton(0.2);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <a href="#" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
              <span className="text-black text-xs font-black tracking-tighter">U</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-white">URBANLT</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-zinc-400">
            <a href="#shared-core" className="hover:text-white transition-colors duration-200">Infrastructure</a>
            <a href="#ecosystem" className="hover:text-white transition-colors duration-200">Verticals</a>
            <a href="#market-data" className="hover:text-white transition-colors duration-200">Market Data</a>
            <a href="#enterprise" className="hover:text-white transition-colors duration-200">Enterprise</a>
            <a href="#trust" className="hover:text-white transition-colors duration-200">Trust</a>
          </div>
        </div>
        <div className="hidden md:block">
          <a
            ref={magnetic.ref as React.RefObject<HTMLAnchorElement>}
            onMouseMove={magnetic.handleMouseMove}
            onMouseLeave={magnetic.handleMouseLeave}
            href="#contact"
            className="inline-flex items-center h-9 px-4 rounded-lg bg-white text-black text-[13px] font-semibold hover:bg-zinc-200 transition-colors will-change-transform"
          >
            Request Access
          </a>
        </div>
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.06] px-6 py-6 flex flex-col gap-4">
          <a href="#shared-core" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors" onClick={() => setIsOpen(false)}>Infrastructure</a>
          <a href="#ecosystem" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors" onClick={() => setIsOpen(false)}>Verticals</a>
          <a href="#market-data" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors" onClick={() => setIsOpen(false)}>Market Data</a>
          <a href="#enterprise" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors" onClick={() => setIsOpen(false)}>Enterprise</a>
          <a href="#trust" className="text-zinc-400 hover:text-white text-sm font-medium transition-colors" onClick={() => setIsOpen(false)}>Trust</a>
          <a
            href="#contact"
            className="mt-2 inline-flex items-center justify-center h-10 px-4 rounded-lg bg-white text-black text-sm font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Request Access
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
