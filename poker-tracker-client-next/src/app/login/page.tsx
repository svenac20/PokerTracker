import { Metadata } from "next";
import LoginPageForm from "./loginPageForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login",
    description: `Log in to Poker Radar to access live poker game updates, casino details, and advanced features. Secure login for users and admins.`,
    keywords: [
      "poker radar login",
      "login to poker radar",
      "admin login Poker Radar",
    ],
  };
}

export default function Login() {
  return <LoginPageForm />;
}
