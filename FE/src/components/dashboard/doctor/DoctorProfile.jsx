"use client";

import { useState } from "react";

import {
  UserRound,
  Save,
  Stethoscope,
} from "lucide-react";

import {
  useDoctorDashboard,
} from "@/context/DoctorDashboardContext";

export default function DoctorProfile() {
  const { profile, updateProfile } = useDoctorDashboard();

  const [formData, setFormData] = useState(profile);
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

    updateProfile(formData);
    setIsEditing(false);
    setMessage("Demo profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
    setMessage("");
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-500";

  return (
    <div className="max-w-5xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your professional information.
        </p>
      </div>

      {/* Profile Card */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        <div className="h-28 bg-gradient-to-r from-teal-100 to-blue-100" />

        <div className="px-6 pb-8">

          <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">

            <div className="flex items-end gap-4">

              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-teal-50 text-teal-600 shadow-sm">
                <UserRound size={36} />
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {profile.name}
                </h2>

                <p className="text-sm text-teal-600">
                  {profile.specialization} (Demo)
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

          {/* Profile Form */}
          <form onSubmit={handleSave} className="mt-10">

            <div className="grid gap-6 sm:grid-cols-2">

              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email Address", type: "email" },
                { name: "phone", label: "Mobile Number", type: "tel" },
                { name: "specialization", label: "Specialization", type: "text" },
                { name: "qualification", label: "Qualification", type: "text" },
                { name: "experience", label: "Experience (Years)", type: "number" },
                { name: "consultationFee", label: "Consultation Fee (₹)", type: "number" },
                { name: "hospital", label: "Hospital", type: "text" },
                { name: "location", label: "Location", type: "text" },
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
                    min={field.type === "number" ? 0 : undefined}
                    disabled={!isEditing}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>
              ))}

            </div>

            {/* About */}
            <div className="mt-6">
              <label
                htmlFor="about"
                className="text-sm font-medium text-slate-700"
              >
                About Doctor
              </label>

              <textarea
                id="about"
                name="about"
                rows={4}
                disabled={!isEditing}
                value={formData.about}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Save */}
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

      <div className="mt-6 flex items-start gap-3 rounded-xl bg-blue-50 p-5">
        <Stethoscope size={22} className="shrink-0 text-blue-600" />

        <p className="text-sm leading-7 text-slate-600">
          This is a demo profile. In production, medical registration
          details, credentials and hospital affiliation will require
          verification before changes become publicly visible.
        </p>
      </div>

    </div>
  );
}