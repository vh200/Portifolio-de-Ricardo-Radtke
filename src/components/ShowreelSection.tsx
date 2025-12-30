import { motion } from "framer-motion";
import { Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const ShowreelSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-gradient-yellow mb-4">
            Assista o nosso ShowReel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Breve showcase de vídeos destacando nossa excelência e criatividade. 
            Seu projeto merece esse impacto visual.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative aspect-video max-w-5xl mx-auto overflow-hidden rounded-lg group cursor-pointer"
        >
          <img
            src={heroBg}
            alt="Showreel preview"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/40 transition-all duration-300 group-hover:bg-background/20" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_60px_hsl(48_100%_50%/0.5)]"
            >
              <Play size={32} className="text-primary-foreground ml-1" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
