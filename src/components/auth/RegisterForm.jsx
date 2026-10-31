"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getDashboardRoute } from "@/lib/auth";

import {
  HeartPulse,
  UserRound,
  Stethoscope,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function RegisterForm() {
  const [role, setRole] = useState("patient");
  const router = useRouter();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    registrationNumber: "",
    hospitalName: "",
    hospitalAddress: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    {
      id: "patient",
      label: "Patient",
      icon: UserRound,
    },
    {
      id: "doctor",
      label: "Doctor",
      icon: Stethoscope,
    },
    {
      id: "hospital",
      label: "Hospital",
      icon: Building2,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError("");
    setIsSubmitted(false);
  };


const handleSubmit = (e) => {
  e.preventDefault();
  setError("");

  if (formData.password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!/^[0-9]{10}$/.test(formData.phone)) {
    setError("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (
    role === "doctor" &&
    (!formData.specialization.trim() ||
      !formData.registrationNumber.trim())
  ) {
    setError("Please complete the doctor information.");
    return;
  }

  if (
    role === "hospital" &&
    (!formData.hospitalName.trim() ||
      !formData.hospitalAddress.trim())
  ) {
    setError("Please complete the hospital information.");
    return;
  }

  // Demo registration only
  // Redirect based on selected role
  router.push(getDashboardRoute(role));
};


  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500";

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-md rounded-2xl bg-white p-9 text-center shadow-sm">

          <CheckCircle2
            size={65}
            className="mx-auto text-teal-600"
          />

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Registration Form Completed!
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Your {role} registration details have passed
            the frontend validation.
          </p>

          <p className="mt-3 text-sm text-amber-700">
            This is a demo. No account has been created
            or submitted for verification.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white"
          >
            Go to Login
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">

      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">

        {/* Logo */}
        <Link
          href="/"
          className="mb-7 flex items-center justify-center gap-2"
        >
          <HeartPulse size={30} className="text-teal-600" />

          <span className="text-2xl font-bold text-slate-900">
            Your<span className="text-teal-600">Health</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            Create Your Account
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Join YourHealth and connect with healthcare services.
          </p>

        </div>

        {/* Role Selection */}
        <div className="mt-9">

          <h2 className="mb-4 text-sm font-semibold text-slate-700">
            Register As
          </h2>

          <div className="grid grid-cols-3 gap-3">

            {roles.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleRoleChange(item.id)}
                  aria-pressed={role === item.id}
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 transition ${
                    role === item.id
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  <Icon size={24} />

                  <span className="text-xs font-semibold sm:text-sm">
                    {item.label}
                  </span>
                </button>
              );
            })}

          </div>

        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-700">
              Full Name *
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">
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

          </div>

          {/* Doctor Fields */}
          {role === "doctor" && (
            <div className="space-y-5 rounded-xl border border-teal-100 bg-teal-50/50 p-5">

              <h3 className="font-semibold text-teal-700">
                Doctor Information
              </h3>

              <div>
                <label
                  htmlFor="specialization"
                  className="text-sm font-medium text-slate-700"
                >
                  Specialization *
                </label>

                <input
                  id="specialization"
                  name="specialization"
                  type="text"
                  required
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="registrationNumber"
                  className="text-sm font-medium text-slate-700"
                >
                  Medical Registration Number *
                </label>

                <input
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  required
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="Enter registration number"
                  className={inputClass}
                />
              </div>

              <p className="text-xs text-slate-500">
                Medical credentials will require verification
                before a real doctor profile can be published.
              </p>

            </div>
          )}

          {/* Hospital Fields */}
          {role === "hospital" && (
            <div className="space-y-5 rounded-xl border border-teal-100 bg-teal-50/50 p-5">

              <h3 className="font-semibold text-teal-700">
                Hospital Information
              </h3>

              <div>
                <label
                  htmlFor="hospitalName"
                  className="text-sm font-medium text-slate-700"
                >
                  Hospital Name *
                </label>

                <input
                  id="hospitalName"
                  name="hospitalName"
                  type="text"
                  required
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Enter hospital name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="hospitalAddress"
                  className="text-sm font-medium text-slate-700"
                >
                  Hospital Address *
                </label>

                <textarea
                  id="hospitalAddress"
                  name="hospitalAddress"
                  rows={3}
                  required
                  value={formData.hospitalAddress}
                  onChange={handleChange}
                  placeholder="Enter complete hospital address"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <p className="text-xs text-slate-500">
                Hospital details will require verification
                before the listing becomes publicly available.
              </p>

            </div>
          )}

          {/* Password */}
          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password *
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className={`${inputClass} pr-11`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-slate-700"
              >
                Confirm Password *
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={inputClass}
              />
            </div>

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
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 font-semibold text-white hover:bg-teal-700"
          >
            Create Demo Account
            <ArrowRight size={18} />
          </button>

        </form>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-teal-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <p className="mt-5 text-center text-xs text-slate-400">
          Frontend demo only — no account will be created.
        </p>

      </div>

    </div>
  );
}