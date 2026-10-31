"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  Stethoscope,
  ChevronRight,
  SearchX,
  ArrowUpDown,
} from "lucide-react";

import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorFilters from "@/components/doctors/DoctorFilters";

import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";

const defaultFilters = {
  search: "",
  specialization: "",
  hospitalId: "",
  maxFee: "",
  minExperience: "",
  availability: "",
};

export default function DoctorsListing() {
  const searchParams = useSearchParams();

  // Read URL parameters
  const urlSpecialization = searchParams.get("specialization") || "";
  const urlHospitalId = searchParams.get("hospitalId") || "";

  // Store user-selected filters
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("rating");

  // Combine URL filters with user-selected filters
  const activeFilters = {
    ...filters,
    specialization: filters.specialization || urlSpecialization,
    hospitalId: filters.hospitalId || urlHospitalId,
  };

  // Get unique specializations
  const specializations = useMemo(() => {
    return [...new Set(doctors.map((doctor) => doctor.specialization))].sort();
  }, []);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    const result = doctors.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(activeFilters.search.trim().toLowerCase());

      const matchesSpecialization =
        !activeFilters.specialization ||
        doctor.specialization === activeFilters.specialization;

      const matchesHospital =
        !activeFilters.hospitalId ||
        String(doctor.hospitalId) === String(activeFilters.hospitalId);

      const matchesFee =
        !activeFilters.maxFee ||
        doctor.consultationFee <= Number(activeFilters.maxFee);

      const matchesExperience =
        !activeFilters.minExperience ||
        doctor.experience >= Number(activeFilters.minExperience);

      const matchesAvailability =
        !activeFilters.availability ||
        (activeFilters.availability === "available"
          ? doctor.available
          : !doctor.available);

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesHospital &&
        matchesFee &&
        matchesExperience &&
        matchesAvailability
      );
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "experience") {
        return b.experience - a.experience;
      }

      if (sortBy === "fee-low") {
        return a.consultationFee - b.consultationFee;
      }

      if (sortBy === "fee-high") {
        return b.consultationFee - a.consultationFee;
      }

      return 0;
    });

    return result;
  }, [activeFilters, sortBy]);

  // Reset filters
  const handleReset = () => {
    setFilters(defaultFilters);
    setSortBy("rating");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-14">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">

            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <ChevronRight size={16} />

            <span className="font-medium text-blue-600">
              Doctors
            </span>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Stethoscope size={26} />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Find Doctors
            </h1>

          </div>

          <p className="mt-4 max-w-2xl text-slate-600">
            Find doctors by specialization, hospital,
            experience, and consultation fees.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Currently displaying demonstration doctor profiles.
          </p>

        </div>

      </section>

      {/* Main Content */}
      <section className="py-12">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          {/* Filters */}
          <DoctorFilters
            filters={activeFilters}
            setFilters={setFilters}
            specializations={specializations}
            hospitals={hospitals}
            onReset={handleReset}
          />

          {/* Results and Sorting */}
          <div className="my-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Available Doctors
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Showing {filteredDoctors.length} doctors
              </p>
            </div>

            <div className="flex items-center gap-3">

              <ArrowUpDown size={18} className="text-slate-500" />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>

            </div>

          </div>

          {/* Doctor Cards */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              ))}

            </div>
          ) : (

            /* No Results */
            <div className="rounded-2xl border border-slate-100 bg-white px-6 py-20 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <SearchX size={38} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                No Doctors Found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
                We couldn't find doctors matching your search.
                Try changing your filters.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Clear All Filters
              </button>

            </div>
          )}

        </div>

      </section>

    </div>
  );
}