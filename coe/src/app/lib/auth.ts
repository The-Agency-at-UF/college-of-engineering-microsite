import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Restrict to UFL emails
      return user.email?.endsWith("@ufl.edu") ?? false;
    }
  }
};

// Helper for server components
export function auth() {
  return getServerSession(authOptions);
}
