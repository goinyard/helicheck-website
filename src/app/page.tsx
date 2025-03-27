import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        <Hero />
        {/* Other sections will go here */}
      </div>
    </main>
  );
}