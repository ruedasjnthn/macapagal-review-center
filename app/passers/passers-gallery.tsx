"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type PasserProgram = "REE" | "RME";

export type PasserBatch = {
  id: string;
  program: PasserProgram;
  title: string;
  sortDate: string;
  imageFolder: string;
};

type PassersGalleryProps = {
  batches: PasserBatch[];
  imageFolders: Record<string, string[]>;
};

const PAGE_SIZE = 5;

const programTabs: { value: PasserProgram; label: string }[] = [
  { value: "REE", label: "REE Program" },
  { value: "RME", label: "RME Program" },
];

export function PassersGallery({ batches, imageFolders }: PassersGalleryProps) {
  const [activeProgram, setActiveProgram] = useState<PasserProgram>("REE");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const activeBatches = useMemo(
    () =>
      batches
        .filter((batch) => batch.program === activeProgram)
        .sort((first, second) => second.sortDate.localeCompare(first.sortDate)),
    [activeProgram, batches],
  );

  const visibleBatches = activeBatches.slice(0, visibleCount);
  const hasMore = visibleCount < activeBatches.length;

  const selectProgram = (program: PasserProgram) => {
    setActiveProgram(program);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 text-brand-black sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
      <div className="flex flex-col gap-5 border-b border-[rgba(11,11,11,0.12)] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 text-sm font-normal italic text-brand-black">
            Passers Gallery
          </p>
          <h2 className="max-w-3xl font-heading text-[2.2rem] font-semibold leading-tight text-brand-black sm:text-5xl lg:text-[3.45rem] lg:leading-[0.98]">
            Browse passers by board exam batch
          </h2>
        </div>

        <div
          className="inline-flex w-fit rounded-full border border-[rgba(11,11,11,0.12)] bg-surface p-1 shadow-sm"
          role="tablist"
          aria-label="Passer program"
        >
          {programTabs.map((program) => {
            const isActive = activeProgram === program.value;

            return (
              <button
                key={program.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => selectProgram(program.value)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors sm:px-5 sm:text-sm ${
                  isActive
                    ? "bg-brand-black text-foreground-inverse"
                    : "text-foreground-muted hover:text-brand-black"
                }`}
              >
                {program.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 divide-y divide-[rgba(11,11,11,0.12)]">
        {visibleBatches.map((batch) => {
          const images = imageFolders[batch.imageFolder] ?? [];

          return (
            <article key={batch.id} className="py-8 sm:py-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-orange">
                    {batch.program} Program
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold leading-tight text-brand-black sm:text-3xl">
                    {batch.title}
                  </h3>
                </div>
                <p className="text-sm font-semibold text-foreground-muted">
                  {images.length} passers
                </p>
              </div>

              <div className="mt-5 -mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
                <ul className="flex snap-x gap-4 pb-2">
                  {images.map((src, imageIndex) => (
                    <li
                      key={`${batch.id}-${src}-${imageIndex}`}
                      className="w-[min(76vw,20rem)] flex-none snap-start sm:w-[18rem] lg:w-[20rem]"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-background-muted ring-1 ring-[rgba(11,11,11,0.08)]">
                        <Image
                          src={src}
                          alt={`${batch.title} passer ${imageIndex + 1}`}
                          fill
                          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 18rem, 76vw"
                          className="object-cover"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="inline-flex items-center justify-center rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-foreground-inverse transition-colors hover:bg-brand-charcoal hover:text-brand-orange"
          >
            See more
          </button>
        </div>
      ) : null}
    </section>
  );
}
