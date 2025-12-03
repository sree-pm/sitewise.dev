'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Feature {
  name: string;
  infonaut: boolean | string;
  competitors: { name: string; value: boolean | string }[];
}

export function ComparisonTable() {
  const [sortBy, setSortBy] = useState<'name' | 'infonaut'>('infonaut');

  const features: Feature[] = [
    {
      name: 'Autonomous Agents',
      infonaut: 'Unlimited',
      competitors: [
        { name: 'Linear', value: false },
        { name: 'Notion', value: 'Limited' },
        { name: 'Asana', value: false },
      ],
    },
    {
      name: 'Real-time Collaboration',
      infonaut: true,
      competitors: [
        { name: 'Linear', value: true },
        { name: 'Notion', value: true },
        { name: 'Asana', value: true },
      ],
    },
    {
      name: 'AI Integration',
      infonaut: 'Deep',
      competitors: [
        { name: 'Linear', value: 'Shallow' },
        { name: 'Notion', value: 'Shallow' },
        { name: 'Asana', value: false },
      ],
    },
    {
      name: 'Custom Workflows',
      infonaut: true,
      competitors: [
        { name: 'Linear', value: true },
        { name: 'Notion', value: true },
        { name: 'Asana', value: true },
      ],
    },
    {
      name: 'API Rate Limits',
      infonaut: 'Unlimited',
      competitors: [
        { name: 'Linear', value: '10K/min' },
        { name: 'Notion', value: '3 req/sec' },
        { name: 'Asana', value: '1500/min' },
      ],
    },
    {
      name: 'Enterprise Support',
      infonaut: '24/7 Dedicated',
      competitors: [
        { name: 'Linear', value: 'Business Hours' },
        { name: 'Notion', value: 'Email Only' },
        { name: 'Asana', value: 'Email Only' },
      ],
    },
  ];

  const sortedFeatures = [...features].sort((a, b) => {
    if (sortBy === 'infonaut') {
      const aValue = a.infonaut === true ? 1 : a.infonaut === false ? 0 : 0.5;
      const bValue = b.infonaut === true ? 1 : b.infonaut === false ? 0 : 0.5;
      return bValue - aValue;
    }
    return a.name.localeCompare(b.name);
  });

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-red-500" />
      );
    }
    return <span className="font-semibold text-white">{value}</span>;
  };

  return (
    <section className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto scroll-fade-in">
      {/* Header */}
      <div className="text-center mb-16 md:mb-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tighter">
          Why Choose Infonaut?
        </h2>
        <p className="text-base md:text-xl text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
          Compare our advanced AI-powered platform with traditional solutions.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 backdrop-blur-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 md:px-6 py-4 text-left">
                <button
                  onClick={() => setSortBy(sortBy === 'name' ? 'infonaut' : 'name')}
                  className="text-xs md:text-sm font-bold text-brand-purple hover:text-white smooth-transition group flex items-center gap-2"
                >
                  Feature
                  <span className="text-[#8A8F98]">↕</span>
                </button>
              </th>
              <th className="px-4 md:px-6 py-4 text-center">
                <div className="inline-flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue" />
                  <span className="text-xs md:text-sm font-bold text-white">Infonaut</span>
                </div>
              </th>
              {['Linear', 'Notion', 'Asana'].map((competitor) => (
                <th key={competitor} className="hidden sm:table-cell px-4 md:px-6 py-4 text-center">
                  <span className="text-xs md:text-sm font-bold text-[#8A8F98]">{competitor}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedFeatures.map((feature, i) => (
              <tr
                key={feature.name}
                className="scroll-reveal border-b border-white/5 hover:bg-white/5 smooth-transition group/row"
              >
                <td className="px-4 md:px-6 py-4 text-sm md:text-base font-medium text-white group-hover/row:text-brand-purple smooth-transition">
                  {feature.name}
                </td>
                <td className="px-4 md:px-6 py-4 text-center">
                  <div className="inline-flex justify-center">{renderValue(feature.infonaut)}</div>
                </td>
                {feature.competitors.map((competitor) => (
                  <td
                    key={competitor.name}
                    className="hidden sm:table-cell px-4 md:px-6 py-4 text-center text-[#8A8F98]"
                  >
                    {renderValue(competitor.value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Differentiators */}
      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {[
          {
            icon: '🤖',
            title: 'Autonomous Agents',
            description:
              'Deploy unlimited AI agents that work 24/7 without human intervention.',
          },
          {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Process requests 10x faster than traditional platforms.',
          },
          {
            icon: '🔐',
            title: 'Enterprise Security',
            description: 'SOC 2 Type II certified with dedicated compliance team.',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="scroll-reveal p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-purple/30 smooth-transition group/card"
          >
            <div className="text-4xl mb-4 group-hover/card:scale-110 smooth-transition inline-block">
              {item.icon}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm md:text-base text-[#8A8F98] leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
