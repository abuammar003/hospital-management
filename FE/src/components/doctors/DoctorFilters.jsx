"use client";

import {
  Search,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

export default function DoctorFilters({
  filters,
  setFilters,
  specializations,
  hospitals,
  onReset,
}) {
  // Update individual filter
  const handleChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

      {/* Heading */}
      <div className="mb-6 flex items-center gap-2">
        <SlidersHorizontal
          size={21}
          className="text-blue-600"
        />

        <h2 className="text-lg font-semibold text-slate-900">
          Search & Filter Doctors
        </h2>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {/* Search */}
        <div>
          <label
            htmlFor="doctor-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search Doctor
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />

            <input
              id="doctor-search"
              type="text"
              placeholder="Doctor name..."
              value={filters.search}
              onChange={(e) =>
                handleChange("search", e.target.value)
              }
              className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Specialization */}
        <div>
          <label
            htmlFor="specialization"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Specialization
          </label>

          <select
            id="specialization"
            value={filters.specialization}
            onChange={(e) =>
              handleChange("specialization", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Specializations</option>

            {specializations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital */}
        <div>
          <label
            htmlFor="hospital"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Hospital
          </label>

          <select
            id="hospital"
            value={filters.hospitalId}
            onChange={(e) =>
              handleChange("hospitalId", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Hospitals</option>

            {hospitals.map((hospital) => (
              <option
                key={hospital.id}
                value={hospital.id}
              >
                {hospital.name}
              </option>
            ))}
          </select>
        </div>

        {/* Consultation Fee */}
        <div>
          <label
            htmlFor="fee"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Consultation Fee
          </label>

          <select
            id="fee"
            value={filters.maxFee}
            onChange={(e) =>
              handleChange("maxFee", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Any Price</option>
            <option value="300">Under ₹300</option>
            <option value="500">Under ₹500</option>
            <option value="700">Under ₹700</option>
            <option value="1000">Under ₹1000</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="experience"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Experience
          </label>

          <select
            id="experience"
            value={filters.minExperience}
            onChange={(e) =>
              handleChange("minExperience", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Any Experience</option>
            <option value="3">3+ Years</option>
            <option value="5">5+ Years</option>
            <option value="10">10+ Years</option>
            <option value="15">15+ Years</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label
            htmlFor="availability"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Availability
          </label>

          <select
            id="availability"
            value={filters.availability}
            onChange={(e) =>
              handleChange("availability", e.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Doctors</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

      </div>

      {/* Reset Button */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          <RotateCcw size={17} />
          Clear Filters
        </button>
      </div>

    </div>
  );
}