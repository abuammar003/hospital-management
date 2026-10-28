"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Malegaon");

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    params.set("location", location);

    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl shadow-blue-900/5 md:flex-row md:items-center"
    >
      {/* Search Input */}
      <div className="flex flex-1 items-center gap-3 px-3">
        <Search size={21} className="shrink-0 text-slate-400" />

        <input
          type="text"
          placeholder="Search doctors, hospitals or specializations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 border-t border-slate-100 px-3 md:border-t-0 md:border-l">
        <MapPin size={20} className="shrink-0 text-blue-600" />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full cursor-pointer bg-transparent py-3 text-sm text-slate-700 outline-none md:w-36"
        >
          <option value="Malegaon">Malegaon</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <Search size={18} />
        Search
      </button>
    </form>
  );
}