import { Marquee } from "@/components/molecules/marquee";
import { Building2, Zap, Globe, Database, Shield, Smartphone } from "lucide-react";

const logos = [
  <div key="1" className="flex gap-3 items-center text-sm font-semibold text-white/70 hover:text-white smooth-transition hover:scale-110 px-4 py-2 rounded-lg hover:bg-brand-purple/10"><Building2 className="h-5 w-5" />TechCorp</div>,
  <div key="2" className="flex gap-3 items-center text-sm font-semibold text-white/70 hover:text-white smooth-transition hover:scale-110 px-4 py-2 rounded-lg hover:bg-brand-purple/10"><Zap className="h-5 w-5" />DataFlow</div>,
  <div key="3" className="flex gap-3 items-center text-sm font-semibold text-white/70 hover:text-white smooth-transition hover:scale-110 px-4 py-2 rounded-lg hover:bg-brand-purple/10"><Globe className="h-5 w-5" />Nebula</div>,
  <div key="4" className="flex gap-3 items-center text-sm font-semibold text-white/70 hover:text-white smooth-transition hover:scale-110 px-4 py-2 rounded-lg hover:bg-brand-purple/10"><Database className="h-5 w-5" />Signal</div>,
  <div key="5" className="flex gap-3 items-center text-sm font-semibold text-white/70 hover:text-white smooth-transition hover:scale-110 px-4 py-2 rounded-lg hover:bg-brand-purple/10"><Shield className="h-5 w-5" />Secure</div>,
  <div key="6" className="flex gap-3 items-center text-sm font-semibold text-white/70 hover:text-white smooth-transition hover:scale-110 px-4 py-2 rounded-lg hover:bg-brand-purple/10"><Smartphone className="h-5 w-5" />MobileFirst</div>,
];

export function LogoCloud() {
  return (
    <section className="py-20 bg-black border-y border-white/5">
        <p className="text-center text-xs font-bold text-[#8A8F98] mb-16 tracking-widest uppercase letter-spacing-wider">Trusted by global engineering teams</p>
        <Marquee items={logos} speed="slow" />
    </section>
  )
}