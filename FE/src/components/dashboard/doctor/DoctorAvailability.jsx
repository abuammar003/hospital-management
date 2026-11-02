"use client";

import { useState } from "react";

import {
  Clock,
  Save,
  CalendarDays,
} from "lucide-react";

import {
  useDoctorDashboard,
} from "@/context/DoctorDashboardContext";

export default function DoctorAvailability() {
  const { schedule, updateSchedule } = useDoctorDashboard();

  const [formSchedule, setFormSchedule] = useState(schedule);
  const [message, setMessage] = useState("");

  const handleChange = (index, field, value) => {
    setFormSchedule((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );

    setMessage("");
  };

  const handleSave = () => {
    const invalidDay = formSchedule.find(
      (item) =>
        item.enabled &&
        (!item.start || !item.end || item.start >= item.end)
    );

    if (invalidDay) {
      setMessage(
        `Please enter valid consultation hours for ${invalidDay.day}.`
      );
      return;
    }

    updateSchedule(formSchedule);
    setMessage("Demo availability updated successfully!");
  };

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Manage Availability
        </h1>

        <p className="mt-2 text-slate-500">
          Set your working days and consultation timings.
        </p>
      </div>

      {/* Schedule */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">
          <CalendarDays size={23} className="text-teal-600" />

          <h2 className="text-xl font-bold text-slate-900">
            Weekly Schedule
          </h2>
        </div>

        <div className="mt-7 space-y-4">

          {formSchedule.map((item, index) => (
            <div
              key={item.day}
              className="grid items-center gap-4 rounded-xl border border-slate-100 p-4 md:grid-cols-4"
            >

              {/* Day */}
              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "enabled",
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 accent-teal-600"
                />

                <span className="font-medium text-slate-800">
                  {item.day}
                </span>

              </label>

              {/* Start Time */}
              <div>
                <label className="mb-1 block text-xs text-slate-500">
                  Start Time
                </label>

                <input
                  type="time"
                  value={item.start}
                  disabled={!item.enabled}
                  onChange={(e) =>
                    handleChange(index, "start", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-100"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="mb-1 block text-xs text-slate-500">
                  End Time
                </label>

                <input
                  type="time"
                  value={item.end}
                  disabled={!item.enabled}
                  onChange={(e) =>
                    handleChange(index, "end", e.target.value)
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm disabled:bg-slate-100"
                />
              </div>

              {/* Status */}
              <span
                className={`rounded-full px-3 py-2 text-center text-xs font-semibold ${
                  item.enabled
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {item.enabled ? "Working Day" : "Day Off"}
              </span>

            </div>
          ))}

        </div>

        {/* Save */}
        <div className="mt-8 flex flex-wrap items-center gap-4">

          <button
            type="button"
            onClick={handleSave}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
          >
            <Save size={18} />
            Save Schedule
          </button>

          {message && (
            <p role="status" className="text-sm text-teal-700">
              {message}
            </p>
          )}

        </div>

      </div>

      {/* Information */}
      <div className="mt-6 rounded-xl bg-blue-50 p-5">

        <div className="flex items-start gap-3">
          <Clock size={21} className="mt-1 shrink-0 text-blue-600" />

          <p className="text-sm leading-7 text-slate-600">
            These are demo working hours. Later, actual appointment
            slots will be generated using the doctor's schedule,
            appointment duration, breaks and existing bookings.
          </p>
        </div>

      </div>

    </div>
  );
}