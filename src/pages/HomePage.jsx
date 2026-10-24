import { useState } from "react";
import { Navbar } from "../components/navigation/Navbar";
import { FilmAtmosphere } from "../components/common/FilmAtmosphere";
import { HeroSection } from "../components/hero/HeroSection";
import { ShowreelSection } from "../components/showreel/ShowreelSection";
import { WorkSection } from "../components/work/WorkSection";
import { Mail, Phone, Copy, Check, ExternalLink, Smartphone, Tv } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export function HomePage() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    const email = siteConfig.brand.email;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2400);
        })
        .catch(() => {
          fallbackCopyText(email);
        });
    } else {
      fallbackCopyText(email);
    }
  };

  const fallbackCopyText = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2400);
      }
    } catch {
      window.location.href = siteConfig.brand.emailHref;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08090B] text-[#F3F4F6] selection:bg-[#E74747] selection:text-white overflow-x-hidden">
      {/* Cinematic Film Atmosphere (Grain, Vignette, Ambient Glows, Viewfinder Ticks) */}
      <FilmAtmosphere />

      {/* Primary Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main>
        {/* Phase 1: The Overture Hero Experience */}
        <HeroSection />

        {/* Phase 2: Master Showreel Section */}
        <ShowreelSection />

        {/* Phase 3: Real Projects // Short-Form Reels & Podcast Gallery */}
        <WorkSection />

        {/* Scene 04: About Prathmesh Jangam */}
        <section
          id="about"
          className="relative py-24 sm:py-32 md:py-40 px-6 md:px-10 lg:px-12 border-t border-white/[0.08] bg-gradient-to-b from-[#08090B] via-[#0a0c10] to-[#08090B] z-20"
          aria-label="About Prathmesh Jangam"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-12 sm:gap-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#E74747] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
                {siteConfig.about.badge}
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                {siteConfig.about.headline}
              </h2>

              <div className="mt-8 space-y-4 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                <p className="text-white font-normal text-base sm:text-lg leading-relaxed">
                  {siteConfig.about.leadBio}
                </p>
                <p className="text-zinc-400">
                  {siteConfig.about.extendedBio}
                </p>
              </div>

              {/* Core Editing Disciplines */}
              <div className="mt-10 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E74747] uppercase mb-2">
                    <Smartphone className="w-4 h-4" />
                    <span>SHORT-FORM VIDEO EDITING</span>
                  </div>
                  <p className="text-xs font-sans text-zinc-400 leading-relaxed font-light">
                    Fast-paced hooks, kinetic text synchronization, audio transients, and vertical 9:16 retention architecture tailored for Instagram Reels.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E74747] uppercase mb-2">
                    <Tv className="w-4 h-4" />
                    <span>PODCAST VIDEO EDITING</span>
                  </div>
                  <p className="text-xs font-sans text-zinc-400 leading-relaxed font-light">
                    Multi-camera switching, natural dialogue rhythm, conversational reaction cuts, and dialogue audio mastering for YouTube.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Profile Card */}
            <div className="w-full lg:w-96 rounded-xl border border-white/10 bg-[#0d0f15] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{siteConfig.brand.statusText}</span>
                </div>

                <div className="w-12 h-12 rounded border border-white/20 bg-white/5 flex items-center justify-center font-display font-extrabold text-lg text-white mb-4">
                  {siteConfig.brand.monogram}
                </div>

                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wide">
                  {siteConfig.brand.fullName}
                </h3>
                <span className="text-xs font-mono text-[#E74747] block mt-0.5">
                  {siteConfig.brand.role}
                </span>

                <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-3 text-xs font-mono text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">FOCUS</span>
                    <span className="text-zinc-200">Reels & Podcasts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">FORMATS</span>
                    <span className="text-zinc-200">9:16 & 16:9</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">LOCATION</span>
                    <span className="text-zinc-200">{siteConfig.brand.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <a
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-white text-black hover:bg-[#E74747] hover:text-white transition-all font-mono text-xs uppercase font-bold"
                >
                  <span>GET IN TOUCH</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Scene 05: Functional Contact Section */}
        <section
          id="contact"
          className="relative py-24 sm:py-32 px-6 md:px-10 lg:px-12 border-t border-white/[0.08] bg-[#08090B] z-20"
          aria-label="Contact Prathmesh Jangam"
        >
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#E74747] uppercase mb-4 px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E74747]" />
                {siteConfig.contact.badge}
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                {siteConfig.contact.headline}
              </h2>

              <p className="mt-4 text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed font-light">
                {siteConfig.contact.invitation}
              </p>
            </div>

            {/* Functional Contact Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Card 1: Direct Email */}
              <div className="rounded-xl border border-white/10 bg-[#0d0f15] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                    <span>{siteConfig.contact.directEmailLabel}</span>
                    <Mail className="w-4 h-4 text-[#E74747]" />
                  </div>

                  <a
                    href={siteConfig.brand.emailHref}
                    className="font-mono text-sm sm:text-base text-white hover:text-[#E74747] transition-colors break-all block font-semibold"
                  >
                    {siteConfig.brand.email}
                  </a>

                  <p className="mt-2 text-xs font-sans text-zinc-400 font-light">
                    Opens inquiry email draft with prefilled subject.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <a
                    href={siteConfig.brand.emailHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white text-black hover:bg-[#E74747] hover:text-white transition-all font-mono text-xs uppercase font-bold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>EMAIL ME</span>
                  </a>

                  {/* Copy Email Button with feedback */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                    aria-label="Copy email address to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card 2: Direct Phone / WhatsApp */}
              <div className="rounded-xl border border-white/10 bg-[#0d0f15] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                    <span>{siteConfig.contact.directPhoneLabel}</span>
                    <Phone className="w-4 h-4 text-[#E74747]" />
                  </div>

                  <a
                    href={siteConfig.brand.phoneHref}
                    className="font-mono text-sm sm:text-base text-white hover:text-[#E74747] transition-colors block font-semibold"
                  >
                    {siteConfig.brand.phone}
                  </a>

                  <p className="mt-2 text-xs font-sans text-zinc-400 font-light">
                    Direct phone call or WhatsApp message for project discussions.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-3">
                  <a
                    href={siteConfig.brand.phoneHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-white/20 bg-white/5 hover:bg-white/15 text-white transition-all font-mono text-xs uppercase font-bold"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E74747]" />
                    <span>CALL ME</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Live Copy Feedback Status for Screen Readers */}
            <div aria-live="polite" className="sr-only">
              {copiedEmail ? "Email address copied to clipboard" : ""}
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Cinematic Master Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-6 md:px-10 lg:px-12 bg-black z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-widest">
              {siteConfig.brand.fullName}
            </span>
            <span>//</span>
            <span>{siteConfig.brand.name} EDITORIAL</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>SHORT-FORM & PODCASTS</span>
            <span>•</span>
            <span className="text-[#E74747]">AVAILABLE FOR WORK</span>
            <span>•</span>
            <span>{siteConfig.brand.year}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
