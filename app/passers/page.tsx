import { promises as fs } from "fs";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import path from "path";
import { SiteHeader } from "../site-header";
import { FACEBOOK_PAGE_URL } from "../site-links";
import { PassersGallery, type PasserBatch } from "./passers-gallery";
import { StaggerGroup, StaggerItem } from "../motion-primitives";

export const metadata: Metadata = {
  title: "Passers | Macapagal Review Center",
  description:
    "Browse Macapagal Review and Training Center passers by REE and RME batch.",
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

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const passerBatches: PasserBatch[] = [
  {
    id: "april-2026-reele",
    program: "REE",
    title: "April 2026 REELE Passers",
    sortDate: "2026-04-30",
    imageFolder: "ree/april-2026",
  },
  {
    id: "august-2025-reele",
    program: "REE",
    title: "August 2025 REELE Passers",
    sortDate: "2025-08-31",
    imageFolder: "ree/august-2025",
  },
  {
    id: "april-2025-reele",
    program: "REE",
    title: "April 2025 REELE Passers",
    sortDate: "2025-04-30",
    imageFolder: "ree/april-2025",
  },
  {
    id: "august-2024-reele",
    program: "REE",
    title: "August 2024 REELE Passers",
    sortDate: "2024-08-31",
    imageFolder: "ree/august-2024",
  },
  {
    id: "april-2024-reele",
    program: "REE",
    title: "April 2024 REELE Passers",
    sortDate: "2024-04-30",
    imageFolder: "ree/april-2024",
  },
  {
    id: "september-2023-reele",
    program: "REE",
    title: "September 2023 REELE Passers",
    sortDate: "2023-09-30",
    imageFolder: "ree/september-2023",
  },
  {
    id: "april-2023-reele",
    program: "REE",
    title: "April 2023 REELE Passers",
    sortDate: "2023-04-30",
    imageFolder: "ree/april-2023",
  },
  {
    id: "september-2022-reele",
    program: "REE",
    title: "September 2022 REELE Passers",
    sortDate: "2022-09-30",
    imageFolder: "ree/september-2022",
  },
  {
    id: "april-2022-reele",
    program: "REE",
    title: "April 2022 REELE Passers",
    sortDate: "2022-04-30",
    imageFolder: "ree/april-2022",
  },
  {
    id: "september-2021-reele",
    program: "REE",
    title: "September 2021 REELE Passers",
    sortDate: "2021-09-30",
    imageFolder: "ree/september-2021",
  },
  {
    id: "september-2022-rmele",
    program: "RME",
    title: "September 2022 RMELE Passers",
    sortDate: "2022-09-30",
    imageFolder: "rme/september-2022",
  },
  {
    id: "april-2022-rmele",
    program: "RME",
    title: "April 2022 RMELE Passers",
    sortDate: "2022-04-30",
    imageFolder: "rme/april-2022",
  },
  {
    id: "2021-rmele",
    program: "RME",
    title: "2021 RMELE Passers",
    sortDate: "2021-12-31",
    imageFolder: "rme/2021",
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

    return images;
  } catch {
    return [];
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
          <SiteHeader activeItem="passers" />

          <div className="relative flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black px-5 pb-10 pt-28 text-foreground-inverse sm:rounded-[2rem] sm:px-8 sm:pb-12 sm:pt-32 lg:px-12 lg:pb-14 lg:pt-36">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-black via-brand-black/75 to-transparent" />

            <div className="relative z-20 mx-auto w-full max-w-7xl">
              <StaggerGroup className="max-w-5xl">
                <StaggerItem>
                  <p className="mb-5 text-base font-semibold leading-tight text-brand-orange sm:text-2xl lg:text-3xl">
                    Certified one-take results
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <h1 className="max-w-5xl font-heading text-[3rem] font-black uppercase leading-[0.82] tracking-normal text-foreground-inverse sm:text-[5rem] lg:text-[7.5rem]">
                    Passers
                  </h1>
                </StaggerItem>
                <StaggerItem>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
                    A running gallery of Macapagal review passers, organized by
                    program and batch.
                  </p>
                </StaggerItem>
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      <PassersGallery batches={passerBatches} imageFolders={imageFolders} />

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
