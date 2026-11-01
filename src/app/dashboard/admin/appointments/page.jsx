
import AdminDataTable from "@/components/dashboard/admin/AdminDataTable";

const appointments = [
  {
    id: 1,
    patient: "Rahul Patil",
    doctor: "Dr. Ahmed Khan",
    hospital: "City Care Hospital",
    date: "01 Nov 2026",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Ayesha Shaikh",
    doctor: "Dr. Priya Sharma",
    hospital: "Life Care Hospital",
    date: "02 Nov 2026",
    time: "11:30 AM",
    status: "Pending",
  },
  {
    id: 3,
    patient: "Sameer Khan",
    doctor: "Dr. Rahul Patil",
    hospital: "City Care Hospital",
    date: "03 Nov 2026",
    time: "12:00 PM",
    status: "Cancelled",
  },
  {
    id: 4,
    patient: "Priya Sharma",
    doctor: "Dr. Ahmed Khan",
    hospital: "Life Care Hospital",
    date: "04 Nov 2026",
    time: "04:00 PM",
    status: "Completed",
  },
];

export default function AppointmentsPage() {
  return (
    <AdminDataTable
      title="Manage Appointments"
      description="View appointment records across all hospitals."
      data={appointments}
      searchPlaceholder="Search appointments..."
      columns={[
        { key: "patient", label: "Patient" },
        { key: "doctor", label: "Doctor" },
        { key: "hospital", label: "Hospital" },
        { key: "date", label: "Date" },
        { key: "time", label: "Time" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}
