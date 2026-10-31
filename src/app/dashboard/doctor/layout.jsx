import DoctorSidebar from "@/components/dashboard/doctor/DoctorSidebar";

import {
  DoctorDashboardProvider,
} from "@/context/DoctorDashboardContext";

export default function DoctorLayout({ children }) {
  return (
    <DoctorDashboardProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">

        <DoctorSidebar />

        <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
          {children}
        </main>

      </div>
    </DoctorDashboardProvider>
  );
}