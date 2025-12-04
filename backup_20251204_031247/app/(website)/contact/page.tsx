import { Navbar } from "@/components/organisms/navbar";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { AccordionItem } from "@/components/molecules/accordionitem";
import { Mail, MessageCircle, Github, Twitter, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2 animate-pulse-slow"></span>
          We're here to help
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          Let's build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">together</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          Questions? Feedback? Just want to chat about web dev? 
          We'd love to hear from you.
        </p>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Contact Options */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a 
            href="https://github.com/sree-pm/sitewise-dev/issues" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-brand-purple/50 group"
          >
            <Github className="h-12 w-12 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">GitHub Issues</h3>
            <p className="text-gray-400 text-sm">
              Report bugs, request features, or contribute to the project.
            </p>
          </a>

          <a 
            href="https://discord.gg/sitewise" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-brand-blue/50 group"
          >
            <MessageCircle className="h-12 w-12 text-brand-blue mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Discord Community</h3>
            <p className="text-gray-400 text-sm">
              Join our community for real-time help and discussions.
            </p>
          </a>

          <a 
            href="https://twitter.com/sitewise_dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-brand-pink/50 group"
          >
            <Twitter className="h-12 w-12 text-brand-pink mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Twitter/X</h3>
            <p className="text-gray-400 text-sm">
              Follow us for updates, tips, and web dev insights.
            </p>
          </a>

          <a 
            href="mailto:hello@sitewise.dev" 
            className="border border-white/10 rounded-2xl bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-brand-purple/50 group"
          >
            <Mail className="h-12 w-12 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
            <p className="text-gray-400 text-sm">
              For general inquiries, partnerships, or support.
            </p>
          </a>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Send us a message</h2>
          <p className="text-gray-400 text-center mb-12">
            We'll get back to you within 24-48 hours
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all resize-none"
                placeholder="Tell us more..."
              />
            </div>

            <Button type="submit" variant="glow" size="lg" className="w-full">
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Quick Questions</h2>
          <p className="text-gray-400 text-center mb-12">
            Find answers to common questions before reaching out
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <AccordionItem 
                title="How quickly do you respond?" 
                content="We aim to respond to all inquiries within 24-48 hours during business days. GitHub issues typically get faster responses from the community." 
              />
              <AccordionItem 
                title="Do you offer custom development?" 
                content="Yes! For custom components, integrations, or full site development, reach out via email at hello@sitewise.dev with your project details." 
              />
              <AccordionItem 
                title="Can I hire you for consulting?" 
                content="We offer consulting for Next.js architecture, TypeScript best practices, and design systems. Contact us for rates and availability." 
              />
            </div>

            <div className="space-y-3">
              <AccordionItem 
                title="Where's the best place to get help?" 
                content="For technical questions, use GitHub Issues. For community support, join Discord. For business inquiries, use email." 
              />
              <AccordionItem 
                title="Do you have a newsletter?" 
                content="Yes! Sign up on the homepage to get updates on new components, features, and web dev tips delivered monthly." 
              />
              <AccordionItem 
                title="How can I contribute?" 
                content="We welcome contributions! Check out our GitHub repo, read CONTRIBUTING.md, and submit PRs. Join Discord to discuss ideas first." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Join the Community</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Connect with other developers using sitewise.dev. Share your projects, 
            get feedback, and help others build amazing things.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="glow" size="lg" asChild>
              <a href="https://discord.gg/sitewise">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/sree-pm/sitewise-dev">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold text-white tracking-tighter">sitewise.dev</span>
            <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} sitewise.dev. Open source under MIT License.</p>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 font-medium">
            <a href="https://github.com/sree-pm/sitewise-dev" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://twitter.com/sitewise_dev" className="hover:text-white transition-colors">Twitter</a>
            <a href="mailto:hello@sitewise.dev" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
