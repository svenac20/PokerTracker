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
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
    const user = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await updateProfile(user.user, {
      displayName: data.username,
    })
    await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("callback") || "/",
    });
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
                    {...field}
                  ></Input>
                </FormControl>
                <FormMessage className="font-bold" />
              </FormItem>
            )}
          />
          <div className="pt-4">
            <Button className="w-full" type="submit">
              Register
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
