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
  children?: React.ReactNode;
}

export const BentoCard = ({
  className,
  title,
  description,
  icon: Icon,
  href,
  cta,
  gradient = "gray",
  children,
}: BentoCardProps) => {
  
 const gradientMap: Record<string, string> = {
    purple: "from-brand-purple/20 via-transparent to-transparent",
    blue: "from-brand-blue/20 via-transparent to-transparent",
    pink: "from-brand-pink/20 via-transparent to-transparent",
    gray: "from-white/10 via-transparent to-transparent",
    // NEW COLORS ADDED BELOW:
    green: "from-green-500/20 via-transparent to-transparent",
    teal: "from-teal-500/20 via-transparent to-transparent", 
  };

  const glowMap: Record<string, string> = {
    purple: "hover:shadow-[0_0_40px_rgba(94,106,210,0.2)]",
    blue: "hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]",
    pink: "hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]",
    gray: "hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    green: "hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]",
    teal: "hover:shadow-[0_0_40px_rgba(20,184,166,0.2)]",
  };

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "border border-border-light hover:border-border-medium",
        "bg-glass-light hover:bg-glass-medium backdrop-blur-md",
        "p-6 md:p-8 transition-all duration-300",
        "hover:scale-102 hover:-translate-y-1",
        glowMap[gradient],
        "group cursor-pointer",
        className
      )}
    >
      {/* Premium gradient overlay */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity group-hover:opacity-60", gradientMap[gradient])} />
      
      {/* Subtle corner glow effect */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-purple/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
            {/* Premium icon container with layered effect */}
            <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-glass-light to-glass-medium p-3 backdrop-blur-md border border-border-light group-hover:border-brand-purple/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-purple/20">
                <Icon className="h-6 w-6 text-brand-purple group-hover:text-brand-purple-light transition-colors duration-300" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-text-primary tracking-tight leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue transition-all duration-300">{title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary group-hover:text-text-primary/80 transition-colors duration-300">{description}</p>
        </div>
        
        {children}
        
        <Link 
            href={href} 
            className="mt-8 inline-flex items-center text-sm font-semibold text-text-secondary group-hover:text-brand-purple transition-all duration-300 group-hover:translate-x-1"
        >
            {cta} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      </div>
    </div>
  );
};