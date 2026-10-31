import HospitalSidebar from "@/components/dashboard/hospital/HospitalSidebar";

import {
  HospitalDashboardProvider,
} from "@/context/HospitalDashboardContext";

export default function HospitalLayout({ children }) {
  return (
    <HospitalDashboardProvider>
      <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">

        <HospitalSidebar />

        <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
          {children}
        </main>

      </div>
    </HospitalDashboardProvider>
  );
}