export type ReviewPackage = {
  title: string;
  tagline: string;
  duration: string;
  courses: string[];
};

export type ProgramDetail = {
  title: string;
  fullName: string;
  description: string;
  metrics: { label: string; value: string }[];
  overview: string[];
  packages: ReviewPackage[];
};

const reeMetrics = [
  { label: "Review packages", value: "3" },
  { label: "Complete review path", value: "5 mo" },
  { label: "Focused final coaching", value: "2 wk" },
];

const reePackages: ReviewPackage[] = [
  {
    title: "Complete Board Review Program",
    tagline: "Complete preparation from regular review through final coaching",
    duration: "5 months",
    courses: [
      "Regular Review Course",
      "Mock Board Exam 1",
      "Refresher Review Course",
      "Mock Board Exam 2",
      "Final Coaching",
    ],
  },
  {
    title: "Refresher Review Program",
    tagline: "For reviewees joining closer to the board exam",
    duration: "2 months",
    courses: [
      "Refresher Review Course",
      "Mock Board Exam 2",
      "Final Coaching",
      "Mastery Classes",
    ],
  },
  {
    title: "Final Coaching and Mastery Program",
    tagline: "For reviewees seeking focused preparation just before exam day",
    duration: "2 weeks",
    courses: ["Final Coaching", "Mastery Classes"],
  },
];

export const reeProgram: ProgramDetail = {
  title: "REE Review Program",
  fullName: "Registered Electrical Engineer",
  description:
    "A structured review path for electrical engineering graduates preparing for REE board exam readiness.",
  metrics: reeMetrics,
  overview: [
    "The REE Review Program is built around one-take readiness. Students learn current, efficient approaches that reach the solution without relying on unnecessarily long ten-step methods, while still strengthening the concepts behind every answer.",
    "Questionnaires are regularly created and refreshed by the review center's owner, giving students relevant practice sets instead of depending on the same recycled questions from one review cycle to the next.",
    "The Macapagal LMS keeps lecture recordings, reviewers, exam drills, evaluation results, and study materials together in one student workspace, making it easier to find what to study and stay organized throughout the review.",
  ],
  packages: reePackages,
};
