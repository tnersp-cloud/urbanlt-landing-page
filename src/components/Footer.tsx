import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8 pb-8 border-b border-white/[0.04]">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-5 h-5 rounded bg-white flex items-center justify-center">
                <span className="text-black text-[10px] font-black tracking-tighter">U</span>
              </div>
              <span className="font-semibold text-[14px] tracking-tight text-white">URBANLT</span>
            </div>
            <p className="text-[12px] text-zinc-600 font-medium">Operating System for the West African Real Economy</p>
          </div>

          <div className="flex gap-8 text-[13px] font-medium text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Legal</a>
            <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Corporate</a>
            <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Contact</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-zinc-700">
          <p>&copy; 2026 Urban Living Technologies Ltd. All Rights Reserved.</p>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Registered Corporate Seal · NDPA Compliant</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-zinc-700">Powered by</span>
            <span className="text-zinc-500 font-medium">Supabase</span>
            <span className="text-zinc-800">·</span>
            <span className="text-zinc-500 font-medium">Backblaze B2</span>
            <span className="text-zinc-800">·</span>
            <span className="text-zinc-500 font-medium">Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
