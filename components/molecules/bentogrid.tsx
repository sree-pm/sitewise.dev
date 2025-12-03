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
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4 lg:grid-rows-3",
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
      "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black p-6 hover:shadow-xl transition-all duration-300 hover:border-brand-purple/50 hover:bg-white/[0.02]",
      className
    )}
  >
    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-transparent" />
    </div>

    <div className="relative z-10 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Icon className="h-6 w-6 text-brand-purple group-hover:text-white transition-colors" />
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-[#8A8F98] leading-relaxed">{description}</p>
        </div>
      </div>

      <a
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:text-white transition-colors group-hover:gap-3"
      >
        {cta}
        <svg
          className="w-4 h-4 transition-transform"
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
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity">
        {background}
      </div>
    )}
  </div>
);
