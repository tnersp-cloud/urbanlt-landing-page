import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Building2, Wrench, Layers } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

/* ── 3D Tilt Card ────────────────────────────────────────── */
const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
}> = ({ children, className = '', glowColor = 'from-white/10', delay = 0 }) => {
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
      className={`glow-card group relative rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-colors duration-500 ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10" style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ── Live Ticker for AgroLink ─────────────────────────────── */
const tickerData = [
  { route: 'Lagos → Kano', commodity: 'Maize', tons: '24.5t', status: 'In Transit' },
  { route: 'Ibadan → Abuja', commodity: 'Cassava', tons: '18.2t', status: 'Delivered' },
  { route: 'Jos → PH', commodity: 'Rice', tons: '32.0t', status: 'Loading' },
  { route: 'Enugu → Lagos', commodity: 'Yam', tons: '15.8t', status: 'In Transit' },
  { route: 'Kaduna → Benin', commodity: 'Sorghum', tons: '22.1t', status: 'Delivered' },
  { route: 'Sokoto → Abuja', commodity: 'Millet', tons: '28.6t', status: 'In Transit' },
];

const DataTicker = () => (
  <div className="mt-6 overflow-hidden rounded-lg border border-white/[0.04] bg-black/30">
    <div className="flex ticker-scroll whitespace-nowrap py-3 px-2">
      {[...tickerData, ...tickerData].map((item, i) => (
        <div key={i} className="inline-flex items-center gap-3 mx-4 text-[11px]">
          <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'In Transit' ? 'bg-emerald-500 animate-pulse' : item.status === 'Delivered' ? 'bg-blue-500' : 'bg-amber-500'}`} />
          <span className="text-zinc-500 font-medium">{item.route}</span>
          <span className="text-zinc-400">{item.commodity}</span>
          <span className="text-white font-semibold">{item.tons}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ── KYC Animation for PropertyMatch ────────────────────── */
const KYCAnimation = () => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 1500);
    return () => clearInterval(interval);
  }, []);

  const steps = ['Parsing NIN...', 'Verifying BVN...', 'Cross-referencing...', '✓ Identity Verified'];

  return (
    <div className="mt-6 space-y-3">
      <div className="relative w-20 h-20 mx-auto" style={{ perspective: '400px' }}>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-500/30"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute inset-1 rounded-full border border-blue-400/60"
          animate={{ scale: [1, 1.15, 1], rotateZ: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center backdrop-blur-sm">
          <Building2 className="w-6 h-6 text-blue-400" />
        </div>
      </div>

      <div className="space-y-1.5">
        {steps.map((label, i) => (
          <motion.div
            key={i}
            className={`flex items-center gap-2 text-[11px]`}
            animate={{ opacity: i <= step ? 1 : 0.15, x: i <= step ? 0 : -8 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`w-1 h-1 rounded-full ${i < step ? 'bg-emerald-500' : i === step ? 'bg-blue-500 animate-pulse' : 'bg-zinc-700'}`} />
            <span className={`${i <= step ? (i === 3 && step === 3 ? 'text-emerald-400 font-semibold' : 'text-zinc-300') : 'text-zinc-700'}`}>{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ── Progress Ring for ConstructX ────────────────────────── */
const ProgressRing = () => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 80 ? 0 : p + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div className="relative" style={{ perspective: '400px' }}>
        <motion.div
          animate={{ rotateY: [0, 10, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
            <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
            <circle
              cx="50" cy="50" r={radius} fill="none"
              stroke="url(#progressGradient)" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              className="transition-all duration-75"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{progress}%</span>
        </div>
      </div>
      <p className="text-[11px] text-zinc-500 font-medium">Training Module Progress</p>
    </div>
  );
};

/* ── Bento Grid ──────────────────────────────────────────── */
const BentoEcosystem = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="ecosystem" className="py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Parallax background elements */}
      <motion.div
        className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-600/[0.03] rounded-full blur-[100px] -z-10"
        style={{ y: parallaxY1 }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-blue-600/[0.04] rounded-full blur-[100px] -z-10"
        style={{ y: parallaxY2 }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="heading-section text-white mb-5"
            initial={{ opacity: 0, y: 20, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            The 3-Node Operational Ecosystem
          </motion.h2>
          <motion.p
            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
          >
            Capital and engineering talent directed strictly toward market segments with massive, structural supply-demand gaps.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 auto-rows-[280px] md:auto-rows-auto">

          {/* AgroLink AI — Wide */}
          <TiltCard className="md:col-span-2 md:row-span-1 p-7" glowColor="from-emerald-500/[0.08]" delay={0}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-emerald-400">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="heading-card text-white">AgroLink AI</h3>
                  <p className="text-[11px] text-zinc-600 uppercase tracking-wider font-semibold">Node 01 · Launch Anchor</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mt-4">
              Mitigating post-harvest value destruction and standardizing interstate haulage flows across major agricultural corridors.
            </p>
            <DataTicker />
          </TiltCard>

          {/* PropertyMatch AI — Tall */}
          <TiltCard className="md:col-span-1 md:row-span-2 p-7" glowColor="from-blue-500/[0.08]" delay={0.1}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-blue-400">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="heading-card text-white">PropertyMatch AI</h3>
                <p className="text-[11px] text-zinc-600 uppercase tracking-wider font-semibold">Node 02 · Urban Trust</p>
              </div>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mt-4">
              Enforcing strict identity validation and geo-tagged property tokens to eliminate pervasive broker fraud.
            </p>
            <KYCAnimation />
            <div className="mt-4 p-3 rounded-lg border border-white/[0.04] bg-black/20">
              <p className="text-[11px] text-zinc-600 font-medium">Ecosystem Synergy</p>
              <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">Refines the central KYC database. Verification models weaponized across the entire portfolio.</p>
            </div>
          </TiltCard>

          {/* ConstructX — Compact */}
          <TiltCard className="md:col-span-1 md:row-span-2 p-7" glowColor="from-amber-500/[0.08]" delay={0.2}>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-amber-400">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="heading-card text-white">ConstructX Mfg</h3>
                <p className="text-[11px] text-zinc-600 uppercase tracking-wider font-semibold">Node 03 · Labor Net</p>
              </div>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mt-4">
              Standardizing certifications, streaming video-based technical training, and deploying verified technicians.
            </p>
            <ProgressRing />
            <div className="mt-4 p-3 rounded-lg border border-white/[0.04] bg-black/20">
              <p className="text-[11px] text-zinc-600 font-medium">Ecosystem Synergy</p>
              <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">Captures the massive informal skilled labor market via heavy-file core infrastructure.</p>
            </div>
          </TiltCard>

          {/* Synergy card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:col-span-2 md:row-span-1 relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 group hover:border-white/[0.1] transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s]" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-zinc-400 shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Cross-Node Data Flywheel</h4>
                <p className="text-[13px] text-zinc-500 leading-relaxed">
                  Every transaction in AgroLink validates the identity engine in PropertyMatch. Every verified technician in ConstructX enriches the labor supply model. The more nodes that activate, the more defensible the unified data moat becomes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoEcosystem;
