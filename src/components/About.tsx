import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Maximize } from "lucide-react";
import { Card } from "./ui/card";
import { useState, useRef, useEffect } from "react";

export const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Replace with your Cloudflare video link
  const videoUrl =
    "https://res.cloudinary.com/dvgqm9yd6/video/upload/v1759498202/SHOWREEL_m2xshl.mp4";

  // Intersection Observer to detect when video is in viewport
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3, rootMargin: "50px" }
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
        if (isMuted) {
          setIsMuted(false);
          videoRef.current.muted = false;
        }
      }
      setIsPlaying(!isPlaying);
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

  const handleVideoClick = () => {
    togglePlay();
  };

  return (
    <section ref={sectionRef} id="about" className="py-24 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate video creator specializing in 3D animation and cinematic
            storytelling
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card
            className="overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)] group cursor-pointer"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted={true}
                loop
                playsInline
                poster="/video-poster.jpg"
                onClick={handleVideoClick}
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay controls */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent ${
                  showControls || !isPlaying ? "opacity-100" : "opacity-0"
                } transition-opacity duration-300 flex items-end justify-between p-6`}
              >
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">My Showreel</h3>
                  <p className="text-sm opacity-90">
                    {!isPlaying
                      ? "Click to play with sound"
                      : "Showcasing my best work in 3D animation and visual effects"}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    {isPlaying ? (
                      <div className="w-2 h-5 border-l-2 border-r-2 border-white ml-1" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  <button
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  <button
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen();
                    }}
                  >
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={handleVideoClick}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                    <Play className="w-12 h-12 text-white fill-white ml-1" />
                  </div>
                </div>
              )}
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              As a passionate 3D animation graduate, I bring fresh perspectives
              and cutting-edge techniques honed through intensive academic
              training and personal projects. Eager to contribute my skills in
              animation, visual effects, and cinematic storytelling to
              professional environments while learning from industry experts and
              growing within a creative team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
