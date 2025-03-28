import { Inter } from "next/font/google";
import "./style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "User Management",
  description:
    "User management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
