import prisma from "@/lib/prisma";
import {
  Roles
} from "@/lib/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { auth } from "../../../../../firebaseconfig";
import { mapUserToToken } from "@/lib/utils";

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
          console.log("OVDJEEEEEEEEEEEEEEEEEEEE")
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials!.email,
            credentials!.password
          );
          const user = userCredential.user;
          return {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            roleId: Roles.PLAYER,
          }
        } catch (e) {
          console.log("ERROR")
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
      var userDb = null
      if (account && user && account.provider === "google") {
        userDb = await prisma.user.upsert({
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
        mapUserToToken(token, userDb)
      }

      else if(account && user && account.provider === "credentials") {
          userDb = await prisma.user.upsert({
            where: {
              email: user.email!
            },
            create: {
              email: user.email!,
              username: user.name || "",
              roleId: Roles.PLAYER,
            },
            update: {
              email: user.email!,
            }
          })
          mapUserToToken(token, userDb)
      }

      return token;
    },

  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

