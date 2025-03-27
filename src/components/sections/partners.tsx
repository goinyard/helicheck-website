"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import {
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

// Dynamically import Carousel with no SSR
const Carousel = dynamic(
  () => import("@/components/ui/carousel").then((mod) => mod.Carousel),
  { ssr: false }
);

interface PartnersProps {
  className?: string;
}

// Mining and exploration company logos
const partnerLogos = [
  {
    id: "logo-1",
    description: "Rio Tinto",
    image: "/images/partners/rio-tinto.png", 
    fallbackImage: "https://shadcnblocks.com/images/block/logos/astro.svg",
    className: "h-8 w-auto",
  },
  {
    id: "logo-2",
    description: "BHP",
    image: "/images/partners/bhp.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/figma.svg",
    className: "h-8 w-auto",
  },
  {
    id: "logo-3",
    description: "Anglo American",
    image: "/images/partners/anglo-american.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/nextjs.svg",
    className: "h-8 w-auto",
  },
  {
    id: "logo-4",
    description: "Barrick Gold",
    image: "/images/partners/barrick-gold.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/react.png",
    className: "h-8 w-auto",
  },
  {
    id: "logo-5",
    description: "Newmont",
    image: "/images/partners/newmont.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/shadcn-ui.svg",
    className: "h-8 w-auto",
  },
  {
    id: "logo-6",
    description: "Glencore",
    image: "/images/partners/glencore.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/supabase.svg",
    className: "h-8 w-auto",
  },
  {
    id: "logo-7",
    description: "Freeport-McMoRan",
    image: "/images/partners/freeport-mcmoran.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/tailwind.svg",
    className: "h-7 w-auto",
  },
  {
    id: "logo-8",
    description: "Teck Resources",
    image: "/images/partners/teck.png",
    fallbackImage: "https://shadcnblocks.com/images/block/logos/vercel.svg",
    className: "h-8 w-auto",
  },
];

export function Partners({ className }: PartnersProps) {
  const [logos, setLogos] = useState(partnerLogos);

  // Check if local images exist, if not use fallback images
  useEffect(() => {
    const checkImages = async () => {
      const updatedLogos = await Promise.all(
        partnerLogos.map(async (logo) => {
          try {
            // Check if the local image exists
            const res = await fetch(logo.image, { method: 'HEAD' });
            if (res.ok) {
              return logo;
            } else {
              // Use fallback if local image doesn't exist
              return {
                ...logo,
                image: logo.fallbackImage || logo.image,
              };
            }
          } catch (error) {
            // Use fallback on error
            return {
              ...logo,
              image: logo.fallbackImage || logo.image,
            };
          }
        })
      );
      setLogos(updatedLogos);
    };

    checkImages();
  }, []);

  // Custom implementation with right-to-left scrolling
  return (
    <section className={cn("py-16 md:py-16 -mt-20", className)}>
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="mb-8 text-base md:text-lg font-medium tracking-wide text-muted-foreground/80">
          Trusted by industry leaders
        </h2>
        <div className="pt-2">
          <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
            <Carousel
              opts={{ 
                loop: true,
                align: "start",
                containScroll: "trimSnaps"
              }}
              plugins={[
                AutoScroll({ 
                  playOnInit: true, 
                  speed: 0.5, 
                  direction: "backward" 
                })
              ]}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {logos.map((logo) => (
                  <CarouselItem
                    key={logo.id}
                    className="pl-2 md:pl-4 flex basis-1/3 md:basis-1/4 lg:basis-1/5"
                  >
                    <div className="mx-2 md:mx-4 flex items-center justify-center h-10">
                      <img
                        src={logo.image}
                        alt={logo.description}
                        className={cn(logo.className, "opacity-70 hover:opacity-100 transition-opacity")}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 