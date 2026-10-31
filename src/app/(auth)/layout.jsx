import Navbar from "@/components/layout/Navbar";


export default function AuthLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

    </>
  );
}