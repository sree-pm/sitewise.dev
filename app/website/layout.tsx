import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SiteWise - Build Beautiful Websites Faster",
  description: "A modern website builder with visual editing, design system components, and free hosting. Built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-h-screen bg-black text-white antialiased", inter.className)}>
      {children}
    </div>
  );
}
