"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  UserRound,
  Stethoscope,
  Building2,
} from "lucide-react";

import { getDashboardRoute } from "@/lib/auth";

import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";




export default function LoginForm() {

  const router = useRouter();
  const [role, setRole] = useState("patient");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setMessage("Please fill in all required fields.");
    return;
  }

  // Demo login only
  router.push(getDashboardRoute(role));
};



  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">

      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-9">

        {/* Logo */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2"
        >
          <HeartPulse size={32} className="text-teal-600" />

          <span className="text-2xl font-bold text-slate-900">
            Your<span className="text-teal-600">Health</span>
          </span>
        </Link>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome Back!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your appointments and account.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">


        {/* Role Selection */}
          <div>
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Login As
            </label>

            <div className="grid grid-cols-3 gap-3">

              <button
                type="button"
                onClick={() => setRole("patient")}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition ${
                  role === "patient"
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <UserRound size={22} />
                <span className="text-xs font-semibold">Patient</span>
              </button>

              <button
                type="button"
                onClick={() => setRole("doctor")}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition ${
                  role === "doctor"
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <Stethoscope size={22} />
                <span className="text-xs font-semibold">Doctor</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole("hospital")}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3 transition ${
                  role === "hospital"
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <Building2 size={22} />
                <span className="text-xs font-semibold">Hospital</span>
              </button>
              
            </div>
          </div>
        


          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-teal-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm outline-none focus:border-teal-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <p
              role="status"
              className="rounded-lg bg-teal-50 p-3 text-sm text-teal-700"
            >
              {message}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-700"
          >
            Sign In
            <ArrowRight size={18} />
          </button>

        </form>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal-600 hover:underline"
          >
            Create Account
          </Link>
        </p>

        <p className="mt-5 text-center text-xs text-slate-400">
          Demo interface — login is not active yet.
        </p>

      </div>

    </div>
  );
}