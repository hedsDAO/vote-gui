import type { Metadata } from "next";
import RootProvider from "@/providers/RootProvider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Loading from "@/app/loading";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

import "@fontsource/space-mono";
import "@fontsource-variable/space-grotesk";
import "globals.css";

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
      <body>
        <RootProvider>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
