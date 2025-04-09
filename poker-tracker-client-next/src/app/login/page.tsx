import GoogleSignInButton from "@/components/custom/googleSigninButton";
import { LoadingSpinner } from "@/components/custom/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  return (<LoginPageForm/>
  );
}
