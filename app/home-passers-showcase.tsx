"use client";

import {
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Quote,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type TouchEvent as ReactTouchEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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

function AutoFitStoryText({ story }: { story: string }) {
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const textElement = textRef.current;

    if (!textElement) {
      return;
    }

    const fitText = () => {
      const maximumFontSize = window.innerWidth >= 1024
        ? 24
        : window.innerWidth >= 640
          ? 20
          : 18;
      const minimumFontSize = 16;
      let fontSize = maximumFontSize;

      textElement.style.fontSize = `${fontSize}px`;
      textElement.style.lineHeight = "1.4";

      while (
        textElement.scrollHeight > textElement.clientHeight &&
        fontSize > minimumFontSize
      ) {
        fontSize -= 0.5;
        textElement.style.fontSize = `${fontSize}px`;
      }
    };

    fitText();

    const resizeObserver = new ResizeObserver(fitText);
    resizeObserver.observe(textElement);

    return () => resizeObserver.disconnect();
  }, [story]);

  return (
    <p
      ref={textRef}
      className="mt-3 min-h-0 max-w-4xl flex-1 overflow-hidden text-lg font-medium leading-[1.4] text-brand-black sm:pl-12"
    >
      {story}
    </p>
  );
}

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
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_3.5rem] lg:gap-8">
        <div className="relative h-[32rem] sm:h-[26rem] lg:h-[23rem]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={`${activePasser.name}-story`}
              custom={direction}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="flex h-full max-w-5xl flex-col">
                {activePasser.storyType === "testimonial" ? (
                  <Quote
                    aria-hidden="true"
                    className="size-8 flex-none -scale-x-100 fill-accent-red text-accent-red sm:size-10"
                    strokeWidth={0}
                  />
                ) : (
                  <Award
                    aria-hidden="true"
                    className="size-8 flex-none text-accent-red sm:size-10"
                    strokeWidth={1.6}
                  />
                )}
                <AutoFitStoryText story={activePasser.story} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-row items-center justify-center gap-2 border-t border-[rgba(11,11,11,0.12)] pt-5 lg:flex-col lg:gap-1.5 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
          <button
            type="button"
            aria-label="Previous success story"
            disabled={!hasMultiplePassers}
            onClick={showPrevious}
            className="motion-press flex size-8 items-center justify-center rounded-full text-foreground-muted hover:text-accent-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-foreground-muted"
          >
            <ChevronLeft
              aria-hidden="true"
              className="size-3.5 lg:hidden"
              strokeWidth={1.8}
            />
            <ChevronUp
              aria-hidden="true"
              className="hidden size-3.5 lg:block"
              strokeWidth={1.8}
            />
          </button>

          <div
            aria-label={`Success story ${activeIndex + 1} of ${passers.length}`}
            className="flex flex-row items-center gap-0.5 lg:flex-col"
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
                className="motion-press group flex size-7 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red"
              >
                {index === activeIndex ? (
                  <Zap
                    aria-hidden="true"
                    className="size-4 fill-accent-red text-accent-red"
                    strokeWidth={1.8}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full bg-[rgba(11,11,11,0.22)] transition-colors group-hover:bg-accent-red"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next success story"
            disabled={!hasMultiplePassers}
            onClick={showNext}
            className="motion-press flex size-8 items-center justify-center rounded-full text-foreground-muted hover:text-accent-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-foreground-muted"
          >
            <ChevronRight
              aria-hidden="true"
              className="size-3.5 lg:hidden"
              strokeWidth={1.8}
            />
            <ChevronDown
              aria-hidden="true"
              className="hidden size-3.5 lg:block"
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
          className="mt-8 h-[10rem] overflow-hidden border-t border-[rgba(11,11,11,0.12)] pt-7 sm:mt-10 sm:pt-8 lg:mt-12"
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
            {activePasser.batch ? (
              <p className="mt-4 text-sm font-semibold uppercase text-brand-black">
                {activePasser.batch}
              </p>
            ) : null}
            {activePasser.credential ? (
              <p className="mt-1 text-sm font-semibold uppercase text-brand-black">
                {activePasser.credential}
              </p>
            ) : null}
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  );
}
