import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";
import { auth } from "../../../../../firebaseconfig";
import axiosClient from "@/lib/axios";
import { GetUserResponse } from "@/lib/types";
export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "email and password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials!.email,
            credentials!.password
          );
          const user = userCredential.user;
          if (user) {
            console.log(axiosClient.getUri({ url: `/users/${user.uid}` }));
            const userDb = await axiosClient.get<GetUserResponse>(`/users/${user.uid}`);
            return userDb.data
          } else {
            return null;
          }
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
