import Image from "next/image";
import Link from "next/link";

import {
  Star,
  MapPin,
  BriefcaseMedical,
  BadgeCheck,
  CalendarDays,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

export default function DoctorCard({ doctor }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Doctor Image */}
      <div className="relative h-60 overflow-hidden bg-gradient-to-b from-blue-50 to-teal-50">

        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
        />

        {/* Availability Badge */}
        <div
          className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
            doctor.available
              ? "bg-green-50 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {doctor.available ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Doctor Information */}
      <div className="p-5">

        {/* Name and Verification */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {doctor.name}
          </h3>

          {doctor.verified && (
            <BadgeCheck
              size={18}
              className="shrink-0 text-blue-600"
              aria-label="Demo verified profile"
            />
          )}
        </div>

        {/* Specialization */}
        <p className="mt-1 text-sm font-semibold text-blue-600">
          {doctor.specialization}
        </p>

        {/* Qualification */}
        <p className="mt-1 text-xs text-slate-500">
          {doctor.qualification}
        </p>

        {/* Experience */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <BriefcaseMedical size={17} className="text-teal-600" />

          <span>{doctor.experience} Years Experience</span>
        </div>

        {/* Hospital */}
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={17} className="shrink-0 text-teal-600" />

          <span className="line-clamp-1">
            {doctor.hospital}, {doctor.location}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">
          <Star
            size={17}
            className="fill-amber-400 text-amber-400"
          />

          <span className="text-sm font-semibold text-slate-800">
            {doctor.rating}
          </span>

          <span className="text-xs text-slate-400">
            ({doctor.reviews} demo reviews)
          </span>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Consultation Fee */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Consultation Fee
          </span>

          <div className="flex items-center text-lg font-bold text-slate-900">
            <IndianRupee size={17} />
            {doctor.consultationFee}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">

          <Link
            href={`/doctors/${doctor.id}`}
            className="flex items-center justify-center gap-1 rounded-xl border border-blue-200 px-3 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            View Profile
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href={
              doctor.available
                ? `/book-appointment?doctorId=${doctor.id}`
                : `/doctors/${doctor.id}`
            }
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
              doctor.available
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            <CalendarDays size={17} />
            {doctor.available ? "Book Now" : "View Details"}
          </Link>

        </div>
      </div>
    </div>
  );
}