'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('./three-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-transparent" />,
});

export default function HeroContent() {
  const { scrollY } = useScroll();
  
  // Fade out scroll indicator after 200px scroll
  const scrollCueOpacity = useTransform(scrollY, [0, 200], [0.6, 0]);

  const line1 = "AI Engineer.".split(' ');
  const line2 = "Entrepreneur.".split(' ');
  const line3 = "Builder.".split(' ');

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-center items-start px-[5vw] select-none">
      <ThreeScene />
      <div className="max-w-4xl flex flex-col items-start text-left relative z-10">
        {/* Live indicator dot & tag row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
          </div>
          <span className="font-mono text-xs font-semibold text-text-2 tracking-wide uppercase">
            Available · Building · Meerut, IN
          </span>
        </motion.div>

        {/* H1 Main Staggers */}
        <h1 className="font-heading font-extrabold leading-[1.02] tracking-tighter text-text-1 mb-8 text-[clamp(44px,7.8vw,110px)]">
          {/* Line 1 */}
          <span className="block overflow-hidden py-1.5">
            {line1.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 + idx * 0.08,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-4 last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 2 */}
          <span className="block overflow-hidden py-1.5">
            {line2.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4 + idx * 0.08,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-4 last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Line 3 */}
          <span className="block overflow-hidden py-1.5">
            {line3.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.7 + idx * 0.08,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block mr-4 last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>


      </div>

      {/* Scroll indicator chevron */}
      <motion.div
        style={{ opacity: scrollCueOpacity }}
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 z-10 pointer-events-none select-none"
      >
        <span className="font-mono text-[10px] text-text-3 uppercase tracking-[0.14em]">
          scroll
        </span>
        <ChevronDown className="w-4 h-4 text-text-3" />
      </motion.div>
    </div>
  );
}
