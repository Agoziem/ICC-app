import NextAuth,{ type DefaultSession } from "next-auth";


export type ExtendedUser = {
  is_staff: boolean,
  isTwoFactorEnabled: boolean,
  isOauth: boolean,
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}