
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HeartPulse,
  Menu,
  X,
  UserRound,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import {
  getCurrentUser,
  getDashboardRoute,
  logoutUser,
} from "@/lib/auth";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Hospitals", href: "/hospitals" },
  { name: "Doctors", href: "/doctors" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());

    const updateUser = () => {
      setUser(getCurrentUser());
    };

    window.addEventListener("auth-change", updateUser);

    return () => {
      window.removeEventListener("auth-change", updateUser);
    };
  }, []);

  const dashboardLink = user
    ? getDashboardRoute(user.role)
    : "/login";

  const handleLogout = () => {
    logoutUser();

    setUser(null);
    setIsProfileOpen(false);
    setIsMenuOpen(false);

    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <HeartPulse size={24} />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Your<span className="text-blue-600">Health</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                pathname === link.href
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-colors hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600"
                aria-label="User menu"
              >
                <UserRound size={21} />
              </button>

              {/* User Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-lg">

                  <Link
                    href={dashboardLink}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard size={18} />
                    My Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer rounded-lg p-2 text-slate-700 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium hover:text-blue-600 ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
              {user ? (
                <>
                  <Link
                    href={dashboardLink}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <LayoutDashboard size={18} />
                    My Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
