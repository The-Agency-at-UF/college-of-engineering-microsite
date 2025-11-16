import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],

  callbacks: {
    async signIn({ user }) {
      // restrict to @ufl only
      if (user.email?.endsWith("@ufl.edu")) {
        return true;
      }
      return false;
    }
  },
});

export { handler as GET, handler as POST };
