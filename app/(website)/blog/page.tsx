import { Navbar } from "@/components/organisms/navbar";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto overflow-hidden">
        <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300 backdrop-blur-xl animate-fade-in-up hover:bg-white/10 transition-colors cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-brand-purple mr-2 animate-pulse-slow"></span>
          Fresh Content Weekly
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.1] animate-fade-in-up delay-100">
          Insights & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-pink to-brand-blue">Tutorials</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed animate-fade-in-up delay-200">
          Learn how to build faster, smarter, and better with Next.js, TypeScript, 
          and modern web development best practices.
        </p>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Featured Articles */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">Featured Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <article className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden hover:bg-white/10 transition-all group">
              <div className="h-64 bg-gradient-to-br from-brand-purple/20 to-brand-blue/20 flex items-center justify-center">
                <div className="text-6xl">⚡</div>
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <Badge variant="purple">Tutorial</Badge>
                  <Badge variant="blue">Next.js</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                  Building Production-Ready Next.js Apps in 2024
                </h3>
                <p className="text-gray-400 mb-4">
                  A comprehensive guide to setting up Next.js 15 with TypeScript, Tailwind, 
                  and all the tooling you need for a scalable application.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Dec 15, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>12 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Team</span>
                  </div>
                </div>
              </div>
            </article>

            <article className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden hover:bg-white/10 transition-all group">
              <div className="h-64 bg-gradient-to-br from-brand-pink/20 to-brand-purple/20 flex items-center justify-center">
                <div className="text-6xl">🎨</div>
              </div>
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <Badge variant="pink">Design</Badge>
                  <Badge variant="purple">Components</Badge>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                  Atomic Design: Building Scalable Component Libraries
                </h3>
                <p className="text-gray-400 mb-4">
                  Learn how to structure your components using atomic design principles 
                  for maximum reusability and maintainability.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Dec 12, 2024</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Team</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12">All Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "TypeScript Best Practices for React Developers",
                category: "TypeScript",
                date: "Dec 10, 2024",
                readTime: "6 min",
                icon: "📘"
              },
              {
                title: "Deploying Next.js to Cloudflare Pages",
                category: "Deployment",
                date: "Dec 8, 2024",
                readTime: "5 min",
                icon: "🚀"
              },
              {
                title: "Dark Mode Implementation with Tailwind CSS",
                category: "Styling",
                date: "Dec 5, 2024",
                readTime: "7 min",
                icon: "🌙"
              },
              {
                title: "Advanced Animation Patterns with Framer Motion",
                category: "Animation",
                date: "Dec 3, 2024",
                readTime: "10 min",
                icon: "✨"
              },
              {
                title: "Building Accessible Web Components",
                category: "Accessibility",
                date: "Nov 30, 2024",
                readTime: "9 min",
                icon: "♿"
              },
              {
                title: "Performance Optimization in Next.js 15",
                category: "Performance",
                date: "Nov 28, 2024",
                readTime: "11 min",
                icon: "⚡"
              },
              {
                title: "Creating Custom Hooks in React",
                category: "React",
                date: "Nov 25, 2024",
                readTime: "8 min",
                icon: "🎣"
              }
            ].map((article, idx) => (
              <article 
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/5 p-6 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="text-4xl mb-4">{article.icon}</div>
                <Badge variant="purple" className="mb-3">{article.category}</Badge>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-purple transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-brand-purple text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ArrowRight className="h-4 w-4" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Browse by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Next.js", count: 12, icon: "⚡" },
              { name: "TypeScript", count: 8, icon: "📘" },
              { name: "Design", count: 6, icon: "🎨" },
              { name: "Performance", count: 5, icon: "🚀" },
              { name: "Deployment", count: 4, icon: "☁️" },
              { name: "Components", count: 10, icon: "🧩" },
              { name: "Tutorials", count: 15, icon: "📖" },
              { name: "Best Practices", count: 7, icon: "✨" }
            ].map((category, idx) => (
              <button
                key={idx}
                className="border border-white/10 rounded-xl bg-white/5 p-6 hover:bg-white/10 hover:border-brand-purple/50 transition-all group text-left"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-white font-semibold mb-1 group-hover:text-brand-purple transition-colors">
                  {category.name}
                </div>
                <div className="text-sm text-gray-500">{category.count} articles</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">Never Miss an Update</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get the latest tutorials, tips, and announcements delivered to your inbox. 
            No spam, unsubscribe anytime.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple/50 transition-all"
            />
            <Button type="submit" variant="glow" size="lg">
              Subscribe
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-4">
            Join 500+ developers getting weekly updates
          </p>
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
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
