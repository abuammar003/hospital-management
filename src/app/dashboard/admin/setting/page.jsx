
import { Settings, ShieldCheck, Bell, User } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Admin Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your admin profile and application preferences.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <User className="mb-4 text-teal-600" size={25} />
          <h2 className="font-semibold text-slate-800">Admin Profile</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage your administrator account information.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Super Admin"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-600">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@yourhealth.com"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <Bell className="mb-4 text-teal-600" size={25} />
          <h2 className="font-semibold text-slate-800">Notifications</h2>
          <p className="mt-1 text-sm text-slate-500">
            Notification preferences will be configured here.
          </p>

          <div className="mt-5 space-y-4 text-sm text-slate-600">
            <p>New hospital registration notifications</p>
            <p>New doctor registration notifications</p>
            <p>Appointment activity notifications</p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <ShieldCheck className="mb-4 text-teal-600" size={25} />
          <h2 className="font-semibold text-slate-800">Security</h2>
          <p className="mt-1 text-sm text-slate-500">
            Security and account protection settings.
          </p>

          <div className="mt-5 text-sm text-slate-600">
            Password and authentication settings will be available after backend integration.
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <Settings className="mb-4 text-teal-600" size={25} />
          <h2 className="font-semibold text-slate-800">Application</h2>
          <p className="mt-1 text-sm text-slate-500">
            Basic application information.
          </p>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <p>Application: YourHealth</p>
            <p>Platform: Hospital Management System</p>
            <p>Version: 1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
