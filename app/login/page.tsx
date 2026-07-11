"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen w-full grid-cols-1 bg-background xl:grid-cols-2">
      <section className="relative flex min-h-screen flex-col px-6 py-8 sm:px-10 xl:px-16 xl:py-12 2xl:px-24">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 py-6">
          <div className="flex flex-col items-center text-center xl:hidden">
            <Image
              src="/macapagal-logo.png"
              alt="Macapagal Review Center"
              width={112}
              height={112}
              priority
              className="size-20 object-contain sm:size-24"
            />
            <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              Macapagal Review
            </h2>
            <h2 className="font-heading text-2xl font-bold leading-tight text-brand-gold sm:text-3xl">
              Student Portal
            </h2>
            <div className="mt-4 h-px w-12 bg-brand-gold/60" />
            <p className="mt-4 text-sm text-foreground-muted">
              Login to access your account
            </p>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-[0_14px_40px_rgba(11,11,11,0.06)] sm:p-8">
            <h1 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
              Hi, Welcome back!
            </h1>

            <div
              role="alert"
              className="mt-5 rounded-md border border-brand-gold bg-warning-soft/50 px-3.5 py-3 text-sm leading-6 text-foreground-muted"
            >
              <span className="font-semibold text-foreground">Error:</span>{" "}
              The username{" "}
              <span className="font-semibold text-foreground">jijijfasf</span>{" "}
              is not registered on this site. If you are unsure of your
              username, try your email address instead.
            </div>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label htmlFor="card-username" className="sr-only">
                  Username
                </label>
                <input
                  id="card-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Username"
                  className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 transition-colors focus:border-brand-black focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="card-password" className="sr-only">
                  Password
                </label>
                <input
                  id="card-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60 transition-colors focus:border-brand-black focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="inline-flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-border accent-brand-black"
                  />
                  <span className="font-medium">Keep me signed in</span>
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-foreground-muted transition-colors hover:text-brand-black"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-foreground-inverse transition-colors hover:bg-brand-gold hover:text-brand-black"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 border-t border-border pt-5 text-center text-sm text-foreground-muted">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-semibold text-brand-black transition-colors hover:text-brand-gold"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-brand-black text-foreground-inverse xl:flex xl:flex-col xl:px-14 xl:py-16 2xl:px-20 2xl:py-20">
        <div className="max-w-xl">
          <h2 className="font-heading text-5xl font-bold leading-[0.95] text-foreground-inverse 2xl:text-7xl">
            Macapagal Review
          </h2>
          <h2 className="mt-2 font-heading text-5xl font-bold leading-[0.95] text-brand-gold 2xl:text-7xl">
            Student Portal
          </h2>
          <div className="mt-6 h-px w-16 bg-brand-gold/60" />
          <p className="mt-5 text-sm font-medium text-white/70 sm:text-base">
            Login to access your account
          </p>
        </div>

        <div className="mt-auto flex flex-1 items-center justify-center pt-10">
          <Image
            src="/macapagal-logo.png"
            alt="Macapagal Review Center"
            width={560}
            height={560}
            priority
            className="h-auto w-full max-w-104 object-contain xl:max-w-136"
          />
        </div>
      </aside>
    </main>
  );
}
