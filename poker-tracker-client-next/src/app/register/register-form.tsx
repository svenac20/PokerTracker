"use client";

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
import { registerSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { auth } from "../../../firebaseconfig";

const RegisterForm: FunctionComponent = () => {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user.user, {
        displayName: data.username,
      });
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callback") || "/",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          form.setError("root", {
            message: "Email already in use",
          });
        }
        if (error.code === "auth/invalid-password") {
          form.setError("root", {
            message: "Password is too weak",
          });
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-96 flex gap-4 flex-col">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-extrabold">Username:</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field}></Input>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
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
                    autoComplete="current-password"
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
          <div className="pt-4">
            {form.formState.errors.root && (
              <FormMessage className="font-extrabold text-center pb-2">
                Error: {form.formState.errors.root.message}
              </FormMessage>
            )}
            <Button className="w-full" type="submit">
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
