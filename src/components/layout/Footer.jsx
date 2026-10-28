import Link from "next/link";

import {
  HeartPulse,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Hospitals", href: "/hospitals" },
  { name: "Find Doctors", href: "/doctors" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const patientLinks = [
  { name: "Book Appointment", href: "/doctors" },
  { name: "Find Hospitals", href: "/hospitals" },
  { name: "Find Specialists", href: "/doctors" },
  { name: "My Appointments", href: "/patient/appointments" },
  { name: "Patient Dashboard", href: "/patient" },
];

const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, href: "#" },
  { name: "Instagram", icon: FaInstagram, href: "#" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
  { name: "Twitter", icon: FaXTwitter, href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-12 lg:px-8">

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 - Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="rounded-xl bg-blue-600 p-2.5">
                <HeartPulse size={26} className="text-white" />
              </div>

              <span className="text-2xl font-bold">
                Your<span className="text-blue-400">Health</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Making healthcare accessible and convenient.
              Find doctors, discover hospitals, and manage
              your appointments in one place.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">

              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <span
                    key={social.name}
                    title={`${social.name} — Coming soon`}
                    aria-label={`${social.name} — Coming soon`}
                    className="flex h-10 w-10 items-center cursor-pointer justify-center rounded-lg bg-slate-800 text-slate-400"
                  >
                    <Icon size={18} />
                  </span>
                );
              })}

            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - For Patients */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              For Patients
            </h3>

            <ul className="space-y-4">
              {patientLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Contact Us
            </h3>

            <div className="space-y-5">

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Malegaon, Maharashtra, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    Phone Support
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Coming Soon
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail
                  size={20}
                  className="mt-0.5 shrink-0 text-blue-400"
                />

                <div>
                  <p className="text-sm font-medium text-white">
                    Email Support
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Coming Soon
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-6 text-center sm:flex-row sm:text-left lg:px-8">

          {/* Copyright */}
          <p className="text-sm text-slate-400">
            © {currentYear} YourHealth. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">

            <Link
              href="/privacy-policy"
              className="text-sm text-slate-400 transition-colors hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-slate-400 transition-colors hover:text-blue-400"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>
      </div>

    </footer>
  );
}