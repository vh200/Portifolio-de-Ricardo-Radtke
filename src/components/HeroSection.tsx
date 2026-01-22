import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import personal1 from "@/assets/personal-1.jpg";
import personal2 from "@/assets/personal-2.jpg";
import personal3 from "@/assets/personal-3.jpg";
import { useRef, useState, useCallback, useEffect } from "react";
import { CustomCursor } from "./CustomCursor";

const projects = [
  // Row 1
  { 
    id: 1, 
    title: "FAMILY MOMENTS", 
    category: "Lifestyle", 
    image: personal1,
    className: "top-[10%] left-[10%]" 
  },
  { 
    id: 2, 
    title: "ON THE ROAD", 
    category: "Travel", 
    image: personal2,
    className: "top-[15%] left-[35%]" 
  },
  { 
    id: 3, 
    title: "ACTIVE LIFE", 
    category: "Sports", 
    image: personal3,
    className: "top-[10%] right-[35%]" 
  },
  { 
    id: 4, 
    title: "PORTRAIT", 
    category: "Lifestyle", 
    image: personal1,
    className: "top-[15%] right-[10%]" 
  },
  
  // Row 2
  { 
    id: 5, 
    title: "CINEMA", 
    category: "Cinema", 
    image: personal2,
    className: "top-[40%] left-[5%]" 
  },
  { 
    id: 6, 
    title: "MUSIC", 
    category: "Music", 
    image: personal3,
    className: "top-[45%] left-[30%]" 
  },
  { 
    id: 7, 
    title: "WEDDING", 
    category: "Wedding", 
    image: personal1,
    className: "top-[40%] right-[30%]" 
  },
  { 
    id: 8, 
    title: "FASHION", 
    category: "Fashion", 
    image: personal2,
    className: "top-[45%] right-[5%]" 
  },

  // Row 3
  { 
    id: 9, 
    title: "COMMERCIAL", 
    category: "Commercial", 
    image: personal3,
    className: "bottom-[15%] left-[10%]" 
  },
  { 
    id: 10, 
    title: "DOCUMENTARY", 
    category: "Documentary", 
    image: personal1,
    className: "bottom-[10%] left-[35%]" 
  },
  { 
    id: 11, 
    title: "NATURE", 
    category: "Nature", 
    image: personal2,
    className: "bottom-[15%] right-[35%]" 
  },
  { 
    id: 12, 
    title: "URBAN", 
    category: "Urban", 
    image: personal3,
    className: "bottom-[10%] right-[10%]" 
  },
];

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  
  // State for image trail
  const [trail, setTrail] = useState<{ id: number; x: number; y: number; image: string; rotation: number }[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  
  // Available images to cycle through
  const trailImages = [personal1, personal2, personal3];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle mouse move to create trail
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    
    const x = clientX - left;
    const y = clientY - top;
    
    // Calculate distance from last added image
    const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
    
    // Threshold for adding new image (e.g., every 100px)
    if (dist > 100) {
      const id = Date.now();
      const nextImage = trailImages[imageIndex.current % trailImages.length];
      imageIndex.current += 1;
      
      const newImage = {
        id,
        x,
        y,
        image: nextImage,
        rotation: Math.random() * 6 - 3, // Reduced rotation for cleaner look
      };
      
      setTrail((prev) => [...prev.slice(-10), newImage]); // Keep max 10 images for minimal look
      lastPos.current = { x, y };
      
      // Remove image after 1 second
      setTimeout(() => {
        setTrail((prev) => prev.filter((img) => img.id !== id));
      }, 1000);
    }
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      <CustomCursor />
      
      {/* Dynamic Background - Just Black */}
      <div className="absolute inset-0 z-0 bg-black" />

      {/* Image Trail Container */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <AnimatePresence mode="popLayout">
            {trail.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute w-[120px] md:w-[180px] aspect-[3/2] object-cover shadow-lg"
                style={{
                  left: item.x,
                  top: item.y,
                  x: "-50%",
                  y: "-50%",
                  rotate: item.rotation,
                }}
              >
                <img 
                  src={item.image} 
                  alt="trail" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 container mx-auto px-6 h-screen flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center justify-center relative w-full"
        >
           <h1 className="font-display text-4xl md:text-6xl lg:text-8xl xl:text-9xl tracking-tighter text-muted-foreground hover:text-white transition-colors duration-300 leading-none select-none whitespace-nowrap cursor-default hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            RICARDO RADTKE
          </h1>
          <p className="text-white/60 uppercase tracking-[0.4em] text-sm md:text-base font-medium mt-8 mix-blend-difference pointer-events-none">
            Filmmaker & Cinematographer
          </p>
        </motion.div>
      </motion.div>
      
      {/* Interactive Button Area */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="pointer-events-auto"
          >
            <a href="#projects" className="btn-cinematic flex items-center gap-3 group">
              <Play size={18} className="group-hover:scale-125 transition-transform" />
              Ver Portfólio
            </a>
          </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
