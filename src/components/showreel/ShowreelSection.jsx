import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShowreelPlayer } from "./ShowreelPlayer";
import { siteConfig } from "../../data/siteConfig";

gsap.registerPlugin(ScrollTrigger);

export function ShowreelSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headlineRef = useRef(null);
  const copyRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const specsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Coordinated reveal as user scrolls down into the Showreel Section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          playerWrapperRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          specsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showreel"
      className="relative py-24 sm:py-32 md:py-40 px-6 md:px-10 lg:px-12 bg-gradient-to-b from-[#08090B] via-[#0b0c10] to-[#08090B] border-t border-white/[0.07] overflow-hidden"
      aria-label="Director & Editorial Showreel"
    >
      {/* Subtle Background Lighting Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Index Marker */}
        <div ref={headerRef} className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#E74747] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
            SCENE 02 // MASTER REEL
          </span>
          <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
            {siteConfig.showreel.season}
          </span>
        </div>

        {/* Transition Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 pb-10 sm:pb-14 border-b border-white/[0.08]">
          <div>
            <h2
              ref={headlineRef}
              className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92]"
            >
              THE WORK SPEAKS.
            </h2>
          </div>
          <p
            ref={copyRef}
            className="max-w-md text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed font-light"
          >
            A high-density montage synthesizing narrative pacing, commercial velocity, kinetic motion, and documentary portraiture.
          </p>
        </div>

        {/* Main 16:9 Cinematic Video Player Presentation */}
        <div ref={playerWrapperRef} className="mt-10 sm:mt-14 relative">
          <ShowreelPlayer
            src="/videos/showreel.mp4"
            poster="/images/showreel-poster.jpg"
            title={siteConfig.showreel.title}
            aspectRatio="aspect-[16/9]"
          />
        </div>

        {/* Technical Audio & Format Strip */}
        <div
          ref={specsRef}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 border-t border-white/[0.06] pt-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-zinc-400 font-medium">4K DCI MASTER</span>
            <span>•</span>
            <span>24.000 FPS TIMELINE</span>
            <span>•</span>
            <span>COLOR: ACEScct</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-zinc-600">AUDIO:</span>
            <span className="text-zinc-400">48kHz / 24-bit Stereo Master</span>
          </div>
        </div>
      </div>
    </section>
  );
}
