import Image from "next/image";
import Link from "next/link";
import type { ProgramDetail } from "./program-detail-data";
import { Reveal, StaggerGroup, StaggerItem } from "./motion-primitives";
import { SiteHeader } from "./site-header";
import { FACEBOOK_PAGE_URL } from "./site-links";

type ProgramDetailPageProps = {
  program: ProgramDetail;
};

const footerLinkGroups = [
  {
    title: "Study With Us",
    links: [
      { label: "REE Program", href: "/ree-program" },
      { label: "Passers", href: "/passers" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Facebook", href: FACEBOOK_PAGE_URL, external: true },
      { label: "mac21@gmail.com", href: "mailto:mac21@gmail.com", external: true },
    ],
  },
];

export function ProgramDetailPage({ program }: ProgramDetailPageProps) {
  const gradientId = "ree-footer-wordmark-gradient";

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative bg-background px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
        <div className="relative mx-auto max-w-[92rem]">
          <SiteHeader activeItem="programs" />

          <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black px-5 pb-10 pt-28 text-foreground-inverse sm:rounded-[2rem] sm:px-8 sm:pb-12 sm:pt-32 lg:px-12 lg:pb-14 lg:pt-36">
            <StaggerGroup className="relative z-20 max-w-5xl">
              <StaggerItem>
                <p className="mb-5 text-base font-semibold leading-tight text-brand-orange sm:text-2xl lg:text-3xl">
                  {program.fullName}
                </p>
              </StaggerItem>
              <StaggerItem>
                <h1 className="max-w-5xl font-heading text-[2.55rem] font-black uppercase leading-[0.86] tracking-normal text-foreground-inverse sm:text-[4.75rem] lg:text-[6.8rem]">
                  {program.title}
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                  {program.description}
                </p>
              </StaggerItem>

              <StaggerItem className="mt-8 flex flex-wrap gap-3">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-press inline-flex items-center justify-center rounded-full bg-surface px-5 py-3 text-sm font-bold text-brand-black hover:bg-brand-gold"
                >
                  Inquire Now
                </a>
                <Link
                  href="/passers"
                  className="motion-press inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-foreground-inverse hover:border-brand-gold hover:text-brand-gold"
                >
                  View Passers
                </Link>
              </StaggerItem>
            </StaggerGroup>

          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] bg-background px-5 py-16 text-brand-black sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-4 text-sm font-normal italic text-brand-black">
              Program Overview
            </p>
          </Reveal>

          <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start">
            <Reveal className="lg:w-[41%] lg:flex-none">
              <h2 className="max-w-xl font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
                Built around one-take readiness
              </h2>
            </Reveal>

            <Reveal className="max-w-4xl flex-1 lg:max-w-none" delay={0.08}>
              <div className="grid gap-5 text-base leading-7 text-foreground-muted sm:text-lg sm:leading-8">
                {program.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] bg-background px-5 pb-16 text-brand-black sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8 max-w-3xl">
            <p className="mb-4 text-sm font-normal italic text-brand-black">
              Review Packages
            </p>
            <h2 className="font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              Choose the preparation path that fits your timeline
            </h2>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-12">
            {program.packages.map((reviewPackage, packageIndex) => {
              const isFeatured = packageIndex === 0;

              return (
                <Reveal
                  key={reviewPackage.title}
                  className={isFeatured ? "lg:col-span-12" : "lg:col-span-6"}
                  delay={packageIndex * 0.07}
                >
                <article
                  className={`relative h-full overflow-hidden rounded-lg border p-6 sm:p-8 ${
                    isFeatured
                      ? "border-brand-gold/40 bg-brand-black text-foreground-inverse"
                      : "border-brand-black bg-brand-black text-foreground-inverse"
                  }`}
                >
                  <div className="relative z-10">
                    <div className="flex justify-end">
                      <p className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/75">
                        {reviewPackage.duration}
                      </p>
                    </div>

                    <div
                      className={
                        isFeatured
                          ? "mt-10 grid gap-8 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:items-end"
                          : "mt-10"
                      }
                    >
                      <div>
                        <h3
                          className={`font-heading font-semibold leading-tight ${
                            isFeatured
                              ? "text-4xl text-foreground-inverse sm:text-5xl"
                              : "text-3xl text-foreground-inverse sm:text-4xl"
                          }`}
                        >
                          {reviewPackage.title}
                        </h3>
                        <p className="mt-3 text-sm font-semibold text-white/60">
                          {reviewPackage.tagline}
                        </p>
                      </div>

                      <div className={isFeatured ? "" : "mt-10"}>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-bright">
                          Course coverage
                        </p>
                        <ol
                          className="mt-4 grid border-t border-white/12"
                        >
                          {reviewPackage.courses.map((course, courseIndex) => (
                            <li
                              key={course}
                              className="group flex min-h-16 items-center gap-4 border-b border-white/12 py-4 text-sm leading-6 text-white/70 transition-colors hover:text-white"
                            >
                              <span
                                aria-hidden="true"
                                className="w-8 flex-none text-xs font-bold tracking-[0.14em] text-brand-gold-bright transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
                              >
                                {String(courseIndex + 1).padStart(2, "0")}
                              </span>
                              <span>{course}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                  </div>
                </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-brand-black px-5 py-10 text-foreground-inverse sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-12">
          <Reveal className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-sm font-normal italic text-foreground-inverse">
                Enrollment Guidance
              </p>
              <h2 className="max-w-3xl font-heading text-[2.2rem] font-semibold leading-tight text-foreground-inverse sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
                Choose your review setup with the Macapagal team
              </h2>
            </div>
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-press inline-flex w-fit items-center justify-center rounded-full bg-surface px-6 py-3 text-sm font-bold text-brand-black hover:bg-brand-gold"
            >
              Inquire Now
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="bg-background px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-4">
        <div className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-brand-black text-foreground-inverse ring-1 ring-white/10 sm:rounded-[2rem]">
          <div className="relative z-10 grid gap-10 px-6 pb-[clamp(8rem,26vw,24rem)] pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[1.2fr_repeat(2,1fr)] lg:px-10 lg:pt-12">
            <div>
              <Link
                href="/"
                className="flex size-16 items-center justify-center rounded-full bg-surface p-2 text-brand-black ring-1 ring-white/15 sm:size-20 lg:size-24"
              >
                <Image
                  src="/macapagal-logo.png"
                  alt="Macapagal Review and Training Center logo"
                  width={2048}
                  height={2048}
                  className="size-full object-contain"
                />
              </Link>
              <p className="mt-4 max-w-52 text-sm leading-6 text-white/55 sm:mt-5 lg:mt-6">
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
                    "external" in link && link.external ? (
                      <a
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-fit text-sm text-white/55 transition-colors hover:text-brand-gold"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        className="w-fit text-sm text-white/55 transition-colors hover:text-brand-gold"
                      >
                        {link.label}
                      </Link>
                    )
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
