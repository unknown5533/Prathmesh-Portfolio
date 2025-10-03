import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/5.jpg";
import image4 from "../assets/7.jpg";
import image5 from "../assets/8.jpg";

interface PortfolioItem {
  id: number;
  type: "image" | "video";
  src: string;
  title: string;
  description: string;
}

// ⭐ USING ALL IMPORTED IMAGES ⭐
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    type: "image",
    src: image1,
    title: "3D Render Project",
    description: "Cinematic 3D animation scene",
  },
  {
    id: 2,
    type: "image",
    src: image2,
    title: "Motion Graphics",
    description: "Dynamic motion design work",
  },
  {
    id: 3,
    type: "image",
    src: image3,
    title: "VFX Composition",
    description: "Advanced visual effects",
  },
  {
    id: 4,
    type: "image",
    src: image4,
    title: "Character Animation",
    description: "3D character rigging and animation",
  },
  {
    id: 5,
    type: "image",
    src: image5,
    title: "Product Visualization",
    description: "Commercial 3D product renders",
  },
];

export const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="py-24 px-4 bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent 3D animation and video editing work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group bg-card border-border hover:border-primary/50 transition-all duration-300"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl">
            {selectedItem && (
              <div className="space-y-4">
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  className="w-full rounded-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                  <p className="text-muted-foreground">{selectedItem.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};