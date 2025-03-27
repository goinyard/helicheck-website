# HeliCheck Website Development Guidelines

## Project Overview
- Single-page website for HeliCheck
- Built with Next.js, TypeScript, and Tailwind CSS
- Uses shadcn/ui components
- Integrates components from 21.dev

## Directory Structure

```
src/
├── app/                      # Next.js app root
│   ├── page.tsx              # Main single page component
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Base UI components (shadcn)
│   ├── sections/             # Page sections
│   │   ├── hero.tsx          # Hero section
│   │   ├── services.tsx      # Services section
│   │   ├── partners.tsx      # Partners/logos section
│   │   ├── testimonials.tsx  # Testimonials section
│   │   ├── features.tsx      # Features section
│   │   ├── map.tsx           # Map/locations section
│   │   ├── team.tsx          # Team section
│   │   ├── faq.tsx           # FAQ section
│   │   └── cta.tsx           # Call-to-action section
│   └── layout/               # Layout components
│       ├── header.tsx        # Site header with navigation
│       └── footer.tsx        # Site footer
├── lib/                      # Utility functions
│   └── utils.ts              # Utility functions (cn, etc.)
└── public/                   # Static assets
    └── images/               # Image assets
        ├── logo.png          # HeliCheck logo
        ├── partners/         # Partner logos
        └── team/             # Team member photos
```

## Coding Standards

### Naming Conventions
- **Components**: PascalCase (e.g., `Hero.tsx`, `Header.tsx`)
- **Files/Directories**: kebab-case for multi-word (e.g., `team-member.tsx`)
- **Functions**: camelCase (e.g., `handleClick`, `toggleMenu`)
- **Constants**: UPPER_SNAKE_CASE for global constants (e.g., `MAX_ITEMS`)
- **Props Interfaces**: Prefix with component name (e.g., `HeroProps`, `TestimonialProps`)

### Component Structure
- Use TypeScript for all components
- Always define prop types using interfaces
- Order imports consistently:
  1. React/Next.js imports
  2. External libraries
  3. Internal components/hooks/utils
  4. Styles/assets
- Use "use client" directive for client components consistently

Example:
```tsx
"use client";

import { useState } from "react";
import { ExternalLib } from "external-lib";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ComponentProps {
  title: string;
  // other props...
}

export function Component({ title }: ComponentProps) {
  // component implementation
}
```

### Integration of 21.dev Components

1. **Integration Process**:
   - Place each 21.dev component directly in the appropriate section file
   - Install any required dependencies in project root
   - Customize to match HeliCheck branding

2. **For the Logos3 Example**:
   - Place in `/src/components/sections/partners.tsx`
   - Update to use HeliCheck partner logos
   - Adjust styling to match site theme

## State Management
- Use React hooks for local component state
- Keep state close to where it's used
- For shared state between sections, lift state up to page.tsx

## Styling Guidelines
- Use Tailwind CSS for all styling
- Follow atomic/utility-first approach
- Use the `cn()` utility for conditional class names
- Maintain consistent spacing and sizing using Tailwind's scale
- Use CSS variables for theme colors through Tailwind

## Responsive Design
- Mobile-first approach (base styles for mobile, then add breakpoints)
- Standard breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px
- Test all sections on multiple device sizes

## Performance Optimization
- Optimize images using Next.js Image component
- Lazy load below-the-fold content
- Use appropriate image formats (WebP preferred)
- Keep bundle size minimal by avoiding unnecessary dependencies

## Accessibility Guidelines
- Maintain semantic HTML structure
- Ensure proper contrast ratios
- Include alt text for all images
- Maintain keyboard navigability
- Test with screen readers

## Git Workflow
- Descriptive commit messages
- One logical change per commit
- Branch naming: `feature/section-name` or `fix/issue-description`

## Development Process for Each Section
1. Create section component file in `/src/components/sections/`
2. Install any required dependencies
3. Implement the component with mock data
4. Connect to real data if applicable
5. Test responsiveness and performance
6. Add to main page layout

## Example: Adding a New Section

```tsx
// src/components/sections/partners.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

interface PartnerLogo {
  id: string;
  name: string;
  image: string;
  className?: string;
}

interface PartnersProps {
  title?: string;
  logos?: PartnerLogo[];
  className?: string;
}

export function Partners({
  title = "Our Trusted Partners",
  logos = [
    // Default logos if none provided
    {
      id: "logo-1",
      name: "Partner 1",
      image: "/images/partners/partner1.webp",
      className: "h-8 w-auto",
    },
    // Add more default logos...
  ],
  className,
}: PartnersProps) {
  return (
    <section className={cn("py-20", className)}>
      <div className="container">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl mb-12">
          {title}
        </h2>
        
        <div className="relative mx-auto">
          <Carousel
            opts={{ loop: true }}
            plugins={[AutoScroll({ playOnInit: true })]}
          >
            <CarouselContent>
              {logos.map((logo) => (
                <CarouselItem
                  key={logo.id}
                  className="flex basis-1/3 justify-center sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <div className="mx-10 flex items-center justify-center">
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className={logo.className}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"></div>
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
```

Then add to page.tsx:

```tsx
// src/app/page.tsx
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Partners } from "@/components/sections/partners";
// Import other sections...

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Partners 
        logos={[
          // Custom logos data
        ]} 
      />
      {/* Add other sections */}
    </main>
  );
}
``` 