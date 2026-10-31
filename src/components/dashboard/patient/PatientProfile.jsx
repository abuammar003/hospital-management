"use client";

import { useState } from "react";

import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Save,
} from "lucide-react";

import { patient } from "@/data/patient";

export default function PatientProfile() {
  const [formData, setFormData] = useState(patient);
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

    setIsEditing(false);
    setMessage("Demo profile updated successfully!");
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500 disabled:bg-slate-50 disabled:text-slate-500";

  return (
    <div className="max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-slate-500">
          View and manage your personal information.
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
                  {formData.name}
                </h2>

                <p className="text-sm text-slate-500">
                  Patient Account (Demo)
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing);
                setMessage("");
              }}
              className="cursor-pointer rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>

          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave} className="mt-10">

            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                  Mobile Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="age" className="text-sm font-medium text-slate-700">
                  Age
                </label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  required
                  disabled={!isEditing}
                  value={formData.age}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="gender" className="text-sm font-medium text-slate-700">
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  disabled={!isEditing}
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>
                </select>
              </div>

              <div>
                <label htmlFor="bloodGroup" className="text-sm font-medium text-slate-700">
                  Blood Group
                </label>

                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  disabled={!isEditing}
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="city" className="text-sm font-medium text-slate-700">
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  disabled={!isEditing}
                  value={formData.city}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="address" className="text-sm font-medium text-slate-700">
                  Address
                </label>

                <input
                  id="address"
                  name="address"
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

            </div>

            {/* Save Button */}
            {isEditing && (
              <button
                type="submit"
                className="mt-8 flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
              >
                <Save size={18} />
                Save Changes
              </button>
            )}

            {message && (
              <p role="status" className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-700">
                {message}
              </p>
            )}

          </form>

        </div>

      </div>

    </div>
  );
}