'use client';

import { useEffect, useRef, useState } from 'react';

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(600px at ${mousePosition.x}% ${mousePosition.y}%, rgba(94, 106, 210, 0.15), transparent 80%)`,
      }}
    >
      {/* Animated gradient meshes */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <div className="inline-block mb-6 animate-float-in">
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium backdrop-blur-md">
              ✨ Advanced Interactions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
