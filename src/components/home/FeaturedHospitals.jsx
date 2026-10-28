import Link from "next/link";

import { ArrowRight, Building2 } from "lucide-react";

import HospitalCard from "@/components/hospitals/HospitalCard";
import { hospitals } from "@/data/hospitals";

export default function FeaturedHospitals() {
  // Display only the first 3 hospitals
  const featuredHospitals = hospitals.slice(0, 3);

  return (
    <section className="bg-white py-16 md:py-20">

      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            {/* Small Label */}
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Building2 size={18} />
              HEALTHCARE NEAR YOU
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Featured Hospitals
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Explore hospitals and discover healthcare services
              available in your city.
            </p>

          </div>

          {/* View All Link */}
          <Link
            href="/hospitals"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            View All Hospitals
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {featuredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
            />
          ))}

        </div>

        {/* Bottom Note */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Hospital profiles shown here are demonstration data.
        </p>

      </div>

    </section>
  );
}