import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, Play } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { ShowreelModal } from "./ShowreelModal";
import { siteConfig } from "../../data/siteConfig";

export function HeroSection() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [timecode, setTimecode] = useState("00:00:01:12");

  const sectionRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const badgeRef = useRef(null);
  const copyRef = useRef(null);
  const ctaGroupRef = useRef(null);
  const specsRef = useRef(null);
  const scene3DRef = useRef(null);
  const bottomBarRef = useRef(null);

  // Live running timecode simulation (24 FPS feel)
  useEffect(() => {
    let frame = 12;
    let sec = 1;
    let min = 0;
    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
        }
      }
      setTimecode(
        `00:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${frame
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  // GSAP Coordinated Opening Reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Instantly show all elements without staggered delay
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // 1. Badge & Scene marker reveal
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // 2. Oversized Headline lines slide up through clipping mask
      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        { y: "115%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.1, stagger: 0.15 },
        "-=0.5"
      );

      // 3. 3D Scene subtle scale & fade
      tl.fromTo(
        scene3DRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
        "-=0.9"
      );

      // 4. Supporting copy & description
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      // 5. Action buttons
      tl.fromTo(
        ctaGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      );

      // 6. Specs strip and bottom scene indicator
      tl.fromTo(
        [specsRef.current, bottomBarRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1.0 },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-6 md:px-10 lg:px-12 overflow-hidden bg-[#08090B]"
        aria-label="Hero Section"
      >
        {/* Main Content Composition Grid */}
        <div className="max-w-7xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-20">
          {/* Left Column: Editorial Headline & Actions (7 Cols on LG) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Scene Index & Category Tag */}
            <div ref={badgeRef} className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] md:text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
                {siteConfig.hero.sceneLabel}
              </span>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                {siteConfig.brand.year}
              </span>
            </div>

            {/* Oversized Editorial Headline with Clipping Masks */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.03em] leading-[0.92] text-white uppercase select-none">
              <span className="block overflow-hidden py-1">
                <span ref={headlineLine1Ref} className="block text-white">
                  {siteConfig.hero.headline.line1}
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span
                  ref={headlineLine2Ref}
                  className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent"
                >
                  {siteConfig.hero.headline.line2}
                </span>
              </span>
            </h1>

            {/* Supporting Copy & Role */}
            <div ref={copyRef} className="mt-6 sm:mt-8 space-y-3 max-w-xl">
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#E74747] uppercase font-semibold">
                {siteConfig.hero.supportingCopy}
              </p>
              <p className="font-sans text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
                {siteConfig.hero.description}
              </p>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div
              ref={ctaGroupRef}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary Action: Explore My Work */}
              <a
                href={siteConfig.hero.primaryCta.href}
                className="group relative inline-flex items-center gap-3 px-7 py-4 bg-white text-black rounded font-mono text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:bg-[#E74747] hover:text-white shadow-xl shadow-white/5 hover:shadow-[#E74747]/25 focus:outline-none focus:ring-2 focus:ring-[#E74747]"
              >
                <span>{siteConfig.hero.primaryCta.label}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Secondary Action: Play Showreel */}
              <button
                type="button"
                onClick={() => setShowreelOpen(true)}
                className="group relative inline-flex items-center gap-3 px-6 py-4 rounded border border-white/20 bg-white/[0.03] backdrop-blur-sm text-white font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-[#E74747]/80 hover:bg-[#E74747]/10 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#E74747] flex items-center justify-center transition-colors">
                  <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                </div>
                <span>{siteConfig.hero.secondaryCta.label}</span>
                <span className="text-[10px] text-zinc-400 group-hover:text-zinc-200">
                  [{siteConfig.hero.secondaryCta.timecode}]
                </span>
              </button>
            </div>

            {/* Master Technical Specifications Strip */}
            <div
              ref={specsRef}
              className="mt-10 sm:mt-12 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {siteConfig.hero.specifications.map((spec) => (
                <div key={spec.label} className="flex flex-col">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                    {spec.label}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-medium tracking-wider mt-0.5">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Chrome Sculpture (5 Cols on LG) */}
          <div
            ref={scene3DRef}
            className="lg:col-span-5 relative flex items-center justify-center w-full"
          >
            {/* Viewfinder Bounding Guides */}
            <div className="absolute -inset-2 sm:-inset-4 border border-white/[0.06] rounded-lg pointer-events-none z-10 hidden sm:block">
              {/* Corner crosshairs */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-white/30" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-white/30" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-white/30" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-white/30" />

              {/* Viewfinder camera lens data */}
              <div className="absolute top-2 left-3 text-[9px] font-mono tracking-widest text-zinc-500">
                LENS 35MM T1.5
              </div>
              <div className="absolute top-2 right-3 text-[9px] font-mono tracking-widest text-zinc-500">
                SHUTTER 180°
              </div>
            </div>

            {/* The 3D Canvas Scene */}
            <HeroScene />
          </div>
        </div>

        {/* Bottom Scene Indicator, Running Timecode & Scroll Cue */}
        <div
          ref={bottomBarRef}
          className="max-w-7xl w-full mx-auto z-20 pt-8 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] text-xs font-mono text-zinc-400"
        >
          {/* Live Studio Timecode */}
          <div className="flex items-center gap-3">
            <span className="text-[#E74747] font-bold">TC</span>
            <span className="tracking-widest text-white font-mono">{timecode}</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-[11px] text-zinc-500">
              FRAME 0024 // 24.000 FPS
            </span>
          </div>

          {/* Interactive Scroll Cue */}
          <a
            href="#showreel"
            className="group inline-flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors py-1"
            aria-label="Scroll to explore showreel"
          >
            <span className="tracking-[0.25em] text-[10px] uppercase font-semibold">
              SCROLL TO DIRECT
            </span>
            <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1 group-hover:border-[#E74747] transition-colors">
              <span className="w-1 h-2 rounded-full bg-[#E74747] animate-bounce" />
            </div>
          </a>

          {/* Format & Audio Profile */}
          <div className="hidden md:flex items-center gap-3 text-[11px] text-zinc-500">
            <span>4K DCI MASTER</span>
            <span className="text-zinc-700">•</span>
            <span>DOLBY 5.1 PREPARED</span>
          </div>
        </div>
      </section>

      {/* Showreel Preview Modal */}
      <ShowreelModal isOpen={showreelOpen} onClose={() => setShowreelOpen(false)} />
    </>
  );
}
