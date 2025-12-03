import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BentoCardProps {
  className?: string;
  title: string;
  description: string;
  icon: any;
  href: string;
  cta: string;
  gradient?: string;
}

export const BentoCard = ({
  className,
  title,
  description,
  icon: Icon,
  href,
  cta,
  gradient = "gray",
}: BentoCardProps) => {
  
  const gradientMap: Record<string, string> = {
    purple: "from-brand-purple/20 via-transparent to-transparent",
    blue: "from-brand-blue/20 via-transparent to-transparent",
    pink: "from-brand-pink/20 via-transparent to-transparent",
    gray: "from-white/10 via-transparent to-transparent",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black p-6 transition-all duration-300 hover:border-white/20 hover:shadow-2xl group",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-80", gradientMap[gradient])} />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-white/10 p-2 backdrop-blur-sm text-white">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white tracking-tight">{title}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{description}</p>
        </div>
        
        <Link 
            href={href} 
            className="mt-6 flex items-center text-sm font-semibold text-white/70 transition-colors group-hover:text-white"
        >
            {cta} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};