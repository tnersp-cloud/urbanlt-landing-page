import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';

const marketSectors = [
  {
    sector: 'Agriculture & Allied Logistics',
    gdpShare: '22.45%',
    mechanism: 'Bulk crop aggregation and corridor route optimization.',
  },
  {
    sector: 'Real Estate & Urban Leases',
    gdpShare: 'High Density Hubs',
    mechanism: 'Fraud-free urban tenancy verification and listing matching.',
  },
  {
    sector: 'Manufacturing & Assembly',
    gdpShare: '12.10%',
    mechanism: 'Shop-floor asset tracking and light industrial optimization.',
  },
];

/* ── Skeleton Row ────────────────────────────────────────── */
const SkeletonRow = () => (
  <tr>
    <td className="py-5 px-6"><div className="skeleton h-4 w-40 rounded" /></td>
    <td className="py-5 px-6"><div className="skeleton h-4 w-20 rounded" /></td>
    <td className="py-5 px-6"><div className="skeleton h-4 w-56 rounded" /></td>
  </tr>
);

/* ── Animated Counter ────────────────────────────────────── */
const AnimatedNumber: React.FC<{ value: string; delay?: number }> = ({ value, delay = 0 }) => {
  const [displayed, setDisplayed] = useState('0');
  const numericPart = value.replace(/[^0-9.]/g, '');
  const suffix = value.replace(/[0-9.]/g, '');

  useEffect(() => {
    const target = parseFloat(numericPart);
    if (isNaN(target)) {
      setDisplayed(value);
      return;
    }

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;
        setDisplayed(current.toFixed(target % 1 === 0 ? 0 : 2) + suffix);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [numericPart, suffix, delay, value]);

  return <span>{displayed}</span>;
};

const MarketData = () => {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const tableY = useTransform(scrollYProgress, [0.2, 0.6], [40, 0]);
  const tableOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="market-data" className="py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Parallax accent */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[120px] -z-10"
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
              <TrendingUp className="w-3.5 h-3.5" />
              Macroeconomics
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
            Market Reality: Backed by Hard Data
          </motion.h2>
          <motion.p
            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            We do not chase speculative tech trends. We capture systemic volume in sectors tied directly to the baseline GDP of sub-Saharan Africa's largest market.
          </motion.p>
        </div>

        {/* Table with parallax */}
        <motion.div
          style={{ y: tableY, opacity: tableOpacity }}
          className="max-w-5xl mx-auto rounded-2xl border border-white/[0.06] bg-zinc-900/40 backdrop-blur-sm overflow-hidden mb-10"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">Sector</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">GDP Share</th>
                  <th className="py-4 px-6 text-[11px] font-semibold text-zinc-500 uppercase tracking-widest">URBANLT Capture Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {!loaded ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : (
                  marketSectors.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
                      className="group hover:bg-white/[0.02] transition-colors duration-300"
                    >
                      <td className="py-5 px-6 text-[14px] font-medium text-white">{row.sector}</td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center h-6 px-2.5 rounded-md bg-white/[0.05] border border-white/[0.06] text-[12px] font-semibold text-zinc-300">
                          {row.gdpShare}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-[13px] text-zinc-400 leading-relaxed">{row.mechanism}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Addressable Baseline with 3D entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="max-w-4xl mx-auto rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/[0.05] via-transparent to-violet-500/[0.03] p-8 md:p-10 relative overflow-hidden group hover:border-white/[0.1] transition-colors duration-500"
        >
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-blue-500/60 to-violet-500/60" />
          {/* Shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s]" />
          <div className="flex items-start gap-5 pl-4 relative z-10">
            <div className="hidden md:flex w-12 h-12 rounded-xl border border-white/[0.06] bg-white/[0.03] items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest mb-3">The Addressable Baseline — Nigeria 2026</p>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-medium">
                A population scale of <span className="text-white font-bold"><AnimatedNumber value="232.7" delay={500} /> million</span> residents, experiencing an annual compounding urban migration rate of <span className="text-white font-bold"><AnimatedNumber value="4.1%" delay={800} /></span>. URBANLT positions its applications to capture non-discretionary transaction volumes that remain resilient through any inflationary cycle.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketData;
