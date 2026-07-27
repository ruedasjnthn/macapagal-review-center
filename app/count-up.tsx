"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

export function CountUp({
  value,
  suffix = "",
  duration = 1.6,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let frameId = 0;
    const startedAt = performance.now();

    const updateCount = (now: number) => {
      const progress = Math.min((now - startedAt) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.round(value * easedProgress));

      if (progress < 1) frameId = requestAnimationFrame(updateCount);
    };

    frameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(frameId);
  }, [duration, isInView, prefersReducedMotion, value]);

  return (
    <span
      ref={ref}
      aria-label={`${numberFormatter.format(value)}${suffix}`}
      className="tabular-nums"
    >
      <span aria-hidden="true">
        {numberFormatter.format(prefersReducedMotion ? value : count)}
        {suffix}
      </span>
    </span>
  );
}
