import SuperAdminSidebar from "@/app/dashboard/admin/adminSideBar";

export default function SuperAdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">

      <SuperAdminSidebar />

      <main className="min-w-0 flex-1 p-5 md:p-8">
        {children}
      </main>

    </div>
  );
}