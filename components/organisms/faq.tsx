import { AccordionItem } from "@/components/molecules/accordionitem"; // Lowercase

export function FAQ() {
  return (
    <section className="py-32 px-6 max-w-4xl mx-auto scroll-fade-in">
      <div className="mb-20">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">Frequently asked</h2>
        <p className="text-lg text-[#8A8F98] font-medium">Everything you need to know about Infonaut and our products.</p>
      </div>
      <div className="space-y-3">
        <AccordionItem title="What is Infonaut?" content="Infonaut is a Venture Studio. We don't just build software; we build entire AI companies (like GroX and Xgent) that function as products. Each venture is independently funded, managed, and deployed." />
        <AccordionItem title="How does Xgent work?" content="Xgent uses autonomous agentic workflows. Unlike a chatbot, Xgent can perform actions: send emails, query databases, update CRMs, manage projects—all without human intervention. It's your 24/7 employee." />
        <AccordionItem title="Can I hire Leancraft for my small business?" content="Absolutely. Leancraft is our consulting arm designed to help SMBs implement elite management systems. We analyze your bottlenecks and implement proven strategies from Uber, Airbnb, and Stripe." />
        <AccordionItem title="Is my data secure?" content="Yes. We use enterprise-grade encryption (AES-256), SOC2 compliance, and offer private-cloud deployments. Your data is encrypted at rest and in transit. You can audit our security posture anytime." />
        <AccordionItem title="How much does it cost?" content="Pricing varies by venture. GroX starts at $299/month. Xgent requires enterprise onboarding. Leancraft pricing is custom. Contact us for a tailored quote based on your needs." />
        <AccordionItem title="Do you offer API access?" content="Yes. Everything in our dashboard is available via GraphQL API. Build custom integrations, automate workflows, and sync data in real-time across your ecosystem." />
      </div>
    </section>
  )
}