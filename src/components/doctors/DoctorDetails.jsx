import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Star,
  BadgeCheck,
  Clock,
  CalendarDays,
  GraduationCap,
  BriefcaseMedical,
  Languages,
  IndianRupee,
  Building2,
  Stethoscope,
  CheckCircle2,
} from "lucide-react";

import DoctorCard from "./DoctorCard";

import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";

export default function DoctorDetails({ doctor }) {
  // Find hospital associated with this doctor
  const hospital = hospitals.find(
    (item) => String(item.id) === String(doctor.hospitalId)
  );

  // Find doctors with the same specialization
  const relatedDoctors = doctors
    .filter(
      (item) =>
        item.specialization === doctor.specialization &&
        item.id !== doctor.id
    )
    .slice(0, 3);

  // Default profile information
  const about =
    doctor.about ||
    `${doctor.name} is a ${doctor.specialization} specialist with ${doctor.experience} years of experience. This is a demonstration doctor profile.`;

  const languages = doctor.languages || [
    "Hindi",
    "English",
    "Marathi",
  ];

  const workingDays = doctor.workingDays || [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const timings = doctor.timings || {
    morning: "10:00 AM - 1:00 PM",
    evening: "5:00 PM - 8:00 PM",
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
        <Link
          href="/doctors"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Doctors
        </Link>
      </div>

      {/* Doctor Profile */}
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

          {/* Top Background */}
          <div className="h-28 bg-gradient-to-r from-blue-100 via-teal-50 to-teal-100 sm:h-36" />

          <div className="px-6 pb-8 md:px-10">

            <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end">

              {/* Doctor Image */}
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-blue-50 shadow-md sm:h-44 sm:w-44">

                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="176px"
                  className="object-cover"
                />

              </div>

              {/* Doctor Basic Info */}
              <div className="flex-1 md:pb-2">

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    {doctor.name}
                  </h1>

                  {doctor.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      <BadgeCheck size={15} />
                      Demo Profile
                    </span>
                  )}

                </div>

                <p className="mt-2 font-semibold text-blue-600">
                  {doctor.specialization}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {doctor.qualification}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-slate-600">

                  <span className="flex items-center gap-2">
                    <Star
                      size={17}
                      className="fill-amber-400 text-amber-400"
                    />
                    {doctor.rating} ({doctor.reviews} demo reviews)
                  </span>

                  <span className="flex items-center gap-2">
                    <BriefcaseMedical
                      size={17}
                      className="text-blue-600"
                    />
                    {doctor.experience} Years Experience
                  </span>

                  <span className="flex items-center gap-2">
                    <MapPin
                      size={17}
                      className="text-blue-600"
                    />
                    {doctor.location}
                  </span>

                </div>

              </div>

              {/* Availability */}
              <div className="md:pb-2">

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                    doctor.available
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      doctor.available
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                  {doctor.available
                    ? "Available (Demo)"
                    : "Currently Unavailable (Demo)"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* About Doctor */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                About Doctor
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                {about}
              </p>

            </div>

            {/* Professional Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <h2 className="text-xl font-bold text-slate-900">
                Professional Information
              </h2>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">

                <div className="flex items-start gap-3">

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <GraduationCap size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Qualification
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {doctor.qualification}
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <BriefcaseMedical size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Experience
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {doctor.experience} Years
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Stethoscope size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Specialization
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {doctor.specialization}
                    </p>
                  </div>

                </div>

                <div className="flex items-start gap-3">

                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Languages size={22} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">
                      Languages
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {languages.join(", ")}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Hospital Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <div className="flex items-center gap-3">

                <Building2
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                  Hospital Information
                </h2>

              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-5">

                <h3 className="text-lg font-semibold text-slate-900">
                  {hospital?.name || doctor.hospital}
                </h3>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {hospital?.address || doctor.location}
                </p>

                {hospital && (
                  <Link
                    href={`/hospitals/${hospital.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View Hospital Details
                    <ArrowRight size={17} />
                  </Link>
                )}

              </div>

            </div>

            {/* Working Hours */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

              <div className="flex items-center gap-3">

                <Clock
                  size={24}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                  Consultation Schedule
                </h2>

              </div>

              <p className="mt-3 text-sm text-slate-500">
                Sample consultation hours for UI demonstration.
                Actual schedules will be managed by hospitals.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-blue-50 p-5">

                  <p className="text-sm font-medium text-blue-600">
                    Morning Session
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {timings.morning}
                  </p>

                </div>

                <div className="rounded-xl bg-teal-50 p-5">

                  <p className="text-sm font-medium text-teal-600">
                    Evening Session
                  </p>

                  <p className="mt-2 font-semibold text-slate-900">
                    {timings.evening}
                  </p>

                </div>

              </div>

              <h3 className="mt-7 font-semibold text-slate-900">
                Working Days
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">

                {workingDays.map((day) => (
                  <span
                    key={day}
                    className="inline-flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-700"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-teal-600"
                    />
                    {day}
                  </span>
                ))}

              </div>

            </div>

          </div>

          {/* Right Sidebar */}
          <div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">

              <h2 className="text-xl font-bold text-slate-900">
                Book Consultation
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Consultation information
              </p>

              <div className="my-6 border-t border-slate-100" />

              {/* Fee */}
              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Consultation Fee
                </span>

                <span className="flex items-center text-2xl font-bold text-slate-900">
                  <IndianRupee size={22} />
                  {doctor.consultationFee}
                </span>

              </div>

              {/* Availability */}
              <div className="mt-5 flex items-center justify-between">

                <span className="text-sm text-slate-500">
                  Availability
                </span>

                <span
                  className={`text-sm font-semibold ${
                    doctor.available
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {doctor.available
                    ? "Available (Demo)"
                    : "Unavailable (Demo)"}
                </span>

              </div>

              {/* Book Button */}
              {doctor.available ? (
              <Link
                href={`/book-appointment?doctorId=${doctor.id}`}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm               font-semibold text-white hover:bg-blue-700"
              >
                <CalendarDays size={19} />
                Book Appointment
              </Link>

              ) : (
                <button
                  disabled
                  className="mt-8 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-6 py-4 text-sm font-semibold text-slate-500"
                >
                  Currently Unavailable
                </button>
              )}

              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                Demo only. Appointment booking is not yet active.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Related Doctors */}
      {relatedDoctors.length > 0 && (
        <section className="bg-white py-16">

          <div className="mx-auto max-w-7xl px-5 lg:px-8">

            <div className="mb-10">

              <p className="text-sm font-semibold text-blue-600">
                EXPLORE MORE
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Related Doctors
              </h2>

              <p className="mt-3 text-slate-500">
                Explore other doctors specializing in{" "}
                {doctor.specialization}.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

              {relatedDoctors.map((relatedDoctor) => (
                <DoctorCard
                  key={relatedDoctor.id}
                  doctor={relatedDoctor}
                />
              ))}

            </div>

          </div>

        </section>
      )}

    </main>
  );
}