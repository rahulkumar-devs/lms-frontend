"use client"

import Header from "@/components/Header";
import HeroSection from "@/components/Routes/Hero";
import Reviews from "@/components/Routes/Reviews";
import Heading from "@/utils/Heading";
import { useState } from "react";

export default function Page() {
  const [route,setRoute] = useState("Login");
  return (
    <div className="bg-white dark:bg-gray-900">
      <Heading title="E Learning" description="" keywords="" />
      <Header />
      <HeroSection/>
      <Reviews/>
    </div>
  );
}
