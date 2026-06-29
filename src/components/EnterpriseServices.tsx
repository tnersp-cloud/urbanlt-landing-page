import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Code2, ShieldAlert, Cpu } from 'lucide-react';
import { use3DTilt } from '../hooks/use3DTilt';

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

const services = [
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: 'Compliant AI Analytics',
    description: 'We process heavy datasets through deterministic AI models. All ML pipelines adhere strictly to global AI compliance frameworks, ensuring unbiased, auditable, and regulatory-grade insights.',
    color: 'text-violet-400',
    glow: 'from-violet-500/20',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Enterprise Software Engineering',
    description: 'Beyond our internal nodes, we architect bespoke, high-availability software ecosystems for enterprise clients. Built on our scalable, asset-light infrastructure backbone.',
    color: 'text-emerald-400',
    glow: 'from-emerald-500/20',
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: 'Cybersecurity & IT Audits',
    description: 'Military-grade penetration testing, zero-trust architecture consultation, and comprehensive IT infrastructure audits to secure your data moat against advanced persistent threats.',
    color: 'text-rose-400',
    glow: 'from-rose-500/20',
  },
];

const EnterpriseServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="enterprise" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Gradient divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Parallax background accent */}
      <motion.div
        className="absolute top-[30%] left-[-10%] w-[500px] h-[500px] bg-rose-600/[0.03] rounded-full blur-[120px] -z-10"
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
              <Cpu className="w-3.5 h-3.5" />
              Advanced Offerings
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
            Enterprise & Security Services
          </motion.h2>
          <motion.p
            className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            Leveraging our proprietary core infrastructure to deliver military-grade cyber security, compliant AI analytics, and bespoke enterprise software development.
          </motion.p>
        </div>

        {/* Services grid with 3D tilt */}
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <TiltCard key={index} glowColor={service.glow} delay={index * 0.1} className="p-8">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.06] bg-white/[0.03] mb-6 ${service.color}`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold tracking-tight text-white mb-3">{service.title}</h3>
              <p className="text-[14px] text-zinc-400 leading-relaxed">{service.description}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnterpriseServices;
