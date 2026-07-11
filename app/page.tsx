import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { EarlyBirdPromoModal } from "./early-bird-promo-modal";

const portraits = [
  {
    src: "/passers/graduate-portrait.png",
    alt: "Graduate portrait in academic gown with burgundy hood",
  },
  {
    src: "/passers/graduate-portrait-2.png",
    alt: "Graduate portrait in academic gown with orange hood",
  },
  {
    src: "/passers/graduate-portrait-3.png",
    alt: "Graduate portrait in academic gown with orange hood",
  },
];

const portraitRail = Array.from({ length: 9 }, (_, index) => index);

const navLinks = [
  {
    href: "#home",
    label: "Home",
  },
  {
    href: "/ree-program",
    label: "REE Program",
  },
  {
    href: "/rme-program",
    label: "RME Program",
  },
  {
    href: "/passers",
    label: "Passers",
  },
];

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
    title: "REE and RME Focus",
    description:
      "Review paths are separated by target license, so students can choose the preparation track that matches their board exam goal.",
    icon: "license",
    placement: "lg:col-start-1 lg:col-end-4 lg:row-start-3 lg:self-end",
  },
  {
    number: "02",
    title: "Structured Study Flow",
    description:
      "Lectures, refreshers, and guided practice help reviewees follow a clearer path instead of organizing everything alone.",
    icon: "structure",
    placement: "lg:col-start-4 lg:col-end-7 lg:row-start-3 lg:self-end",
  },
  {
    number: "03",
    title: "Board-Style Practice",
    description:
      "Problem solving, timed drills, and exam-style sets help reviewees prepare with board exam expectations in mind.",
    icon: "practice",
    placement: "lg:col-start-7 lg:col-end-10 lg:row-start-2 lg:self-start",
  },
  {
    number: "04",
    title: "Enrollment Guidance",
    description:
      "Students and parents can ask about batches, setup, and enrollment details before deciding which review path to take.",
    icon: "guidance",
    placement: "lg:col-start-10 lg:col-end-13 lg:row-start-3 lg:self-end",
  },
];

const programs = [
  {
    code: "REE",
    title: "REE Review Program",
    fullName: "Registered Electrical Engineer",
    href: "/ree-program",
    description:
      "A structured review track for electrical engineering graduates preparing for board exam fundamentals, problem solving, and timed practice.",
  },
  {
    code: "RME",
    title: "RME Review Program",
    fullName: "Registered Master Electrician",
    href: "/rme-program",
    description:
      "Focused preparation for master electrician candidates, with guided refreshers, practical exam drills, and board-style practice sets.",
  },
];

const successProof = {
  batch: "April 2026 REELE Passers",
  credential: "Certified 1-Take REE with Macapagal Review",
  name: "Engr. Franz Lester P. Salayo",
  school: "Southern Luzon State University",
  quote:
    "The words of affirmation and vision that the Macapagal team have for their reviewees is something I truly appreciate. It kept me going and made me believed talaga na kaya ko.",
  image: {
    src: "/passers/graduate-portrait.png",
    alt: "Engr. Franz Lester P. Salayo in graduation attire",
  },
};

const footerLinkGroups = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "#glance" },
      { label: "Why choose us", href: "#why-choose-us" },
      { label: "Passers", href: "/passers" },
    ],
  },
  {
    title: "Study With Us",
    links: [
      { label: "REE Review", href: "/ree-program" },
      { label: "RME Review", href: "/rme-program" },
      { label: "Enrollment guidance", href: "#contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Ask About Batch", href: "#glance" },
      { label: "View Passers", href: "/passers" },
      { label: "Contact", href: "#contact" },
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
        <path
          d="M5 5h6v6H5V5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
          <header className="absolute left-1/2 top-0 z-50 flex w-[calc(100%-2rem)] max-w-[50rem] -translate-x-1/2 -translate-y-[20%] items-center justify-between gap-2 rounded-full border border-white/80 bg-surface/95 px-2 py-2 shadow-[0_14px_40px_rgba(11,11,11,0.18)] backdrop-blur sm:w-[calc(100%-3rem)] sm:px-3 lg:max-w-[58rem]">
            <Link
              href="#home"
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
                  className="rounded-full px-3 py-2 text-[0.72rem] font-semibold text-foreground-muted transition-colors hover:text-brand-orange lg:px-4 lg:text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Link
              href="#glance"
              className="flex-none whitespace-nowrap rounded-full bg-brand-black px-2.5 py-2.5 text-[0.62rem] font-bold text-foreground-inverse shadow-sm transition-colors hover:bg-brand-charcoal hover:text-brand-orange sm:px-5 sm:text-xs"
            >
              <span className="hidden sm:inline">Ask About Batch</span>
              <span className="sm:hidden">Ask</span>
            </Link>
          </header>

          <div className="relative flex min-h-[calc(100svh-2rem)] w-full flex-col justify-end overflow-hidden rounded-[1.5rem] border border-white/10 bg-brand-black pt-24 sm:min-h-[calc(100svh-3rem)] sm:rounded-[2rem] sm:pt-28 lg:min-h-[calc(100svh-3.5rem)]">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-black via-brand-black/70 to-transparent" />

            <div className="relative z-30 mx-auto w-full px-4 text-center sm:px-8 lg:px-12">
              <p className="mx-auto mb-5 max-w-xs text-base font-semibold leading-tight text-brand-orange sm:max-w-none sm:text-2xl lg:mb-6 lg:text-3xl">
                One Take. One Goal. Your RE License.
              </p>

              <div className="relative left-1/2 mx-auto w-[118%] -translate-x-1/2">
                <h1 className="relative z-20 mx-auto flex w-full flex-col items-center overflow-visible bg-gradient-to-b from-white via-white/55 to-white/0 bg-clip-text font-heading font-black uppercase leading-[0.72] text-transparent">
                  <span className="block whitespace-nowrap text-[2.9rem] sm:text-[5.3rem] md:text-[6.9rem] lg:text-[10rem] xl:text-[12rem]">
                    MACAPAGAL
                  </span>
                  <span className="block whitespace-nowrap text-[2.15rem] sm:text-[4rem] md:text-[5.35rem] lg:text-[7.7rem] xl:text-[9.3rem]">
                    REVIEW CENTER
                  </span>
                </h1>
              </div>
            </div>

            <div className="pointer-events-none relative z-40 -mt-20 h-[13.5rem] w-full overflow-hidden sm:-mt-28 sm:h-[17rem] lg:-mt-44 lg:h-[21rem]">
              <div className="absolute inset-x-0 bottom-0 z-50 h-16 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent" />
              <div className="absolute bottom-[-1rem] left-1/2 flex w-max -translate-x-1/2 items-end justify-center sm:bottom-[-3.5rem] lg:bottom-[-3rem]">
                {portraitRail.map((portrait, index) => (
                  <div
                    key={portrait}
                    className={
                      index === 0
                        ? ""
                        : "-ml-[9rem] sm:-ml-[11.5rem] lg:-ml-[14rem]"
                    }
                  >
                    <Image
                      src={portraits[index % portraits.length].src}
                      alt={portraits[index % portraits.length].alt}
                      width={1600}
                      height={1600}
                      priority={index === 4}
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 19rem, 16rem"
                      className="h-auto w-[16rem] max-w-none [clip-path:inset(34%_0_0_0)] sm:w-[19rem] lg:w-[24rem]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="glance"
        className="relative mx-auto max-w-[92rem] overflow-hidden bg-background px-5 py-16 text-foreground sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.38fr] lg:items-end">
          <div className="lg:pb-6">
            <h2 className="max-w-lg font-heading text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              Macapagal at a glance
            </h2>
          </div>

          <div>
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-normal italic text-brand-black">
                About us
              </p>
              <p className="mt-4 text-base leading-7 text-brand-black sm:text-lg">
                Our numbers reflect more than scale. They represent the
                students guided, the results earned, and the review experience
                built over the years.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.92fr]">
              <article
                key={glanceMetrics[0].title}
                className="flex min-h-[20rem] flex-col rounded-lg border border-[rgba(185,147,90,0.10)] bg-[#fbfdff] p-6 sm:col-span-2 sm:p-7 lg:col-span-1"
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

              <div className="grid gap-4 sm:col-span-2 lg:col-span-1">
                {glanceMetrics.slice(1).map((metric) => (
                  <article
                    key={metric.title}
                    className="flex min-h-[9.5rem] flex-col rounded-lg border border-[rgba(185,147,90,0.10)] bg-[#fbfdff] p-6 sm:p-7"
                  >
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="programs"
        className="mx-auto max-w-[92rem] bg-background px-5 py-16 text-foreground sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
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
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-12">
            {programs.map((program) => (
              <article
                id={program.code.toLowerCase()}
                key={program.code}
                className="group relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-lg border border-brand-black bg-transparent p-6 transition-colors sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 z-0 w-0 bg-brand-black transition-all duration-500 ease-out group-hover:w-full"
                />

                <div className="relative z-10">
                  <h3 className="max-w-md font-heading text-3xl font-semibold leading-tight transition-colors group-hover:text-foreground-inverse sm:text-4xl">
                    {program.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-foreground-muted transition-colors group-hover:text-foreground-inverse/75">
                    {program.fullName}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-7 text-foreground-muted transition-colors group-hover:text-foreground-inverse/75">
                    {program.description}
                  </p>
                </div>

                <Link
                  href={program.href}
                  className="relative z-10 mt-10 inline-flex w-fit items-center gap-2 rounded-lg bg-brand-black py-1.5 pl-4 pr-1.5 text-xs font-semibold text-foreground-inverse transition-colors group-hover:bg-surface group-hover:text-brand-black"
                >
                  <span>View program</span>
                  <span
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-md bg-surface text-[0.7rem] font-bold text-brand-black transition-colors group-hover:bg-brand-black group-hover:text-foreground-inverse"
                  >
                    -&gt;
                  </span>
                </Link>
              </article>
            ))}
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
                <div className="lg:col-start-1 lg:col-end-8 lg:row-start-1">
                  <p className="mb-4 text-xs font-normal italic text-foreground-inverse">
                    Why choose us
                  </p>
                  <h2 className="max-w-4xl font-heading text-[1.45rem] font-semibold leading-tight text-foreground-inverse sm:text-5xl lg:text-[3.55rem] lg:leading-[0.98]">
                    <span className="block whitespace-nowrap">
                      A clearer path for
                    </span>
                    <span className="block whitespace-nowrap">
                      REE and RME preparation
                    </span>
                  </h2>
                </div>

                <p className="max-w-md text-sm leading-6 text-white/55 sm:text-base sm:leading-7 lg:col-start-3 lg:col-end-7 lg:row-start-2 lg:self-center">
                  Reviewees need more than lectures. They need a clear track,
                  disciplined practice, and enrollment guidance that makes the
                  next step easier to understand.
                </p>

                {whyChooseReasons.map((reason) => (
                  <article
                    key={reason.number}
                    className={`relative flex min-h-[10rem] flex-col rounded-lg border border-white/12 bg-brand-black p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,border-color,box-shadow] duration-300 hover:border-white/20 hover:bg-[#151515] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-6 lg:h-[14rem] ${reason.placement}`}
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
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-sm font-normal italic text-brand-black">
                Success Stories
              </p>
              <h2 className="max-w-3xl font-heading text-[2.35rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.55rem] lg:leading-[0.98]">
                <span className="block">Certified one-take</span>
                <span className="block">results from real passers</span>
              </h2>
            </div>

          </div>

          <article className="text-brand-black">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(10rem,0.2fr)] lg:gap-10">
              <div>
                <blockquote className="max-w-5xl">
                  <Quote
                    aria-hidden="true"
                    className="size-8 -scale-x-100 fill-brand-gold text-brand-gold sm:size-10"
                    strokeWidth={0}
                  />
                  <p className="mt-2 max-w-4xl pl-9 text-lg font-medium leading-[1.35] text-brand-black sm:pl-12 sm:text-xl lg:text-2xl">
                    {successProof.quote}
                  </p>
                </blockquote>
              </div>

              <div className="flex flex-col items-center justify-center gap-5 border-t border-[rgba(11,11,11,0.12)] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] text-sm font-semibold text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse"
                >
                  &lt;
                </button>

                <div
                  aria-label="Testimonial 1 of 3"
                  className="flex flex-col items-center gap-2"
                >
                  <span className="size-2 rounded-full bg-brand-black" />
                  <span className="size-2 rounded-full bg-brand-gold" />
                  <span className="size-2 rounded-full bg-[rgba(11,11,11,0.18)]" />
                </div>

                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="flex size-10 items-center justify-center rounded-full border border-[rgba(11,11,11,0.14)] text-sm font-semibold text-brand-black transition-colors hover:border-brand-black hover:bg-brand-black hover:text-foreground-inverse"
                >
                  &gt;
                </button>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-y-8 border-t border-[rgba(11,11,11,0.12)] pt-8 sm:flex-row sm:items-start sm:justify-between sm:gap-x-12 lg:gap-x-20">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-2xl font-semibold leading-tight text-brand-black sm:text-3xl">
                  {successProof.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase text-foreground-muted">
                  {successProof.school}
                </p>
                <p className="mt-4 text-sm font-semibold uppercase text-brand-black">
                  Batch of 2026
                </p>
                <p className="mt-1 text-sm font-semibold uppercase text-brand-black">
                  {successProof.credential}
                </p>
              </div>

              <div className="relative h-40 w-[120px] flex-none self-start overflow-hidden">
                <Image
                  src={successProof.image.src}
                  alt={successProof.image.alt}
                  width={1600}
                  height={1600}
                  sizes="120px"
                  className="absolute bottom-0 left-1/2 h-[116%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer
        id="contact"
        className="bg-background px-3 pb-3 pt-4 sm:px-5 sm:pb-5 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-4"
      >
        <div className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[1.5rem] bg-brand-black text-foreground-inverse ring-1 ring-white/10 sm:rounded-[2rem]">
          <div className="relative z-10 grid gap-10 px-6 pb-[clamp(8rem,26vw,24rem)] pt-8 sm:px-8 sm:pt-10 lg:grid-cols-[1.2fr_repeat(3,1fr)] lg:px-10 lg:pt-12">
            <div>
              <Link
                href="#home"
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
