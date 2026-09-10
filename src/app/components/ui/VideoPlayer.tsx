/**
 * Video Player Component
 * 
 * Unified video player supporting:
 * - Direct video files (MP4, WebM) with custom controls
 * - YouTube embeds (detected by URL pattern)
 * - Vimeo embeds (detected by URL pattern)
 * 
 * @component
 * @author Ash Shaw Portfolio Team
 * @version 2.0.0 - YouTube/Vimeo embed support
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Play, Pause, SpeakerHigh, SpeakerSlash, ArrowsOut } from '@phosphor-icons/react';
import "../../../styles/blocks/video-player.css";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

/**
 * Detects if a URL is a YouTube or Vimeo embed URL
 */
function detectPlatform(src: string): 'youtube' | 'vimeo' | 'direct' {
  const isYoutubeEmbed = src.includes('youtube.com/embed');
  const isYoutubeWatch = src.includes('youtube.com/watch');
  const isYoutubeShort = src.includes('youtu.be/');
  const isYoutube = isYoutubeEmbed || isYoutubeWatch || isYoutubeShort;
  
  if (isYoutube) {
    return 'youtube';
  }
  
  const isVimeoDirect = src.includes('vimeo.com');
  const isVimeoPlayer = src.includes('player.vimeo.com');
  const isVimeo = isVimeoDirect || isVimeoPlayer;
  
  if (isVimeo) {
    return 'vimeo';
  }
  
  return 'direct';
}

/**
 * Normalises a YouTube URL to an embed URL
 */
function getEmbedUrl(src: string, platform: 'youtube' | 'vimeo'): string {
  if (platform === 'youtube') {
    // Already an embed URL
    if (src.includes('youtube.com/embed')) return src;
    // Standard watch URL → embed
    const watchMatch = src.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    // youtu.be short URL
    const shortMatch = src.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
    return src;
  }
  if (platform === 'vimeo') {
    if (src.includes('player.vimeo.com')) return src;
    const vimeoMatch = src.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return src;
  }
  return src;
}

export function VideoPlayer({
  src,
  poster,
  title = 'Video',
  className = '',
  autoPlay = false,
  loop = false,
  muted = false
}: VideoPlayerProps) {
  const platform = useMemo(() => detectPlatform(src), [src]);

  /* ── Embed player (YouTube / Vimeo) ── */
  if (platform !== 'direct') {
    const embedUrl = getEmbedUrl(src, platform);
    const params = new URLSearchParams();
    if (autoPlay) params.set('autoplay', '1');
    if (loop) params.set('loop', '1');
    if (muted) params.set('mute', '1');
    const separator = embedUrl.includes('?') ? '&' : '?';
    const fullUrl = params.toString()
      ? `${embedUrl}${separator}${params.toString()}`
      : embedUrl;

    return (
      <div className={`video-player video-player--embed ${className}`}>
        <iframe
          className="video-player__iframe"
          src={fullUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  /* ── Direct video player (MP4 / WebM) ── */
  return <DirectVideoPlayer
    src={src}
    poster={poster}
    title={title}
    className={className}
    autoPlay={autoPlay}
    loop={loop}
    muted={muted}
  />;
}

/**
 * Direct video player with custom controls (for non-embed video files)
 */
function DirectVideoPlayer({
  src,
  poster,
  title = 'Video',
  className = '',
  autoPlay = false,
  loop = false,
  muted = false
}: VideoPlayerProps) {
  const videoRefInit: HTMLVideoElement | null = null;
  const videoRef = useRef(videoRefInit);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
      setIsMuted(vol === 0);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={`video-player group ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="video-player__element"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        onClick={togglePlay}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
      
      {/* Custom Controls */}
      <div className="video-player__controls">
        {/* Progress Bar */}
        <div className="video-player__progress-container">
          <input
            type="range"
            min="0"
            max={duration ? duration : 0}
            value={currentTime}
            onChange={handleSeek}
            className="video-player__progress"
            aria-label="Video progress"
          />
          <div className="video-player__time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="video-player__buttons">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={togglePlay}
            className="video-player__btn"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause />
            ) : (
              <Play />
            )}
          </button>
          
          {/* Volume */}
          <div className="video-player__volume-controls">
            <button
              type="button"
              onClick={toggleMute}
              className="video-player__btn"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <SpeakerSlash />
              ) : (
                <SpeakerHigh />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="video-player__volume"
              aria-label="Volume control"
            />
          </div>
          
          {/* Spacer */}
          <div className="video-player__spacer" />
          
          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="video-player__btn"
            aria-label="Toggle fullscreen"
          >
            <ArrowsOut />
          </button>
        </div>
      </div>
      
      {/* Play Button Overlay */}
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className="video-player__overlay-btn"
          aria-label="Play video"
        >
          <div className="video-player__play-icon">
            <Play />
          </div>
        </button>
      )}
      
      {/* Title Overlay */}
      {title && !isPlaying && (
        <div className="video-player__title-overlay">
          <h3 className="video-player__title">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
}