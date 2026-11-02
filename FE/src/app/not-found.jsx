import Link from "next/link";

import {
  HeartPulse,
  House,
  Search,
  ArrowLeft,
  Stethoscope,
  Hospital,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-teal-50 px-5 py-16">

      {/* Background Decorations */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">

        {/* Healthcare Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-100 bg-white shadow-lg shadow-blue-100/50">

          <HeartPulse
            size={48}
            strokeWidth={1.5}
            className="text-blue-600"
          />

        </div>

        {/* 404 Heading */}
        <div className="relative mb-6">

          <h1 className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-[110px] leading-none font-extrabold tracking-tight text-transparent sm:text-[150px]">
            404
          </h1>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">

            <Search size={16} />

            Page Not Found

          </div>

        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Oops! Looks Like You're Lost
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
          The page you're looking for doesn't exist or may have been
          moved. Don't worry, we're here to help you find your way
          back to better healthcare.
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">

          {/* Home Button */}
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
          >
            <House size={18} />
            Back to Home
          </Link>

          {/* Hospitals Button */}
          <Link
            href="/hospitals"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-blue-200 hover:text-blue-600 hover:shadow-md sm:w-auto"
          >
            <Hospital size={18} />
            Find Hospitals
          </Link>

        </div>

        {/* Divider */}
        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-xs font-medium text-slate-400">
            OR EXPLORE
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Explore Doctors */}
        <Link
          href="/doctors"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
        >
          <Stethoscope size={18} />

          Explore Our Doctors

          <ArrowLeft
            size={17}
            className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {/* Bottom Note */}
        <p className="mt-12 text-xs text-slate-400">
          Your Health, Our Priority.
        </p>

      </div>
    </main>
  );
}