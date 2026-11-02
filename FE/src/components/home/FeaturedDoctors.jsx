import Link from "next/link";

import { ArrowRight, Stethoscope } from "lucide-react";

import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";

export default function FeaturedDoctors() {
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <section className="bg-slate-50 py-16 md:py-20">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            {/* Small Label */}
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Stethoscope size={18} />
              FIND YOUR SPECIALIST
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Featured Doctors
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore doctor profiles, compare specializations,
              and find the right healthcare professional.
            </p>

          </div>

          {/* View All */}
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View All Doctors
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {featuredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
            />
          ))}

        </div>

        {/* Demo Notice */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Doctor profiles and availability shown here are
          demonstration data.
        </p>

      </div>

    </section>
  );
}