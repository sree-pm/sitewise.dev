import { cn } from "@/lib/utils";
import { Button } from "@/atomic-design-system/atoms/button";
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
    <section className="py-24 md:py-32 px-4 md:px-6 max-w-[1400px] mx-auto border-t border-white/5 relative overflow-hidden scroll-fade-in">
      {/* Background Glow - Enhanced */}
      <div
        aria-hidden
        className={cn(
          "absolute top-0 w-[900px] md:w-[1000px] h-[320px] md:h-[400px] bg-gradient-to-b opacity-16 blur-[100px] md:blur-[120px] -z-10 rounded-full animate-float",
          gradients[gradient],
          align === "left" ? "-left-12 md:-left-20" : "-right-12 md:-right-20"
        )}
      />

      <div className={cn("flex flex-col lg:flex-row items-center gap-8 md:gap-14 lg:gap-20", align === "right" ? "lg:flex-row-reverse" : "")}>
        
        {/* Text Side */}
        <div className="flex-1 space-y-6 md:space-y-8 max-w-xl px-2 md:px-0 scroll-reveal">
          {badge && (
              <div className="inline-flex items-center gap-3 text-xs md:text-sm font-bold text-brand-purple bg-brand-purple/10 px-3 md:px-4 py-2 rounded-full border border-brand-purple/30 smooth-transition hover:bg-brand-purple/20 hover:border-brand-purple/50 cursor-pointer scale-pop">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse"></span>
                  {badge}
              </div>
          )}
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[1.0] slide-down-reveal">
            {title}
          </h2>
          <p className="text-base md:text-lg text-[#8A8F98] leading-relaxed font-medium text-reveal">
            {description}
          </p>
          
          {features && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-4 md:pt-6 stagger">
              {features.map((item, i) => (
                <div
                  key={i}
                  role="listitem"
                  className="flex items-center gap-3 text-xs md:text-sm text-white font-semibold bg-white/4 border border-white/8 rounded-lg p-3 md:p-4 hover:bg-white/10 hover:border-brand-purple/50 smooth-transition transform-gpu hover:-translate-y-0.5 hover:scale-102 shadow-sm hover:shadow-md"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-purple flex-shrink-0 icon-pulse" />
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visual Side */}
        <div className="flex-1 w-full group px-2 md:px-0 scroll-reveal parallax-scroll">
          <div
            aria-hidden
            className="relative rounded-2xl border border-white/8 bg-glass-light/40 p-2 md:p-3 shadow-lg smooth-transition hover:shadow-[0_20px_60px_rgba(94,106,210,0.18)] hover:border-brand-purple/30 group-hover:bg-glass-medium hover-lift card-tilt"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/12 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl smooth-transition pointer-events-none" />
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-auto rounded-xl shadow-xl opacity-100 group-hover:scale-105 smooth-transition border border-white/6"
            />
          </div>
        </div>

      </div>
    </section>
  )
}