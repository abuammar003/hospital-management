
import AdminDataTable from "@/components/dashboard/admin/AdminDataTable";

const patients = [
  {
    id: 1,
    name: "Rahul Patil",
    email: "rahul@example.com",
    phone: "9876543210",
    location: "Malegaon",
    status: true,
  },
  {
    id: 2,
    name: "Ayesha Shaikh",
    email: "ayesha@example.com",
    phone: "9876543211",
    location: "Nashik",
    status: true,
  },
  {
    id: 3,
    name: "Sameer Khan",
    email: "sameer@example.com",
    phone: "9876543212",
    location: "Dhule",
    status: false,
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543213",
    location: "Malegaon",
    status: true,
  },
];

export default function PatientsPage() {
  return (
    <AdminDataTable
      title="Manage Patients"
      description="View and manage registered patient accounts."
      data={patients}
      searchPlaceholder="Search patients..."
      statusField="status"
      trueLabel="Active"
      falseLabel="Inactive"
      columns={[
        { key: "name", label: "Patient Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "location", label: "Location" },
        { key: "status", label: "Status" },
      ]}
    />
  );
}







