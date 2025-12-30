import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[60vh] flex items-center justify-center pt-40 pb-16 overflow-hidden bg-background"
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wide leading-tight"
        >
          <span className="text-gradient-yellow">Produção de vídeos</span>
          <br />
          <span className="text-gradient-yellow">cinematográficos e fotografia.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-8 font-light"
        >
          Sua experiência com produção de vídeos nunca mais será a mesma, somos uma{" "}
          <span className="text-foreground font-medium">solução completa</span> para você
          apresentar seu trabalho e capturar momentos únicos.
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
