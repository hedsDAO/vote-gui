import type { Metadata } from "next";
import Script from "next/script";
import RootProvider from "./providers";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import "@fontsource/space-mono";
import "@fontsource-variable/space-grotesk";
import "./globals.css";

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
      <head>
        <Script
          src={"https://kit.fontawesome.com/df4fc895e4.js"}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <RootProvider>
          <Navbar />
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
