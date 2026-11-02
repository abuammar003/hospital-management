"use client";

import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Stethoscope,
  X,
} from "lucide-react";

import {
  useHospitalDashboard,
} from "@/context/HospitalDashboardContext";

const emptyDoctor = {
  name: "",
  specialization: "",
  qualification: "",
  experience: "",
  consultationFee: "",
};

export default function HospitalDoctors() {
  const {
    doctors,
    addDoctor,
    updateDoctor,
    removeDoctor,
  } = useHospitalDashboard();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyDoctor);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setFormData(emptyDoctor);
    setEditingId(null);
    setShowForm(true);
    setMessage("");
  };

  const openEditForm = (doctor) => {
    setFormData(doctor);
    setEditingId(doctor.id);
    setShowForm(true);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = {
      ...formData,
      experience: Number(formData.experience),
      consultationFee: Number(formData.consultationFee),
    };

    if (editingId !== null) {
      updateDoctor(doctorData);
      setMessage("Demo doctor updated successfully!");
    } else {
      addDoctor(doctorData);
      setMessage("Demo doctor added successfully!");
    }

    setShowForm(false);
    setFormData(emptyDoctor);
    setEditingId(null);
  };

  const handleRemove = (id) => {
    if (!window.confirm("Remove this demo doctor?")) return;

    const removed = removeDoctor(id);

    setMessage(
      removed
        ? "Demo doctor removed successfully!"
        : "This doctor has appointment records. Deactivate the doctor instead of removing them."
    );
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500";

  return (
    <div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Manage Doctors
          </h1>

          <p className="mt-2 text-slate-500">
            Add and manage your hospital's doctors.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
        >
          <Plus size={19} />
          Add Doctor
        </button>

      </div>

      {message && (
        <p role="status" className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
          {message}
        </p>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-bold text-slate-900">
              {editingId !== null ? "Edit Doctor" : "Add New Doctor"}
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              aria-label="Close form"
              className="cursor-pointer text-slate-500"
            >
              <X size={22} />
            </button>

          </div>

          <form onSubmit={handleSubmit} className="mt-6">

            <div className="grid gap-5 sm:grid-cols-2">

              {[
                { name: "name", label: "Doctor Name", type: "text" },
                { name: "specialization", label: "Specialization", type: "text" },
                { name: "qualification", label: "Qualification", type: "text" },
                { name: "experience", label: "Experience (Years)", type: "number" },
                { name: "consultationFee", label: "Consultation Fee (₹)", type: "number" },
              ].map((field) => (
                <div key={field.name}>

                  <label
                    htmlFor={field.name}
                    className="text-sm font-medium text-slate-700"
                  >
                    {field.label} *
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    min={field.type === "number" ? 0 : undefined}
                    required
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={inputClass}
                  />

                </div>
              ))}

            </div>

            <button
              type="submit"
              className="mt-7 cursor-pointer rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
            >
              {editingId !== null ? "Update Doctor" : "Add Doctor"}
            </button>

          </form>

        </div>
      )}

      {/* Doctors List */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-teal-50 p-3 text-teal-600">
                <Stethoscope size={24} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  {doctor.name}
                </h2>

                <p className="text-sm text-teal-600">
                  {doctor.specialization}
                </p>
              </div>

            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-600">

              <p>
                <strong>Qualification:</strong> {doctor.qualification}
              </p>

              <p>
                <strong>Experience:</strong> {doctor.experience} years
              </p>

              <p>
                <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
              </p>

              <p>
                <strong>Status:</strong> {doctor.status}
              </p>

            </div>

            <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">

              <button
                type="button"
                onClick={() => openEditForm(doctor)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleRemove(doctor.id)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Remove
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}