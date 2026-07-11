import Image from "next/image";
import Link from "next/link";
import type { ProgramDetail } from "./program-detail-data";

type ProgramDetailPageProps = {
  program: ProgramDetail;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ree-program", label: "REE Program" },
  { href: "/rme-program", label: "RME Program" },
  { href: "/passers", label: "Passers" },
];

const footerLinkGroups = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/#glance" },
      { label: "Why choose us", href: "/#why-choose-us" },
      { label: "Passers", href: "/passers" },
    ],
  },
  {
    title: "Study With Us",
    links: [
      { label: "REE Review", href: "/ree-program" },
      { label: "RME Review", href: "/rme-program" },
      { label: "Enrollment guidance", href: "/#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Ask About Batch", href: "/#glance" },
      { label: "View Passers", href: "/passers" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function ProgramDetailPage({ program }: ProgramDetailPageProps) {
  const gradientId = `${program.code.toLowerCase()}-footer-wordmark-gradient`;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative bg-background px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
        <div className="relative mx-auto max-w-[92rem]">
          <header className="absolute left-1/2 top-0 z-50 flex w-[calc(100%-2rem)] max-w-[50rem] -translate-x-1/2 -translate-y-[20%] items-center justify-between gap-2 rounded-full border border-white/80 bg-surface/95 px-2 py-2 shadow-[0_14px_40px_rgba(11,11,11,0.18)] backdrop-blur sm:w-[calc(100%-3rem)] sm:px-3 lg:max-w-[58rem]">
            <Link
              href="/"
              className="flex size-10 flex-none items-center justify-center rounded-full bg-surface text-foreground ring-1 ring-border sm:size-11"
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
              {navLinks.map((item) => {
                const isActive = item.href === program.path;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-2 text-[0.72rem] font-semibold transition-colors lg:px-4 lg:text-xs ${
                      isActive
                        ? "text-brand-black"
                        : "text-foreground-muted hover:text-brand-orange"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/#glance"
              className="flex-none whitespace-nowrap rounded-full bg-brand-black px-2.5 py-2.5 text-[0.62rem] font-bold text-foreground-inverse shadow-sm transition-colors hover:bg-brand-charcoal hover:text-brand-orange sm:px-5 sm:text-xs"
            >
              <span className="hidden sm:inline">Ask About Batch</span>
              <span className="sm:hidden">Ask</span>
            </Link>
          </header>

          <div className="relative grid min-h-[34rem] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black px-5 pb-8 pt-24 text-foreground-inverse sm:min-h-[38rem] sm:rounded-[2rem] sm:px-8 sm:pb-10 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end lg:gap-10 lg:px-12">
            <div className="relative z-20 max-w-5xl">
              <p className="mb-5 text-base font-semibold leading-tight text-brand-orange sm:text-2xl lg:text-3xl">
                {program.fullName}
              </p>
              <h1 className="max-w-5xl font-heading text-[2.55rem] font-black uppercase leading-[0.86] tracking-normal text-foreground-inverse sm:text-[4.75rem] lg:text-[6.8rem]">
                {program.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                {program.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#glance"
                  className="inline-flex items-center justify-center rounded-full bg-surface px-5 py-3 text-sm font-bold text-brand-black transition-colors hover:bg-brand-gold"
                >
                  Ask About Batch
                </Link>
                <Link
                  href="/passers"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-foreground-inverse transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  View Passers
                </Link>
              </div>
            </div>

            <div className="relative z-20 mt-10 grid gap-3 sm:grid-cols-3 lg:mt-0 lg:grid-cols-1">
              {program.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-white/12 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <p className="font-heading text-4xl font-semibold leading-none text-foreground-inverse">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-white/55">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] bg-background px-5 py-16 text-brand-black sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-normal italic text-brand-black">
              Program Overview
            </p>
            <h2 className="max-w-xl font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              Built for focused board exam preparation
            </h2>
          </div>

          <div className="grid gap-5 text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
            {program.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] bg-background px-5 pb-16 text-brand-black sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-4 text-sm font-normal italic text-brand-black">
              Study Options
            </p>
            <h2 className="font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              Choose the setup that fits your review season
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {program.modes.map((mode) => (
              <article
                key={mode.title}
                className="flex min-h-[22rem] flex-col rounded-lg border border-[rgba(11,11,11,0.14)] bg-surface p-6 sm:p-7"
              >
                <h3 className="font-heading text-2xl font-semibold leading-tight text-brand-black">
                  {mode.title}
                </h3>
                <div className="mt-6 grid gap-5 text-sm leading-6 text-foreground-muted">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
                      Best for
                    </p>
                    <p className="mt-2">{mode.bestFor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
                      Setup
                    </p>
                    <p className="mt-2">{mode.setup}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">
                      Support
                    </p>
                    <p className="mt-2">{mode.support}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] bg-background px-5 pb-16 text-brand-black sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-4 text-sm font-normal italic text-brand-black">
              Inclusions
            </p>
            <h2 className="font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              What students can expect in the review
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {program.inclusions.map((inclusion) => (
              <div
                key={inclusion}
                className="flex min-h-28 items-end rounded-lg border border-[rgba(11,11,11,0.12)] bg-[#fbfdff] p-5"
              >
                <p className="text-sm font-semibold leading-5 text-brand-black">
                  {inclusion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-brand-black px-5 py-10 text-foreground-inverse sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-sm font-normal italic text-foreground-inverse">
                Enrollment Guidance
              </p>
              <h2 className="max-w-3xl font-heading text-[2.2rem] font-semibold leading-tight text-foreground-inverse sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
                Choose your review setup with the Macapagal team
              </h2>
            </div>
            <Link
              href="/#glance"
              className="inline-flex w-fit items-center justify-center rounded-full bg-surface px-6 py-3 text-sm font-bold text-brand-black transition-colors hover:bg-brand-gold"
            >
              Ask About Batch
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-background px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-4">
        <div className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-brand-black text-foreground-inverse ring-1 ring-white/10 sm:rounded-[2rem]">
          <div className="relative z-10 grid gap-10 px-6 pb-[clamp(8rem,26vw,24rem)] pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[1.2fr_repeat(3,1fr)] lg:px-10 lg:pt-12">
            <div>
              <Link
                href="/"
                className="flex size-24 items-center justify-center rounded-full bg-surface p-2 text-brand-black ring-1 ring-white/15"
              >
                <Image
                  src="/macapagal-logo.png"
                  alt="Macapagal Review and Training Center logo"
                  width={2048}
                  height={2048}
                  className="size-full object-contain"
                />
              </Link>
              <p className="mt-6 max-w-52 text-sm leading-6 text-white/55">
                Board exam review for future licensed electrical professionals.
              </p>
            </div>

            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-foreground-inverse">
                  {group.title}
                </h2>
                <nav aria-label={group.title} className="mt-4 grid gap-2">
                  {group.links.map((link) => (
                    <Link
                      key={`${group.title}-${link.label}`}
                      href={link.href}
                      className="w-fit text-sm text-white/55 transition-colors hover:text-brand-gold"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 select-none"
          >
            <svg
              viewBox="0 0 1000 260"
              className="block aspect-[1000/260] w-full"
              role="presentation"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                  <stop offset="58%" stopColor="rgba(255,255,255,0.45)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <text
                x="0.5"
                y="196"
                textLength="999"
                lengthAdjust="spacingAndGlyphs"
                fill={`url(#${gradientId})`}
                fontSize="190"
                fontWeight="900"
                style={{
                  fontFamily: "var(--font-heading), Arial, Helvetica, sans-serif",
                }}
              >
                Macapagal
              </text>
            </svg>
          </div>
        </div>
      </footer>
    </main>
  );
}
