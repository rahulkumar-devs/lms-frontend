"use client"

import Header from "@/components/Header";
import HeroSection from "@/components/Routes/Hero";
import Heading from "@/utils/Heading";
import { useState } from "react";

export default function Page() {
  const [route,setRoute] = useState("Login");
  return (
    <div>
      <Heading title="E Learning" description="" keywords="" />
      <Header />
      <HeroSection/>
    </div>
  );
}
