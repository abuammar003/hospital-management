"use client";

import { useState } from "react";

import {
  CalendarDays,
  Clock,
  UserRound,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useDoctorDashboard,
} from "@/context/DoctorDashboardContext";

export default function DoctorAppointments() {
  const {
    appointments,
    updateAppointmentStatus,
  } = useDoctorDashboard();

  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      activeFilter === "All" ||
      appointment.status === activeFilter
  );

  const handleStatusChange = (id, status) => {
    const confirmed = window.confirm(
      `Are you sure you want to mark this appointment as ${status}?`
    );

    if (!confirmed) return;

    updateAppointmentStatus(id, status);
  };

  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Appointment Management
        </h1>

        <p className="mt-2 text-slate-500">
          Review and manage your patient appointments.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-8 flex gap-3 overflow-x-auto pb-2">

        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium ${
              activeFilter === filter
                ? "bg-teal-600 text-white"
                : "border border-slate-200 bg-white text-slate-600"
            }`}
          >
            {filter}
          </button>
        ))}

      </div>

      {/* Appointments */}
      <div className="mt-6 space-y-5">

        {filteredAppointments.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-slate-500">
            No appointments found.
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >

              {/* Patient Information */}
              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>
                  <p className="text-xs text-slate-400">
                    Appointment ID: {appointment.id}
                  </p>

                  <h2 className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-900">
                    <UserRound size={19} className="text-teal-600" />
                    {appointment.patientName}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {appointment.patientAge} years • {appointment.gender}
                  </p>

                  <p className="mt-3 text-sm text-slate-600">
                    <span className="font-semibold">Reason:</span>{" "}
                    {appointment.reason}
                  </p>
                </div>

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

              {/* Date and Time */}
              <div className="mt-6 flex flex-wrap gap-6 border-t border-slate-100 pt-5 text-sm text-slate-600">

                <span className="flex items-center gap-2">
                  <CalendarDays size={17} className="text-teal-600" />
                  {appointment.date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={17} className="text-teal-600" />
                  {appointment.time}
                </span>

              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">

                {appointment.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(appointment.id, "Confirmed")
                      }
                      className="flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                    >
                      <CheckCircle2 size={17} />
                      Confirm
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(appointment.id, "Cancelled")
                      }
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <XCircle size={17} />
                      Reject
                    </button>
                  </>
                )}

                {appointment.status === "Confirmed" && (
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(appointment.id, "Completed")
                    }
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <CheckCircle2 size={17} />
                    Mark Completed
                  </button>
                )}

              </div>

            </div>
          ))
        )}

      </div>

      <p className="mt-6 text-sm text-slate-500">
        Demo only. Appointment status changes are not saved to a database.
      </p>

    </div>
  );
}