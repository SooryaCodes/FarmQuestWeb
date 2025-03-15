import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FarmQuest",
  description: "Your personal farming assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} antialiased pb-20 md:pb-24`}
      >
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
