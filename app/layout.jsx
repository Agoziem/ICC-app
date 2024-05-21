import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { OrganizationContextProvider } from "@/data/Organizationalcontextdata";
import BootstrapJs from "@/components/BootstrapJs";

export const metadata = {
  title: "ICC app",
  description:
    "Innovation Cybercafe is a platform that provides innovative solutions to all online and Offline related educational problems to students across the trans secondary to tertiary level.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
        <OrganizationContextProvider>{children}</OrganizationContextProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
