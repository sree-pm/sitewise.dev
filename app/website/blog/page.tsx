"use client";

import { Navbar } from "@/atomic-design-system/organisms/navbar";
import { Button } from "@/atomic-design-system/atoms/button";
import { Badge } from "@/atomic-design-system/atoms/badge";
import { Calendar, Clock, ArrowRight, TrendingUp, Code, Zap } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      title: "Building Modern Websites with Next.js 15",
      excerpt: "Learn how to leverage the latest Next.js features including App Router, Server Components, and parallel routes to build lightning-fast websites.",
      date: "Dec 1, 2025",
      readTime: "8 min read",
      category: "Tutorial",
      featured: true,
      slug: "nextjs-15-modern-websites"
    },
    {
      title: "The Complete Guide to Tailwind CSS",
      excerpt: "Master utility-first CSS with our comprehensive guide covering responsive design, custom configurations, and advanced techniques.",
      date: "Nov 28, 2025",
      readTime: "12 min read",
      category: "Guide",
      featured: true,
      slug: "tailwind-css-complete-guide"
    },
    {
      title: "TypeScript Best Practices for React",
      excerpt: "Write type-safe React applications with these TypeScript patterns. Learn about generics, utility types, and component typing.",
      date: "Nov 25, 2025",
      readTime: "10 min read",
      category: "Best Practices",
      featured: false,
      slug: "typescript-react-best-practices"
    },
    {
      title: "Deploying to Cloudflare Pages",
      excerpt: "Step-by-step guide to deploying your Next.js application to Cloudflare Pages with automatic builds and edge optimization.",
      date: "Nov 22, 2025",
      readTime: "6 min read",
      category: "Deployment",
      featured: false,
      slug: "cloudflare-pages-deployment"
    },
    {
      title: "Atomic Design Pattern Explained",
      excerpt: "Understand how to organize your components using atomic design principles for scalable and maintainable codebases.",
      date: "Nov 18, 2025",
      readTime: "9 min read",
      category: "Architecture",
      featured: false,
      slug: "atomic-design-pattern"
    },
    {
      title: "Performance Optimization Tips",
      excerpt: "Achieve perfect Lighthouse scores with these proven optimization techniques including lazy loading, code splitting, and caching.",
      date: "Nov 15, 2025",
      readTime: "11 min read",
      category: "Performance",
      featured: false,
      slug: "performance-optimization-tips"
    },
    {
      title: "Authentication with NextAuth",
      excerpt: "Implement secure authentication in your Next.js app using NextAuth. Support for OAuth, email, and magic links.",
      date: "Nov 12, 2025",
      readTime: "7 min read",
      category: "Security",
      featured: false,
      slug: "nextauth-authentication"
    },
    {
      title: "Building Accessible Components",
      excerpt: "Create WCAG 2.1 AA compliant components with proper ARIA attributes, keyboard navigation, and screen reader support.",
      date: "Nov 8, 2025",
      readTime: "10 min read",
      category: "Accessibility",
      featured: false,
      slug: "accessible-components"
    },
    {
      title: "Dark Mode Implementation Guide",
      excerpt: "Add dark mode to your application with Tailwind CSS. Learn about color schemes, theme switching, and user preferences.",
      date: "Nov 5, 2025",
      readTime: "5 min read",
      category: "UI/UX",
      featured: false,
      slug: "dark-mode-implementation"
    }
  ];

  const featuredPosts = posts.filter(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6">Blog</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Learn to Build
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Better Websites
            </span>
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Tutorials, guides, and best practices for modern web development with Next.js, React, and TypeScript.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <TrendingUp className="h-6 w-6 text-purple-400" />
            <h2 className="text-3xl font-bold">Featured Articles</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}>
                <article className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] transition-all hover:scale-[1.02] h-full">
                  {/* Featured Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <Code className="h-16 w-16 text-white/20" />
                  </div>
                  
                  <div className="p-8">
                    <Badge className="mb-4">{post.category}</Badge>
                    <h3 className="text-2xl font-bold mb-3 hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">All Articles</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {regularPosts.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`}>
                <article className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-all hover:scale-[1.02] h-full flex flex-col">
                  <Badge className="mb-4 w-fit">{post.category}</Badge>
                  <h3 className="text-xl font-bold mb-3 hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/50 pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Browse by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Tutorial", count: 12, icon: Code },
              { name: "Guide", count: 8, icon: Zap },
              { name: "Best Practices", count: 15, icon: TrendingUp },
              { name: "Performance", count: 6, icon: Zap },
              { name: "Security", count: 5, icon: Code },
              { name: "Accessibility", count: 4, icon: Code },
              { name: "UI/UX", count: 9, icon: Code },
              { name: "Architecture", count: 7, icon: Code }
            ].map((category, i) => (
              <button
                key={i}
                className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/[0.08] transition-all text-left group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <category.icon className="h-4 w-4 text-purple-400" />
                  <span className="font-semibold group-hover:text-purple-400 transition-colors">
                    {category.name}
                  </span>
                </div>
                <div className="text-xs text-white/50">{category.count} articles</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-2xl mx-auto text-center">
          <Badge className="mb-4">Newsletter</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-white/60 mb-8">
            Get the latest tutorials and web development tips delivered to your inbox weekly
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-purple-400 transition-colors"
            />
            <Button type="submit" className="gap-2">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-white/40 mt-4">
            No spam. Unsubscribe anytime. Read our privacy policy.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} sitewise.dev. Sharing knowledge freely.</p>
        </div>
      </footer>
    </main>
  );
}
