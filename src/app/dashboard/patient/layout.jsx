import PatientSidebar from "@/components/dashboard/patient/PatientSidebar";

export default function PatientLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">

      {/* Sidebar */}
      <PatientSidebar />

      {/* Page Content */}
      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        {children}
      </main>

    </div>
  );
}