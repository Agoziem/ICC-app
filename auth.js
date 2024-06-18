import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Configure one or more authentication providers
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
    async jwt({ token, user, account, profile }) {
      if (
        (user && account.provider === "google") ||
        (user && account.provider === "github")
      ) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DJANGO_API_BASE_URL}/authapi/register_oauth/${account.provider}/`,
            {
              method: "POST",
              body: JSON.stringify(profile),
              headers: { "Content-Type": "application/json" },
            }
          );

          if (!response.ok) {
            throw new Error(
              "An error Occurred while trying to verify user credentials"
            );
          }
          const oauthuserdata = await response.json();
          token.id = oauthuserdata.id;
          token.username = oauthuserdata.username;
          token.first_name = oauthuserdata.first_name;
          token.last_name = oauthuserdata.last_name;
          token.email = oauthuserdata.email;
          token.is_staff = oauthuserdata.is_staff;
          token.date_joined = oauthuserdata.date_joined;
          token.isOauth = oauthuserdata.isOauth;
          token.emailIsVerified = oauthuserdata.emailIsVerified;
          token.twofactorIsEnabled = oauthuserdata.twofactorIsEnabled;
          token.sex = oauthuserdata.Sex;
          token.phone = oauthuserdata.phone;
          token.address = oauthuserdata.address;
          token.avatar_name = oauthuserdata.avatar_name;
          token.avatar_url = oauthuserdata.avatar_url;
          return token;
        } catch (error) {
          console.error("error:", error);
          return token;
        }
      }

      if (user && account.provider === "credentials") {
        token.id = user.id;
        token.username = user.username;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.picture = user.avatar_url;
        token.email = user.email;
        token.is_staff = user.is_staff;
        token.date_joined = user.date_joined;
        token.isOauth = user.isOauth;
        token.emailIsVerified = user.emailIsVerified;
        token.twofactorIsEnabled = user.twofactorIsEnabled;
        token.sex = user.Sex;
        token.phone = user.phone;
        token.address = user.address;
        token.avatar = user.avatar;
        token.avatar_name = user.avatar_name;
        token.avatar_url = user.avatar_url;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.first_name = token.first_name;
      session.user.last_name = token.last_name;
      session.user.image = token.picture;
      session.user.email = token.email;
      session.user.is_staff = token.is_staff;
      session.user.date_joined = token.date_joined;
      session.user.isOauth = token.isOauth;
      session.user.emailIsVerified = token.emailIsVerified;
      session.user.twofactorIsEnabled = token.twofactorIsEnabled;
      session.user.sex = token.sex;
      session.user.phone = token.phone;
      session.user.address = token.address;
      session.user.avatar = token.avatar;
      session.user.avatar_name = token.avatar_name;
      session.user.avatar_url = token.avatar_url;
      return session;
    },
  },
});
