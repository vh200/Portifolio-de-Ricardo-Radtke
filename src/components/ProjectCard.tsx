import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  type: "video" | "photo";
  index: number;
}

const ProjectCard = ({ title, category, image, type, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="card-project group cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary"
          >
            {type === "video" ? <Play size={24} /> : <ExternalLink size={24} />}
          </motion.div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs uppercase tracking-wider rounded-full border border-primary/30">
            {type === "video" ? "Vídeo" : "Foto"}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] mb-2">
          {category}
        </p>
        <h3 className="font-display text-2xl tracking-wide text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
