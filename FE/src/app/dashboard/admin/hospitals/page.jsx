
import AdminDataTable from "@/components/dashboard/admin/AdminDataTable";
import { hospitals } from "@/data/hospitals";

export default function HospitalsPage() {
  const hospitalData = hospitals.map((hospital) => ({
    id: hospital.id,
    name: hospital.name,
    location: hospital.location,
    phone: hospital.phone,
    rating: hospital.rating,
    verified: hospital.verified,
  }));

  return (
    <AdminDataTable
      title="Manage Hospitals"
      description="View and manage all registered hospitals."
      data={hospitalData}
      searchPlaceholder="Search hospitals..."
      statusField="verified"
      trueLabel="Verified"
      falseLabel="Pending"
      columns={[
        { key: "name", label: "Hospital Name" },
        { key: "location", label: "Location" },
        { key: "phone", label: "Contact" },
        { key: "rating", label: "Rating" },
        { key: "verified", label: "Status" },
      ]}
    />
  );
}

