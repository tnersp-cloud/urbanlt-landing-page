import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Fingerprint, HardDrive, Layout, Layers } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

/* ── 3D Tilt Card Wrapper ────────────────────────────────── */
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}> = ({ children, className = '', glowColor = 'from-white/10', delay = 0 }) => {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = use3DTilt(12);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className={`glow-card group relative rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10" style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ── 3D Rotating Cube ────────────────────────────────────── */
const RotatingCube = () => (
  <div className="w-24 h-24 mx-auto mb-8" style={{ perspective: '600px' }}>
    <motion.div
      className="w-full h-full relative"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      {/* Front */}
      <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm rounded-lg flex items-center justify-center"
        style={{ transform: 'translateZ(48px)' }}>
        <Layers className="w-8 h-8 text-blue-400/60" />
      </div>
      {/* Back */}
      <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm rounded-lg flex items-center justify-center"
        style={{ transform: 'rotateY(180deg) translateZ(48px)' }}>
        <Fingerprint className="w-8 h-8 text-violet-400/60" />
      </div>
      {/* Right */}
      <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm rounded-lg flex items-center justify-center"
        style={{ transform: 'rotateY(90deg) translateZ(48px)' }}>
        <HardDrive className="w-8 h-8 text-emerald-400/60" />
      </div>
      {/* Left */}
      <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm rounded-lg flex items-center justify-center"
        style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}>
        <Layout className="w-8 h-8 text-amber-400/60" />
      </div>
      {/* Top */}
      <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm rounded-lg"
        style={{ transform: 'rotateX(90deg) translateZ(48px)' }} />
      {/* Bottom */}
      <div className="absolute inset-0 border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm rounded-lg"
        style={{ transform: 'rotateX(-90deg) translateZ(48px)' }} />
    </motion.div>
  </div>
);

const layers = [
  {
    icon: <Fingerprint className="w-5 h-5" />,
    title: 'Unified Identity Layer',
    subtitle: 'Ecosystem KYC',
    description: 'Single-point parsing for NIN, BVN, and corporate registry records. A user cleared in one vertical is instantly trusted across all others.',
    color: 'text-violet-400',
    glow: 'from-violet-500/20',
  },
  {
    icon: <HardDrive className="w-5 h-5" />,
    title: 'Heavy Ingestion Pipeline',
    subtitle: 'Backblaze B2',
    description: 'Infrastructure designed to instantly process heavy 50MB+ real estate title compliance documents scales to ingest manufacturing blueprints and training video assets.',
    color: 'text-emerald-400',
    glow: 'from-emerald-500/20',
  },
  {
    icon: <Layout className="w-5 h-5" />,
    title: 'Single Master UI Library',
    subtitle: 'React + Tailwind + Vercel',
    description: 'Every interface block engineered for logistics dashboards is natively repurposed for industrial portals.',
    color: 'text-amber-400',
    glow: 'from-amber-500/20',
  },
];

const SharedCore = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const cubeScale = useTransform(scrollYProgress, [0.1, 0.4], [0.6, 1]);
  const cubeOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <section id="shared-core" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Parallax background accent */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[120px] -z-10"
        style={{ y: parallaxY }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-6">
              <Layers className="w-3.5 h-3.5" />
              Technical Blueprint
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
            The Shared Core Advantage
          </motion.h2>
          <motion.p
            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            Silicon Valley startups win on architectural leverage. URBANLT deploys a strict 4-Layer Shared Core Infrastructure.
          </motion.p>
        </div>

        {/* 3D Rotating Cube */}
        <motion.div style={{ scale: cubeScale, opacity: cubeOpacity }}>
          <RotatingCube />
        </motion.div>

        {/* Layer cards with 3D tilt */}
        <div className="grid md:grid-cols-3 gap-5">
          {layers.map((layer, index) => (
            <TiltCard key={index} glowColor={layer.glow} delay={index * 0.1} className="p-7">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] mb-5 ${layer.color}`}>
                {layer.icon}
              </div>
              <h3 className="heading-card text-white mb-1">{layer.title}</h3>
              <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider mb-4">{layer.subtitle}</p>
              <p className="text-[14px] text-zinc-400 leading-relaxed">{layer.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedCore;
