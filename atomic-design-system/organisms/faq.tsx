import { AccordionItem } from "@/atomic-design-system/molecules/accordionitem"; // Lowercase

export function FAQ() {
  return (
    <section className="py-24 px-4 md:px-6 max-w-4xl mx-auto scroll-fade-in">
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">Frequently asked</h2>
        <p className="text-lg text-text-tertiary font-medium">Everything you need to know about sitewise.dev and our template.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <AccordionItem title="What is sitewise.dev?" content="sitewise.dev is a free, open-source Next.js template with a complete component library. It's production-ready with TypeScript, Tailwind CSS, atomic design patterns, and deployment configs included. Perfect for landing pages, marketing sites, and SaaS products." />
          <AccordionItem title="Is it really free?" content="Yes! 100% free forever. No credit card required, no hidden fees, no 'pro' tier. Clone the GitHub repo and it's yours. MIT License means you can use it for personal projects, client work, or commercial products." />
          <AccordionItem title="Can I use this for my startup?" content="Absolutely! sitewise.dev is designed for production use. Many startups use it for their landing pages, marketing sites, and even internal dashboards. You own the code completely—modify, rebrand, and deploy as you wish." />
        </div>

        <div className="space-y-3">
          <AccordionItem title="What's included?" content="17+ production-ready components organized in atomic design (atoms, molecules, organisms), full TypeScript support, Tailwind CSS with custom design tokens, Next.js 15 App Router, deployment configs for Cloudflare/Vercel, and comprehensive documentation." />
          <AccordionItem title="Do I get updates?" content="Yes! We actively maintain sitewise.dev. Pull the latest changes from GitHub anytime. Watch the repo for notifications on new components, features, and improvements. Updates are free forever." />
          <AccordionItem title="How do I get support?" content="Community support is available via GitHub Issues and Discussions. For paid priority support, custom development, or consulting, visit our contact page. Most questions are answered quickly by the community." />
        </div>
      </div>
    </section>
  )
}