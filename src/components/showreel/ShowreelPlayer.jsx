import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Film,
  AlertCircle,
  FileVideo,
} from "lucide-react";

export function ShowreelPlayer({
  src = "/videos/showreel.mp4",
  poster = "",
  aspectRatio = "aspect-[16/9]",
  title = "DIRECTOR & EDITORIAL SHOWREEL",
  autoPlay = false,
  className = "",
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  // Format seconds to editorial timecode (MM:SS:FF)
  const formatTimecode = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}:${frames.toString().padStart(2, "0")}`;
  };

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (hasVideoError) {
      setIsPlaying((prev) => !prev);
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy blocks unmuted play, retry muted
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true));
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [hasVideoError]);

  // Toggle Mute / Unmute
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) {
      setIsMuted((prev) => !prev);
      return;
    }
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  // Toggle Fullscreen
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Handle Video Time Updates
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
    setHasVideoError(false);
  };

  const handleVideoError = () => {
    setHasVideoError(true);
    setIsPlaying(false);
  };

  // Scrub bar interaction
  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    if (hasVideoError) {
      setSimulatedProgress(pos * 100);
      setCurrentTime(pos * 108);
      return;
    }

    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  // Keyboard navigation & Shortcuts
  const handleKeyDown = useCallback(
    (e) => {
      // Space or 'k' toggles play/pause
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "m") {
        e.preventDefault();
        toggleMute();
      } else if (e.key === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(
            videoRef.current.duration,
            videoRef.current.currentTime + 5
          );
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(
            0,
            videoRef.current.currentTime - 5
          );
        }
      }
    },
    [togglePlay, toggleMute, toggleFullscreen]
  );

  // Fullscreen change listener cleanup
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  // Simulation playhead interval when in placeholder mode
  useEffect(() => {
    if (!hasVideoError || !isPlaying) return;
    const interval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 0.5;
      });
      setCurrentTime((prev) => (prev >= 108 ? 0 : prev + 0.5));
    }, 250);
    return () => clearInterval(interval);
  }, [hasVideoError, isPlaying]);

  // Controls visibility: always show when paused, show on hover when playing
  const controlsVisible = !isPlaying || isHovered;

  const effectiveProgress = hasVideoError
    ? simulatedProgress
    : duration > 0
    ? (currentTime / duration) * 100
    : 0;

  const effectiveDuration = hasVideoError ? 108 : duration;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${title} video player. Press Space to play/pause, M to mute, F for fullscreen.`}
      className={`relative w-full ${aspectRatio} bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl select-none group focus:outline-none focus:ring-2 focus:ring-[#E74747] ${className}`}
    >
      {/* Real Video Element */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          src={src}
          poster={poster || undefined}
          playsInline
          autoPlay={autoPlay}
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleVideoError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />
      )}

      {/* Intentional Cinematic Placeholder when local showreel.mp4 is not yet present */}
      {hasVideoError && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 bg-gradient-to-b from-[#090b0e] via-[#0c0f14] to-[#07080a] z-10 overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E74747]/10 blur-3xl pointer-events-none" />

          {/* Top Registration Bar */}
          <div className="relative z-20 flex items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400 border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E74747] animate-pulse" />
              <span className="text-white font-semibold">{title}</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <span className="hidden sm:inline">FORMAT: 2.39:1 DCI</span>
              <span className="text-[#E74747]">AWAITING LOCAL SOURCE</span>
            </div>
          </div>

          {/* Central Slate & Clear Instructions */}
          <div className="relative z-20 my-auto flex flex-col items-center text-center max-w-xl mx-auto px-4">
            <div className="relative mb-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 bg-white/[0.04] backdrop-blur-md flex items-center justify-center text-white shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Film className="w-8 h-8 sm:w-9 sm:h-9 text-[#E74747]" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-900 border border-white/20">
                <FileVideo className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>

            <h3 className="font-display font-extrabold text-lg sm:text-2xl text-white tracking-widest uppercase">
              SHOWREEL SOURCE PENDING
            </h3>

            <p className="mt-2.5 text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed font-light">
              Place your master edit file at:
            </p>

            <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-zinc-950 border border-white/15 text-xs font-mono text-[#E74747]">
              <span>public/videos/showreel.mp4</span>
            </div>

            <p className="mt-3 text-[11px] font-mono text-zinc-500 max-w-md">
              Recommended: 1080p or 4K ProRes Proxy / H.264, 24 FPS, Stereo 48kHz audio.
            </p>

            {/* Test Simulation Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-mono tracking-wider text-zinc-300 hover:text-white transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#E74747]" />
              <span>{isPlaying ? "PAUSE PREVIEW CONTROLS" : "TEST PLAYER CONTROLS"}</span>
            </button>
          </div>

          {/* Viewfinder Ticks */}
          <div className="absolute inset-4 pointer-events-none">
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/25" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/25" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/25" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/25" />
          </div>
        </div>
      )}

      {/* Dark Vignette & Shadow Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none transition-opacity duration-300 ${
          controlsVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Large Center Play / Pause Floating Trigger */}
      <button
        type="button"
        onClick={togglePlay}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/30 bg-black/50 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-[#E74747] hover:bg-[#E74747]/20 z-20 focus:outline-none focus:ring-2 focus:ring-[#E74747] ${
          isPlaying && !isHovered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
        ) : (
          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white" />
        )}
      </button>

      {/* Bottom Transport & Progress Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-6 transition-all duration-300 ${
          controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        {/* Interactive Scrub Bar */}
        <div
          onClick={handleScrub}
          className="relative w-full h-2 bg-white/15 hover:h-2.5 rounded-full cursor-pointer overflow-hidden transition-all duration-200 group/scrub mb-3.5"
          role="slider"
          aria-label="Video scrubber"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(effectiveProgress)}
        >
          {/* Active Progress */}
          <div
            className="h-full bg-[#E74747] relative transition-all duration-100"
            style={{ width: `${effectiveProgress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md scale-0 group-hover/scrub:scale-100 transition-transform" />
          </div>
        </div>

        {/* Transport Toolbar */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
          {/* Left: Play/Pause, Sound, Timecode */}
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 rounded text-white hover:text-[#E74747] transition-colors focus:outline-none focus:ring-1 focus:ring-white"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-1.5 rounded text-white hover:text-[#E74747] transition-colors focus:outline-none focus:ring-1 focus:ring-white"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-zinc-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span className="text-white font-medium">{formatTimecode(currentTime)}</span>
              <span className="text-zinc-500">/</span>
              <span className="text-zinc-400">{formatTimecode(effectiveDuration)}</span>
            </div>
          </div>

          {/* Right: Format Badge & Fullscreen */}
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
              24 FPS PRORES
            </span>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded text-white hover:text-[#E74747] transition-colors focus:outline-none focus:ring-1 focus:ring-white"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
