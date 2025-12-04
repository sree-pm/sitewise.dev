"use client";

import React from 'react';
import { Navbar } from '@/atomic-design-system/organisms/navbar';
import { Button } from '@/atomic-design-system/atoms/button';
import { Badge } from '@/atomic-design-system/atoms/badge';
import { Text } from '@/atomic-design-system/atoms/text';
import { Container, Grid, FlexBox } from '@/atomic-design-system/atoms/layout';
import { TiltCard } from '@/atomic-design-system/molecules/tiltcard';
import { Marquee } from '@/atomic-design-system/molecules/marquee';
import { Award, Users, Briefcase, Sparkles, ArrowRight, Mail } from 'lucide-react';

/**
 * Agency Portfolio Template
 * 
 * Perfect for: Creative agencies, design studios, consultancies
 * Features: Portfolio showcase, case studies, testimonials, contact
 */
export const AgencyPortfolioTemplate: React.FC = () => {
  const projects = [
    {
      title: "E-commerce Redesign",
      client: "FashionCo",
      category: "UI/UX Design",
      image: "/assets/project-1.jpg",
      results: "+250% conversion rate"
    },
    {
      title: "Mobile Banking App",
      client: "FinTech Startup",
      category: "Product Design",
      image: "/assets/project-2.jpg",
      results: "1M+ downloads"
    },
    {
      title: "Brand Identity",
      client: "GreenEarth",
      category: "Branding",
      image: "/assets/project-3.jpg",
      results: "40% brand awareness"
    },
    {
      title: "SaaS Dashboard",
      client: "DataViz Pro",
      category: "Web App",
      image: "/assets/project-4.jpg",
      results: "Featured in Awwwards"
    },
    {
      title: "Marketing Website",
      client: "TechCorp",
      category: "Web Design",
      image: "/assets/project-5.jpg",
      results: "+180% organic traffic"
    },
    {
      title: "Mobile Game UI",
      client: "GameStudio",
      category: "Game Design",
      image: "/assets/project-6.jpg",
      results: "Apple Editor's Choice"
    }
  ];

  const testimonials = [
    { quote: "Best agency we've ever worked with. Delivered beyond expectations.", author: "Sarah Chen", company: "FashionCo" },
    { quote: "Creative, professional, and always on time. Highly recommend!", author: "Michael Rodriguez", company: "FinTech" },
    { quote: "They transformed our brand completely. ROI was immediate.", author: "Emma Watson", company: "GreenEarth" },
    { quote: "A true partner in our growth. Can't imagine working with anyone else.", author: "James Kim", company: "DataViz Pro" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 md:pt-48 pb-24 md:pb-32 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-purple-900/20" />
        
        <Container className="relative z-10 text-center">
          <Badge className="mb-6">✨ Award-Winning Agency</Badge>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            We Create Digital
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>
          
          <Text variant="bodyLarge" color="secondary" className="max-w-3xl mx-auto mb-10">
            A creative studio crafting beautiful brands, products, and experiences 
            for ambitious companies worldwide.
          </Text>
          
          <FlexBox justify="center" gap="4" className="mb-20">
            <Button size="lg" variant="glow">
              View Our Work
            </Button>
            <Button size="lg" variant="outline">
              Start a Project
            </Button>
          </FlexBox>

          {/* Quick Stats */}
          <Grid cols={{ base: 2, md: 4 }} gap="8" className="max-w-4xl mx-auto">
            {[
              { icon: Award, label: "Awards Won", value: "47" },
              { icon: Users, label: "Happy Clients", value: "200+" },
              { icon: Briefcase, label: "Projects Done", value: "350+" },
              { icon: Sparkles, label: "Years in Business", value: "12" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-pink-500" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Services */}
      <section className="py-24 px-6 border-t border-white/5">
        <Container className="max-w-[1400px]">
          <div className="text-center mb-16">
            <Badge className="mb-4">Services</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What We Do Best
            </h2>
          </div>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
            {[
              {
                icon: "🎨",
                title: "Brand Identity",
                description: "Complete brand systems including logos, guidelines, and visual assets that tell your story.",
                tags: ["Logo Design", "Brand Guide", "Visual System"]
              },
              {
                icon: "💻",
                title: "Web Design",
                description: "Pixel-perfect websites that convert visitors into customers. Responsive and performant.",
                tags: ["UI Design", "Responsive", "Webflow"]
              },
              {
                icon: "📱",
                title: "Product Design",
                description: "User-centered mobile and web apps. From wireframes to high-fidelity prototypes.",
                tags: ["UX Research", "Prototyping", "Testing"]
              },
              {
                icon: "🚀",
                title: "Digital Strategy",
                description: "Data-driven strategies to grow your business online. SEO, content, and marketing.",
                tags: ["SEO", "Content", "Analytics"]
              },
              {
                icon: "✨",
                title: "Motion Design",
                description: "Engaging animations and micro-interactions that bring your product to life.",
                tags: ["Animation", "Video", "Lottie"]
              },
              {
                icon: "🎯",
                title: "Marketing",
                description: "Full-service marketing from campaigns to social media management and paid ads.",
                tags: ["Social Media", "Ads", "Email"]
              }
            ].map((service, i) => (
              <TiltCard key={i}>
                <div className="p-8">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/60 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <Container className="max-w-[1400px]">
          <div className="text-center mb-16">
            <Badge className="mb-4">Portfolio</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Recent Work
            </h2>
            <Text variant="bodyLarge" color="secondary">
              Projects we're proud of
            </Text>
          </div>

          <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/30 transition-all cursor-pointer"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-pink-900/20 to-purple-900/20 flex items-center justify-center">
                  <div className="text-white/30 text-sm">Project Image</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-pink-500 mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{project.client}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{project.results}</span>
                    <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </Grid>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-white/5">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Clients Say
          </h2>
        </div>

        <Marquee
          speed="slow"
          items={testimonials.map((testimonial, i) => (
            <div key={i} className="mx-4 rounded-xl border border-white/10 bg-white/5 p-8 min-w-[400px]">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-white/80 mb-6 text-lg leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-white/50 text-sm">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        />
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 border-t border-white/5">
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Create Something Amazing
          </h2>
          <Text variant="bodyLarge" color="secondary" className="mb-10">
            Have a project in mind? Let's talk about how we can help you achieve your goals.
          </Text>
          <FlexBox justify="center" gap="4">
            <Button size="lg" variant="glow" className="gap-2">
              <Mail className="h-5 w-5" />
              Get in Touch
            </Button>
            <Button size="lg" variant="outline">
              Download Portfolio
            </Button>
          </FlexBox>
        </Container>
      </section>
    </div>
  );
};
