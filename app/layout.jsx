// RootLayout.js (or RootLayout.tsx if using TypeScript)
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapJs from "@/components/BootstrapJs";
import { SessionProvider } from "next-auth/react";
import OffCanvas from "@/components/custom/Offcanvas/OffCanvas";
import ContextProviders from "@/data/ContextProviders";

export const metadata = {
  title: "ICC Online Center",
  description:
    "Innovation Cybercafe is a platform that provides innovative solutions to all online and Offline related educational problems to students across the trans secondary to tertiary level.",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="body">
        <SessionProvider session={session}>
          <ContextProviders>
            {children}
            <OffCanvas />
          </ContextProviders>
        </SessionProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
