"use client";

import Link from "next/link";
import Cards from "@/components/cards";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import FeaturedProject from "./components/FeaturedProject";
import CardsSection from "./components/CardsSection";
import CTASection from "./components/CTASection";
import StatsSection from "./components/StatsSection";

const HomePage = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedProject />
      <CardsSection/>
      <StatsSection/>
      <CTASection/>
    </div>
  );
}

export default HomePage