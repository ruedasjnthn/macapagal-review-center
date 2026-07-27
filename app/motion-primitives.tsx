"use client";

import { motion, MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const editorialEase = [0.22, 1, 0.36, 1] as const;

type MotionContainerProps = {
  children: ReactNode;
  className?: string;
};

type RevealProps = MotionContainerProps & {
  delay?: number;
  distance?: number;
  amount?: number;
};

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.45, ease: editorialEase }}
    >
      {children}
    </MotionConfig>
  );
}

export function PageTransition({ children, className }: MotionContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: editorialEase }}
      className={`min-h-full ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 20,
  amount = 0.2,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion ? false : { opacity: 0, y: distance }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, delay, ease: editorialEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({ children, className }: MotionContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : "hidden"}
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: 0.08, staggerChildren: 0.07 },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: MotionContainerProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: editorialEase },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroReveal({ children, className }: MotionContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, scale: 1.018, clipPath: "inset(0 0 8% 0 round 2rem)" }
      }
      animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0 round 2rem)" }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
