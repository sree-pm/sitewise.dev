import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { ArrowRight } from "lucide-react";

interface FeatureProps {
  title: string;
  badge?: string;
  description: string;
  image: string;
  align?: "left" | "right";
  features?: string[];
  gradient?: string;
}

export function FeatureSection({ title, badge, description, image, align = "left", features, gradient = "purple" }: FeatureProps) {
  
  const gradients: Record<string, string> = {
      purple: "from-brand-purple/40 via-transparent to-transparent",
      blue: "from-brand-blue/40 via-transparent to-transparent",
      pink: "from-brand-pink/40 via-transparent to-transparent",
  }

  return (
    <section className="py-32 px-6 max-w-[1400px] mx-auto border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className={cn("absolute top-0 w-[1000px] h-[400px] bg-gradient-to-b opacity-20 blur-[120px] -z-10 rounded-full", gradients[gradient], align === "left" ? "-left-20" : "-right-20")} />

      <div className={cn("flex flex-col lg:flex-row items-center gap-20", align === "right" ? "lg:flex-row-reverse" : "")}>
        
        {/* Text Side */}
        <div className="flex-1 space-y-8 max-w-xl">
          {badge && (
              <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-purple">
                  <span className="h-px w-8 bg-brand-purple/50"></span>
                  {badge}
              </div>
          )}
          
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1]">
            {title}
          </h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            {description}
          </p>
          
          {features && (
            <div className="grid grid-cols-2 gap-4 pt-4">
              {features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300 font-medium border-l border-white/10 pl-4">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visual Side */}
        <div className="flex-1 w-full">
            <div className="relative rounded-lg border border-white/10 bg-glass p-2 shadow-2xl transition-transform duration-500 hover:scale-[1.01]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 rounded-lg pointer-events-none" />
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-auto rounded-md shadow-2xl opacity-90" 
                />
            </div>
        </div>

      </div>
    </section>
  )
}