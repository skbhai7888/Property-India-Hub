import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Property India Hub - Real Estate Projects in NCR, UP, Rajasthan & Uttarakhand",
  description: "Property India Hub offers verified residential and commercial property listings across Noida, Greater Noida, Ghaziabad, Mathura, Vrindavan, Ayodhya, Jageshwar Dham, Behror, and more. Book a free site visit today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16">{children}<BottomNav /></body>
    </html>
  );
}
