import { Marquee } from "@/components/molecules/Marquee";
import { Laptop, Database, Cloud, Wifi, Lock, Smartphone } from "lucide-react";

const logos = [
  <div className="flex gap-2 text-xl font-bold text-white"><Laptop /> TechCorp</div>,
  <div className="flex gap-2 text-xl font-bold text-white"><Database /> DataFlow</div>,
  <div className="flex gap-2 text-xl font-bold text-white"><Cloud /> Nebula</div>,
  <div className="flex gap-2 text-xl font-bold text-white"><Wifi /> Signal</div>,
  <div className="flex gap-2 text-xl font-bold text-white"><Lock /> Secure</div>,
  <div className="flex gap-2 text-xl font-bold text-white"><Smartphone /> MobileFirst</div>,
];

export function LogoCloud() {
  return (
    <section className="py-12 bg-black">
        <p className="text-center text-sm font-semibold text-gray-500 mb-8 tracking-widest uppercase">Trusted by forward-thinking teams</p>
        <Marquee items={logos} speed="slow" />
    </section>
  )
}