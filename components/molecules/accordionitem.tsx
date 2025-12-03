"use client";
import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-1 w-full items-center justify-between py-4 font-medium transition-all hover:text-brand-purple text-left text-white"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden text-sm transition-all duration-300 ease-in-out text-gray-400", isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0")}>
        {content}
      </div>
    </div>
  )
}