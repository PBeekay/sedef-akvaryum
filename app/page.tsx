"use client";

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Worlds } from "@/components/Worlds";
import { Arrivals } from "@/components/Arrivals";
import { Configurator } from "@/components/Configurator";
import { FishFinder } from "@/components/FishFinder";
import { SpeciesExperience } from "@/components/SpeciesExperience";
import { Collections } from "@/components/Collections";
import { Guide } from "@/components/Guide";
import { Visit } from "@/components/Visit";
import { Footer } from "@/components/Footer";

export default function Home() {
  const handleNavigate = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="relative w-full overflow-x-clip bg-bg text-ink">
      <Nav onNavigate={handleNavigate} />
      <Hero id="hero" onNavigate={handleNavigate} />
      <Worlds id="worlds" />
      <Arrivals />
      <Configurator id="configurator" />
      <FishFinder />
      <SpeciesExperience />
      <Collections id="collections" />
      <Guide id="guide" />
      <Visit id="visit" />
      <Footer />
    </main>
  );
}
