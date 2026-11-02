"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  Building2,
  ChevronRight,
  SearchX,
} from "lucide-react";

import HospitalCard from "@/components/hospitals/HospitalCard";
import HospitalFilters from "@/components/hospitals/HospitalFilters";

import { hospitals } from "@/data/hospitals";

export default function HospitalsListing() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("rating");

  // Get unique specializations from hospital data
  const specializations = useMemo(() => {
    const allSpecializations = hospitals.flatMap(
      (hospital) => hospital.specializations
    );

    return [...new Set(allSpecializations)].sort();
  }, []);

  // Search, filter and sort hospitals
  const filteredHospitals = useMemo(() => {
    let result = hospitals.filter((hospital) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        hospital.name.toLowerCase().includes(searchText) ||
        hospital.location.toLowerCase().includes(searchText) ||
        hospital.address.toLowerCase().includes(searchText);

      const matchesSpecialization =
        specialization === "" ||
        hospital.specializations.includes(specialization);

      const matchesRating =
        hospital.rating >= Number(minRating);

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesRating
      );
    });

    // Sort results
    result.sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      }

      if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      }

      return 0;
    });

    return result;
  }, [search, specialization, minRating, sortBy]);

  // Reset all filters
  function handleReset() {
    setSearch("");
    setSpecialization("");
    setMinRating("0");
    setSortBy("rating");
  }

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
              Hospitals
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <Building2 size={26} />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Find Hospitals
            </h1>
          </div>

          <p className="mt-4 max-w-2xl text-slate-600">
            Explore hospitals, compare specializations,
            and find healthcare services in Malegaon.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Currently displaying demonstration hospital profiles.
          </p>

        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          {/* Filters */}
          <HospitalFilters
            search={search}
            setSearch={setSearch}
            specialization={specialization}
            setSpecialization={setSpecialization}
            minRating={minRating}
            setMinRating={setMinRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
            specializations={specializations}
            onReset={handleReset}
          />

          {/* Results Count */}
          <div className="my-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Available Hospitals
            </h2>

            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              {filteredHospitals.length} Results
            </span>
          </div>

          {/* Hospital Cards */}
          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                />
              ))}

            </div>
          ) : (

            /* No Results */
            <div className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-20 text-center">

              <div className="mb-5 rounded-full bg-blue-50 p-5 text-blue-600">
                <SearchX size={38} />
              </div>

              <h3 className="text-xl font-semibold text-slate-900">
                No Hospitals Found
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                We couldn't find any hospitals matching your search.
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-6 cursor-pointer rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
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