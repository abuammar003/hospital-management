export const dashboardRoutes = {
  patient: "/dashboard/patient",
  doctor: "/dashboard/doctor",
  hospital: "/dashboard/hospital",
};

const USER_STORAGE_KEY = "yourhealth_user";

export function getDashboardRoute(role) {
  return dashboardRoutes[role] || "/login";
}

// Save logged-in user
export function saveUser(role) {
  const user = { role };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  // Notify Navbar immediately after login/register
  window.dispatchEvent(new Event("auth-change"));
}

// Get logged-in user
export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem(USER_STORAGE_KEY);

  return user ? JSON.parse(user) : null;
}

// Logout user (use later when adding Logout button)
export function logoutUser() {
  localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
}