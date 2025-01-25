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
import { PrismaClient, Prisma } from '@prisma/client'
import prisma from "@/lib/prisma";

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
          const userDb = await prisma.user.upsert({
            where: {
              email: user.email!
            },
            create: {
              id: user.uid,
              email: user.email!,
              username: user.displayName!,
              roleId: Roles.PLAYER,
            },
            update: {
              id: user.uid
            }
          })
          return userDb;
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
        const userDb = await prisma.user.upsert({
          where: {
            email: user.email!
          },
          create: {
            email: user.email!,
            googleId: user.id!,
            username: user.name!,
            roleId: Roles.PLAYER,
          }, 
          update: {
            googleId: user.id,
          }
        })

        token.id = userDb.id;
        token.googleId = userDb.googleId || "";
        token.email = userDb.email;
        token.roleId = userDb.roleId;
        token.name = userDb.username;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
