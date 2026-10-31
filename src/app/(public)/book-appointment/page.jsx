import { Suspense } from "react";

import AppointmentBooking from "@/components/appointments/AppointmentBooking";

export const metadata = {
  title: "Book Appointment | YourHealth",
  description:
    "Select a doctor, choose an appointment date and time, and enter patient details.",
};

export default function BookAppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 p-10 text-center">
          Loading appointment booking...
        </div>
      }
    >
      <AppointmentBooking />
    </Suspense>
  );
}