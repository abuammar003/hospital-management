
import Link from "next/link";
import {
  HeartPulse,
  Target,
  Eye,
  ShieldCheck,
  CalendarCheck,
  Search,
  Building2,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy Doctor Search",
    description:
      "Find doctors based on their specialization, experience and location.",
  },
  {
    icon: Building2,
    title: "Multiple Hospitals",
    description:
      "Explore hospitals and discover the healthcare services they offer.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Appointment Booking",
    description:
      "Check doctor availability and make appointment booking easier.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Our platform supports the verification of hospitals and doctors.",
  },
];

const values = [
  {
    icon: HeartPulse,
    title: "Patient First",
    description:
      "We believe everyone should be able to discover healthcare services without unnecessary difficulty.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To make finding hospitals, discovering doctors and booking appointments simple and accessible.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To build a connected healthcare platform that brings patients and healthcare providers together.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 px-5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            About YourHealth
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight text-slate-800 md:text-5xl">
            Making Healthcare
            <span className="text-blue-600"> Easier for Everyone</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            YourHealth is a healthcare appointment platform designed to help
            patients discover hospitals, find doctors and book appointments
            through one convenient place.
          </p>

          <Link
            href="/doctors"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Doctors
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-snug text-slate-800">
              Bringing Patients and Healthcare Providers Together
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Finding the right doctor or hospital should not be a complicated
              process. YourHealth aims to make this experience easier by
              connecting patients with healthcare providers through a single
              platform.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Patients can explore doctors, check hospital information and
              discover appointment options. Healthcare providers can use the
              platform to manage their presence and connect with patients.
            </p>
          </div>

          <div className="flex min-h-80 items-center justify-center rounded-3xl bg-blue-50 p-8">
            <div className="flex h-52 w-52 items-center justify-center rounded-full bg-blue-100">
              <HeartPulse
                size={110}
                strokeWidth={1.4}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision and Values */}
      <section className="bg-slate-50 px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              What Drives Us
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Our Mission, Vision & Values
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              We are building a platform around accessibility, simplicity and
              better healthcare experiences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={25} />
                  </div>

                  <h3 className="text-xl font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why YourHealth
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Healthcare Access Made Simpler
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Useful features designed to make healthcare discovery and
              appointment booking more convenient.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={25} />
                  </div>

                  <h3 className="font-semibold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-blue-600 px-6 py-14 text-center md:px-12">
          <Stethoscope className="mx-auto mb-5 text-white" size={42} />

          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Your Healthcare Journey Starts Here
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-blue-100">
            Explore healthcare providers and discover a simpler way to find
            the care you need.
          </p>

          <Link
            href="/doctors"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Explore Doctors
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

