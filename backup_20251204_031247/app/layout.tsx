import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/lib/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sitewise.dev | Production-Ready Next.js Template",
  description: "Free, open-source Next.js 15 template with TypeScript, Tailwind CSS, and 17+ components. Build beautiful websites in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.className, "bg-black antialiased")}>
        {children}
      </body>
    </html>
  );
}