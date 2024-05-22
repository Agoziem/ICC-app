import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/verifyuser/`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            throw new Error(
              "An error Occurred while trying to verify user credentials"
            );
          }
          const userdata = await response.json();
          return userdata.user;

        } catch (error) {
          console.error("error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.first_name = user.first_name
        token.last_name = user.last_name
        token.avatar = user.avatar
        token.email = user.email
        token.is_staff = user.is_staff
        token.date_joined = user.date_joined
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.avatar = token.avatar;
      session.user.email = token.email;
      session.user.is_staff = token.is_staff;
      session.user.date_joined = token.date_joined;
      return session;
    },
  },
});
