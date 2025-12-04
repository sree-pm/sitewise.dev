"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  fallback?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  border?: boolean;
  className?: string;
}

const sizeConfig = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
  '2xl': 'h-24 w-24 text-2xl'
};

const shapeConfig = {
  circle: 'rounded-full',
  square: 'rounded-none',
  rounded: 'rounded-lg'
};

const statusConfig = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500'
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  shape = 'circle',
  fallback,
  status,
  border = false,
  className
}) => {
  const [imageError, setImageError] = React.useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const showFallback = !src || imageError;
  const initials = fallback ? getInitials(fallback) : alt.slice(0, 2).toUpperCase();

  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white",
          sizeConfig[size],
          shapeConfig[shape],
          border && "ring-2 ring-white/20"
        )}
      >
        {!showFallback ? (
          <Image
            src={src!}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <div
          className={cn(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-black",
            statusConfig[status]
          )}
        />
      )}
    </div>
  );
};

// Avatar Group
export interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt: string;
    fallback?: string;
  }>;
  max?: number;
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'md',
  shape = 'circle',
  className
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(0, avatars.length - max);

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          {...avatar}
          size={size}
          shape={shape}
          border
          className="hover:z-10 transition-transform hover:scale-110"
        />
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            "flex items-center justify-center bg-gray-700 text-white font-semibold ring-2 ring-black hover:z-10 transition-transform hover:scale-110",
            sizeConfig[size],
            shapeConfig[shape]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
