import { useState } from "react";
import {
  ExternalLink,
  Play,
  Tv,
  Smartphone,
} from "lucide-react";

export function ProjectCard({ project, onSelect }) {
  const [imgError, setImgError] = useState(false);
  const isVertical = project.aspectRatio === "9:16";

  return (
    <article
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Play ${project.title} (${project.category}) inside portfolio`}
      className={`group relative rounded-xl border border-white/10 bg-[#0c0e14] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#E74747]/60 hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#E74747] ${
        isVertical
          ? "col-span-1 max-w-sm mx-auto w-full"
          : "col-span-1 md:col-span-1"
      }`}
    >
      {/* Media Canvas Area */}
      <div
        className={`relative w-full overflow-hidden bg-black ${
          isVertical ? "aspect-[9/16]" : "aspect-[16/9]"
        }`}
      >
        {/* Real Thumbnail (for YouTube or verified image sources) */}
        {project.thumbnail && !imgError ? (
          <img
            src={project.thumbnail}
            alt={`${project.title} video thumbnail`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          /* Intentional Branded Cinematic Fallback (for Instagram Reels or offline) */
          <div
            className={`w-full h-full flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-br ${project.visualMood} relative select-none`}
          >
            {/* Ambient Specular Highlight */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />

            {/* Top Registration Line */}
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-400 z-10">
              <span className="flex items-center gap-1.5 text-[#E74747]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
                {project.tag}
              </span>
              <span className="text-zinc-500">{project.sequence}</span>
            </div>

            {/* Central Slate Motif */}
            <div className="my-auto flex flex-col items-center justify-center text-center z-10 px-4">
              <div className="w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/80 group-hover:scale-110 group-hover:text-white group-hover:border-[#E74747] transition-all duration-300">
                {isVertical ? (
                  <Smartphone className="w-5 h-5 text-[#E74747]" />
                ) : (
                  <Tv className="w-5 h-5 text-[#E74747]" />
                )}
              </div>
              <span className="mt-3 font-display font-bold text-sm tracking-widest text-zinc-300 uppercase">
                {project.title}
              </span>
              <span className="mt-1 font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                {project.specs.style}
              </span>
            </div>

            {/* Bottom Format Ticks */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 z-10">
              <span>{project.aspectRatio}</span>
              <span className="text-[#E74747]">● READY</span>
              <span>{project.platform.toUpperCase()}</span>
            </div>

            {/* Framing Corner Markers */}
            <div className="absolute inset-3 pointer-events-none">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
            </div>
          </div>
        )}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

        {/* Platform Badge on Media Header */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
          {isVertical ? (
            <Smartphone className="w-3 h-3 text-[#E74747]" />
          ) : (
            <Tv className="w-3 h-3 text-[#E74747]" />
          )}
          <span>{project.platform}</span>
        </div>

        {/* Center Play Button on Media */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/60 border border-white/30 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#E74747] group-hover:border-[#E74747] transition-all shadow-xl">
          <Play className="w-5 h-5 fill-white ml-0.5" />
        </div>

        {/* Duration / Format Tag on Bottom Media Rail */}
        <div className="absolute bottom-3 right-3 z-20 font-mono text-[10px] text-zinc-300 bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10">
          PLAY IN-SITE
        </div>
      </div>

      {/* Editorial Card Metadata Area */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
        <div>
          {/* Category & Format Tag */}
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-[#E74747] tracking-wider uppercase font-medium">
              {project.category}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              {project.aspectRatio}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display font-bold text-lg text-white tracking-wide uppercase group-hover:text-zinc-200 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-xs font-sans text-zinc-400 leading-relaxed font-light line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Two Explicit Actions: Play In-Site & Direct External Platform Link */}
        <div className="mt-4 pt-3.5 border-t border-white/[0.08] flex items-center justify-between gap-2 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 text-zinc-300 group-hover:text-[#E74747] transition-colors">
            <Play className="w-3 h-3 fill-current" />
            <span>PLAY IN-SITE</span>
          </span>

          {/* Direct External Link (with e.stopPropagation() so it doesn't open the modal) */}
          <a
            href={project.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-white text-[11px] font-mono transition-colors border border-white/10 hover:border-white/20"
            title={`Opens original ${project.platform} page in a new tab`}
          >
            <span>{project.platform.toUpperCase()}</span>
            <ExternalLink className="w-3 h-3 text-[#E74747]" />
          </a>
        </div>
      </div>
    </article>
  );
}
