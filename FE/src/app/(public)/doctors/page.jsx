import { Suspense } from "react";

import DoctorsListing from "@/components/doctors/DoctorsListing";

export const metadata = {
  title: "Find Doctors | YourHealth",
  description:
    "Find doctors by specialization, hospital, experience and consultation fees.",
};

export default function DoctorsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 p-10 text-center">
          Loading doctors...
        </div>
      }
    >
      <DoctorsListing />
    </Suspense>
  );
}