"use client";

import Link from "next/link";

import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Users,
  ArrowRight,
} from "lucide-react";

import {
  useDoctorDashboard,
} from "@/context/DoctorDashboardContext";

export default function DoctorOverview() {
  const { profile, appointments } = useDoctorDashboard();

  const today = new Date().toLocaleDateString("en-CA");

  const todayAppointments = appointments.filter(
    (item) =>
      item.date === today &&
      item.status !== "Cancelled"
  );

  const pendingAppointments = appointments.filter(
    (item) => item.status === "Pending"
  );

  const completedAppointments = appointments.filter(
    (item) => item.status === "Completed"
  );

  const upcomingAppointments = appointments
    .filter(
      (item) =>
        item.date >= today &&
        ["Pending", "Confirmed"].includes(item.status)
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: CalendarDays,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Pending Requests",
      value: pendingAppointments.length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed Visits",
      value: completedAppointments.length,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Total Appointments",
      value: appointments.length,
      icon: Users,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Welcome, {profile.name}! 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your appointments and schedule.
        </p>
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

      {/* Upcoming Appointments */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Appointments
          </h2>

          <Link
            href="/dashboard/doctor/appointments"
            className="flex items-center gap-2 text-sm font-semibold text-teal-600"
          >
            View All
            <ArrowRight size={17} />
          </Link>
        </div>

        {upcomingAppointments.length === 0 ? (
          <p className="mt-8 text-center text-slate-500">
            No upcoming appointments.
          </p>
        ) : (
          <div className="mt-6 space-y-4">

            {upcomingAppointments.slice(0, 5).map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 p-5"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {appointment.patientName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {appointment.reason}
                  </p>
                </div>

                <div className="text-sm text-slate-600">
                  <p>{appointment.date}</p>
                  <p className="mt-1">{appointment.time}</p>
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
      <div className="grid gap-5 sm:grid-cols-2">

        <Link
          href="/dashboard/doctor/appointments"
          className="rounded-2xl bg-teal-600 p-6 text-white hover:bg-teal-700"
        >
          <CalendarDays size={28} />

          <h3 className="mt-4 text-lg font-bold">
            Manage Appointments
          </h3>

          <p className="mt-2 text-sm text-teal-50">
            Review patient requests and manage consultations.
          </p>
        </Link>

        <Link
          href="/dashboard/doctor/availability"
          className="rounded-2xl bg-blue-600 p-6 text-white hover:bg-blue-700"
        >
          <Clock size={28} />

          <h3 className="mt-4 text-lg font-bold">
            Manage Availability
          </h3>

          <p className="mt-2 text-sm text-blue-50">
            Update your working days and consultation timings.
          </p>
        </Link>

      </div>

    </div>
  );
}