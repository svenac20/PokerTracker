import axiosClient from "@/lib/axios";
import {
  CreateUserRequest,
  CreateUserResponse,
  Roles
} from "@/lib/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { auth } from "../../../../../firebaseconfig";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
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
            const userReq: CreateUserRequest = {
              email: user.email!,
              id: user.uid,
            };
            const userDb = await axiosClient.post<CreateUserResponse>(
              `/users`,
              userReq
            );
            return userDb.data;
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
  callbacks: {
    async session({ session, token }) {
      // Add the user data to the session object
      session.user.id = token.id;
      session.user.googleId = token.googleId;
      session.user.email = token.email
      session.user.roleId = token.roleId;
      session.user.name = token.name;

      return session;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        const userReq: CreateUserRequest = {
          email: user.email!,
          googleId: user.id,
          username: user.name!,
          roleId: Roles.USER,
        };
        const userDb = await (
          await axiosClient.post<CreateUserResponse>(`users`, userReq)
        ).data;

        token.id = userDb.id;
        token.googleId = userDb.googleId;
        token.email = userDb.email;
        token.roleId = userDb.roleId;
        token.name = userDb.name;
      }

      console.log(token)
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

