
"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "Support email coming soon",
    description: "For general questions and support.",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "Contact number coming soon",
    description: "Our contact number will be available soon.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Malegaon, Maharashtra, India",
    description: "Our initial service launch location.",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Monday - Saturday",
    description: "Support timings will be announced soon.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Demo only: message is not sent to a server.
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-blue-50 px-5 py-16 text-center md:py-20">
        <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
          Contact YourHealth
        </span>

        <h1 className="mt-6 text-3xl font-bold text-slate-800 md:text-5xl">
          Get in Touch With Us
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
          Have a question, suggestion or need assistance? We would love to
          hear from you. Send us a message and connect with the YourHealth team.
        </p>
      </section>

      {/* Contact Content */}
      <section className="px-5 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-5">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Contact Information
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-800">
              We'd Love to Hear From You
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Whether you are a patient, doctor or hospital representative,
              feel free to reach out to us.
            </p>

            <div className="mt-8 space-y-6">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-blue-600">
                        {item.value}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg md:p-8 lg:col-span-3">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <MessageCircle size={24} />
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fill out the form below and let us know how we can help.
              </p>
            </div>

            {submitted && (
              <div
                role="status"
                className="mb-6 rounded-lg border border-green-100 bg-green-50 p-4 text-sm text-green-700"
              >
                Thank you! Your message has been submitted in this demo.
                No email has been sent.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Patient Support">Patient Support</option>
                  <option value="Doctor Registration">Doctor Registration</option>
                  <option value="Hospital Registration">Hospital Registration</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

