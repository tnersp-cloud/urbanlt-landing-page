import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Server, Lock, GitBranch } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

/* ── 3D Tilt Card ────────────────────────────────────────── */
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
  delay?: number;
}> = ({ children, className = '', highlight = false, delay = 0 }) => {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = use3DTilt(10);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`glow-card group relative rounded-2xl bg-zinc-900/50 backdrop-blur-xl border overflow-hidden transition-colors duration-500 ${
        highlight ? 'border-blue-500/20 hover:border-blue-500/30' : 'border-white/[0.06] hover:border-white/[0.12]'
      } ${className}`}
    >
      {highlight && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      )}
      <div className="relative z-10" style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
};

const trustItems = [
  {
    icon: <Server className="w-5 h-5" />,
    title: 'Asset-Light Scale',
    description: 'Bypassing heavy hardware dependencies via an optimized, data-first digital infrastructure.',
    color: 'text-zinc-400',
    highlight: false,
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'Regulatory First',
    description: 'SaaS-first workflow logic designed to prioritize alignment with the Nigeria Data Protection Act (NDPA) and local oversight rules.',
    color: 'text-blue-400',
    highlight: true,
  },
  {
    icon: <GitBranch className="w-5 h-5" />,
    title: 'Stage-Gated Defensibility',
    description: 'Our roadmap enforces a strict sequence: Phase 1 validation directly finances Phase 2 escalation. We do not burn capital on multi-front expansions.',
    color: 'text-zinc-400',
    highlight: false,
  },
];

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="trust" className="py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Parallax accent */}
      <motion.div
        className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-blue-600/[0.03] rounded-full blur-[100px] -z-10"
        style={{ y: parallaxY }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-6">
              <Shield className="w-3.5 h-3.5" />
              Institutional Trust
            </span>
          </motion.div>
          <motion.h2
            className="heading-section text-white mb-5"
            initial={{ opacity: 0, y: 20, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            Built for Institutional &<br className="hidden md:block" /> Sovereign Trust
          </motion.h2>
          <motion.p
            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            Strategically mapped to align with tier-1 venture capital models, global multilateral grant frameworks, and national development facilities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {trustItems.map((item, index) => (
            <TiltCard key={index} highlight={item.highlight} delay={index * 0.1} className="p-7">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] mb-5 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="heading-card text-white mb-3">{item.title}</h3>
              <p className="text-[14px] text-zinc-500 leading-relaxed">{item.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
