"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AudioTrack {
  src: string;
  title?: string;
  artist?: string;
  album?: string;
  artwork?: string;
  duration?: number;
}

export interface AudioProps {
  tracks: AudioTrack[];
  currentTrackIndex?: number;
  onTrackChange?: (index: number) => void;
  autoPlay?: boolean;
  loop?: boolean;
  showPlaylist?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Audio: React.FC<AudioProps> = ({
  tracks,
  currentTrackIndex: controlledIndex,
  onTrackChange,
  autoPlay = false,
  loop = false,
  showPlaylist = true,
  variant = 'default',
  className
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;
  const currentTrack = tracks[currentIndex];

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Handle track change
  const handleTrackChange = (index: number) => {
    if (controlledIndex === undefined) {
      setInternalIndex(index);
    }
    onTrackChange?.(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Previous track
  const previousTrack = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    handleTrackChange(newIndex);
  };

  // Next track
  const nextTrack = () => {
    const newIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    handleTrackChange(newIndex);
  };

  // Seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * duration;
  };

  // Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  };

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (loop) {
        audio.currentTime = 0;
        audio.play();
      } else if (currentIndex < tracks.length - 1) {
        nextTrack();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentIndex, loop, tracks.length]);

  // Auto-play new track
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentIndex, autoPlay]);

  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <audio ref={audioRef} src={currentTrack.src} />
        <button
          onClick={togglePlay}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <div className="flex-1 text-sm text-white/80 truncate">
          {currentTrack.title || 'Audio Track'}
        </div>
        <span className="text-xs text-white/60 tabular-nums">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn("bg-gray-900 rounded-lg p-4", className)}>
        <audio ref={audioRef} src={currentTrack.src} />
        
        <div className="flex items-center gap-4">
          {/* Artwork */}
          {currentTrack.artwork && (
            <div className="w-12 h-12 rounded bg-gray-800 overflow-hidden flex-shrink-0">
              <img src={currentTrack.artwork} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {currentTrack.title || 'Unknown Title'}
            </div>
            <div className="text-xs text-white/60 truncate">
              {currentTrack.artist || 'Unknown Artist'}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousTrack}
              className="p-1.5 text-white/60 hover:text-white transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={18} />
            </button>
            <button
              onClick={togglePlay}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={nextTrack}
              className="p-1.5 text-white/60 hover:text-white transition-colors"
              aria-label="Next track"
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div
            onClick={handleSeek}
            className="h-1 bg-gray-800 rounded-full cursor-pointer group"
          >
            <div
              className="h-full bg-blue-600 rounded-full relative group-hover:bg-blue-500 transition-colors"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("bg-gray-900 rounded-lg overflow-hidden", className)}>
      <audio ref={audioRef} src={currentTrack.src} />

      {/* Main Player */}
      <div className="p-6">
        {/* Artwork */}
        {currentTrack.artwork && (
          <div className="w-full aspect-square rounded-lg bg-gray-800 overflow-hidden mb-6">
            <img
              src={currentTrack.artwork}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Track Info */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-1">
            {currentTrack.title || 'Unknown Title'}
          </h3>
          <p className="text-sm text-white/60">
            {currentTrack.artist || 'Unknown Artist'}
            {currentTrack.album && ` • ${currentTrack.album}`}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div
            onClick={handleSeek}
            className="h-2 bg-gray-800 rounded-full cursor-pointer group mb-2"
          >
            <div
              className="h-full bg-blue-600 rounded-full relative group-hover:bg-blue-500 transition-colors"
              style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-white/60 tabular-nums">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={previousTrack}
            className="p-2 text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="Previous track"
          >
            <SkipBack size={24} />
          </button>
          <button
            onClick={togglePlay}
            className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            className="p-2 text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            aria-label="Next track"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-1 text-white/60 hover:text-white transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Playlist */}
      {showPlaylist && tracks.length > 1 && (
        <div className="border-t border-white/10">
          <div className="px-6 py-3 bg-gray-800/50">
            <h4 className="text-sm font-medium text-white/80">Playlist</h4>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => handleTrackChange(index)}
                className={cn(
                  "w-full px-6 py-3 flex items-center gap-3 transition-colors text-left",
                  "hover:bg-white/5 focus:outline-none focus:bg-white/5",
                  index === currentIndex && "bg-blue-600/20 text-blue-400"
                )}
              >
                {track.artwork && (
                  <div className="w-10 h-10 rounded bg-gray-800 overflow-hidden flex-shrink-0">
                    <img src={track.artwork} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {track.title || `Track ${index + 1}`}
                  </div>
                  {track.artist && (
                    <div className="text-xs text-white/60 truncate">{track.artist}</div>
                  )}
                </div>
                {index === currentIndex && isPlaying && (
                  <div className="flex gap-0.5">
                    <div className="w-0.5 h-3 bg-blue-400 animate-pulse" />
                    <div className="w-0.5 h-3 bg-blue-400 animate-pulse delay-75" />
                    <div className="w-0.5 h-3 bg-blue-400 animate-pulse delay-150" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Simple Audio (native controls)
export interface SimpleAudioProps {
  src: string;
  className?: string;
}

export const SimpleAudio: React.FC<SimpleAudioProps> = ({ src, className }) => {
  return (
    <audio
      src={src}
      controls
      className={cn(
        "w-full h-12 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    />
  );
};
