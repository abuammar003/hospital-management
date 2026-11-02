"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
  Stethoscope,
  Building2,
} from "lucide-react";

import { patient, patientAppointments } from "@/data/patient";

export default function PatientOverview() {
  const today = new Date().toLocaleDateString("en-CA");

  const upcomingAppointments = patientAppointments.filter(
    (appointment) =>
      appointment.date >= today &&
      ["Pending", "Confirmed"].includes(appointment.status)
  );

  const completedAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "Completed"
  );

  const cancelledAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "Cancelled"
  );

  const stats = [
    {
      title: "Upcoming Appointments",
      value: upcomingAppointments.length,
      icon: CalendarDays,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Completed Visits",
      value: completedAppointments.length,
      icon: CheckCircle2,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Cancelled",
      value: cancelledAppointments.length,
      icon: XCircle,
      bg: "bg-red-50",
      color: "text-red-600",
    },
    {
      title: "Total Appointments",
      value: patientAppointments.length,
      icon: Clock,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Welcome back, {patient.name.split(" ")[0]}! 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your healthcare appointments.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

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

      {/* Upcoming Appointments */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Appointments
          </h2>

          <Link
            href="/dashboard/patient/appointments"
            className="flex items-center gap-2 text-sm font-semibold text-teal-600 hover:underline"
          >
            View All
            <ArrowRight size={17} />
          </Link>

        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="py-12 text-center">
            <CalendarDays
              size={42}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 text-slate-500">
              No upcoming appointments.
            </p>

            <Link
              href="/doctors"
              className="mt-4 inline-block font-semibold text-teal-600"
            >
              Find a Doctor
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">

            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 p-5"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {appointment.doctorName}
                  </h3>

                  <p className="mt-1 text-sm text-teal-600">
                    {appointment.specialization}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {appointment.hospital}
                  </p>
                </div>

                <div className="text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {appointment.date}
                  </p>

                  <p className="mt-2 flex items-center gap-2">
                    <Clock size={16} />
                    {appointment.time}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}

          </div>
        )}

      </div>

      {/* Quick Actions */}
      <div>

        <h2 className="mb-5 text-xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">

          <Link
            href="/doctors"
            className="flex items-center justify-between rounded-2xl bg-teal-600 p-6 text-white transition hover:bg-teal-700"
          >
            <div>
              <Stethoscope size={28} />

              <h3 className="mt-4 text-lg font-bold">
                Find a Doctor
              </h3>

              <p className="mt-2 text-sm text-teal-50">
                Explore specialists and book a consultation.
              </p>
            </div>

            <ArrowRight size={22} />
          </Link>

          <Link
            href="/hospitals"
            className="flex items-center justify-between rounded-2xl bg-blue-600 p-6 text-white transition hover:bg-blue-700"
          >
            <div>
              <Building2 size={28} />

              <h3 className="mt-4 text-lg font-bold">
                Explore Hospitals
              </h3>

              <p className="mt-2 text-sm text-blue-50">
                Find hospitals and healthcare facilities.
              </p>
            </div>

            <ArrowRight size={22} />
          </Link>

        </div>

      </div>

    </div>
  );
}