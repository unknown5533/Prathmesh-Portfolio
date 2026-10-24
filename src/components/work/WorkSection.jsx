import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, projectCategories } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";

gsap.registerPlugin(ScrollTrigger);

export function WorkSection() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const triggerRef = useRef(null);

  // Filter projects by category
  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.filterCategory === activeCategory);

  const shortFormProjects = filteredProjects.filter(
    (p) => p.filterCategory === "SHORT-FORM"
  );
  const podcastProjects = filteredProjects.filter(
    (p) => p.filterCategory === "PODCAST"
  );

  const handleSelectProject = (project) => {
    triggerRef.current = document.activeElement;
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative py-24 sm:py-32 md:py-40 px-6 md:px-10 lg:px-12 bg-[#08090B] border-t border-white/[0.07]"
        aria-label="Selected Editorial Projects by Prathmesh Jangam"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="pb-12 sm:pb-16 border-b border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#E74747] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
                SCENE 03 // PORTFOLIO WORK
              </span>
              <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase">
                INSTAGRAM REELS & YOUTUBE PODCASTS
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-[0.95]">
                  SELECTED WORKS.
                </h2>
              </div>
              <p className="max-w-md text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed font-light">
                Verified portfolio edits covering high-retention short-form Instagram Reels and multi-camera conversational podcast episodes. Click any project to play in-site.
              </p>
            </div>

            {/* Category Filter Pills: ALL, SHORT-FORM, PODCAST */}
            <div
              className="mt-10 flex flex-wrap items-center gap-2 sm:gap-3"
              role="group"
              aria-label="Filter projects by medium"
            >
              {projectCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                  className={`px-4 py-2 rounded text-[11px] font-mono tracking-wider transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#E74747] ${
                    activeCategory === category
                      ? "bg-white text-black font-bold shadow-lg shadow-white/10"
                      : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.08]"
                  }`}
                >
                  {category === "SHORT-FORM"
                    ? "SHORT-FORM REELS"
                    : category === "PODCAST"
                    ? "PODCAST PROJECTS"
                    : "ALL WORKS"}
                </button>
              ))}
            </div>
          </div>

          {/* Group 1: Short-Form Reels (Vertical 9:16 Layout) */}
          {(activeCategory === "ALL" || activeCategory === "SHORT-FORM") && (
            <div className="mt-14 sm:mt-16">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-300 uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#E74747]" />
                  <span>SHORT-FORM EDITING // INSTAGRAM REELS (9:16)</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {shortFormProjects.length} REELS
                </span>
              </div>

              {/* 3-Column Vertical Grid for 9:16 Smartphone Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {shortFormProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={handleSelectProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Podcast Video Projects (16:9 Widescreen Layout) */}
          {(activeCategory === "ALL" || activeCategory === "PODCAST") && (
            <div className="mt-20 sm:mt-24">
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-300 uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#E74747]" />
                  <span>PODCAST VIDEO PROJECTS // YOUTUBE (16:9)</span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {podcastProjects.length} EPISODES
                </span>
              </div>

              {/* 2-Column Widescreen Grid for 16:9 YouTube Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                {podcastProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={handleSelectProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty State Fallback if a category returns 0 projects */}
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-zinc-500 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#E74747]" />
              </div>
              <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                NO PROJECTS FOUND IN THIS CATEGORY
              </h3>
              <p className="mt-1 text-xs font-mono text-zinc-500">
                Select another filter above or reset to view all works.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("ALL")}
                className="mt-5 px-5 py-2.5 rounded bg-white text-black font-mono text-xs uppercase font-bold hover:bg-[#E74747] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E74747]"
              >
                RESET TO ALL WORKS
              </button>
            </div>
          )}

          {/* Bottom Live Data Verification Note */}
          <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span className="text-zinc-400">
              PRATHMESH JANGAM // VERIFIED IN-SITE PLAYABLE INSTAGRAM & YOUTUBE PORTFOLIO
            </span>
            <span className="text-[11px] text-zinc-500">
              TOTAL WORKS: {projects.length} PROJECTS INDEXED
            </span>
          </div>
        </div>
      </section>

      {/* Accessible In-Site Project Detail & Video Preview Modal */}
      <ProjectDetail
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
}
