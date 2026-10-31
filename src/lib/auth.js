export const dashboardRoutes = {
  patient: "/dashboard/patient",
  doctor: "/dashboard/doctor",
  hospital: "/dashboard/hospital",
};

export function getDashboardRoute(role) {
  return dashboardRoutes[role] || "/login";
}