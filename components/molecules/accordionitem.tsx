"use client";
import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-1 w-full items-center justify-between py-6 font-medium transition-all hover:text-white text-left text-white group"
      >
        <span className="text-lg">{title}</span>
        <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform duration-200 text-[#8A8F98] group-hover:text-white", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden text-sm transition-all duration-300 ease-in-out text-[#8A8F98]", isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0")}>
        <p className="leading-relaxed pr-8">{content}</p>
      </div>
    </div>
  )
}