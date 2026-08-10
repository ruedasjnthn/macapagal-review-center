import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, LayoutDashboard, PackageCheck, Target } from "lucide-react";
import { CountUp } from "./count-up";
import { EarlyBirdPromoModal } from "./early-bird-promo-modal";
import { HomePassersShowcase, type HomePasser } from "./home-passers-showcase";
import { HeroReveal, Reveal } from "./motion-primitives";
import { SiteHeader } from "./site-header";
import { FACEBOOK_PAGE_URL } from "./site-links";

const glanceMetrics = [
  {
    title: "Student Passers",
    value: 1000,
    suffix: "+",
    caption: "Across the Philippines",
  },
  {
    title: "Schools Represented",
    value: 50,
    suffix: "+",
    caption: "Review-ready campus communities",
  },
  {
    title: "Review Batches",
    value: 25,
    suffix: "+",
    caption: "Guided board exam preparation",
  },
];

type WhyChooseIconName =
  | "one-take"
  | "all-access"
  | "license-guidance"
  | "learning-platform";

const whyChooseReasons: {
  number: string;
  title: string;
  description: string;
  icon: WhyChooseIconName;
  placement: string;
}[] = [
  {
    number: "01",
    title: "One Take Review Program",
    description:
      "Designed for every kind of board exam taker, from honor graduates to students rebuilding their foundations. With the right guidance and strategy, every reviewee gets a clear path toward topping or passing the board exam in one take.",
    icon: "one-take",
    placement: "lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:self-end",
  },
  {
    number: "02",
    title: "All In Access. No Additional Fees.",
    description:
      "Whether you enroll in face to face or online review, you receive unlimited access to live lecture recordings, evaluation exams, and online review materials through your personal dashboard. Everything is included at no extra cost.",
    icon: "all-access",
    placement: "lg:col-start-4 lg:col-end-7 lg:row-start-3 lg:self-end",
  },
  {
    number: "03",
    title: "Guidance Until You Get Your PRC License",
    description:
      "We stay with you from strategic review planning and PRC application filing through exam day, oath taking, and the steps after receiving your professional license.",
    icon: "license-guidance",
    placement: "lg:col-start-7 lg:col-end-10 lg:row-start-2 lg:self-start",
  },
  {
    number: "04",
    title: "Your Review, Organized in One LMS",
    description:
      "Our dedicated learning platform brings your lectures, reviewers, exam drills, evaluation results, and study progress together in one student workspace.",
    icon: "learning-platform",
    placement: "lg:col-start-10 lg:col-end-13 lg:row-start-3 lg:self-end",
  },
];

const featuredProgram = {
  code: "REE",
  title: "REE Review Program",
  fullName: "Registered Electrical Engineer",
  href: "/ree-program",
  description:
    "A structured review track for electrical engineering graduates preparing for board exam fundamentals, problem solving, and timed practice.",
};

const secondaryProgram = {
  code: "RME",
  title: "RME Review Program",
  fullName: "Registered Master Electrician",
  description:
    "Focused preparation for master electrician candidates through guided refreshers, practical drills, and board-style practice.",
};

const fallbackSuccessProofs: HomePasser[] = [
  {
    name: "Engr. Cedie Mara A. Magno",
    school: "University of the Philippines Los Baños · Batch 2024",
    batch: "August 2024 Registered Electrical Engineer Licensure Examination",
    credential: "2nd Placer",
    storyType: "testimonial",
    story:
      "I am forever grateful to Macapagal Review Center for their unwavering support to us enrollees during our review period. Board exam level lang yung difficulty ng mga practice problems nila dito kaya nakakaboost ng self-esteem kasi kayang kaya masolve! I consider niyo po itong Macapagal kung naghahanap kayo ng RC. Maganda ang emotional support ng mga instructors at marami kayong matututunan na lumalabas talaga sa actual boards.",
  },
  {
    name: "Engr. Ma. Julianna A. Torres",
    school: "University of the Philippines Los Baños · Batch 2024",
    batch: "August 2024 Registered Electrical Engineer Licensure Examination",
    credential: "7th Placer",
    storyType: "testimonial",
    story:
      "Maraming salamat Macapagal Review and Training Center sa pagbibigay ng magaan pero effective na review experience sa akin. Sobrang laking tulong ng review style at positive energy niyo para gumaan at tumatag ang loob ko para sa examination. Grabe ang pag-aalaga sa reviewees! Super grateful ako sa inyo and more power, MRTC. Happy po akong makabawi through being a topnotcher.",
  },
  {
    name: "Engr. John Dominic A. Agoncillo",
    school: "University of the Philippines Los Baños",
    batch: "April 2024 Registered Electrical Engineer Licensure Examination",
    credential: "4th Placer",
    storyType: "testimonial",
    story:
      "Nag-start akong mag-review for board exam way back January 2024 and itong Macapagal Review and Training Center ang aking pinasok. Hinding-hindi ako nagkamali sa pagpili sa MRTC kasi naging super helpful sila sa akin as someone na fresh grad. Ang dami kong natutunan na bago, pati shortcuts and techniques na nagamit ko sa boards. Super thankful ako na MRTC yung naging avenue ko for achieving my dreams.",
  },
  {
    name: "Engr. Adrian B. Ramos",
    school: "University of the Philippines Los Baños",
    batch: "April 2024 Registered Electrical Engineer Licensure Examination",
    credential: "7th Placer",
    storyType: "testimonial",
    story:
      "MRTC na magpo-provide sa iyo ng mga necessary materials for you to pass the boards. They will also help you strategize what topics to focus on that will maximize your chances of passing. They also provide guidance and tips sa mga do's and don'ts sa actual exam, which is very helpful. All you have to do is attend the class and prepare for quizzes and preboards.",
  },
  {
    name: "Engr. Chrizelle Alexis Kue Amyan",
    school: "University of the Philippines Los Baños",
    batch: "April 2024 Registered Electrical Engineer Licensure Examination",
    credential: "10th Placer",
    storyType: "testimonial",
    story:
      "Marami akong natutunan sa Macapagal Review Center. Sobrang bait ng kanilang instructors na sina Engr. Jervin at Engr. Clark at talagang marami silang maibabahaging techniques sa kanilang reviewees. Yung difficulty ng pre-board examinations nila ay kapareho na rin ng actual board exam. I can vouch that they will guide you from the start of the review until the day of your actual board exam.",
  },
  {
    name: "Engr. Lemuel Jan Naval, RME",
    school: "Batangas State University",
    batch: "April 2024 Registered Master Electrician Licensure Examination",
    credential: "9th Placer",
    storyType: "testimonial",
    story:
      "They truly serve quality and easy-to-absorb teaching methods and reviewers, always direct to the point while making learning enjoyable with sensible puns and mnemonics. Dito ko napatunayan na hindi ako nagkamali sa pagpili sa kanila. Nagawa kong maipasa nang malumanay ang dalawang eksaminasyong REE at RME at pinalad pa na maging RME topnotcher.",
  },
  {
    name: "Engr. Amiel Ohween B. Anay, RME",
    school: "Technological University of the Philippines Manila",
    batch: "September 2023 Registered Master Electrician Licensure Examination",
    credential: "7th Placer",
    storyType: "testimonial",
    story:
      "During my review, malaking tulong po ang mga reliable practice exams and pagiging kalmado ni Engr. Jervin sa pagtuturo. May 24/7 chat support at kahit anong itanong tungkol sa review and pag-file ng boards ay masasagot. The learning environment ay nakakaboost ng morale at nakakasipag dahil nahihimay-himay ang bawat discussion. Solid talaga sa Macapagal Review ang bawat explanation at may actual real-life scenarios kapag nag-e-explain.",
  },
];

const PASSERS_GRAPHQL_URL = "https://portal.macapagalreview.com/graphql";

const GET_PASSERS = `
  query GetPassers {
    passers(first: 100) {
      nodes {
        title
        achievement
        ranking
        school
        batchYear
        testimonial
      }
    }
  }
`;

const GET_HOMEPAGE_HERO = `
  query GetHomepageHero {
    homepageContents(first: 1) {
      nodes {
        heroDesktopImage {
          node {
            sourceUrl
            altText
          }
        }
        heroMobileImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

type PassersResponse = {
  data?: {
    passers?: {
      nodes?: Array<{
        title?: string | null;
        achievement?: string | null;
        ranking?: string | null;
        school?: string | null;
        batchYear?: string | number | null;
        testimonial?: string | null;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
};

type HomepageHeroResponse = {
  data?: {
    homepageContents?: {
      nodes?: Array<{
        heroDesktopImage?: {
          node?: { sourceUrl?: string | null; altText?: string | null } | null;
        } | null;
        heroMobileImage?: {
          node?: { sourceUrl?: string | null; altText?: string | null } | null;
        } | null;
      }>;
    };
  };
  errors?: Array<{ message: string }>;
};

type HeroImage = {
  src: string;
  alt: string;
};

type HomepageHeroImages = {
  desktop: HeroImage;
  mobile: HeroImage;
};

const fallbackHeroImages: HomepageHeroImages = {
  desktop: {
    src: "/macapagal-hero.png",
    alt: "Macapagal Review and Training Center one-take REE and RME passers banner",
  },
  mobile: {
    src: "/macapagal-hero-mobile.png",
    alt: "Macapagal Review and Training Center one-take REE and RME passers",
  },
};

async function getHomePassers(): Promise<HomePasser[]> {
  try {
    const response = await fetch(PASSERS_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PASSERS }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Passers API returned ${response.status}`);
    }

    const payload = (await response.json()) as PassersResponse;

    if (payload.errors?.length) {
      throw new Error(payload.errors.map(({ message }) => message).join("; "));
    }

    const passers = (payload.data?.passers?.nodes ?? [])
      .filter(
        (passer) =>
          Boolean(passer.title?.trim()) && Boolean(passer.testimonial?.trim()),
      )
      .map(
        (passer): HomePasser => ({
          name: passer.title!.trim(),
          school: [
            passer.school?.trim(),
            passer.batchYear ? `Batch ${passer.batchYear}` : undefined,
          ]
            .filter(Boolean)
            .join(" · "),
          batch: passer.achievement?.trim() || "",
          credential: passer.ranking?.trim() || "",
          story: passer.testimonial!
            .replace(/<[^>]*>/g, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/&amp;/gi, "&")
            .replace(/&quot;/gi, '"')
            .replace(/&#(?:0*39|x0*27);/gi, "'")
            .replace(/\s+/g, " ")
            .trim(),
          storyType: "testimonial",
        }),
      );

    return passers.length > 0 ? passers : fallbackSuccessProofs;
  } catch (error) {
    console.error("Unable to load homepage passers from GraphQL:", error);
    return fallbackSuccessProofs;
  }
}

async function getHomepageHeroImages(): Promise<HomepageHeroImages> {
  try {
    const response = await fetch(PASSERS_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_HOMEPAGE_HERO }),
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Homepage content API returned ${response.status}`);
    }

    const payload = (await response.json()) as HomepageHeroResponse;

    if (payload.errors?.length) {
      throw new Error(payload.errors.map(({ message }) => message).join("; "));
    }

    const content = payload.data?.homepageContents?.nodes?.[0];
    const desktop = content?.heroDesktopImage?.node;
    const mobile = content?.heroMobileImage?.node;

    return {
      desktop: {
        src: desktop?.sourceUrl?.trim() || fallbackHeroImages.desktop.src,
        alt: desktop?.altText?.trim() || fallbackHeroImages.desktop.alt,
      },
      mobile: {
        src: mobile?.sourceUrl?.trim() || fallbackHeroImages.mobile.src,
        alt: mobile?.altText?.trim() || fallbackHeroImages.mobile.alt,
      },
    };
  } catch (error) {
    console.error("Unable to load homepage hero images from GraphQL:", error);
    return fallbackHeroImages;
  }
}

const footerLinkGroups = [
  {
    title: "Study With Us",
    links: [
      { label: "REE Program", href: "/ree-program" },
      { label: "Passers", href: "/passers" },
    ],
  },
];

function WhyChooseIcon({ name }: { name: WhyChooseIconName }) {
  const icons = {
    "one-take": Target,
    "all-access": PackageCheck,
    "license-guidance": BadgeCheck,
    "learning-platform": LayoutDashboard,
  };
  const Icon = icons[name];

  return <Icon aria-hidden="true" className="size-6" strokeWidth={1.7} />;
}

export default async function Home() {
  const [successProofs, heroImages] = await Promise.all([
    getHomePassers(),
    getHomepageHeroImages(),
  ]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <EarlyBirdPromoModal />

      <section
        id="home"
        className="relative bg-background px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5"
      >
        <div className="relative mx-auto max-w-[92rem]">
          <SiteHeader activeItem="home" isHomePage />

          <HeroReveal className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black sm:rounded-[2rem] lg:aspect-auto">
            <Image
              src={heroImages.mobile.src}
              alt={heroImages.mobile.alt}
              width={1086}
              height={1448}
              priority
              sizes="(max-width: 1023px) 100vw, 1px"
              className="block h-full w-full object-cover lg:hidden"
            />
            <Image
              src={heroImages.desktop.src}
              alt={heroImages.desktop.alt}
              width={1672}
              height={941}
              priority
              sizes="(min-width: 1536px) 92rem, (min-width: 1024px) 100vw, 1px"
              className="hidden h-auto w-full object-fill lg:block"
            />
          </HeroReveal>
        </div>
      </section>

      <section
        id="glance"
        className="relative mx-auto max-w-[92rem] overflow-hidden bg-background px-5 py-16 text-foreground sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.38fr] lg:items-end">
          <Reveal className="lg:pb-6">
            <h2 className="max-w-lg font-heading text-[2.2rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
              Macapagal at a glance
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-normal italic text-brand-black">
                About us
              </p>
              <p className="mt-4 text-base leading-7 text-brand-black sm:text-lg">
                Our numbers reflect more than scale. They represent the students
                guided, the results earned, and the review experience built over
                the years.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.92fr]">
              <Reveal className="sm:col-span-2 lg:col-span-1" delay={0.12}>
                <article
                  key={glanceMetrics[0].title}
                  className="flex min-h-[20rem] h-full flex-col rounded-lg border border-accent-red/10 bg-[#fbfdff] p-6 sm:p-7"
                >
                  <h3 className="font-heading text-xl font-medium italic text-accent-red">
                    {glanceMetrics[0].title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-full bg-[rgba(15,23,42,0.08)]"
                  />
                  <p className="mt-auto font-heading text-6xl font-semibold leading-none text-brand-black sm:text-7xl">
                    <CountUp
                      value={glanceMetrics[0].value}
                      suffix={glanceMetrics[0].suffix}
                    />
                  </p>
                  <p className="mt-4 max-w-52 text-sm leading-5 text-foreground-muted">
                    {glanceMetrics[0].caption}
                  </p>
                </article>
              </Reveal>

              <div className="grid gap-4 sm:col-span-2 lg:col-span-1">
                {glanceMetrics.slice(1).map((metric, index) => (
                  <Reveal key={metric.title} delay={0.18 + index * 0.07}>
                    <article className="flex min-h-[9.5rem] h-full flex-col rounded-lg border border-accent-red/10 bg-[#fbfdff] p-6 sm:p-7">
                      <h3 className="font-heading text-lg font-medium italic text-accent-red">
                        {metric.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-px w-full bg-[rgba(15,23,42,0.08)]"
                      />
                      <p className="mt-5 font-heading text-4xl font-semibold leading-none text-brand-black sm:mt-6 sm:text-5xl">
                        <CountUp value={metric.value} suffix={metric.suffix} />
                      </p>
                      <p className="mt-3 max-w-52 text-sm leading-6 text-foreground-muted">
                        {metric.caption}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="programs"
        className="mx-auto max-w-[92rem] bg-background px-5 py-16 text-foreground sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-xl">
            <div>
              <p className="mb-4 text-sm font-normal italic text-brand-black">
                Our Programs
              </p>
              <h2 className="max-w-xl font-heading text-[2.2rem] font-semibold leading-tight text-foreground sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
                <span className="block sm:whitespace-nowrap">
                  Programs built for
                </span>
                <span className="block sm:whitespace-nowrap">
                  one take readiness
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,1.65fr)_minmax(17rem,0.75fr)] lg:mt-12">
            <Reveal>
            <article
              id={featuredProgram.code.toLowerCase()}
              className="group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-lg border border-brand-black bg-brand-black p-6 text-foreground-inverse shadow-[0_20px_50px_rgba(11,11,11,0.12)] sm:p-8 lg:min-h-[28rem] lg:p-10"
            >
              <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-white/10 transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none sm:size-96" />
              <div className="relative z-10">
                <p className="mb-6 text-sm font-normal italic text-foreground-inverse">
                  Featured program
                </p>
                <h3 className="max-w-2xl font-heading text-[2.65rem] font-semibold leading-[0.95] text-foreground-inverse sm:text-5xl lg:text-6xl">
                  {featuredProgram.title}
                </h3>
                <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                  {featuredProgram.description}
                </p>
              </div>

              <Link
                href={featuredProgram.href}
                className="motion-press group relative z-10 mt-12 inline-flex w-fit items-center gap-3 rounded-lg bg-accent-red py-2 pl-5 pr-2 text-sm font-bold text-accent-red-foreground hover:bg-accent-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red"
              >
                <span>View REE Program</span>
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-md bg-brand-black text-xs font-bold text-foreground-inverse"
                >
                  -&gt;
                </span>
              </Link>
            </article>
            </Reveal>

            <Reveal delay={0.08}>
            <article
              id={secondaryProgram.code.toLowerCase()}
              className="group relative flex h-full min-h-[20rem] scroll-mt-24 flex-col justify-between overflow-hidden rounded-lg border border-brand-black bg-brand-black p-6 text-foreground-inverse sm:p-7 md:min-h-full"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full border border-white/10 transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 group-focus-within:-translate-x-1 group-focus-within:-translate-y-1 group-focus-within:scale-105 motion-reduce:transform-none motion-reduce:transition-none sm:-bottom-20 sm:-right-20 sm:size-64"
              />

              <div className="relative z-10">
                <p className="mb-6 text-sm font-normal italic text-foreground-inverse">
                  Also available
                </p>
                <h3 className="font-heading text-3xl font-semibold leading-tight text-foreground-inverse sm:text-4xl">
                  {secondaryProgram.title}
                </h3>
                <p className="mt-6 text-base leading-7 text-white/65">
                  {secondaryProgram.description}
                </p>
              </div>

              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press group relative z-10 mt-10 inline-flex w-fit items-center gap-3 rounded-lg bg-accent-red py-2 pl-5 pr-2 text-sm font-bold text-accent-red-foreground hover:bg-accent-red-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-red"
              >
                <span>Ask About RME</span>
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-md bg-brand-black text-xs font-bold text-foreground-inverse"
                >
                  -&gt;
                </span>
              </a>
            </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="why-choose-us"
        className="relative bg-background px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8"
      >
        <div className="relative mx-auto max-w-[92rem]">
          <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-brand-black px-5 py-10 text-foreground-inverse sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-14 lg:py-14">
            <div className="relative z-10 mx-auto max-w-7xl">
              <div className="grid gap-6 lg:min-h-[36rem] lg:grid-cols-12 lg:grid-rows-[auto_minmax(12rem,1fr)_auto] lg:gap-x-4 lg:gap-y-8">
                <Reveal className="lg:col-start-1 lg:col-end-8 lg:row-start-1">
                  <p className="mb-4 text-sm font-normal italic text-foreground-inverse">
                    Why choose us
                  </p>
                  <h2 className="max-w-4xl font-heading text-[2.2rem] font-semibold leading-tight text-foreground-inverse sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
                    <span className="block sm:whitespace-nowrap">
                      A complete path for
                    </span>
                    <span className="block sm:whitespace-nowrap">
                      one take readiness
                    </span>
                  </h2>
                </Reveal>

                <Reveal className="lg:col-start-3 lg:col-end-7 lg:row-start-2 lg:self-center" delay={0.08}>
                  <p className="max-w-md text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                    More than a review center, Macapagal gives students a complete
                    support system. This includes a one take strategy, complete
                    resources, guidance from start to finish, and a dedicated
                    learning platform.
                  </p>
                </Reveal>

                {whyChooseReasons.map((reason, index) => (
                  <Reveal
                    key={reason.number}
                    className={`${reason.placement} w-full`}
                    delay={index * 0.07}
                  >
                  <article
                    key={reason.number}
                    className="relative flex h-[28rem] w-full flex-col overflow-hidden rounded-lg border border-white/12 bg-brand-black p-5 pb-7 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-white/20 hover:bg-[#151515] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-6 sm:pb-8"
                  >
                    <p className="text-xs font-semibold text-accent-red">
                      {reason.number}
                    </p>

                    <div className="mt-6 text-foreground-inverse">
                      <WhyChooseIcon name={reason.icon} />
                    </div>

                    <h3 className="mt-4 font-heading text-lg font-semibold leading-tight text-foreground-inverse sm:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/65 sm:text-base sm:leading-7">
                      {reason.description}
                    </p>
                  </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="passers"
        className="relative mx-auto max-w-[92rem] bg-background px-5 py-16 text-brand-black sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-sm font-normal italic text-brand-black">
                Success Stories
              </p>
              <h2 className="max-w-3xl font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
                <span className="block">Top the boards with</span>
                <span className="block">proven methods and guidance</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <HomePassersShowcase passers={successProofs} />
          </Reveal>
        </div>
      </section>

      <footer
        id="contact"
        className="bg-background px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-4"
      >
        <div className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-brand-black text-foreground-inverse ring-1 ring-white/10 sm:rounded-[2rem]">
          <div className="relative z-10 grid gap-10 px-6 pb-[clamp(8rem,26vw,24rem)] pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[1.2fr_repeat(2,1fr)] lg:px-10 lg:pt-12">
            <div>
              <Link
                href="#home"
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
                  id="footer-wordmark-gradient"
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
                fill="url(#footer-wordmark-gradient)"
                fontSize="190"
                fontWeight="900"
                style={{
                  fontFamily:
                    "var(--font-heading), Arial, Helvetica, sans-serif",
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
