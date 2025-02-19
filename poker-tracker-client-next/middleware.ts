import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { Roles } from "@/lib/types";
import { authOptions } from "@/lib/authOptions";

export async function middleware(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Check if the user is authenticated
  console.log(session)
  if (session?.user.roleId !== Roles.ADMIN) {
    console.log("NOT AUTHORIZED")
    // Redirect to the login page if the user is not authenticated
    return NextResponse.json(new Error("Unauthorized"), { status: 401 });
  }

  // Allow the request to proceed if the user is authenticated
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: ["/api/pokerGame", "/api/pokerGame/:path*"],
};