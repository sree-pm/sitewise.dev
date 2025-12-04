'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';

interface Feature {
  name: string;
  sitewise: boolean | string;
  competitors: { name: string; value: boolean | string }[];
}

export function ComparisonTable() {
  const [sortBy, setSortBy] = useState<'name' | 'sitewise'>('sitewise');

  const features: Feature[] = [
    {
      name: 'Component Library',
      sitewise: '17+ Components',
      competitors: [
        { name: 'Template A', value: '8 Components' },
        { name: 'Template B', value: '12 Components' },
        { name: 'Template C', value: '10 Components' },
      ],
    },
    {
      name: 'TypeScript Support',
      sitewise: true,
      competitors: [
        { name: 'Template A', value: false },
        { name: 'Template B', value: true },
        { name: 'Template C', value: 'Partial' },
      ],
    },
    {
      name: 'Atomic Design',
      sitewise: true,
      competitors: [
        { name: 'Template A', value: false },
        { name: 'Template B', value: false },
        { name: 'Template C', value: false },
      ],
    },
    {
      name: 'Design System',
      sitewise: 'Complete',
      competitors: [
        { name: 'Template A', value: 'Basic' },
        { name: 'Template B', value: 'Partial' },
        { name: 'Template C', value: 'Basic' },
      ],
    },
    {
      name: 'Price',
      sitewise: '$0 Forever',
      competitors: [
        { name: 'Template A', value: '$199' },
        { name: 'Template B', value: '$299' },
        { name: 'Template C', value: '$149' },
      ],
    },
    {
      name: 'License',
      sitewise: 'MIT',
      competitors: [
        { name: 'Template A', value: 'Restricted' },
        { name: 'Template B', value: 'Single Site' },
        { name: 'Template C', value: 'Restricted' },
      ],
    },
  ];

  const sortedFeatures = [...features].sort((a, b) => {
    if (sortBy === 'sitewise') {
      const aValue = a.sitewise === true ? 1 : a.sitewise === false ? 0 : 0.5;
      const bValue = b.sitewise === true ? 1 : b.sitewise === false ? 0 : 0.5;
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
          Why Choose sitewise.dev?
        </h2>
        <p className="text-base md:text-xl text-[#8A8F98] max-w-2xl mx-auto leading-relaxed">
          Compare our free, open-source template with paid alternatives.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 backdrop-blur-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 md:px-6 py-4 text-left">
                <button
                  onClick={() => setSortBy(sortBy === 'name' ? 'sitewise' : 'name')}
                  className="text-xs md:text-sm font-bold text-brand-purple hover:text-white smooth-transition group flex items-center gap-2"
                >
                  Feature
                  <span className="text-[#8A8F98]">↕</span>
                </button>
              </th>
              <th className="px-4 md:px-6 py-4 text-center">
                <div className="inline-flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue" />
                  <span className="text-xs md:text-sm font-bold text-white">sitewise.dev</span>
                </div>
              </th>
              {['Template A', 'Template B', 'Template C'].map((competitor) => (
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
                  <div className="inline-flex justify-center">{renderValue(feature.sitewise)}</div>
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
            icon: '🚀',
            title: 'Production Ready',
            description:
              'Deploy immediately with zero configuration. All components tested and optimized.',
          },
          {
            icon: '⚡',
            title: 'Lightning Fast',
            description: 'Next.js 15 with App Router, React Server Components, and edge optimization.',
          },
          {
            icon: '💎',
            title: 'Enterprise Quality',
            description: 'Professional-grade code with TypeScript, atomic design, and best practices.',
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
