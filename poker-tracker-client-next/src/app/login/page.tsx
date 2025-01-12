import { Button } from "@/components/ui/button";
import GoogleSignInButton from "@/components/ui/google-signin-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Google from "next-auth/providers/google";

export default function Login() {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex flex-col gap-4 w-96">
        <div >
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div >
          <Label htmlFor="password">Password:</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <Button >Sign In</Button>
        <Separator />
        <GoogleSignInButton/>
      </div>
    </div>
  );
}
