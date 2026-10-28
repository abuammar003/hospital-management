"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Hospitals", href: "/hospitals" },
  { name: "Doctors", href: "/doctors" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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

        {/* Desktop Authentication Buttons */}
        <div className="hidden items-center gap-4 md:flex">
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
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg cursor-pointer p-2 text-slate-700 md:hidden"
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
                className="text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-3 border-t border-slate-100 pt-4">
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
          </div>
        </div>
      )}
    </header>
  );
}