
import AdminDataTable from "@/components/dashboard/admin/AdminDataTable";
import { hospitals } from "@/data/hospitals";
import { doctors } from "@/data/doctors";

export default function VerificationPage() {
  const pendingHospitals = hospitals
    .filter((hospital) => !hospital.verified)
    .map((hospital) => ({
      id: `hospital-${hospital.id}`,
      name: hospital.name,
      type: "Hospital",
      location: hospital.location,
      verified: false,
    }));

  const pendingDoctors = doctors
    .filter((doctor) => !doctor.verified)
    .map((doctor) => ({
      id: `doctor-${doctor.id}`,
      name: doctor.name,
      type: "Doctor",
      location: doctor.location,
      verified: false,
    }));

  const pendingRequests = [
    ...pendingHospitals,
    ...pendingDoctors,
  ];

  return (
    <AdminDataTable
      title="Verification Requests"
      description="Review hospitals and doctors waiting for verification."
      data={pendingRequests}
      searchPlaceholder="Search verification requests..."
      statusField="verified"
      trueLabel="Verified"
      falseLabel="Pending"
      columns={[
        { key: "name", label: "Name" },
        { key: "type", label: "Account Type" },
        { key: "location", label: "Location" },
        { key: "verified", label: "Status" },
      ]}
    />
  );
}
