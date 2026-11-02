"use client";

import { useState } from "react";

import {
  Building2,
  Save,
  BadgeCheck,
} from "lucide-react";

import {
  useHospitalDashboard,
} from "@/context/HospitalDashboardContext";

export default function HospitalProfile() {
  const { hospital, updateHospital } = useHospitalDashboard();

  const [formData, setFormData] = useState({
    ...hospital,
    facilitiesText: hospital.facilities.join(", "),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedHospital = {
      ...formData,
      facilities: formData.facilitiesText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    delete updatedHospital.facilitiesText;

    updateHospital(updatedHospital);

    setIsEditing(false);
    setMessage("Demo hospital profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      ...hospital,
      facilitiesText: hospital.facilities.join(", "),
    });

    setIsEditing(false);
    setMessage("");
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-500";

  return (
    <div className="max-w-5xl">

      <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
        Hospital Profile
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your hospital information and facilities.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        <div className="h-28 bg-gradient-to-r from-teal-100 to-blue-100" />

        <div className="px-6 pb-8">

          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">

            <div className="flex items-end gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-teal-50 text-teal-600 shadow-sm">
                <Building2 size={35} />
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {hospital.name}
                </h2>

                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <BadgeCheck size={16} />
                  {hospital.verified
                    ? "Verified"
                    : "Verification Pending (Demo)"}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                isEditing ? handleCancel() : setIsEditing(true)
              }
              className="cursor-pointer rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>

          </div>

          <form onSubmit={handleSave} className="mt-10">

            <div className="grid gap-6 sm:grid-cols-2">

              {[
                { name: "name", label: "Hospital Name", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "city", label: "City", type: "text" },
                { name: "address", label: "Hospital Address", type: "text" },
              ].map((field) => (
                <div key={field.name}>

                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700"
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required
                    disabled={!isEditing}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>
              ))}

            </div>

            {/* Description */}
            <div className="mt-6">
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Hospital Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                disabled={!isEditing}
                value={formData.description}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Facilities */}
            <div className="mt-6">
              <label
                htmlFor="facilitiesText"
                className="text-sm font-medium text-slate-700"
              >
                Hospital Facilities
              </label>

              <textarea
                id="facilitiesText"
                name="facilitiesText"
                rows={3}
                disabled={!isEditing}
                value={formData.facilitiesText}
                onChange={handleChange}
                placeholder="Emergency, ICU, Pharmacy, Parking"
                className={`${inputClass} resize-none`}
              />

              <p className="mt-2 text-xs text-slate-500">
                Separate facilities using commas.
              </p>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="mt-7 flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
              >
                <Save size={18} />
                Save Changes
              </button>
            )}

            {message && (
              <p role="status" className="mt-5 text-sm text-green-700">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>

      <p className="mt-6 text-sm text-slate-500">
        Demo profile only. Hospital verification status cannot be
        changed from this page.
      </p>

    </div>
  );
}