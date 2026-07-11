import { promises as fs } from "fs";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { PassersGallery, type PasserBatch } from "./passers-gallery";

export const metadata: Metadata = {
  title: "Passers | Macapagal Review Center",
  description:
    "Browse Macapagal Review and Training Center passers by REE and RME batch.",
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

const fallbackImages = [
  "/passers/graduate-portrait.png",
  "/passers/graduate-portrait-2.png",
  "/passers/graduate-portrait-3.png",
];

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const passerBatches: PasserBatch[] = [
  {
    id: "ree-batch-01",
    program: "REE",
    title: "April 2026 REELE Passers",
    sortDate: "2026-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "ree-batch-02",
    program: "REE",
    title: "REE Program Batch 02",
    sortDate: "2025-11-30",
    imageFolder: "batch-one",
  },
  {
    id: "ree-batch-03",
    program: "REE",
    title: "REE Program Batch 03",
    sortDate: "2025-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "ree-batch-04",
    program: "REE",
    title: "REE Program Batch 04",
    sortDate: "2024-11-30",
    imageFolder: "batch-one",
  },
  {
    id: "ree-batch-05",
    program: "REE",
    title: "REE Program Batch 05",
    sortDate: "2024-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "ree-batch-06",
    program: "REE",
    title: "REE Program Batch 06",
    sortDate: "2023-11-30",
    imageFolder: "batch-one",
  },
  {
    id: "ree-batch-07",
    program: "REE",
    title: "REE Program Batch 07",
    sortDate: "2023-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-01",
    program: "RME",
    title: "RME Program Batch 01",
    sortDate: "2026-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-02",
    program: "RME",
    title: "RME Program Batch 02",
    sortDate: "2025-11-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-03",
    program: "RME",
    title: "RME Program Batch 03",
    sortDate: "2025-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-04",
    program: "RME",
    title: "RME Program Batch 04",
    sortDate: "2024-11-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-05",
    program: "RME",
    title: "RME Program Batch 05",
    sortDate: "2024-04-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-06",
    program: "RME",
    title: "RME Program Batch 06",
    sortDate: "2023-11-30",
    imageFolder: "batch-one",
  },
  {
    id: "rme-batch-07",
    program: "RME",
    title: "RME Program Batch 07",
    sortDate: "2023-04-30",
    imageFolder: "batch-one",
  },
];

async function getPasserImages(folder: string) {
  const directory = path.join(process.cwd(), "public", "passers", folder);

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const images = entries
      .filter((entry) => {
        const extension = path.extname(entry.name).toLowerCase();

        return entry.isFile() && imageExtensions.has(extension);
      })
      .map((entry) => `/passers/${folder}/${entry.name}`)
      .sort((first, second) => first.localeCompare(second));

    return images.length > 0 ? images : fallbackImages;
  } catch {
    return fallbackImages;
  }
}

async function getImageFolders(batches: PasserBatch[]) {
  const folders = Array.from(new Set(batches.map((batch) => batch.imageFolder)));
  const folderEntries = await Promise.all(
    folders.map(async (folder) => [folder, await getPasserImages(folder)]),
  );

  return Object.fromEntries(folderEntries);
}

export default async function PassersPage() {
  const imageFolders = await getImageFolders(passerBatches);

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
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 text-[0.72rem] font-semibold transition-colors lg:px-4 lg:text-xs ${
                    item.href === "/passers"
                      ? "text-brand-black"
                      : "text-foreground-muted hover:text-brand-orange"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/#glance"
              className="flex-none whitespace-nowrap rounded-full bg-brand-black px-2.5 py-2.5 text-[0.62rem] font-bold text-foreground-inverse shadow-sm transition-colors hover:bg-brand-charcoal hover:text-brand-orange sm:px-5 sm:text-xs"
            >
              <span className="hidden sm:inline">Ask About Batch</span>
              <span className="sm:hidden">Ask</span>
            </Link>
          </header>

          <div className="relative flex min-h-[26rem] w-full flex-col justify-end overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black px-5 pb-10 pt-24 text-foreground-inverse sm:min-h-[30rem] sm:rounded-[2rem] sm:px-8 sm:pb-12 sm:pt-28 lg:px-12">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black via-brand-black/75 to-transparent" />

            <div className="relative z-20 max-w-5xl">
              <p className="mb-5 text-base font-semibold leading-tight text-brand-orange sm:text-2xl lg:text-3xl">
                Certified one-take results
              </p>
              <h1 className="max-w-5xl font-heading text-[3rem] font-black uppercase leading-[0.82] tracking-normal text-foreground-inverse sm:text-[5rem] lg:text-[7.5rem]">
                Passers
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                A running gallery of Macapagal review passers, organized by
                program and batch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PassersGallery batches={passerBatches} imageFolders={imageFolders} />

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
                <linearGradient
                  id="passers-footer-wordmark-gradient"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
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
                fill="url(#passers-footer-wordmark-gradient)"
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
