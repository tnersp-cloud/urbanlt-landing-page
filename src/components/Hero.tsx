import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMagneticButton } from '../hooks/useMagneticButton';
import ParticleField from './ParticleField';
import { useRef } from 'react';

const Hero = () => {
  const magneticPrimary = useMagneticButton(0.25);
  const magneticSecondary = useMagneticButton(0.2);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const metricY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" style={{ perspective: '1200px' }}>
      {/* Parallax radial gradient backdrop */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[15%] w-[700px] h-[700px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-[5%] right-[5%] w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[100px]" />
      </motion.div>

      {/* Particle field */}
      <div className="absolute inset-0 -z-5">
        <ParticleField count={50} />
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <motion.div className="max-w-5xl mx-auto px-6 text-center relative z-10" style={{ y: textY, opacity, scale }}>
        <motion.div
          initial={{ opacity: 0, y: 24, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] font-medium text-zinc-400 tracking-wide uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Operating System for the West African Real Economy
          </span>
        </motion.div>

        <motion.h1
          className="heading-hero text-white mb-8"
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          We build cross-reinforcing{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
            data layers
          </span>{' '}
          for the real economy.
        </motion.h1>

        <motion.p
          className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
        >
          The traditional approach to emerging markets relies on siloed, capital-heavy application development.{' '}
          <span className="text-white font-medium">URBANLT rejects this.</span> We engineer a mathematically validated, hyper-efficient digital infrastructure that captures, de-risks, and scales value across Africa's most vital sectors.
        </motion.p>

        {/* Core metric with 3D entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          style={{ y: metricY, transformStyle: 'preserve-3d', perspective: '800px' }}
          className="max-w-xl mx-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 mb-14 relative overflow-hidden group hover:border-white/[0.12] transition-colors duration-500"
        >
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-blue-500 to-violet-500" />
          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="flex items-start gap-4 text-left pl-4 relative z-10">
            <div>
              <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest mb-1">Core Metric</p>
              <p className="text-4xl font-bold text-white tracking-tight mb-1">&gt;58%</p>
              <p className="text-sm text-zinc-500 font-medium mb-2">Reduction in Development Redundancies</p>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                Centralizing relational database architecture, object ingestion pipelines, and predictive identity layers into a single technology backbone.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <a
            ref={magneticPrimary.ref as React.RefObject<HTMLAnchorElement>}
            onMouseMove={magneticPrimary.handleMouseMove}
            onMouseLeave={magneticPrimary.handleMouseLeave}
            href="#shared-core"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-white text-black font-semibold text-[14px] hover:bg-zinc-200 transition-colors will-change-transform shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            Explore Infrastructure
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            ref={magneticSecondary.ref as React.RefObject<HTMLAnchorElement>}
            onMouseMove={magneticSecondary.handleMouseMove}
            onMouseLeave={magneticSecondary.handleMouseLeave}
            href="#market-data"
            className="inline-flex items-center h-12 px-6 rounded-xl border border-white/[0.1] text-zinc-300 font-semibold text-[14px] hover:border-white/[0.2] hover:text-white transition-all will-change-transform"
          >
            View Market Data
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity }}
      >
        <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/[0.1] flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-white/40"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
