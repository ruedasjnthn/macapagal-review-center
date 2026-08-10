"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
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

export type PasserImage = {
  id: string;
  src: string;
  alt: string;
};

export type PasserBatch = {
  id: string;
  program: PasserProgram;
  title: string;
  sortDate: string;
  images: PasserImage[];
};

type PassersGalleryProps = {
  batches: PasserBatch[];
};

const PAGE_SIZE = 5;

const programTabs: { value: PasserProgram; label: string }[] = [
  { value: "REE", label: "REE Program" },
  { value: "RME", label: "RME Program" },
];

type PasserBatchCarouselProps = {
  batch: PasserBatch;
  images: PasserImage[];
};

function PasserBatchCarousel({ batch, images }: PasserBatchCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
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

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      thumbnailRefs.current[lightboxIndex]?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lightboxIndex, prefersReducedMotion]);

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
        </div>

        {images.length > 1 ? (
          <div className="hidden items-center gap-2 md:flex">
            <motion.button
              type="button"
              aria-label={`Previous images in ${batch.title}`}
              disabled={!canScrollPrevious}
              onClick={() => scrollCarousel(-1)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] bg-transparent text-brand-black transition-colors hover:border-accent-red hover:bg-accent-red hover:text-accent-red-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red disabled:cursor-not-allowed disabled:border-[rgba(11,11,11,0.14)] disabled:text-brand-black disabled:opacity-30 disabled:hover:border-[rgba(11,11,11,0.14)] disabled:hover:bg-transparent disabled:hover:text-brand-black"
            >
              <ChevronLeft aria-hidden="true" className="size-4" strokeWidth={1.8} />
            </motion.button>
            <motion.button
              type="button"
              aria-label={`Next images in ${batch.title}`}
              disabled={!canScrollNext}
              onClick={() => scrollCarousel(1)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
              className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] bg-transparent text-brand-black transition-colors hover:border-accent-red hover:bg-accent-red hover:text-accent-red-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red disabled:cursor-not-allowed disabled:border-[rgba(11,11,11,0.14)] disabled:text-brand-black disabled:opacity-30 disabled:hover:border-[rgba(11,11,11,0.14)] disabled:hover:bg-transparent disabled:hover:text-brand-black"
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
        className={`mt-6 overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-7 ${
          isDragging ? "cursor-grabbing snap-none select-none" : "cursor-grab snap-x"
        }`}
      >
        <ul className="flex gap-2 pb-2 pr-5 sm:gap-4 sm:pr-8 lg:pr-12">
          {images.map((image, imageIndex) => (
            <motion.li
              key={`${batch.id}-${image.id}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.42, delay: Math.min(imageIndex * 0.04, 0.24) }}
              className="w-[calc((100vw-5.5rem)/3)] flex-none snap-start sm:w-[18rem] lg:w-[20rem]"
            >
              <button
                type="button"
                aria-label={`Open ${batch.title} passer ${imageIndex + 1}`}
                onClick={(event) => openLightbox(imageIndex, event.currentTarget)}
                className="motion-press group relative block aspect-square w-full overflow-hidden rounded-lg bg-background-muted text-left ring-1 ring-[rgba(11,11,11,0.08)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, calc((100vw - 5.5rem) / 3)"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20 group-focus-visible:bg-black/20"
                />
                <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-brand-black/55 text-white opacity-0 shadow-sm backdrop-blur-sm transition-[border-color,opacity,transform] duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 aria-hidden="true" className="size-5" strokeWidth={1.8} />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

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
            <div className="mx-auto flex w-full max-w-7xl flex-none items-center justify-between gap-4">
              <p className="min-w-0 truncate font-heading text-lg font-semibold sm:text-xl">
                {batch.title}
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close image viewer"
                onClick={closeLightbox}
                className="motion-press flex size-10 flex-none items-center justify-center rounded-full border border-white/35 bg-brand-black/55 text-white hover:border-accent-red hover:bg-accent-red hover:text-accent-red-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red"
              >
                <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="relative mx-auto mt-4 min-h-0 w-full max-w-6xl flex-1 overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={lightboxDirection}>
                <motion.div
                  key={images[lightboxIndex].id}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: lightboxDirection * 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: lightboxDirection * -14 }}
                  transition={{ duration: 0.28 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[lightboxIndex].src}
                    alt={images[lightboxIndex].alt}
                    fill
                    priority
                    sizes="(min-width: 1280px) 72rem, 94vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="View previous image"
                    onClick={() => {
                      setLightboxDirection(-1);
                      setLightboxIndex(
                        (lightboxIndex - 1 + images.length) % images.length,
                      );
                    }}
                    className="motion-press absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-brand-black/55 text-white shadow-lg backdrop-blur-sm hover:border-accent-red hover:bg-accent-red hover:text-accent-red-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red sm:left-4 sm:size-12"
                  >
                    <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    aria-label="View next image"
                    onClick={() => {
                      setLightboxDirection(1);
                      setLightboxIndex((lightboxIndex + 1) % images.length);
                    }}
                    className="motion-press absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-brand-black/55 text-white shadow-lg backdrop-blur-sm hover:border-accent-red hover:bg-accent-red hover:text-accent-red-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red sm:right-4 sm:size-12"
                  >
                    <ChevronRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
                  </button>
                </>
              ) : null}
            </div>

            <div className="mx-auto mt-3 w-full max-w-6xl flex-none sm:mt-4">
              <div
                aria-label={`${batch.title} image thumbnails`}
                className="flex touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((image, imageIndex) => {
                  const isActiveThumbnail = imageIndex === lightboxIndex;

                  return (
                    <button
                      key={`lightbox-thumbnail-${batch.id}-${image.id}`}
                      ref={(node) => {
                        thumbnailRefs.current[imageIndex] = node;
                      }}
                      type="button"
                      aria-label={`View ${image.alt}`}
                      aria-pressed={isActiveThumbnail}
                      onClick={() => {
                        setLightboxDirection(imageIndex >= lightboxIndex ? 1 : -1);
                        setLightboxIndex(imageIndex);
                      }}
                      className={`motion-press group relative aspect-square w-14 flex-none snap-center overflow-hidden rounded-md border-2 bg-background-muted transition-colors duration-200 sm:w-16 ${
                        isActiveThumbnail
                          ? "border-accent-red"
                          : "border-white/20 hover:border-white/45"
                      } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red`}
                    >
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="4rem"
                        className="object-cover"
                      />
                      {!isActiveThumbnail ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-white/15 transition-colors duration-200 group-hover:bg-white/5"
                        />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function PassersGallery({ batches }: PassersGalleryProps) {
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
    <section
      id="passer-stories"
      className="mx-auto max-w-[92rem] scroll-mt-6 px-5 pb-16 pt-16 text-brand-black sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24"
    >
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
              Shared Passer Stories
            </p>
            <h2 className="max-w-3xl font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              <span className="block">Explore shared profiles</span>
              <span className="block">by board exam batch</span>
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
                    className={`relative isolate overflow-hidden rounded-full px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red sm:px-5 sm:text-sm ${
                      isActive
                        ? "text-accent-red-foreground"
                        : "text-foreground-muted hover:text-accent-red"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-passer-program"
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                        className="absolute inset-0 -z-10 rounded-full bg-accent-red"
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
            return (
              <PasserBatchCarousel key={batch.id} batch={batch} images={batch.images} />
            );
          })}
        </div>

        {batches.length === 0 ? (
          <p className="py-16 text-center text-sm text-foreground-muted">
            Passer images are temporarily unavailable. Please check back soon.
          </p>
        ) : null}

        {hasMore ? (
          <div className="mt-10 flex justify-center sm:mt-12">
            <motion.button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full bg-accent-red px-6 py-3 text-sm font-bold text-accent-red-foreground transition-colors hover:bg-accent-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red"
            >
              See more
            </motion.button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
