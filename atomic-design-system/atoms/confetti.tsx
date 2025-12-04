import React, { useEffect, useState, useRef } from 'react';

export interface ConfettiProps {
  active?: boolean;
  duration?: number;
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
  gravity?: number;
  scalar?: number;
  drift?: number;
  ticks?: number;
  onComplete?: () => void;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  opacity: number;
  shape: 'circle' | 'square' | 'triangle';
}

const DEFAULT_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2',
  '#F8B739',
  '#52B788',
];

export const Confetti: React.FC<ConfettiProps> = ({
  active = false,
  duration = 3000,
  particleCount = 50,
  spread = 45,
  origin = { x: 0.5, y: 0.5 },
  colors = DEFAULT_COLORS,
  gravity = 0.3,
  scalar = 1,
  drift = 0,
  ticks = 200,
  onComplete,
  className = '',
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  const createParticle = (): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180);
    const velocity = 5 + Math.random() * 10;

    return {
      x: canvas.width * origin.x,
      y: canvas.height * origin.y,
      vx: Math.sin(angle) * velocity + drift,
      vy: -Math.cos(angle) * velocity,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      size: (5 + Math.random() * 10) * scalar,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as Particle['shape'],
    };
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate((particle.rotation * Math.PI) / 180);
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particle.color;

    switch (particle.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -particle.size / 2);
        ctx.lineTo(particle.size / 2, particle.size / 2);
        ctx.lineTo(-particle.size / 2, particle.size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  };

  const animate = (timestamp: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setParticles((prevParticles) => {
      const updatedParticles = prevParticles
        .map((particle) => {
          // Update physics
          particle.vy += gravity;
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;

          // Fade out based on progress
          particle.opacity = 1 - progress;

          return particle;
        })
        .filter((particle) => particle.opacity > 0);

      // Draw particles
      updatedParticles.forEach((particle) => drawParticle(ctx, particle));

      return updatedParticles;
    });

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setParticles([]);
      startTimeRef.current = undefined as number | undefined;
      onComplete?.();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (active) {
      // Create initial particles
      const newParticles = Array.from({ length: particleCount }, createParticle);
      setParticles(newParticles);
      startTimeRef.current = undefined as number | undefined;

      // Start animation
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setParticles([]);
      startTimeRef.current = undefined as number | undefined;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[9999] ${className}`}
      style={{ opacity: active ? 1 : 0 }}
    />
  );
};

export default Confetti;
