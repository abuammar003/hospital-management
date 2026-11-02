
import AdminDataTable from "@/components/dashboard/admin/AdminDataTable";
import { doctors } from "@/data/doctors";

export default function DoctorsPage() {
  const doctorData = doctors.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    specialization: doctor.specialization,
    hospital: doctor.hospital,
    experience: `${doctor.experience} years`,
    consultationFee: `₹${doctor.consultationFee}`,
    verified: doctor.verified,
  }));

  return (
    <AdminDataTable
      title="Manage Doctors"
      description="View registered doctors and their verification status."
      data={doctorData}
      searchPlaceholder="Search doctors..."
      statusField="verified"
      trueLabel="Verified"
      falseLabel="Pending"
      columns={[
        { key: "name", label: "Doctor Name" },
        { key: "specialization", label: "Specialization" },
        { key: "hospital", label: "Hospital" },
        { key: "experience", label: "Experience" },
        { key: "consultationFee", label: "Fee" },
        { key: "verified", label: "Status" },
      ]}
    />
  );
}
