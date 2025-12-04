import { BentoCard } from "@/atomic-design-system/molecules/bentocard";
import { Zap, ShieldCheck, BarChart3 } from "lucide-react";

export function ValueProp() {
  return (
    <section className="py-24 px-6 max-w-[1200px] mx-auto scroll-fade-in">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white">Why sitewise.dev?</h2>
        <p className="text-lg text-text-tertiary max-w-2xl mx-auto mt-4">We build autonomous companies, not point products — tightly integrated stacks, enterprise-grade security, and immediate ROI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard
          className=""
          title="Speed to Market"
          description="From idea to deployed agent in weeks — not months. Reduce time-to-value with production-ready stacks."
          icon={Zap}
          href="#speed"
          cta="Learn how"
          gradient="purple"
        />

        <BentoCard
          className=""
          title="Enterprise-Grade Security"
          description="SOC2-level controls, data isolation, and secure agent execution for production environments."
          icon={ShieldCheck}
          href="#security"
          cta="Security"
          gradient="blue"
        />

        <BentoCard
          className=""
          title="Measurable ROI"
          description="Instrumented for impact — revenue, retention, and automation-derived cost savings tracked end-to-end."
          icon={BarChart3}
          href="#roi"
          cta="See metrics"
          gradient="pink"
        />
      </div>
    </section>
  );
}

export default ValueProp;
