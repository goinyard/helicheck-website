import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <Hero />
        <Partners />
        {/* Other sections will go here */}
      </div>
    </main>
  );
}