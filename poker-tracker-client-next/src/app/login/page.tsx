"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoogleSignInButton from "@/components/ui/google-signin-button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { loginSchema, registerSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Login() {
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: searchParams.get("callback") || "/",
    });
  };
  return (
    <div className="flex flex-col items-center   gap-4">
      <Form {...form}>
        <form
          className="flex justify-center w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="w-96 flex gap-4 flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold">Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field}></Input>
                  </FormControl>
                  <FormMessage className="font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-extrabold">Password:</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage className="font-bold" />
                </FormItem>
              )}
            />
            <span className="text-sm text-center">
              {"Don't have an account? Register "}
              <Link
                href={`/register`}
                className="font-bold cursor-pointer underline"
              >
                {"here"}
              </Link>
            </span>
            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="flex justify-center flex-col gap-4 w-full lg:w-96">
        <Separator />
        <GoogleSignInButton
          onClick={() =>
            signIn("google", {
              callbackUrl: searchParams.get("callbackUrl") || "/",
            })
          }
        />
      </div>
    </div>
  );
}
