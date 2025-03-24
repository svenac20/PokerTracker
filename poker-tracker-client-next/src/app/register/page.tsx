import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register to the poker radar app and become a member of the poker community. Use google login or create an account with your email.",
  twitter: {
    card: "summary_large_image",
  },
};


export default function Register() {
  return <RegisterForm />;
}
