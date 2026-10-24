import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ShowreelPlayer } from "../showreel/ShowreelPlayer";
import { siteConfig } from "../../data/siteConfig";

export function ShowreelModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Director Showreel Modal"
        >
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="relative w-full max-w-5xl bg-[#090b0e] border border-white/15 rounded-xl shadow-2xl shadow-black overflow-hidden z-10 flex flex-col"
          >
            {/* Top Modal Header */}
            <div className="px-5 py-3.5 bg-zinc-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E74747] animate-pulse" />
                <span className="font-display font-bold text-xs tracking-[0.2em] text-white uppercase">
                  {siteConfig.showreel.title}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/5 rounded border border-white/10">
                  {siteConfig.showreel.duration}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Shared Video Player */}
            <div className="p-2 sm:p-4 bg-black">
              <ShowreelPlayer
                src="/videos/showreel.mp4"
                poster="/images/showreel-poster.jpg"
                title={siteConfig.showreel.title}
                aspectRatio="aspect-[16/9]"
                autoPlay={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
