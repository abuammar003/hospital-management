"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Stethoscope,
} from "lucide-react";

import AppointmentForm from "./AppointmentForm";
import BookingSummary from "./BookingSummary";

import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";

// Demo appointment slots
const timeSlots = {
  morning: [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
  ],
  evening: [
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
  ],
};

// Get local date in YYYY-MM-DD format
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AppointmentBooking() {
  const searchParams = useSearchParams();

  const doctorId = searchParams.get("doctorId");

  const doctor = doctors.find(
    (item) => String(item.id) === String(doctorId)
  );

  const hospital = hospitals.find(
    (item) => String(item.id) === String(doctor?.hospitalId)
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [patientName, setPatientName] = useState("");

  // Current date and maximum date (30 days ahead)
  const today = formatDate(new Date());

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const maxBookingDate = formatDate(maxDate);

  // Handle booking confirmation
  const handleBooking = (name) => {
    setPatientName(name);
    setIsBooked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Doctor not found
  if (!doctor) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <Stethoscope size={50} className="text-blue-500" />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Doctor Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          Please select a doctor before booking an appointment.
        </p>

        <Link
          href="/doctors"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          Explore Doctors
        </Link>
      </div>
    );
  }

  // Booking success screen
  if (isBooked) {
    return (
      <div className="min-h-[75vh] bg-slate-50 px-5 py-16">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 size={45} className="text-green-600" />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Demo Booking Completed!
          </h1>

          <p className="mt-3 text-slate-500">
            Thank you, {patientName}. Your appointment details
            have been entered successfully.
          </p>

          <div className="mt-7 space-y-3 rounded-xl bg-slate-50 p-5 text-left text-sm">
            <p>
              <strong>Doctor:</strong> {doctor.name}
            </p>

            <p>
              <strong>Hospital:</strong> {hospital?.name || doctor.hospital}
            </p>

            <p>
              <strong>Date:</strong> {selectedDate}
            </p>

            <p>
              <strong>Time:</strong> {selectedTime}
            </p>

            <p>
              <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
            </p>
          </div>

          <p className="mt-5 text-sm text-amber-700">
            This is a frontend demonstration. No real appointment
            has been created or sent to the hospital.
          </p>

          <Link
            href="/doctors"
            className="mt-7 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <Link
            href={`/doctors/${doctor.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Doctor Profile
          </Link>

          <h1 className="mt-6 text-3xl font-bold text-slate-900 md:text-4xl">
            Book an Appointment
          </h1>

          <p className="mt-3 text-slate-600">
            Select your preferred date and time, then enter your details.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Demo booking only — availability is not verified.
          </p>

        </div>
      </section>

      {/* Booking Content */}
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-8 lg:col-span-2">

            {/* Doctor Information */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Selected Doctor
              </h2>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="mt-1 text-sm text-blue-600">
                    {doctor.specialization}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    {hospital?.name || doctor.hospital}
                  </p>
                </div>

                <Link
                  href="/doctors"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Change Doctor
                </Link>

              </div>
            </div>

            {/* Date Selection */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">
                <CalendarDays size={23} className="text-blue-600" />

                <h2 className="text-xl font-bold text-slate-900">
                  Select Appointment Date
                </h2>
              </div>

              <label
                htmlFor="appointment-date"
                className="mt-6 block text-sm font-medium text-slate-700"
              >
                Preferred Date
              </label>

              <input
                id="appointment-date"
                type="date"
                min={today}
                max={maxBookingDate}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime("");
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 sm:max-w-sm"
              />

              <p className="mt-3 text-xs text-slate-500">
                You can select a date within the next 30 days.
              </p>

            </div>

            {/* Time Selection */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">
                <Clock size={23} className="text-blue-600" />

                <h2 className="text-xl font-bold text-slate-900">
                  Select Time Slot
                </h2>
              </div>

              {!selectedDate ? (
                <p className="mt-6 text-sm text-slate-500">
                  Please select an appointment date first.
                </p>
              ) : (
                <div className="mt-6 space-y-7">

                  {/* Morning Slots */}
                  <div>
                    <h3 className="mb-4 font-semibold text-slate-800">
                      Morning
                    </h3>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {timeSlots.morning.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Evening Slots */}
                  <div>
                    <h3 className="mb-4 font-semibold text-slate-800">
                      Evening
                    </h3>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {timeSlots.evening.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:border-blue-400"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Patient Details */}
            <AppointmentForm
              doctor={doctor}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBooking={handleBooking}
            />

          </div>

          {/* Right Side */}
          <div>
            <BookingSummary
              doctor={doctor}
              hospital={hospital}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </div>

        </div>

      </section>

    </main>
  );
}