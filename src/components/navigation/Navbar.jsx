import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../../data/siteConfig";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      // Section spy
      const sections = ["showreel", "work", "about", "contact"];
      const scrollPos = window.scrollY + 250;

      if (window.scrollY < 200) {
        setActiveSection("");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <header
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-[#08090B]/90 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl shadow-black/80"
          : "bg-transparent py-5 sm:py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between">
        {/* Left: Brand Monogram & Return to Top */}
        <a
          href="#"
          onClick={scrollToTop}
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E74747] rounded-sm p-1"
          aria-label={`${siteConfig.brand.fullName} (${siteConfig.brand.name}) — Return to top`}
        >
          {/* Monogram Stamp */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded border border-white/20 bg-white/[0.03] backdrop-blur-sm group-hover:border-[#E74747]/80 group-hover:bg-[#E74747]/10 transition-all duration-300">
            <span className="font-display font-extrabold text-sm tracking-wider text-white group-hover:text-[#E74747] transition-colors">
              {siteConfig.brand.monogram}
            </span>
            {/* Viewfinder corner registration ticks */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-white/40" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-[0.2em] text-sm text-white uppercase group-hover:text-zinc-200 transition-colors">
                {siteConfig.brand.name}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#E74747] bg-[#E74747]/10 border border-[#E74747]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74747] animate-pulse" />
                REC 24FPS
              </span>
            </div>
            <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase">
              {siteConfig.brand.role}
            </span>
          </div>
        </a>

        {/* Center/Right Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10"
          aria-label="Main navigation"
        >
          {siteConfig.navigation.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-xs uppercase tracking-[0.22em] font-mono transition-colors duration-200 py-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E74747] rounded-sm ${
                  isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#E74747] transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}

          {/* Availability Status Badge */}
          <div
            className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-[11px] font-mono tracking-wider text-zinc-400 select-none"
            title="Current studio availability"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-300">{siteConfig.brand.statusText}</span>
          </div>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            OPEN
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E74747] rounded"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 flex flex-col justify-between pointer-events-none">
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 origin-left ${
                  mobileMenuOpen ? "rotate-45 translate-x-1" : "w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-white transition-all duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "w-4 self-end"
                }`}
              />
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 origin-left ${
                  mobileMenuOpen ? "-rotate-45 translate-x-1" : "w-6"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#08090B]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {siteConfig.navigation.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-mono tracking-[0.25em] py-2 flex items-center justify-between border-b border-white/5 transition-colors ${
                      isActive
                        ? "text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-[#E74747] text-xs">→</span>
                  </a>
                );
              })}
              <div className="pt-2 text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{siteConfig.brand.statusText}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
