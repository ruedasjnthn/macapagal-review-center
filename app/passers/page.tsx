import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "../site-header";
import { FACEBOOK_PAGE_URL } from "../site-links";
import {
  PassersGallery,
  type PasserBatch,
  type PasserImage,
  type PasserProgram,
} from "./passers-gallery";
import { StaggerGroup, StaggerItem } from "../motion-primitives";
import { HeroShapedImage } from "../hero-shaped-image";

export const metadata: Metadata = {
  title: "Passers | Macapagal Review Center",
  description:
    "Meet a selection of Macapagal Review and Training Center passers who chose to share their profiles and testimonials.",
};

const footerLinkGroups = [
  {
    title: "Study With Us",
    links: [
      { label: "REE Program", href: "/ree-program" },
      { label: "Passers", href: "/passers" },
    ],
  },
];

const PASSERS_GRAPHQL_URL = "https://portal.macapagalreview.com/graphql";

const GET_PASSER_BATCHES = `
  query GetPasserBatches {
    passerBatches(first: 100) {
      nodes {
        databaseId
        title
        passerType
        passerImages(first: 100) {
          nodes {
            databaseId
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

type PasserImagesResponse = {
  data?: {
    passerBatches?: {
      nodes?: Array<{
        databaseId: number;
        title: string;
        passerType?: string | null;
        passerImages?: {
          nodes?: Array<{
            databaseId: number;
            sourceUrl: string;
            altText?: string | null;
          }>;
        };
      }>;
    };
  };
  errors?: Array<{ message: string }>;
};

const monthNumbers: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function getProgram(passerType: string | null | undefined, title: string): PasserProgram {
  const normalizedPasserType = passerType?.trim().toUpperCase();

  if (normalizedPasserType === "REE" || normalizedPasserType === "RME") {
    return normalizedPasserType;
  }

  return /\bRME(?:LE)?\b/i.test(title) ? "RME" : "REE";
}

function getSortDate(title: string) {
  const year = title.match(/\b(20\d{2})\b/)?.[1] ?? "0000";
  const month = Object.entries(monthNumbers).find(([name]) =>
    new RegExp(`\\b${name}\\b`, "i").test(title),
  )?.[1] ?? "12";

  return `${year}-${month}-31`;
}

async function getPasserBatches(): Promise<PasserBatch[]> {
  try {
    const response = await fetch(PASSERS_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PASSER_BATCHES }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Passers API returned ${response.status}`);
    }

    const payload = (await response.json()) as PasserImagesResponse;

    if (payload.errors?.length) {
      throw new Error(payload.errors.map(({ message }) => message).join("; "));
    }

    return (payload.data?.passerBatches?.nodes ?? [])
      .map((batch): PasserBatch => ({
        id: String(batch.databaseId),
        program: getProgram(batch.passerType, batch.title),
        title: batch.title,
        sortDate: getSortDate(batch.title),
        images: (batch.passerImages?.nodes ?? [])
          .filter((image) => Boolean(image.sourceUrl))
          .map(
            (image): PasserImage => ({
              id: String(image.databaseId),
              src: image.sourceUrl,
              alt: image.altText?.trim() || batch.title,
            }),
          ),
      }))
      .filter((batch) => batch.images.length > 0);
  } catch (error) {
    console.error("Unable to load passer images from GraphQL:", error);
    return [];
  }
}

export default async function PassersPage() {
  const passerBatches = await getPasserBatches();

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative bg-background px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
        <div className="relative mx-auto max-w-[92rem]">
          <SiteHeader activeItem="passers" />

          <div className="relative flex w-full items-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black px-5 pb-10 pt-20 text-foreground-inverse sm:rounded-[2rem] sm:px-8 sm:pb-12 sm:pt-24 lg:aspect-[1672/941] lg:px-12 lg:py-14">
            <HeroShapedImage
              src="/passers-hero-unsplash.jpg"
              alt="A Southeast Asian graduate holding a diploma folder"
              objectPosition="44% center"
            />

            <div className="relative z-20 mx-auto w-full max-w-7xl lg:mx-0">
              <StaggerGroup className="mx-auto max-w-5xl text-center lg:mx-0 lg:max-w-[52%] lg:text-left">
                <StaggerItem>
                  <h1 className="max-w-5xl font-heading text-[3rem] font-black uppercase leading-[0.84] tracking-[-0.045em] text-foreground-inverse sm:text-[5rem] lg:text-[7.25rem]">
                    Passers
                  </h1>
                </StaggerItem>
                <StaggerItem>
                  <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg lg:mx-0">
                    Meet a selection of Macapagal review passers who chose to
                    share their profiles and testimonials.
                  </p>
                </StaggerItem>
                <StaggerItem className="mt-8 flex justify-center lg:justify-start">
                  <a
                    href={FACEBOOK_PAGE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="motion-press inline-flex min-h-12 items-center justify-center rounded-full bg-accent-red px-6 py-3 text-sm font-bold text-accent-red-foreground hover:bg-accent-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red sm:px-7 sm:text-base"
                  >
                    Inquire Now
                  </a>
                </StaggerItem>
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      <PassersGallery batches={passerBatches} />

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
                        className="w-fit text-sm text-white/55 transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={`${group.title}-${link.label}`}
                        href={link.href}
                        className="w-fit text-sm text-white/55 transition-colors hover:text-accent-red"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </nav>
              </div>
            ))}

            <div>
              <h2 className="text-sm font-semibold text-foreground-inverse">
                Follow Us
              </h2>
              <div className="mt-4 flex items-center gap-5 text-sm font-semibold uppercase">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 transition-colors hover:text-accent-red"
                >
                  Facebook
                </a>
              </div>
              <p className="mt-7 text-xs font-semibold uppercase text-white/55">
                Email Us
              </p>
              <a
                href="mailto:business.jonathanruedas@gmail.com"
                className="mt-3 block w-fit break-all text-sm font-semibold text-foreground-inverse transition-colors hover:text-accent-red"
              >
                business.jonathanruedas@gmail.com
              </a>
            </div>
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
