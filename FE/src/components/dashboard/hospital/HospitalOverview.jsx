"use client";

import Link from "next/link";

import {
  Stethoscope,
  CalendarDays,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building2,
} from "lucide-react";

import {
  useHospitalDashboard,
} from "@/context/HospitalDashboardContext";

export default function HospitalOverview() {
  const { hospital, doctors, appointments } = useHospitalDashboard();

  const pendingAppointments = appointments.filter(
    (item) => item.status === "Pending"
  );

  const completedAppointments = appointments.filter(
    (item) => item.status === "Completed"
  );

  const stats = [
    {
      title: "Total Doctors",
      value: doctors.length,
      icon: Stethoscope,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: CalendarDays,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
    {
      title: "Pending Requests",
      value: pendingAppointments.length,
      icon: Clock,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      title: "Completed Visits",
      value: completedAppointments.length,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          {hospital.name}
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to your hospital management dashboard.
        </p>

        <span
          className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
            hospital.verified
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {hospital.verified
            ? "Verified Hospital"
            : "Verification Pending (Demo)"}
        </span>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div className={`inline-flex rounded-xl p-3 ${stat.bg}`}>
                <Icon size={23} className={stat.color} />
              </div>

              <h2 className="mt-5 text-3xl font-bold text-slate-900">
                {stat.value}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {stat.title}
              </p>
            </div>
          );
        })}

      </div>

      {/* Recent Appointments */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Appointments
          </h2>

          <Link
            href="/dashboard/hospital/appointments"
            className="flex items-center gap-2 text-sm font-semibold text-teal-600"
          >
            View All
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-6 space-y-4">

          {appointments.slice(0, 5).map((appointment) => {
            const doctor = doctors.find(
              (item) => item.id === appointment.doctorId
            );

            return (
              <div
                key={appointment.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 p-4"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {appointment.patientName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {doctor?.name || "Doctor unavailable"}
                  </p>
                </div>

                <div className="text-sm text-slate-600">
                  <p>{appointment.date}</p>
                  <p>{appointment.time}</p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {appointment.status}
                </span>
              </div>
            );
          })}

        </div>

      </div>

      {/* Quick Actions */}
      <div className="grid gap-5 sm:grid-cols-2">

        <Link
          href="/dashboard/hospital/doctors"
          className="rounded-2xl bg-teal-600 p-6 text-white hover:bg-teal-700"
        >
          <Stethoscope size={28} />

          <h3 className="mt-4 text-lg font-bold">
            Manage Doctors
          </h3>

          <p className="mt-2 text-sm text-teal-50">
            Add, edit and manage hospital doctors.
          </p>
        </Link>

        <Link
          href="/dashboard/hospital/profile"
          className="rounded-2xl bg-blue-600 p-6 text-white hover:bg-blue-700"
        >
          <Building2 size={28} />

          <h3 className="mt-4 text-lg font-bold">
            Hospital Information
          </h3>

          <p className="mt-2 text-sm text-blue-50">
            Manage your hospital profile and facilities.
          </p>
        </Link>

      </div>

    </div>
  );
}