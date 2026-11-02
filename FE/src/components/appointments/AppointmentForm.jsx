"use client";

import { useState } from "react";
import { UserRound, ArrowRight } from "lucide-react";

export default function AppointmentForm({
  doctor,
  selectedDate,
  selectedTime,
  onBooking,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "",
    reason: "",
  });

  const [error, setError] = useState("");

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit booking
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!doctor.available) {
      setError("This doctor is currently unavailable.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("Please select an appointment date and time.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter the patient's name.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      !Number.isInteger(Number(formData.age)) ||
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {
      setError("Please enter a valid age.");
      return;
    }

    if (!formData.gender) {
      setError("Please select a gender.");
      return;
    }

    // Frontend demo confirmation
    onBooking(formData.name);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500";

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <UserRound size={23} className="text-blue-600" />

        <h2 className="text-xl font-bold text-slate-900">
          Patient Details
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

        {/* Name */}
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Full Name *
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient name"
            className={inputClass}
          />
        </div>

        {/* Phone and Email */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label htmlFor="phone" className="text-sm font-medium">
              Mobile Number *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className={inputClass}
            />
          </div>

        </div>

        {/* Age and Gender */}
        <div className="grid gap-5 sm:grid-cols-2">

          <div>
            <label htmlFor="age" className="text-sm font-medium">
              Age *
            </label>

            <input
              id="age"
              name="age"
              type="number"
              min="1"
              max="120"
              required
              value={formData.age}
              onChange={handleChange}
              placeholder="Patient age"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="gender" className="text-sm font-medium">
              Gender *
            </label>

            <select
              id="gender"
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">
                Prefer not to say
              </option>
            </select>
          </div>

        </div>

        {/* Reason */}
        <div>
          <label htmlFor="reason" className="text-sm font-medium">
            Reason for Visit (Optional)
          </label>

          <textarea
            id="reason"
            name="reason"
            rows={4}
            value={formData.reason}
            onChange={handleChange}
            placeholder="Briefly describe your reason for visiting..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Error */}
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!doctor.available}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Confirm Demo Booking
          <ArrowRight size={18} />
        </button>

        <p className="text-center text-xs text-slate-500">
          This form is for frontend testing only.
          No patient information is submitted to a server.
        </p>

      </form>

    </div>
  );
}