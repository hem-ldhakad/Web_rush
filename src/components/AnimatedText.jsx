import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated headline with staggered word reveal and glowing gradient text shimmer
 */
export function AnimatedHeadline({ text, highlightText, className = "" }) {
  const words = text ? text.split(' ') : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  return (
    <motion.h1
      className={`font-syne font-bold tracking-tight leading-none text-balance ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={wordVariants} className="inline-block mr-2 sm:mr-3">
          {word}{' '}
        </motion.span>
      ))}
      {highlightText && (
        <motion.span
          variants={wordVariants}
          className="bg-gradient-to-r from-[#1DB954] via-primary to-secondary bg-[length:200%_auto] bg-clip-text text-transparent inline-block animate-text-shimmer drop-shadow-sm"
        >
          {highlightText}
        </motion.span>
      )}
    </motion.h1>
  );
}

/**
 * Animated Subheading for section headers
 */
export function AnimatedSubheading({ text, className = "" }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className={`font-mono text-xs sm:text-sm text-on-surface-variant leading-relaxed ${className}`}
    >
      {text}
    </motion.p>
  );
}

/**
 * Floating musical notes background animation used across every page
 */
export function FloatingNotes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
      <div className="absolute top-12 left-[10%] text-2xl text-[#1DB954] animate-float-1 font-mono drop-shadow-[0_0_8px_rgba(29,185,84,0.4)]">
        ♫
      </div>
      <div className="absolute top-28 right-[15%] text-xl text-primary animate-float-2 font-mono drop-shadow-[0_0_8px_rgba(169,155,234,0.4)]">
        ♬
      </div>
      <div className="absolute bottom-20 left-[25%] text-3xl text-secondary animate-float-3 font-mono">
        ♪
      </div>
      <div className="absolute top-44 left-[55%] text-lg text-[#1DB954] animate-float-2 font-mono">
        ♩
      </div>
      <div className="absolute bottom-36 right-[8%] text-2xl text-primary animate-float-1 font-mono">
        🎶
      </div>
      <div className="absolute top-1/2 left-[5%] text-xl text-secondary animate-float-3 font-mono">
        ♭
      </div>
      <div className="absolute top-2/3 right-[35%] text-2xl text-[#1DB954] animate-float-1 font-mono">
        ♮
      </div>
    </div>
  );
}

