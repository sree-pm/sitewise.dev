'use client';

import { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'pink';
}

export function TiltCard({ children, className = '', glowColor = 'purple' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({
    rotateX: 0,
    rotateY: 0,
  });

  const glowMap = {
    purple: 'shadow-[0_20px_60px_rgba(94,106,210,0.3)]',
    blue: 'shadow-[0_20px_60px_rgba(59,130,246,0.3)]',
    pink: 'shadow-[0_20px_60px_rgba(236,72,153,0.3)]',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((centerX - x) / centerX) * 10;

    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease-out',
      }}
      className={`${className} ${glowMap[glowColor]} card-tilt hover-lift transition-shadow duration-300`}
    >
      {children}
    </div>
  );
}
