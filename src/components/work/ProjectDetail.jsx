import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Smartphone,
  Tv,
  AlertCircle,
} from "lucide-react";

export function ProjectDetail({ project, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const isYouTube = project.platform === "YouTube" && project.youtubeId;
  const isInstagram = project.platform === "Instagram" && project.reelId;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/92 backdrop-blur-xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
      >
        {/* Backdrop Click */}
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className={`relative w-full bg-[#0b0d13] border border-white/15 rounded-xl shadow-2xl shadow-black overflow-hidden z-10 my-auto flex flex-col ${
            isInstagram ? "max-w-xl" : "max-w-4xl"
          }`}
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#E74747] animate-pulse" />
              <span className="font-display font-bold text-xs tracking-[0.2em] text-white uppercase">
                {project.tag}
              </span>
              <span className="text-zinc-600">/</span>
              <span className="text-[11px] font-mono text-zinc-400">
                SEQ {project.sequence}
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                IN-SITE PLAYER
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E74747]"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Primary In-Site Video Viewport */}
          <div className="relative w-full bg-black p-3 sm:p-5 flex flex-col items-center justify-center">
            {/* Case 1: YouTube 16:9 Player Embed */}
            {isYouTube && (
              <div className="w-full aspect-[16/9] max-h-[62vh] rounded-lg overflow-hidden bg-black shadow-2xl border border-white/10 relative">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
                  title={`${project.title} - YouTube Podcast Video Player`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {/* Case 2: Instagram Reel 9:16 Official Player Embed */}
            {isInstagram && (
              <div className="w-full max-w-[360px] sm:max-w-[380px] h-[520px] sm:h-[600px] rounded-lg overflow-hidden bg-black shadow-2xl border border-white/10 relative flex items-center justify-center">
                <iframe
                  src={`https://www.instagram.com/reel/${project.reelId}/embed`}
                  title={`${project.title} - Instagram Reel Player`}
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 bg-black"
                />
              </div>
            )}

            {/* Playback Notice & Fallback Link */}
            <div className="w-full mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 px-1">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <AlertCircle className="w-3.5 h-3.5 text-[#E74747] shrink-0" />
                <span>
                  {isInstagram
                    ? "If Reel playback is blocked by browser privacy/cookie settings, watch directly on Instagram."
                    : "Streamed via YouTube native player. Use native controls to play."}
                </span>
              </div>

              <a
                href={project.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white hover:text-[#E74747] transition-colors shrink-0 underline decoration-zinc-600 underline-offset-2"
                title={`Opens original ${project.platform} in a new tab`}
              >
                <span>OPEN ON {project.platform.toUpperCase()}</span>
                <ExternalLink className="w-3 h-3 text-[#E74747]" />
              </a>
            </div>
          </div>

          {/* Project Synopsis & Specifications */}
          <div className="p-5 sm:p-6 space-y-5 bg-[#0b0d13] border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#E74747] uppercase font-semibold">
                  {project.category}
                </span>
                <h2
                  id="project-detail-title"
                  className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wide uppercase mt-0.5"
                >
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
                  {project.specs.format}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                EDITORIAL SYNOPSIS
              </h3>
              <p className="text-xs sm:text-sm font-sans text-zinc-300 font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/[0.08] text-xs font-mono">
              <div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase block">
                  ROLE
                </span>
                <span className="text-zinc-200 mt-0.5 block">
                  {project.role}
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase block">
                  PLATFORM
                </span>
                <span className="text-zinc-200 mt-0.5 block flex items-center gap-1.5">
                  {isInstagram ? (
                    <Smartphone className="w-3.5 h-3.5 text-[#E74747]" />
                  ) : (
                    <Tv className="w-3.5 h-3.5 text-[#E74747]" />
                  )}
                  {project.platform}
                </span>
              </div>

              <div>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase block">
                  CUTTING STYLE
                </span>
                <span className="text-zinc-200 mt-0.5 block">
                  {project.specs.style}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
