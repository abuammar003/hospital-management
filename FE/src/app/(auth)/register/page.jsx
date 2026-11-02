import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | YourHealth",
  description:
    "Create a patient, doctor or hospital account on YourHealth.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}