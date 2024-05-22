import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { OrganizationContextProvider } from "@/data/Organizationalcontextdata";
import BootstrapJs from "@/components/BootstrapJs";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "ICC app",
  description:
    "Innovation Cybercafe is a platform that provides innovative solutions to all online and Offline related educational problems to students across the trans secondary to tertiary level.",
};

export default function RootLayout({ children,session }) {
  return (
    <html lang="en">
      <body className="body">
        <SessionProvider session={session}>
          <OrganizationContextProvider>{children}</OrganizationContextProvider>
        </SessionProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
