import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      roleId: number
      googleId: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** OpenID ID Token */
    id: string
    email: string
    picture: string
    roleId: number
    googleId: string
  }
}