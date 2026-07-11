export type ProgramCode = "REE" | "RME";

export type StudyMode = {
  title: "Full Online" | "Hybrid" | "Full Face-to-Face";
  bestFor: string;
  setup: string;
  support: string;
};

export type ProgramDetail = {
  code: ProgramCode;
  path: string;
  title: string;
  fullName: string;
  description: string;
  metrics: { label: string; value: string }[];
  overview: string[];
  modes: StudyMode[];
  inclusions: string[];
};

const sharedMetrics = [
  { label: "Successful passers", value: "000+" },
  { label: "Review batches", value: "00+" },
  { label: "Study modes", value: "3" },
];

const sharedStudyModes: StudyMode[] = [
  {
    title: "Full Online",
    bestFor: "Reviewees who need a remote setup with a structured study rhythm.",
    setup:
      "Online-led review sessions, digital coordination, and guided independent study.",
    support:
      "Students stay connected through batch updates, review guidance, and practice checkpoints.",
  },
  {
    title: "Hybrid",
    bestFor:
      "Students who want online flexibility with selected face-to-face review support.",
    setup:
      "A blended path for remote preparation plus scheduled in-person reinforcement.",
    support:
      "Designed for students who need structure while balancing location, school, or work demands.",
  },
  {
    title: "Full Face-to-Face",
    bestFor:
      "Reviewees who learn best through classroom routines and direct in-person guidance.",
    setup:
      "On-site review sessions with guided discussion, practice, and review-center coordination.",
    support:
      "Students get a more consistent classroom environment for questions, drills, and accountability.",
  },
];

const sharedInclusions = [
  "Core lecture refreshers",
  "Review materials and study guides",
  "Board-style problem solving",
  "Timed drills and practice sets",
  "Mock exam preparation",
  "Batch coordination and announcements",
  "Coaching and review guidance",
  "Enrollment assistance",
];

export const programDetails: Record<ProgramCode, ProgramDetail> = {
  REE: {
    code: "REE",
    path: "/ree-program",
    title: "REE Review Program",
    fullName: "Registered Electrical Engineer",
    description:
      "A structured review path for electrical engineering graduates preparing for REE board exam readiness.",
    metrics: sharedMetrics,
    overview: [
      "The REE Review Program is built for electrical engineering graduates who need a clear route from refresher study to board-style practice.",
      "Students work through fundamentals, problem-solving routines, timed preparation, and guided review support so they can prepare with more structure and confidence.",
    ],
    modes: sharedStudyModes,
    inclusions: sharedInclusions,
  },
  RME: {
    code: "RME",
    path: "/rme-program",
    title: "RME Review Program",
    fullName: "Registered Master Electrician",
    description:
      "A focused preparation track for master electrician candidates who need guided review, practice, and board-style readiness.",
    metrics: sharedMetrics,
    overview: [
      "The RME Review Program is designed for candidates preparing for the Registered Master Electrician board exam with a practical and guided study flow.",
      "Students get structured refreshers, practice support, and review-center guidance to keep preparation organized from enrollment through final review.",
    ],
    modes: sharedStudyModes,
    inclusions: sharedInclusions,
  },
};
