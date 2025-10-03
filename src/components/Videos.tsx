import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Play, Film, Video } from "lucide-react";
import { useState, useRef } from "react";

interface VideoItem {
  id: number;
  title: string;
  src: string;
  description: string;
  category: "3d" | "edited";
}

// 3D Animation videos (using your existing links)
const animationVideos: VideoItem[] = [
  {
    id: 1,
    title: "3D Animation Project",
    src: "https://res.cloudinary.com/dvgqm9yd6/video/upload/v1759500782/vn20240628-235812_kzK9ITYe_ll1ujk.mp4",
    description: "Cinematic 3D animation showcase",
    category: "3d"
  },
  {
    id: 2,
    title: "Motion Graphics Demo",
    src: "https://res.cloudinary.com/dvgqm9yd6/video/upload/v1759498101/Project3_1_bkhs9n.mp4",
    description: "Dynamic motion design work",
    category: "3d"
  },
  {
    id: 3,
    title: "Final Animation",
    src: "https://res.cloudinary.com/dvgqm9yd6/video/upload/v1759498104/final_cm7rur.mp4",
    description: "Completed animation project",
    category: "3d"
  },
];

// Placeholder for edited videos (replace with actual links)
const editedVideos: VideoItem[] = [
  {
    id: 4,
    title: "Edited Video 1",
    src: "https://res.cloudinary.com/dvgqm9yd6/video/upload/v1759498221/REEL_EDIT_2_g2arbk.mp4", // Replace with actual link
    description: "Professional video editing showcase",
    category: "edited"
  },
  {
    id: 5,
    title: "Edited Video 2",
    src: "https://res.cloudinary.com/dvgqm9yd6/video/upload/v1759498063/EDIT_r5fvvt.mp4", // Replace with actual link
    description: "Color grading and effects demonstration",
    category: "edited"
  },
 
];

export const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [playingVideos, setPlayingVideos] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const handlePlayVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setPlayingVideos(prev => ({ ...prev, [video.id]: true }));
    
    // Auto-play the selected video
    setTimeout(() => {
      const videoElement = videoRefs.current[video.id];
      if (videoElement) {
        videoElement.play().catch(console.error);
      }
    }, 100);
  };

  const handleCloseVideo = () => {
    if (selectedVideo) {
      const videoElement = videoRefs.current[selectedVideo.id];
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
      setPlayingVideos(prev => ({ ...prev, [selectedVideo.id]: false }));
    }
    setSelectedVideo(null);
  };

  const handleVideoEnd = (videoId: number) => {
    setPlayingVideos(prev => ({ ...prev, [videoId]: false }));
  };

  const VideoCard = ({ video, index }: { video: VideoItem; index: number }) => (
    <motion.div
      key={video.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden bg-card border-border group cursor-pointer hover:border-primary/50 transition-all duration-300 h-full">
        <div 
          className="relative aspect-video overflow-hidden"
          onClick={() => handlePlayVideo(video)}
        >
          {/* Video thumbnail with play overlay */}
          <div className="relative w-full h-full">
            <video
              ref={el => videoRefs.current[video.id] = el}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              onEnded={() => handleVideoEnd(video.id)}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play overlay - shows when video is not playing */}
            {!playingVideos[video.id] && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/50 z-10" />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center mb-4 mx-auto transform group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                    <p className="text-lg font-semibold text-white drop-shadow-lg">
                      Play Video
                    </p>
                    <p className="text-sm text-white/80 mt-2">
                      Click to watch
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
          <p className="text-sm text-muted-foreground">{video.description}</p>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <section id="videos" className="py-24 px-4 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Video Showcase
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore my collection of 3D animations and video editing projects
          </p>
        </motion.div>

        {/* 3D Animation Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center mb-8"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
              <Film className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold">3D Animations</h3>
            <div className="h-px bg-border flex-1 ml-6"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {animationVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>

        {/* Edited Videos Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center mb-8"
          >
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold">Edited Videos</h3>
            <div className="h-px bg-border flex-1 ml-6"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {editedVideos.map((video, index) => (
              <VideoCard key={video.id} video={video} index={index} />
            ))}
          </div>
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full bg-card rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                <video
                  ref={el => videoRefs.current[selectedVideo.id] = el}
                  className="w-full h-full"
                  controls
                  autoPlay
                  onEnded={() => handleVideoEnd(selectedVideo.id)}
                >
                  <source src={selectedVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
                <p className="text-muted-foreground">{selectedVideo.description}</p>
              </div>
              
              <button
                onClick={handleCloseVideo}
                className="absolute top-4 right-4 w-10 h-10 bg-background/80 rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
              >
                <span className="text-2xl">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};