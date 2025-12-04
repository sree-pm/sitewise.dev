"use client";

import React, { useState } from 'react';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import { ZoomIn, Download, ExternalLink } from 'lucide-react';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2' | '21/9';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  className?: string;
  onClick?: () => void;
  showOverlay?: boolean;
  overlayActions?: ('zoom' | 'download' | 'link')[];
  onZoom?: () => void;
  onDownload?: () => void;
  onExternalLink?: () => void;
}

const aspectRatioConfig = {
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '21/9': 'aspect-[21/9]'
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  className,
  onClick,
  showOverlay = false,
  overlayActions = ['zoom'],
  onZoom,
  onDownload,
  onExternalLink
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAction = (action: 'zoom' | 'download' | 'link', e: React.MouseEvent) => {
    e.stopPropagation();
    
    switch (action) {
      case 'zoom':
        onZoom?.();
        break;
      case 'download':
        if (onDownload) {
          onDownload();
        } else {
          // Default download behavior
          const link = document.createElement('a');
          link.href = src;
          link.download = alt || 'image';
          link.click();
        }
        break;
      case 'link':
        onExternalLink?.();
        break;
    }
  };

  const ActionIcon = ({ action }: { action: 'zoom' | 'download' | 'link' }) => {
    switch (action) {
      case 'zoom':
        return <ZoomIn className="h-5 w-5" />;
      case 'download':
        return <Download className="h-5 w-5" />;
      case 'link':
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-900",
        aspectRatio && aspectRatioConfig[aspectRatio],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NextImage
        src={src}
        alt={alt}
        fill={!width && !height}
        width={width}
        height={height}
        className={cn(
          "transition-all duration-300",
          objectFit === 'cover' && "object-cover",
          objectFit === 'contain' && "object-contain",
          objectFit === 'fill' && "object-fill",
          objectFit === 'none' && "object-none",
          !isLoaded && "blur-sm scale-105",
          isLoaded && "blur-0 scale-100"
        )}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}

      {/* Overlay with actions */}
      {showOverlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center gap-2",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          {overlayActions.map((action) => (
            <button
              key={action}
              onClick={(e) => handleAction(action, e)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
              aria-label={action}
            >
              <ActionIcon action={action} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Avatar Image variant
export interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: number;
  fallback?: string;
  className?: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  size = 40,
  fallback,
  className
}) => {
  const [imageError, setImageError] = useState(false);
  const initials = fallback || alt.slice(0, 2).toUpperCase();

  if (!src || imageError) {
    return (
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold",
          className
        )}
        style={{ width: size, height: size, fontSize: size / 2.5 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-full overflow-hidden", className)} style={{ width: size, height: size }}>
      <NextImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

// Logo Image variant
export interface LogoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  darkModeSrc?: string;
  className?: string;
}

export const LogoImage: React.FC<LogoImageProps> = ({
  src,
  alt,
  width = 120,
  height = 40,
  darkModeSrc,
  className
}) => {
  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      <NextImage
        src={darkModeSrc || src}
        alt={alt}
        fill
        className="object-contain"
        priority
      />
    </div>
  );
};
