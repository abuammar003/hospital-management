
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata = {
  title: "YourHealth | Doctor Appointment Booking",
  description:
    "Find doctors, discover hospitals, and book appointments easily.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <header >
        <Navbar />
      </header>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
