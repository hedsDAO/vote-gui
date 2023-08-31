import type { Metadata } from "next";
import RootProvider from "@/providers/RootProvider";
import Navbar from "@/components/navs/Navbar/Navbar";
import Footer from "@/components/navs/Footer/Footer";
import Loading from "@/app/_components/Loading/Loading";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

import "@fontsource/space-mono";
import "@fontsource-variable/space-grotesk";
import "globals.css";

export const metadata: Metadata = {
  title: "hedsVOTE",
  description: "voting for the masses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
