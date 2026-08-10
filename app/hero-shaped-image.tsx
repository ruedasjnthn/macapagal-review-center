import Image from "next/image";

type HeroShapedImageProps = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export function HeroShapedImage({
  src,
  alt,
  objectPosition = "center",
}: HeroShapedImageProps) {
  const clipPathId = src.includes("program")
    ? "program-hero-image-clip"
    : "passers-hero-image-clip";

  return (
    <>
      <svg aria-hidden="true" className="absolute size-0">
        <defs>
          <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
            <path d="M .18 0 H 1 V 1 H .16 C .16 .91 .02 .9 .02 .76 C .02 .62 .18 .6 .18 .5 C .18 .39 .02 .38 .02 .24 C .02 .1 .16 .08 .18 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute right-[3.5%] top-1/2 z-10 hidden h-[68%] w-[31%] -translate-y-1/2 overflow-hidden rounded-r-[1.25rem] lg:block xl:h-[72%] xl:w-[34%] xl:rounded-r-[1.5rem]"
        style={{ clipPath: `url(#${clipPathId})` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1536px) 31rem, 34vw"
          className="object-cover"
          style={{ objectPosition }}
        />
        <div className="absolute inset-0 bg-brand-black/15" />
      </div>
    </>
  );
}
