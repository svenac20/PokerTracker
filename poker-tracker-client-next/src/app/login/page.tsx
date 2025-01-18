"use client"

import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/components/ui/google-signin-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Formik} from "formik";
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation";
 
export default function Login() {
  const searchParams = useSearchParams();
  return (
    <div className="flex flex-col items-center h-full">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          signIn("credentials", {
            email: values.email,
            password: values.password,
            callbackUrl: searchParams.get("callbackUrl") || "/",
          })
        }}
      >
        {(props: any) => {
          const { values, isSubmitting, handleChange, handleSubmit } = props;
          return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-96">
              <div>
                <Label htmlFor="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="password">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Sign In
              </Button>
              <Separator />
              <GoogleSignInButton onClick={() => signIn("google", {callbackUrl: searchParams.get("callbackUrl") || "/"})}/>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
