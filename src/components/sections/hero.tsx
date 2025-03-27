"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position relative to card center
      const rotateY = ((x / rect.width) - 0.5) * 3; // Reduced from 5 to 3 degrees
      const rotateX = (((y / rect.height) - 0.5) * -3); // Reduced from 5 to 3 degrees
      
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      // Smoothly reset rotation when mouse leaves
      setRotation({ x: 0, y: 0 });
    };

    // Only add mousemove listener to the card itself
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="w-full pt-28 pb-16 md:pt-28 md:pb-24 lg:pb-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-5 md:space-y-6 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Your trusted partner in mineral discovery
            </h1>
            <p className="max-w-[600px] mx-auto lg:mx-0 text-slate-700 text-lg md:text-xl">
              Our helicopter EM surveys transform complex geological data into actionable insights, helping exploration teams discover what others miss
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                variant="brand"
              >
                Book a Survey
              </Button>
              <Button 
                size="lg" 
                variant="brandOutline"
              >
                Explore Services
              </Button>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <div 
              ref={cardRef}
              className="relative h-[300px] sm:h-[350px] md:h-[380px] lg:h-[420px] w-full overflow-hidden rounded-xl lg:order-last perspective-1000 transform-gpu hover:cursor-pointer"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.3s ease-out',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10 pointer-events-none" />
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://videos.pexels.com/video-files/7456210/7456210-hd_1920_1080_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}