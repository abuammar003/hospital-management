import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import Specializations from "@/components/home/Specializations";
import FeaturedHospitals from "@/components/home/FeaturedHospitals";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";

export default function Home() {
  return (
     <>
      <HeroSection />

      <QuickActions />

      <Specializations />

      <FeaturedHospitals />

      <FeaturedDoctors />
    </>
  );
}
