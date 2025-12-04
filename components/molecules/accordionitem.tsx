"use client";
import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const contentId = React.useId();

  return (
    <div className="rounded-xl p-1">
      <div className="bg-glass-light/40 border border-white/8 rounded-xl p-4 md:p-6 hover:shadow-md hover:scale-102 smooth-transition group">
        <button
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between font-semibold text-left text-white hover:text-white smooth-transition"
        >
          <span className="text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue smooth-transition">{title}</span>
          <ChevronDown className={cn("h-5 w-5 shrink-0 smooth-transition duration-300 text-[#8A8F98] group-hover:text-brand-purple", isOpen && "rotate-180")} />
        </button>

        <div
          id={contentId}
          role="region"
          aria-hidden={!isOpen}
          className={cn(
            "overflow-hidden text-sm smooth-transition duration-400 text-[#8A8F98] mt-3",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <p className="leading-relaxed pr-0 md:pr-4 font-medium">{content}</p>
        </div>
      </div>
    </div>
  )
}