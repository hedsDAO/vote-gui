import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootProvider from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hedsVOTE",
  description: "voting for the masses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
