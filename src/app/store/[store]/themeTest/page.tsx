'use client';
import { Navigation } from "lucide-react";
import Hero from "./components/hero";
import CategoriesRoupa from "./components/categorieSection";
import FeaturedProducts from "./components/featureSection";

export default function Page() {
  return <div className="">
    <Hero/>
    <CategoriesRoupa/>
    <FeaturedProducts/>
  </div>
}