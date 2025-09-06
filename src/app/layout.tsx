"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aside from "@/components/ui/Aside";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showAside = pathname !== "/login";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {showAside && <Aside />}
        <main className={showAside ? "ml-16 px-5" : ""}>
          {children}
        </main>
      </body>
    </html>
  );
}