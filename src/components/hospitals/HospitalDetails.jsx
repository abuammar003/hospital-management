import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  Star,
  BadgeCheck,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  ArrowRight,
  Building2,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

import DoctorCard from "@/components/doctors/DoctorCard";

import { doctors } from "@/data/doctors";

export default function HospitalDetails({ hospital }) {
  // Find doctors belonging to this hospital
  const hospitalDoctors = doctors.filter(
    (doctor) => doctor.hospitalId === hospital.id
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
        <Link
          href="/hospitals"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Hospitals
        </Link>
      </div>

      {/* Hospital Banner */}
      <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">

        <div className="relative h-[250px] overflow-hidden rounded-2xl bg-slate-200 sm:h-[350px] lg:h-[420px]">

          <Image
            src={hospital.image}
            alt={hospital.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {hospital.verified && (
            <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-teal-600 shadow-sm">
              <BadgeCheck size={18} />
              Demo Verified
            </div>
          )}

        </div>

      </section>

      {/* Hospital Information */}
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">

            <div>

              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-600">
                <Building2 size={18} />
                Hospital Profile
              </div>

              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                {hospital.name}
              </h1>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={18} className="text-blue-600" />
                {hospital.address}, {hospital.location}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Star
                  size={18}
                  className="fill-amber-400 text-amber-400"
                />

                <span className="font-semibold text-slate-800">
                  {hospital.rating}
                </span>

                <span className="text-sm text-slate-500">
                  ({hospital.reviews} demo reviews)
                </span>
              </div>

            </div>

            <Link
              href={`/doctors?hospitalId=${hospital.id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Stethoscope size={18} />
              Find Doctors
              <ArrowRight size={17} />
            </Link>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* About Hospital */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                About Hospital
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {hospital.description ||
                  "Hospital information will be available soon."}
              </p>

            </div>

            {/* Specializations */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Medical Specializations
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">

                {hospital.specializations.map((specialization) => (
                  <span
                    key={specialization}
                    className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600"
                  >
                    {specialization}
                  </span>
                ))}

              </div>

            </div>

            {/* Facilities */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Hospital Facilities
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {(hospital.facilities || []).map((facility) => (
                  <div
                    key={facility}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-teal-600"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {facility}
                    </span>
                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">

            {/* Opening Hours */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-2">
                <Clock size={21} className="text-blue-600" />

                <h2 className="text-xl font-bold text-slate-900">
                  Opening Hours
                </h2>
              </div>

              <div className="mt-6 space-y-4">

                {Object.entries(hospital.timings || {}).map(
                  ([day, time]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 text-sm"
                    >
                      <span className="capitalize text-slate-600">
                        {day}
                      </span>

                      <span className="text-right font-medium text-slate-900">
                        {time}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>

            {/* Contact Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Contact Information
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0 text-blue-600" />

                  <p className="text-sm leading-6 text-slate-600">
                    {hospital.address}, {hospital.location}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} className="shrink-0 text-blue-600" />

                  <p className="text-sm text-slate-600">
                    {hospital.phone || "Not available"}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={20} className="shrink-0 text-blue-600" />

                  <p className="break-all text-sm text-slate-600">
                    {hospital.email || "Not available"}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Hospital Doctors */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <div className="mb-10">

            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-600">
              <Stethoscope size={18} />
              OUR MEDICAL TEAM
            </div>

            <h2 className="text-3xl font-bold text-slate-900">
              Doctors at {hospital.name}
            </h2>

            <p className="mt-3 text-slate-500">
              Explore the doctors associated with this hospital.
            </p>

          </div>

          {hospitalDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {hospitalDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                />
              ))}

            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 p-10 text-center">
              <Stethoscope
                size={35}
                className="mx-auto text-slate-400"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                No Doctors Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Doctor information is not available for this hospital yet.
              </p>
            </div>
          )}

        </div>

      </section>

      {/* Demo Notice */}
      <div className="bg-white px-5 pb-10 text-center text-xs text-slate-400">
        This hospital profile contains demonstration information.
        It does not represent a verified healthcare provider.
      </div>

    </div>
  );
}