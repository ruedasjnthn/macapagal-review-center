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
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/75 via-brand-black/60 to-brand-black/80 lg:bg-gradient-to-r lg:from-brand-black/95 lg:via-brand-black/70 lg:to-brand-black/20" />
    </div>
  );
}
