"use client";
import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-white/10 rounded-xl p-6 hover:bg-white/[0.03] hover:border-brand-purple/30 smooth-transition group cursor-pointer">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-1 w-full items-center justify-between font-semibold smooth-transition hover:text-white text-left text-white"
      >
        <span className="text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue smooth-transition">{title}</span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 smooth-transition duration-300 text-[#8A8F98] group-hover:text-brand-purple", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden text-sm smooth-transition duration-400 text-[#8A8F98] group-hover:text-white/70", isOpen ? "max-h-96 pt-4 opacity-100" : "max-h-0 opacity-0")}>
        <p className="leading-relaxed pr-4 font-medium">{content}</p>
      </div>
    </div>
  )
}