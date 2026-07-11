import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  BookOpen,
  ChevronDown,
  ClipboardList,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  MessageCircleQuestion,
  Plus,
  UserRound,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
};

type Stat = {
  label: string;
  value: number;
  icon: LucideIcon;
};

const studentNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "My Profile", icon: UserRound },
  { label: "Enrolled Courses", icon: BookOpen },
  { label: "My Quiz Attempts", icon: ClipboardList },
  { label: "Question & Answer", icon: MessageCircleQuestion },
];

const instructorNav: NavItem[] = [
  { label: "My Courses", icon: Bookmark },
  { label: "Announcements", icon: Megaphone },
  { label: "Quiz Attempts", icon: ClipboardList },
  { label: "Zoom", icon: Video },
];

const stats: Stat[] = [
  { label: "Enrolled Courses", value: 0, icon: BookOpen },
  { label: "Active Courses", value: 0, icon: GraduationCap },
  { label: "Total Students", value: 0, icon: Users },
  { label: "Completed Modules", value: 0, icon: ClipboardList },
  { label: "Practice Tests", value: 0, icon: Gauge },
  { label: "Q&A Threads", value: 0, icon: MessageCircleQuestion },
];

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-3 sm:px-8">
        <Link href="/" className="inline-flex items-center" aria-label="Macapagal Review Center home">
          <span className="inline-flex size-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface">
            <Image
              src="/macapagal-logo.png"
              alt=""
              width={32}
              height={32}
              className="size-8 object-contain"
            />
          </span>
        </Link>

        <button
          type="button"
          aria-label="Open user menu"
          className="inline-flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 text-sm text-foreground transition-colors hover:border-brand-black"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-black font-heading text-sm font-bold text-brand-gold">
            J
          </span>
          <ChevronDown aria-hidden="true" className="size-4 text-foreground-muted" strokeWidth={1.6} />
        </button>
      </header>

      <section className="bg-background-muted px-6 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              aria-hidden="true"
              className="inline-flex size-20 items-center justify-center rounded-full bg-brand-black font-heading text-3xl font-bold text-brand-gold"
            >
              J
            </div>
            <h1 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
              Jonathan
            </h1>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-brand-black px-5 py-2.5 text-sm font-bold text-foreground-inverse transition-colors hover:bg-brand-gold hover:text-brand-black"
          >
            <Plus aria-hidden="true" className="size-4" strokeWidth={2} />
            New Course
          </button>
        </div>
      </section>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* TODO mobile nav toggle */}
        <aside className="border-b border-border bg-surface px-4 py-6 lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
          <nav aria-label="Dashboard navigation">
            <ul className="flex flex-col gap-1">
              {studentNav.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>

            <div className="my-5 border-t border-border" />

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              Instructor
            </p>
            <ul className="flex flex-col gap-1">
              {instructorNav.map((item) => (
                <li key={item.label}>
                  <NavLink item={item} />
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="flex-1 px-6 py-8 sm:px-8 lg:px-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground sm:text-3xl">
            Dashboard
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon;
  const base =
    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";
  const state = item.active
    ? "bg-brand-black text-foreground-inverse"
    : "text-foreground hover:bg-background-muted";

  return (
    <a
      href="#"
      aria-current={item.active ? "page" : undefined}
      className={`${base} ${state}`}
    >
      <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
      <span>{item.label}</span>
    </a>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon;
  return (
    <article className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-brand-gold">
      <div className="flex size-14 items-center justify-center rounded-full bg-background-muted text-foreground">
        <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
      </div>
      <p className="font-heading text-4xl font-bold text-foreground">{stat.value}</p>
      <p className="text-sm text-foreground-muted">{stat.label}</p>
    </article>
  );
}
