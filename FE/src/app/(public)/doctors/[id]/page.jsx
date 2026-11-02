import { notFound } from "next/navigation";

import DoctorDetails from "@/components/doctors/DoctorDetails";

import { doctors } from "@/data/doctors";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const doctor = doctors.find(
    (item) => String(item.id) === String(id)
  );

  if (!doctor) {
    return {
      title: "Doctor Not Found | YourHealth",
    };
  }

  return {
    title: `${doctor.name} | YourHealth`,
    description: `View ${doctor.name}'s profile, specialization, experience, consultation fees and hospital details.`,
  };
}

export default async function DoctorDetailsPage({ params }) {
  const { id } = await params;

  const doctor = doctors.find(
    (item) => String(item.id) === String(id)
  );

  if (!doctor) {
    notFound();
  }

  return <DoctorDetails doctor={doctor} />;
}











// export default async function DoctorDetailsPage({ params }) {
//   const { id } = await params;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-3xl font-bold text-blue-600">
//         Doctor Details Page Working!
//       </h1>

//       <p className="mt-4 text-xl">
//         Doctor ID: {id}
//       </p>
//     </div>
//   );
// }