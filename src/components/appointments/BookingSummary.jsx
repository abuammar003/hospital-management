import {
  CalendarDays,
  Clock,
  Building2,
  IndianRupee,
  Stethoscope,
} from "lucide-react";

export default function BookingSummary({
  doctor,
  hospital,
  selectedDate,
  selectedTime,
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">

      <h2 className="text-xl font-bold text-slate-900">
        Appointment Summary
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Review your selected appointment details.
      </p>

      <div className="mt-6 space-y-6 border-t border-slate-100 pt-6">

        {/* Doctor */}
        <div className="flex items-start gap-3">
          <Stethoscope size={20} className="mt-1 text-blue-600" />

          <div>
            <p className="text-sm text-slate-500">Doctor</p>

            <p className="mt-1 font-semibold text-slate-900">
              {doctor.name}
            </p>

            <p className="text-sm text-blue-600">
              {doctor.specialization}
            </p>
          </div>
        </div>

        {/* Hospital */}
        <div className="flex items-start gap-3">
          <Building2 size={20} className="mt-1 text-blue-600" />

          <div>
            <p className="text-sm text-slate-500">Hospital</p>

            <p className="mt-1 font-semibold text-slate-900">
              {hospital?.name || doctor.hospital}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <CalendarDays size={20} className="mt-1 text-blue-600" />

          <div>
            <p className="text-sm text-slate-500">Appointment Date</p>

            <p className="mt-1 font-semibold text-slate-900">
              {selectedDate || "Not selected"}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <Clock size={20} className="mt-1 text-blue-600" />

          <div>
            <p className="text-sm text-slate-500">Time Slot</p>

            <p className="mt-1 font-semibold text-slate-900">
              {selectedTime || "Not selected"}
            </p>
          </div>
        </div>

      </div>

      {/* Fee */}
      <div className="mt-7 border-t border-slate-100 pt-6">

        <div className="flex items-center justify-between">

          <span className="text-sm text-slate-600">
            Consultation Fee
          </span>

          <span className="flex items-center text-xl font-bold text-slate-900">
            <IndianRupee size={19} />
            {doctor.consultationFee}
          </span>

        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          This is a sample fee. Payment integration will be
          implemented later.
        </p>

      </div>

    </div>
  );
}