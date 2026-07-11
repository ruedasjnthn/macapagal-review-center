"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const PROMO_SESSION_KEY = "macapagal-early-bird-promo-dismissed";
const FACEBOOK_RESERVATION_URL =
  "https://www.facebook.com/MacapagalReviewAndTrainingCenter";

export function EarlyBirdPromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(PROMO_SESSION_KEY) !== "true") {
      setIsOpen(true);
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
  }, [isOpen]);

  const dismissModal = () => {
    window.sessionStorage.setItem(PROMO_SESSION_KEY, "true");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/70 px-4 py-6 backdrop-blur-sm sm:px-6"
      onClick={dismissModal}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="early-bird-promo-title"
        aria-describedby="early-bird-promo-description"
        className="relative w-full max-w-[34rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black p-6 text-foreground-inverse shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-8"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          type="button"
          aria-label="Close early bird promo"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-brand-gold hover:text-brand-gold"
          onClick={dismissModal}
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
        </button>

        <p className="pr-12 text-sm font-normal italic text-brand-gold">
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
          Get <span className="font-semibold text-brand-gold">50% off</span>{" "}
          when you reserve your slot for the next review batch.
        </p>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
          Limited slots only. Promo ends once slots are filled.
        </p>

        <a
          href={FACEBOOK_RESERVATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-surface px-6 py-3 text-sm font-bold text-brand-black transition-colors hover:bg-brand-gold sm:w-auto"
          onClick={dismissModal}
        >
          Reserve My Slot
        </a>
      </section>
    </div>
  );
}
