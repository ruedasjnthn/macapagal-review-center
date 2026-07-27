"use client";

import {
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Quote,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { type TouchEvent as ReactTouchEvent, useRef, useState } from "react";

export type HomePasser = {
  name: string;
  school?: string;
  batch: string;
  credential: string;
  story: string;
  storyType: "testimonial" | "achievement";
};

type HomePassersShowcaseProps = {
  passers: HomePasser[];
};

export function HomePassersShowcase({ passers }: HomePassersShowcaseProps) {
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const hasMultiplePassers = passers.length > 1;
  const activePasser = passers[activeIndex];

  if (!activePasser) {
    return null;
  }

  const showPrevious = () => {
    setDirection(-1);
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? passers.length - 1 : currentIndex - 1,
    );
  };

  const showNext = () => {
    setDirection(1);
    setActiveIndex((currentIndex) =>
      currentIndex === passers.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    const horizontalDistance = touch.clientX - touchStartRef.current.x;
    const verticalDistance = touch.clientY - touchStartRef.current.y;

    if (
      Math.abs(horizontalDistance) < 50 ||
      Math.abs(horizontalDistance) <= Math.abs(verticalDistance) * 1.25
    ) {
      return;
    }

    if (horizontalDistance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  };

  return (
    <article
      className="text-brand-black"
      aria-live="polite"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(10rem,0.2fr)] lg:gap-10">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={`${activePasser.name}-story`}
            custom={direction}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-5xl">
            {activePasser.storyType === "testimonial" ? (
              <Quote
                aria-hidden="true"
                className="size-8 -scale-x-100 fill-brand-gold text-brand-gold sm:size-10"
                strokeWidth={0}
              />
            ) : (
              <Award
                aria-hidden="true"
                className="size-8 text-brand-gold sm:size-10"
                strokeWidth={1.6}
              />
            )}
            <p className="mt-3 max-w-4xl text-lg font-medium leading-[1.4] text-brand-black sm:pl-12 sm:text-xl lg:mt-2 lg:text-2xl lg:leading-[1.35]">
              {activePasser.story}
            </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-row items-center justify-center gap-4 border-t border-[rgba(11,11,11,0.12)] pt-5 lg:flex-col lg:gap-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <button
            type="button"
            aria-label="Previous success story"
            disabled={!hasMultiplePassers}
            onClick={showPrevious}
            className="motion-press flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[rgba(11,11,11,0.14)] disabled:hover:bg-transparent disabled:hover:text-brand-black"
          >
            <ChevronLeft
              aria-hidden="true"
              className="size-4 lg:hidden"
              strokeWidth={1.8}
            />
            <ChevronUp
              aria-hidden="true"
              className="hidden size-4 lg:block"
              strokeWidth={1.8}
            />
          </button>

          <div
            aria-label={`Success story ${activeIndex + 1} of ${passers.length}`}
            className="flex flex-row items-center gap-2 lg:flex-col"
          >
            {passers.map((passer, index) => (
              <button
                key={`${passer.name}-${index}`}
                type="button"
                aria-label={`Show success story ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`motion-press size-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black ${
                  index === activeIndex
                    ? "bg-brand-black"
                    : "bg-[rgba(11,11,11,0.18)] hover:bg-brand-gold"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next success story"
            disabled={!hasMultiplePassers}
            onClick={showNext}
            className="motion-press flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] text-brand-black hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[rgba(11,11,11,0.14)] disabled:hover:bg-transparent disabled:hover:text-brand-black"
          >
            <ChevronRight
              aria-hidden="true"
              className="size-4 lg:hidden"
              strokeWidth={1.8}
            />
            <ChevronDown
              aria-hidden="true"
              className="hidden size-4 lg:block"
              strokeWidth={1.8}
            />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
      <motion.div
        key={`${activePasser.name}-details`}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -10 }}
        transition={{ duration: 0.28 }}
        className="mt-8 border-t border-[rgba(11,11,11,0.12)] pt-7 sm:mt-10 sm:pt-8 lg:mt-12"
      >
        <div className="max-w-4xl">
          <h3 className="font-heading text-xl font-semibold leading-tight text-brand-black sm:text-3xl">
            {activePasser.name}
          </h3>
          {activePasser.school ? (
            <p className="mt-2 text-sm font-semibold uppercase text-foreground-muted">
              {activePasser.school}
            </p>
          ) : null}
          <p className="mt-4 text-sm font-semibold uppercase text-brand-black">
            {activePasser.batch}
          </p>
          <p className="mt-1 text-sm font-semibold uppercase text-brand-black">
            {activePasser.credential}
          </p>
        </div>

      </motion.div>
      </AnimatePresence>
    </article>
  );
}
