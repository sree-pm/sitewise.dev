import { AccordionItem } from "@/components/molecules/AccordionItem";

export function FAQ() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
      <div className="space-y-2">
        <AccordionItem title="What is Infonaut?" content="Infonaut is a Venture Studio. We don't just build software; we build entire AI companies (like GroX and Xgent) that function as products." />
        <AccordionItem title="How does Xgent work?" content="Xgent uses autonomous agentic workflows. Unlike a chatbot, Xgent can perform actions: send emails, query databases, and update CRMs without human intervention." />
        <AccordionItem title="Can I hire Leancraft for my small business?" content="Yes. Leancraft is our consulting arm designed specifically to help SMBs implement the tools we build." />
        <AccordionItem title="Is my data secure?" content="Absolutely. We use enterprise-grade encryption and offer private-cloud deployments for our Venture tier customers." />
      </div>
    </section>
  )
}