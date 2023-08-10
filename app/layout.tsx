
import type { Metadata } from "next";
import RootProvider from "./providers";
import '@fontsource/space-mono';
import '@fontsource-variable/space-grotesk';
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
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
