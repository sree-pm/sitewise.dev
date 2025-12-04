"use client";

import { Navbar } from "@/atomic-design-system/organisms/navbar";
import { Button } from "@/atomic-design-system/atoms/button";
import { Badge } from "@/atomic-design-system/atoms/badge";
import { Github, Twitter, Mail, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Get in Touch</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            We're Here to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Help You Succeed
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Have questions? Need help? Want to contribute? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Github,
                title: "GitHub",
                desc: "Report bugs, request features, or contribute code",
                link: "github.com/sitewise",
                action: "Open Issue"
              },
              {
                icon: MessageCircle,
                title: "Discord",
                desc: "Join our community for real-time help and discussions",
                link: "discord.gg/sitewise",
                action: "Join Server"
              },
              {
                icon: Twitter,
                title: "Twitter",
                desc: "Follow us for updates, tips, and announcements",
                link: "@sitewisedev",
                action: "Follow Us"
              },
              {
                icon: Mail,
                title: "Email",
                desc: "For partnerships and business inquiries",
                link: "hello@sitewise.dev",
                action: "Send Email"
              }
            ].map((option, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-8 hover:bg-white/[0.08] transition-all text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/10 mb-6">
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                <p className="text-white/60 text-sm mb-4">{option.desc}</p>
                <div className="text-sm text-purple-400 mb-4">{option.link}</div>
                <Button size="sm" variant="outline" className="w-full">
                  {option.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Send a Message</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Drop Us a Line
            </h2>
            <p className="text-white/60">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 transition-colors">
                <option value="">Select a topic</option>
                <option value="support">Technical Support</option>
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                rows={6}
                placeholder="Tell us how we can help you..."
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Send className="h-5 w-5" />
              Send Message
            </Button>

            <p className="text-xs text-white/40 text-center">
              We typically respond within 24 hours during business days
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">Quick Answers</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Before You Reach Out
            </h2>
            <p className="text-white/60">
              These questions might already have answers
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "How do I get started?",
                a: "Fork the repository on GitHub, clone it locally, run 'npm install', and you're ready to go. Check our documentation for detailed setup instructions."
              },
              {
                q: "I found a bug. What should I do?",
                a: "Please open an issue on GitHub with a detailed description, steps to reproduce, and your environment details. We'll investigate and fix it ASAP."
              },
              {
                q: "Can I request a feature?",
                a: "Absolutely! Open a feature request on GitHub. Describe the feature, explain the use case, and we'll discuss if it fits the roadmap."
              },
              {
                q: "How can I contribute?",
                a: "We welcome contributions! Fork the repo, make your changes, and submit a pull request. Check CONTRIBUTING.md for guidelines."
              },
              {
                q: "Do you offer custom development?",
                a: "We don't offer custom development services, but sitewise.dev is fully open source. You can hire any developer to customize it for your needs."
              }
            ].map((item, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-white/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-white/60 mb-10">
            Connect with other developers, get help, and share your projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Join Discord
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Github className="h-5 w-5" />
              Star on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} sitewise.dev. We'd love to hear from you.</p>
        </div>
      </footer>
    </main>
  );
}
