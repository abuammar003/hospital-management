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
  useHospitalDashboard,
} from "@/context/HospitalDashboardContext";

export default function HospitalAppointments() {
  const {
    appointments,
    doctors,
    updateAppointmentStatus,
  } = useHospitalDashboard();

  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ];

  const filteredAppointments = appointments.filter(
    (item) =>
      activeFilter === "All" ||
      item.status === activeFilter
  );

  const handleStatusChange = (id, status) => {
    if (!window.confirm(`Mark appointment as ${status}?`)) return;

    updateAppointmentStatus(id, status);
  };

  return (
    <div>

      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Hospital Appointments
      </h1>

      <p className="mt-2 text-slate-500">
        Manage appointment requests for your hospital.
      </p>

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

      {/* Appointment Cards */}
      <div className="mt-6 space-y-5">

        {filteredAppointments.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500">
            No appointments found.
          </div>
        ) : (
          filteredAppointments.map((appointment) => {
            const doctor = doctors.find(
              (item) => item.id === appointment.doctorId
            );

            return (
              <div
                key={appointment.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >

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
                      Doctor: {doctor?.name || "Doctor unavailable"}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {appointment.status}
                  </span>

                </div>

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

                <div className="mt-6 flex flex-wrap gap-3">

                  {appointment.status === "Pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(appointment.id, "Confirmed")
                        }
                        className="flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white"
                      >
                        <CheckCircle2 size={17} />
                        Confirm
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(appointment.id, "Cancelled")
                        }
                        className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600"
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
                      className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Mark Completed
                    </button>
                  )}

                </div>

              </div>
            );
          })
        )}

      </div>

      <p className="mt-6 text-sm text-slate-500">
        Demo appointments only. Changes are not saved to a database.
      </p>

    </div>
  );
}