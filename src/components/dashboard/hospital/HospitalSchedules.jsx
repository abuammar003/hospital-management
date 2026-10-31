"use client";

import { useState } from "react";

import {
  Clock,
  Save,
} from "lucide-react";

import {
  useHospitalDashboard,
} from "@/context/HospitalDashboardContext";

export default function HospitalSchedules() {
  const {
    doctors,
    schedules,
    updateSchedule,
  } = useHospitalDashboard();

  const [message, setMessage] = useState("");

  const handleChange = (schedule, field, value) => {
    updateSchedule({
      ...schedule,
      [field]: value,
    });

    setMessage("");
  };

  const handleSave = () => {
    const invalidSchedule = schedules.find(
      (item) =>
        item.enabled &&
        (!item.start || !item.end || item.start >= item.end)
    );

    if (invalidSchedule) {
      setMessage("Please enter valid consultation hours.");
      return;
    }

    setMessage("Demo schedules updated successfully!");
  };

  return (
    <div>

      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Doctor Schedules
      </h1>

      <p className="mt-2 text-slate-500">
        Manage consultation hours for hospital doctors.
      </p>

      <div className="mt-8 space-y-5">

        {schedules.map((schedule) => {
          const doctor = doctors.find(
            (item) => item.id === schedule.doctorId
          );

          return (
            <div
              key={`${schedule.doctorId}-${schedule.day}`}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >

              <div className="flex items-center gap-3">

                <Clock size={22} className="text-teal-600" />

                <div>
                  <h2 className="font-bold text-slate-900">
                    {doctor?.name || "Doctor unavailable"}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {schedule.day}
                  </p>
                </div>

              </div>

              <div className="mt-6 grid items-end gap-5 sm:grid-cols-3">

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Start Time
                  </label>

                  <input
                    type="time"
                    value={schedule.start}
                    disabled={!schedule.enabled}
                    onChange={(e) =>
                      handleChange(schedule, "start", e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    End Time
                  </label>

                  <input
                    type="time"
                    value={schedule.end}
                    disabled={!schedule.enabled}
                    onChange={(e) =>
                      handleChange(schedule, "end", e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 disabled:bg-slate-100"
                  />
                </div>

                <label className="flex items-center gap-3 pb-3">
                  <input
                    type="checkbox"
                    checked={schedule.enabled}
                    onChange={(e) =>
                      handleChange(schedule, "enabled", e.target.checked)
                    }
                    className="h-4 w-4 accent-teal-600"
                  />

                  <span className="text-sm font-medium text-slate-700">
                    Working Day
                  </span>
                </label>

              </div>

            </div>
          );
        })}

      </div>

      <button
        type="button"
        onClick={handleSave}
        className="mt-8 flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
      >
        <Save size={18} />
        Save Schedules
      </button>

      {message && (
        <p role="status" className="mt-4 text-sm text-teal-700">
          {message}
        </p>
      )}

      <p className="mt-6 text-sm text-slate-500">
        Demo only. Schedule changes are stored in React state,
        and are not connected to appointment booking.
      </p>

    </div>
  );
}