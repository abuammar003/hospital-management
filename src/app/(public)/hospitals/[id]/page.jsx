import { notFound } from "next/navigation";

import HospitalDetails from "@/components/hospitals/HospitalDetails";

import { hospitals } from "@/data/hospitals";

// Generate page metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  const hospital = hospitals.find(
    (item) => item.id === Number(id)
  );

  if (!hospital) {
    return {
      title: "Hospital Not Found | YourHealth",
    };
  }

  return {
    title: `${hospital.name} | YourHealth`,
    description:
      hospital.description ||
      `Explore details about ${hospital.name}.`,
  };
}

export default async function HospitalDetailsPage({ params }) {
  const { id } = await params;

  // console.log("URL Hospital ID:", id);

  const hospital = hospitals.find(
    (item) => String(item.id) === id
  );

  // console.log("Found Hospital:", hospital);

  if (!hospital) {
    notFound();
  }

  return <HospitalDetails hospital={hospital} />;
}









