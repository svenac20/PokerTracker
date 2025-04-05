import { Metadata } from "next";
import RegisterForm from "./register-form";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Register",
    description: `Create an account on Poker Radar to access live poker game updates, casino details, and advanced features. Join the ultimate poker tracking platform today.`,
    keywords: [
      "poker radar register",
      "register for poker radar",
      "create account Poker Radar",
      "Croatia poker registration"
    ],
  };
}

export default function Register() {
  return <RegisterForm />;
}
