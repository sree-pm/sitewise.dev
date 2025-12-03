import { cn } from "@/lib/utils";

export const Marquee = ({
  items,
  speed = "fast",
}: {
  items: React.ReactNode[];
  speed?: "fast" | "slow";
}) => {
  return (
    <div className="relative flex w-full overflow-hidden border-y border-white/5 bg-black/20 py-10">
      <div className={cn("flex animate-scroll gap-12 px-12", speed === "fast" ? "[animation-duration:20s]" : "[animation-duration:40s]")}>
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
            {item}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, idx) => (
          <div key={`dup-${idx}`} className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
            {item}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black to-transparent"></div>
    </div>
  );
};