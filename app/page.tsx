import Image from "next/image";
import Link from "next/link";
import { EarlyBirdPromoModal } from "./early-bird-promo-modal";
import { HomePassersShowcase, type HomePasser } from "./home-passers-showcase";
import { HeroReveal, Reveal } from "./motion-primitives";
import { SiteHeader } from "./site-header";
import { FACEBOOK_PAGE_URL } from "./site-links";

const glanceMetrics = [
  {
    title: "Student Passers",
    value: "000+",
    caption: "Across the Philippines",
  },
  {
    title: "Schools Represented",
    value: "00+",
    caption: "Review-ready campus communities",
  },
  {
    title: "Review Batches",
    value: "00+",
    caption: "Guided board exam preparation",
  },
];

type WhyChooseIconName = "license" | "structure" | "practice" | "guidance";

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
    icon: "license",
    placement: "lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:self-end",
  },
  {
    number: "02",
    title: "All In Access. No Additional Fees.",
    description:
      "Whether you enroll in face to face or online review, you receive unlimited access to live lecture recordings, evaluation exams, and online review materials through your personal dashboard. Everything is included at no extra cost.",
    icon: "practice",
    placement: "lg:col-start-4 lg:col-end-7 lg:row-start-3 lg:self-end",
  },
  {
    number: "03",
    title: "Guidance Until You Get Your PRC License",
    description:
      "We stay with you from strategic review planning and PRC application filing through exam day, oath taking, and the steps after receiving your professional license.",
    icon: "guidance",
    placement: "lg:col-start-7 lg:col-end-10 lg:row-start-2 lg:self-start",
  },
  {
    number: "04",
    title: "Your Review, Organized in One LMS",
    description:
      "Our dedicated learning platform brings your lectures, reviewers, exam drills, evaluation results, and study progress together in one student workspace.",
    icon: "structure",
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

const successProofs: HomePasser[] = [
  {
    name: "Engr. Michael Tomas M. Par, RME",
    school: "FEU Institute of Technology · Batch 2011",
    batch: "2021 Registered Master Electrician Licensure Examination",
    credential: "10th Placer · 87% Board Exam Rating",
    storyType: "testimonial",
    story:
      "Hanggang ngayon hindi pa din ako makapaniwala. Mahirap kasi working at karamihan sa mga kasabayan ko ay fresh graduates, pero sa tulong ng Diyos, pumasa ako—nag-Top pa ako sa RME Board Exams. Di kayo mapapabayaan sa Macapagal Review; interactive sila magturo at talagang maiintindihan mo.",
    image: {
      src: "/passers/rme/2021/passer-001.jpg",
      alt: "Engr. Michael Tomas M. Par, 2021 RME board exam 10th placer",
    },
  },
  {
    name: "Kim Renz N. Maladaga, RME",
    batch: "September 2022 Registered Master Electrician Board Exam",
    credential:
      "10th Placer · 90.50% Board Exam Rating · Technical 89% · PEC 92%",
    storyType: "achievement",
    story:
      "Kim Renz N. Maladaga earned 10th place in the September 2022 Registered Master Electrician Board Exam, achieving a 90.50% overall rating with 89% in Technical subjects and 92% in PEC.",
    image: {
      src: "/passers/rme/september-2022/passer-005.jpg",
      alt: "Kim Renz N. Maladaga, September 2022 RME board exam 10th placer",
    },
  },
  {
    name: "Engr. Von Kleo Barsabal Marcuelo",
    school: "Central Philippine University · Cum Laude",
    batch: "April 2022 Registered Electrical Engineer Board Exam",
    credential: "6th Placer · 89% Board Exam Rating",
    storyType: "testimonial",
    story:
      "Thank you Macapagal Review and Training Center sa pagtulong sa akin para makamit yung pangarap kong maging Top. Sila Sir Macapagal at ibang teachers ay very approachable at parang pamilya na pwede mong i-trust during review. Isa sa nag-help talaga sa akin para maging Top ay ang materials at sobrang organized na pagtuturo.",
    image: {
      src: "/passers/ree/april-2022/passer-012.jpg",
      alt: "Engr. Von Kleo Barsabal Marcuelo, April 2022 REE board exam 6th placer",
    },
  },
];

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

function WhyChooseIcon({ name }: { name: WhyChooseIconName }) {
  if (name === "license") {
    return (
      <svg
        aria-hidden="true"
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="m3 8 9-4 9 4-9 4-9-4Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10v4.5c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M21 8v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "structure") {
    return (
      <svg
        aria-hidden="true"
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 5h6v6H5V5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M13 13h6v6h-6v-6Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 8h2a3 3 0 0 1 3 3v2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "practice") {
    return (
      <svg
        aria-hidden="true"
        className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 7h8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12h1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12h1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 12h1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16h1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16h1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 16h1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M4 5h16v11H8l-4 4V5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 9h8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 13h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
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
              src="/macapagal-hero-mobile.png"
              alt="Macapagal Review and Training Center one-take REE and RME passers"
              width={1086}
              height={1448}
              priority
              sizes="(max-width: 1023px) 100vw, 1px"
              className="block h-full w-full object-cover lg:hidden"
            />
            <Image
              src="/macapagal-hero.png"
              alt="Macapagal Review and Training Center one-take REE and RME passers banner"
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
            <h2 className="max-w-lg font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
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
                  className="flex min-h-[20rem] h-full flex-col rounded-lg border border-[rgba(185,147,90,0.10)] bg-[#fbfdff] p-6 sm:p-7"
                >
                  <h3 className="font-heading text-xl font-medium italic text-[#A98D63]">
                    {glanceMetrics[0].title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-full bg-[rgba(15,23,42,0.08)]"
                  />
                  <p className="mt-auto font-heading text-6xl font-semibold leading-none text-brand-black sm:text-7xl">
                    {glanceMetrics[0].value}
                  </p>
                  <p className="mt-4 max-w-52 text-sm leading-5 text-foreground-muted">
                    {glanceMetrics[0].caption}
                  </p>
                </article>
              </Reveal>

              <div className="grid gap-4 sm:col-span-2 lg:col-span-1">
                {glanceMetrics.slice(1).map((metric, index) => (
                  <Reveal key={metric.title} delay={0.18 + index * 0.07}>
                    <article className="flex min-h-[9.5rem] h-full flex-col rounded-lg border border-[rgba(185,147,90,0.10)] bg-[#fbfdff] p-6 sm:p-7">
                      <h3 className="font-heading text-lg font-medium italic text-[#A98D63]">
                        {metric.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-3 block h-px w-full bg-[rgba(15,23,42,0.08)]"
                      />
                      <p className="mt-auto font-heading text-4xl font-semibold leading-none text-brand-black sm:text-5xl">
                        {metric.value}
                      </p>
                      <p className="mt-3 max-w-52 text-xs leading-5 text-foreground-muted sm:text-sm">
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
              <h2 className="max-w-xl font-heading text-[2rem] font-semibold leading-tight text-foreground sm:text-5xl">
                <span className="block whitespace-nowrap">
                  Programs built for
                </span>
                <span className="block whitespace-nowrap">
                  one-take readiness
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
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold-bright">
                  Featured program
                </p>
                <h3 className="max-w-2xl font-heading text-[2.65rem] font-semibold leading-[0.95] text-foreground-inverse sm:text-5xl lg:text-6xl">
                  {featuredProgram.title}
                </h3>
                <p className="mt-4 text-sm font-semibold text-white/65">
                  {featuredProgram.fullName}
                </p>
                <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                  {featuredProgram.description}
                </p>
              </div>

              <Link
                href={featuredProgram.href}
                className="motion-press relative z-10 mt-12 inline-flex w-fit items-center gap-3 rounded-lg bg-surface py-2 pl-5 pr-2 text-sm font-semibold text-brand-black hover:bg-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
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
                className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full border border-[rgba(222,201,159,0.14)] transition-transform duration-500 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 group-focus-within:-translate-x-1 group-focus-within:-translate-y-1 group-focus-within:scale-105 motion-reduce:transform-none motion-reduce:transition-none sm:-bottom-20 sm:-right-20 sm:size-64"
              />

              <div className="relative z-10">
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                  Also available
                </p>
                <h3 className="font-heading text-3xl font-semibold leading-tight text-foreground-inverse sm:text-4xl">
                  {secondaryProgram.title}
                </h3>
                <p className="mt-3 text-sm font-semibold text-white/60">
                  {secondaryProgram.fullName}
                </p>
                <p className="mt-6 text-sm leading-6 text-white/60">
                  {secondaryProgram.description}
                </p>
              </div>

              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="motion-press relative z-10 mt-10 inline-flex w-fit items-center gap-3 rounded-lg bg-surface py-2 pl-5 pr-2 text-sm font-semibold text-brand-black hover:bg-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
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
                  <p className="mb-4 text-xs font-normal italic text-foreground-inverse">
                    Why choose us
                  </p>
                  <h2 className="max-w-4xl font-heading text-[1.45rem] font-semibold leading-tight text-foreground-inverse sm:text-5xl lg:text-[3.55rem] lg:leading-[0.98]">
                    <span className="block whitespace-nowrap">
                      A complete path for
                    </span>
                    <span className="block whitespace-nowrap">
                      one take readiness
                    </span>
                  </h2>
                </Reveal>

                <Reveal className="lg:col-start-3 lg:col-end-7 lg:row-start-2 lg:self-center" delay={0.08}>
                  <p className="max-w-md text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
                    More than a review center, Macapagal gives students a complete
                    support system. This includes a one take strategy, complete
                    resources, guidance from start to finish, and a dedicated
                    learning platform.
                  </p>
                </Reveal>

                {whyChooseReasons.map((reason, index) => (
                  <Reveal key={reason.number} className={reason.placement} delay={index * 0.07}>
                  <article
                    key={reason.number}
                    className="relative flex h-full min-h-[10rem] flex-col rounded-lg border border-white/12 bg-brand-black p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-white/20 hover:bg-[#151515] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-6 lg:min-h-[20rem]"
                  >
                    <p className="text-xs font-semibold text-brand-gold-bright">
                      {reason.number}
                    </p>

                    <div className="mt-6 text-foreground-inverse">
                      <WhyChooseIcon name={reason.icon} />
                    </div>

                    <h3 className="mt-4 font-heading text-base font-semibold leading-tight text-foreground-inverse">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-white/55">
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
                Topnotcher Success Stories
              </p>
              <h2 className="max-w-3xl font-heading text-[2.35rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.55rem] lg:leading-[0.98]">
                <span className="block">Topnotcher results</span>
                <span className="block">built through focused preparation</span>
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
