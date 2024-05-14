import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ICC app",
  description:
    "Innovation Cybercafe is a platform that provides innovative solutions to all online and Offline related educational problems to students across the trans secondary to tertiary level.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
