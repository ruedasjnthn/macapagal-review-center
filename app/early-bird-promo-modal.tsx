"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FACEBOOK_PAGE_URL } from "./site-links";

const PROMO_SESSION_KEY = "macapagal-early-bird-promo-dismissed";

export function EarlyBirdPromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const dismissModal = useCallback(() => {
    window.sessionStorage.setItem(PROMO_SESSION_KEY, "true");
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (window.sessionStorage.getItem(PROMO_SESSION_KEY) !== "true") {
      const animationFrame = window.requestAnimationFrame(() => setIsOpen(true));

      return () => window.cancelAnimationFrame(animationFrame);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dismissModal, isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/70 px-4 py-6 backdrop-blur-sm sm:px-6"
          onClick={dismissModal}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-bird-promo-title"
            aria-describedby="early-bird-promo-description"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.32 }}
            className="relative w-full max-w-[34rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black p-6 text-foreground-inverse shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-8"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
        <button
          type="button"
          aria-label="Close early bird promo"
          className="motion-press absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:border-accent-red hover:text-accent-red"
          onClick={dismissModal}
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </button>

        <p className="pr-12 text-sm font-normal italic text-accent-red">
          Early Bird Promo
        </p>
        <h2
          id="early-bird-promo-title"
          className="mt-4 max-w-md font-heading text-3xl font-semibold leading-tight text-foreground-inverse sm:text-5xl"
        >
          Few Slots Left for Early Bird Promo
        </h2>
        <p
          id="early-bird-promo-description"
          className="mt-5 max-w-md text-base leading-7 text-white/70 sm:text-lg"
        >
          Get <span className="font-semibold text-accent-red">50% off</span>{" "}
          when you reserve your slot for the next review batch.
        </p>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
          Limited slots only. Promo ends once slots are filled.
        </p>

        <a
          href={FACEBOOK_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="motion-press mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent-red px-6 py-3 text-sm font-bold text-accent-red-foreground hover:bg-accent-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red sm:w-auto"
          onClick={dismissModal}
        >
          Reserve My Slot
        </a>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
