import { Marquee } from "@/components/molecules/marquee";
import { Building2, Zap, Globe, Database, Shield, Smartphone } from "lucide-react";

const logos = [
  <div key="1" className="flex gap-3 items-center text-sm font-semibold text-white/60 hover:text-white transition-colors"><Building2 className="h-5 w-5" />TechCorp</div>,
  <div key="2" className="flex gap-3 items-center text-sm font-semibold text-white/60 hover:text-white transition-colors"><Zap className="h-5 w-5" />DataFlow</div>,
  <div key="3" className="flex gap-3 items-center text-sm font-semibold text-white/60 hover:text-white transition-colors"><Globe className="h-5 w-5" />Nebula</div>,
  <div key="4" className="flex gap-3 items-center text-sm font-semibold text-white/60 hover:text-white transition-colors"><Database className="h-5 w-5" />Signal</div>,
  <div key="5" className="flex gap-3 items-center text-sm font-semibold text-white/60 hover:text-white transition-colors"><Shield className="h-5 w-5" />Secure</div>,
  <div key="6" className="flex gap-3 items-center text-sm font-semibold text-white/60 hover:text-white transition-colors"><Smartphone className="h-5 w-5" />MobileFirst</div>,
];

export function LogoCloud() {
  return (
    <section className="py-16 bg-black border-y border-white/5">
        <p className="text-center text-xs font-semibold text-[#8A8F98] mb-12 tracking-widest uppercase">Trusted by global engineering teams</p>
        <Marquee items={logos} speed="slow" />
    </section>
  )
}