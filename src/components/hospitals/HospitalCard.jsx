import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  Star,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

export default function HospitalCard({ hospital }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Hospital Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">

        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Verified Badge */}
        {hospital.verified && (
          <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-teal-600 shadow-sm">
            <BadgeCheck size={15} />
            Demo Verified
          </div>
        )}
      </div>

      {/* Hospital Information */}
      <div className="p-5">

        {/* Name */}
        <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
          {hospital.name}
        </h3>

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} className="shrink-0 text-blue-600" />
          <span>{hospital.location}</span>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">

          <Star
            size={17}
            className="fill-amber-400 text-amber-400"
          />

          <span className="text-sm font-semibold text-slate-800">
            {hospital.rating}
          </span>

          <span className="text-xs text-slate-400">
            ({hospital.reviews} demo reviews)
          </span>
        </div>

        {/* Specializations */}
        <div className="mt-5 flex flex-wrap gap-2">
          {hospital.specializations.slice(0, 3).map((specialization) => (
            <span
              key={specialization}
              className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
            >
              {specialization}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* View Details Button */}
        <Link
          href={`/hospitals/${hospital.id}`}
          className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
        >
          View Hospital Details

          <ArrowUpRight size={18} />
        </Link>

      </div>
    </div>
  );
}