"use client";

import { useState } from "react";
import Link from "next/link";

import {
  CalendarDays,
  Clock,
  IndianRupee,
  Stethoscope,
} from "lucide-react";

import { patientAppointments } from "@/data/patient";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState(patientAppointments);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (activeFilter === "All") return true;

    return appointment.status === activeFilter;
  });

  const handleCancel = (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this demo appointment?"
    );

    if (!confirmed) return;

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          My Appointments
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage your appointments.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">

        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-teal-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-teal-400"
            }`}
          >
            {filter}
          </button>
        ))}

      </div>

      {/* Appointment List */}
      <div className="mt-6 space-y-5">

        {filteredAppointments.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <CalendarDays
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              No Appointments Found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are no appointments in this category.
            </p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >

              <div className="flex flex-wrap items-start justify-between gap-4">

                {/* Doctor Details */}
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Appointment ID: {appointment.id}
                  </p>

                  <h2 className="mt-2 text-lg font-bold text-slate-900">
                    {appointment.doctorName}
                  </h2>

                  <p className="mt-1 text-sm font-medium text-teal-600">
                    {appointment.specialization}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {appointment.hospital}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    appointment.status === "Confirmed"
                      ? "bg-green-50 text-green-700"
                      : appointment.status === "Pending"
                      ? "bg-amber-50 text-amber-700"
                      : appointment.status === "Completed"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {appointment.status}
                </span>

              </div>

              {/* Appointment Information */}
              <div className="mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CalendarDays size={18} className="text-teal-600" />
                  {appointment.date}
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Clock size={18} className="text-teal-600" />
                  {appointment.time}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <IndianRupee size={18} className="text-teal-600" />
                  {appointment.fee}
                </div>

              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">

                <Link
                  href={`/doctors/${appointment.doctorId}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Stethoscope size={17} />
                  View Doctor
                </Link>

                {["Pending", "Confirmed"].includes(appointment.status) && (
                  <button
                    type="button"
                    onClick={() => handleCancel(appointment.id)}
                    className="cursor-pointer rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Cancel Appointment
                  </button>
                )}

              </div>

            </div>
          ))
        )}

      </div>

      <p className="mt-6 text-sm text-slate-500">
        Demo appointments only. Changes are not saved to a database.
      </p>

    </div>
  );
}