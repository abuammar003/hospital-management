"use client";

import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function HospitalFilters({
  search,
  setSearch,
  specialization,
  setSpecialization,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
  specializations,
  onReset,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">

      {/* Heading */}
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal size={20} className="text-blue-600" />

        <h2 className="text-lg font-semibold text-slate-900">
          Search & Filters
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

        {/* Search */}
        <div>
          <label
            htmlFor="hospital-search"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Search Hospitals
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />

            <input
              id="hospital-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name or location..."
              className="w-full rounded-xl border border-slate-200 py-3 pr-4 pl-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Specialization */}
        <div>
          <label
            htmlFor="hospital-specialization"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Specialization
          </label>

          <select
            id="hospital-specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
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

        {/* Rating */}
        <div>
          <label
            htmlFor="hospital-rating"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Minimum Rating
          </label>

          <select
            id="hospital-rating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="0">All Ratings</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4">4.0+ Stars</option>
            <option value="3">3.0+ Stars</option>
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="hospital-sort"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sort By
          </label>

          <select
            id="hospital-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="rating">Highest Rated</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

      </div>

      {/* Reset */}
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="flex cursor-pointer items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <RotateCcw size={16} />
          Clear Filters
        </button>
      </div>

    </div>
  );
}