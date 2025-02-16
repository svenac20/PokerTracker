import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyAccount() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="flex py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>My Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={session.user.image || ""} alt="User Avatar" />
              <AvatarFallback>
                {getInitials(session.user.name || "")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{session.user.name}</h2>
              <p className="text-sm text-gray-600">{session.user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
