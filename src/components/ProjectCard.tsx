import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import React, { useRef } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  type: "video" | "photo";
  index: number;
}

const ProjectCard = ({ title, category, image, type, index }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="card-project group cursor-pointer perspective-1000"
    >
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="relative aspect-video overflow-hidden rounded-lg shadow-xl"
      >
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

        {/* Admin Controls */}
        {session && (
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-background/80 backdrop-blur hover:bg-white text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.({ id, title, category, image_url: image, type });
              }}
            >
              <Edit2 size={14} />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 opacity-80 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(id, image);
              }}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        )}
      </div>
      
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="p-6 relative z-10"
      >
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
