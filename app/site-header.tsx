"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { FACEBOOK_PAGE_URL } from "./site-links";

export type NavigationItem = "home" | "programs" | "passers";

type SiteHeaderProps = {
  activeItem: NavigationItem;
  isHomePage?: boolean;
};

export function SiteHeader({
  activeItem,
  isHomePage = false,
}: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const navLinks: { href: string; label: string; value: NavigationItem }[] = [
    { href: isHomePage ? "#home" : "/", label: "Home", value: "home" },
    {
      href: "/ree-program",
      label: "Programs",
      value: "programs",
    },
    { href: "/passers", label: "Passers", value: "passers" },
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const linkClassName = (value: NavigationItem) =>
    `rounded-full px-3 py-2 text-[0.72rem] font-semibold transition-colors lg:px-4 lg:text-xs ${
      value === activeItem
        ? "text-brand-black"
        : "text-foreground-muted hover:text-brand-orange"
    }`;

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, delay: 0.08 }}
      className="absolute left-2 right-2 top-0 z-50 flex w-auto max-w-[50rem] -translate-y-[20%] items-center justify-between gap-2 rounded-full border border-white/80 bg-surface/95 px-2 py-2 shadow-[0_14px_40px_rgba(11,11,11,0.18)] backdrop-blur sm:left-1/2 sm:right-auto sm:w-[calc(100%-3rem)] sm:-translate-x-1/2 sm:px-3 lg:max-w-[58rem]"
    >
      <Link
        href={isHomePage ? "#home" : "/"}
        aria-label="Macapagal Review Center home"
        className="motion-press flex size-10 flex-none items-center justify-center rounded-full bg-surface text-foreground ring-1 ring-border sm:size-11"
        onClick={() => setIsMenuOpen(false)}
      >
        <Image
          src="/macapagal-logo.png"
          alt="Macapagal Review and Training Center logo"
          width={2048}
          height={2048}
          className="size-8 object-contain sm:size-9"
        />
      </Link>

      <nav
        aria-label="Main navigation"
        className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex lg:gap-2"
      >
        {navLinks.map((item) => (
          <Link
            key={item.value}
            href={item.href}
            aria-current={item.value === activeItem ? "page" : undefined}
            className={linkClassName(item.value)}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-none items-center gap-1.5 sm:gap-2">
        <a
          href={FACEBOOK_PAGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="motion-press whitespace-nowrap rounded-full bg-brand-black px-3 py-2.5 text-[0.62rem] font-bold text-foreground-inverse shadow-sm hover:bg-brand-charcoal hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black sm:px-5 sm:text-xs"
        >
          Inquire Now
        </a>

        <motion.button
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          className="flex size-10 items-center justify-center rounded-full border border-border text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black md:hidden"
        >
          {isMenuOpen ? (
            <X aria-hidden="true" className="size-4" strokeWidth={1.8} />
          ) : (
            <Menu aria-hidden="true" className="size-4" strokeWidth={1.8} />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-x-0 top-[calc(100%+0.6rem)] grid origin-top gap-1 rounded-[1.25rem] border border-white/80 bg-surface/98 p-2 shadow-[0_18px_45px_rgba(11,11,11,0.18)] backdrop-blur md:hidden"
          >
            {navLinks.map((item) => {
              const isActive = item.value === activeItem;

              return (
                <Link
                  key={item.value}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-black text-foreground-inverse"
                      : "text-foreground-muted hover:bg-background-muted hover:text-brand-black"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
