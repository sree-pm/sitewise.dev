import { cn } from "@/lib/utils";

export const BentoGrid = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[18rem] md:auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 scroll-fade-in",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface BentoCardProps {
  name: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  cta: string;
  background?: React.ReactNode;
  className?: string;
}

export const BentoCard = ({
  name,
  description,
  Icon,
  href,
  cta,
  background,
  className,
}: BentoCardProps) => (
  <div
    className={cn(
      "scroll-reveal group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black p-6 smooth-transition duration-500 hover:border-brand-purple/40 hover:bg-white/[0.03] hover:shadow-[0_0_40px_rgba(94,106,210,0.2)] hover-lift card-tilt",
      className
    )}
  >
    {/* Premium gradient overlay on hover */}
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 smooth-transition duration-500">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/15 via-transparent to-brand-blue/10 rounded-2xl" />
    </div>

    {/* Enhanced glass effect border glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 smooth-transition duration-500">
      <div className="absolute inset-0 rounded-2xl border border-brand-purple/20 blur-sm" />
    </div>

    {/* Shadow depth effect */}
    <div className="absolute inset-0 rounded-2xl shadow-depth-sm group-hover:shadow-depth-lg smooth-transition -z-10" />

    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div className="p-3 bg-brand-purple/10 rounded-xl w-fit group-hover:bg-brand-purple/20 smooth-transition group-hover:scale-110 group-hover:icon-pulse">
            <Icon className="h-6 w-6 text-brand-purple group-hover:text-white smooth-transition" />
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-blue smooth-transition">{name}</h3>
          <p className="text-sm text-[#8A8F98] leading-relaxed group-hover:text-white/70 smooth-transition">{description}</p>
        </div>
      </div>

      <a
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:text-white smooth-transition group-hover:gap-3 mt-4"
      >
        {cta}
        <svg
          className="w-4 h-4 smooth-transition group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>

    {background && (
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 smooth-transition rounded-2xl">
        {background}
      </div>
    )}
  </div>
);
