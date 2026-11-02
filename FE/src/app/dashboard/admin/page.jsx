import {
  Users,
  Building2,
  Stethoscope,
  CalendarDays,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Total Patients",
    value: "1,250",
    icon: Users,
  },
  {
    title: "Total Hospitals",
    value: "48",
    icon: Building2,
  },
  {
    title: "Total Doctors",
    value: "320",
    icon: Stethoscope,
  },
  {
    title: "Total Appointments",
    value: "2,840",
    icon: CalendarDays,
  },
];

const requests = [
  {
    name: "City Care Hospital",
    type: "Hospital",
    date: "01 Nov 2026",
    status: "Pending",
  },
  {
    name: "Dr. Ahmed Khan",
    type: "Doctor",
    date: "01 Nov 2026",
    status: "Pending",
  },
  {
    name: "Life Care Hospital",
    type: "Hospital",
    date: "31 Oct 2026",
    status: "Pending",
  },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8" id="overview">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Welcome back! Here's what's happening on YourHealth.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-800">
                    {item.value}
                  </h2>
                </div>

                <div className="rounded-lg bg-teal-50 p-3 text-teal-600">
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Verification Requests */}
      <section
        className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        id="verification"
      >
        <div className="flex items-center gap-2 border-b border-slate-200 p-5">
          <Clock className="text-teal-600" size={20} />

          <h2 className="font-semibold text-slate-800">
            Recent Verification Requests
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Request Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={index}
                  className="border-t border-slate-100"
                >
                  <td className="p-4 font-medium text-slate-800">
                    {request.name}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.type}
                  </td>

                  <td className="p-4 text-slate-600">
                    {request.date}
                  </td>

                  <td className="p-4">
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      <p className="text-xs text-slate-400">
        Demo dashboard — all displayed statistics and requests are sample data.
      </p>

    </div>
  );
}