"use client";

import HeroSection from "./components/HeroSection";
import FeaturedProject from "./components/FeaturedProject";
import CardsSection from "./components/CardsSection";
import CTASection from "./components/CTASection";

const HomePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedProject />
      <CardsSection/>
      <CTASection/>
    </div>
  );
}

export default HomePage