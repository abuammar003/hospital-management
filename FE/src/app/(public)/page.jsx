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




// export default function HomePage() {
//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold">
//         Homepage is working!
//       </h1>
//     </div>
//   );
// }