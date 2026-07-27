"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type PasserProgram = "REE" | "RME";

export type PasserBatch = {
  id: string;
  program: PasserProgram;
  title: string;
  sortDate: string;
  imageFolder: string;
};

type PassersGalleryProps = {
  batches: PasserBatch[];
  imageFolders: Record<string, string[]>;
};

const PAGE_SIZE = 5;

const programTabs: { value: PasserProgram; label: string }[] = [
  { value: "REE", label: "REE Program" },
  { value: "RME", label: "RME Program" },
];

type PasserBatchCarouselProps = {
  batch: PasserBatch;
  images: string[];
};

function PasserBatchCarousel({ batch, images }: PasserBatchCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(images.length > 1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const isLightboxOpen = lightboxIndex !== null;

  const updateScrollControls = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const maximumScroll = scroller.scrollWidth - scroller.clientWidth;
    setCanScrollPrevious(scroller.scrollLeft > 2);
    setCanScrollNext(scroller.scrollLeft < maximumScroll - 2);
  }, []);

  useEffect(() => {
    updateScrollControls();
    window.addEventListener("resize", updateScrollControls);

    return () => window.removeEventListener("resize", updateScrollControls);
  }, [images, updateScrollControls]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setLightboxDirection(-1);
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? null
            : (currentIndex - 1 + images.length) % images.length,
        );
      }

      if (event.key === "ArrowRight") {
        setLightboxDirection(1);
        setLightboxIndex((currentIndex) =>
          currentIndex === null ? null : (currentIndex + 1) % images.length,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
    };
  }, [images.length, isLightboxOpen]);

  const scrollCarousel = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    scroller.scrollBy({
      left: direction * Math.max(280, scroller.clientWidth * 0.78),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) {
      return;
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const dragState = dragStateRef.current;

    if (!scroller || !dragState.isDragging) {
      return;
    }

    const distance = event.clientX - dragState.startX;
    if (Math.abs(distance) <= 8) {
      return;
    }

    if (!dragState.moved) {
      dragState.moved = true;
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    scroller.scrollLeft = dragState.scrollLeft - distance;
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDragging) {
      return;
    }

    dragStateRef.current.isDragging = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const cancelPendingPointerDrag = () => {
    if (dragStateRef.current.isDragging && !dragStateRef.current.moved) {
      dragStateRef.current.isDragging = false;
    }
  };

  const openLightbox = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setLightboxDirection(1);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5 }}
      className="py-10 last:pb-0 sm:py-12 lg:py-14"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="font-heading text-2xl font-semibold leading-tight text-brand-black sm:text-3xl">
            {batch.title}
          </h3>
          <p className="mt-2 text-sm font-semibold text-foreground-muted">
            {images.length} passers
          </p>
        </div>

        {images.length > 1 ? (
          <div className="hidden items-center gap-2 md:flex">
            <motion.button
              type="button"
              aria-label={`Previous images in ${batch.title}`}
              disabled={!canScrollPrevious}
              onClick={() => scrollCarousel(-1)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-black"
            >
              <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </motion.button>
            <motion.button
              type="button"
              aria-label={`Next images in ${batch.title}`}
              disabled={!canScrollNext}
              onClick={() => scrollCarousel(1)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand-black"
            >
              <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </motion.button>
          </div>
        ) : null}
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label={`${batch.title} image carousel`}
        onScroll={updateScrollControls}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onPointerLeave={cancelPendingPointerDrag}
        onClickCapture={(event) => {
          if (dragStateRef.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            dragStateRef.current.moved = false;
          }
        }}
        className={`mt-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-7 ${
          isDragging ? "cursor-grabbing snap-none select-none" : "cursor-grab snap-x"
        }`}
      >
        <ul className="flex gap-4 pb-2 pr-5 sm:pr-8 lg:pr-12">
          {images.map((src, imageIndex) => (
            <motion.li
              key={`${batch.id}-${src}-${imageIndex}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: Math.min(imageIndex * 0.04, 0.24) }}
              className="w-[min(76vw,20rem)] flex-none snap-start sm:w-[18rem] lg:w-[20rem]"
            >
              <button
                type="button"
                aria-label={`Open ${batch.title} passer ${imageIndex + 1}`}
                onClick={(event) => openLightbox(imageIndex, event.currentTarget)}
                className="motion-press group relative block aspect-square w-full overflow-hidden rounded-lg bg-background-muted text-left ring-1 ring-[rgba(11,11,11,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black"
              >
                <Image
                  src={src}
                  alt={`${batch.title} passer ${imageIndex + 1}`}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 76vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
                <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center rounded-full bg-surface/95 text-brand-black opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand aria-hidden="true" className="size-4" strokeWidth={1.8} />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs text-foreground-muted md:hidden">
        Swipe to browse · Tap an image to expand
      </p>

      <AnimatePresence>
      {lightboxIndex !== null ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${batch.title} image viewer`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLightbox();
            }
          }}
          className="fixed inset-0 z-[100] flex flex-col bg-brand-black/95 p-4 text-foreground-inverse backdrop-blur-sm sm:p-6"
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-heading text-lg font-semibold sm:text-xl">
                {batch.title}
              </p>
              <p className="mt-1 text-xs text-white/55" aria-live="polite">
                Image {lightboxIndex + 1} of {images.length}
              </p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close image viewer"
              onClick={closeLightbox}
              className="motion-press flex size-10 flex-none items-center justify-center rounded-full border border-white/15 bg-white/10 text-white hover:bg-white hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </button>
          </div>

          <div className="relative mx-auto mt-4 h-[min(76vh,54rem)] w-full max-w-6xl flex-1 overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={lightboxDirection}>
              <motion.div
                key={images[lightboxIndex]}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: lightboxDirection * 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: lightboxDirection * -14 }}
                transition={{ duration: 0.28 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[lightboxIndex]}
                  alt={`${batch.title} passer ${lightboxIndex + 1}`}
                  fill
                  priority
                  sizes="92vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 ? (
            <div className="mx-auto mt-4 flex w-full max-w-7xl items-center justify-center gap-3">
              <button
                type="button"
                aria-label="View previous image"
                onClick={() => {
                  setLightboxDirection(-1);
                  setLightboxIndex(
                    (lightboxIndex - 1 + images.length) % images.length,
                  );
                }}
                className="motion-press inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.8} />
                Previous
              </button>
              <button
                type="button"
                aria-label="View next image"
                onClick={() => {
                  setLightboxDirection(1);
                  setLightboxIndex((lightboxIndex + 1) % images.length);
                }}
                className="motion-press inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-semibold text-brand-black hover:bg-brand-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Next
                <ChevronRight aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </button>
            </div>
          ) : null}
        </motion.div>
      ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function PassersGallery({ batches, imageFolders }: PassersGalleryProps) {
  const [activeProgram, setActiveProgram] = useState<PasserProgram>(
    batches[0]?.program ?? "REE",
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const prefersReducedMotion = useReducedMotion();

  const availablePrograms = useMemo(
    () =>
      programTabs.filter((program) =>
        batches.some((batch) => batch.program === program.value),
      ),
    [batches],
  );

  const activeBatches = useMemo(
    () =>
      batches
        .filter((batch) => batch.program === activeProgram)
        .sort((first, second) => second.sortDate.localeCompare(first.sortDate)),
    [activeProgram, batches],
  );

  const visibleBatches = activeBatches.slice(0, visibleCount);
  const hasMore = visibleCount < activeBatches.length;

  const selectProgram = (program: PasserProgram) => {
    setActiveProgram(program);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="mx-auto max-w-[92rem] px-5 pb-16 pt-16 text-brand-black sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 border-b border-[rgba(11,11,11,0.12)] pb-8 sm:pb-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-sm font-normal italic text-brand-black">
              Passers Gallery
            </p>
            <h2 className="max-w-3xl font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              <span className="block">Browse passers by</span>
              <span className="block">board exam batch</span>
            </h2>
          </div>

          {availablePrograms.length > 1 ? (
            <div
              className="inline-flex w-fit rounded-full border border-[rgba(11,11,11,0.12)] bg-surface p-1 shadow-sm"
              role="tablist"
              aria-label="Passer program"
            >
              {availablePrograms.map((program) => {
                const isActive = activeProgram === program.value;

                return (
                  <button
                    key={program.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectProgram(program.value)}
                    className={`relative isolate overflow-hidden rounded-full px-4 py-2 text-xs font-bold transition-colors sm:px-5 sm:text-sm ${
                      isActive
                        ? "text-foreground-inverse"
                        : "text-foreground-muted hover:text-brand-black"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-passer-program"
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                        className="absolute inset-0 -z-10 rounded-full bg-brand-black"
                      />
                    ) : null}
                    <span className="relative z-10">{program.label}</span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </motion.div>

        <div className="divide-y divide-[rgba(11,11,11,0.12)]">
          {visibleBatches.map((batch) => {
            const images = imageFolders[batch.imageFolder] ?? [];

            return (
              <PasserBatchCarousel key={batch.id} batch={batch} images={images} />
            );
          })}
        </div>

        {hasMore ? (
          <div className="mt-10 flex justify-center sm:mt-12">
            <motion.button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-foreground-inverse transition-colors hover:bg-brand-charcoal hover:text-brand-orange"
            >
              See more
            </motion.button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
