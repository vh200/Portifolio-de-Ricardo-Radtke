import { motion } from "framer-motion";
import { Camera, Film, Award, Users } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const stats = [
  { icon: Film, value: "100+", label: "Projetos" },
  { icon: Users, value: "50+", label: "Clientes" },
  { icon: Award, value: "5+", label: "Anos de Experiência" },
  { icon: Camera, value: "4K", label: "Qualidade" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={profileImage}
                alt="Ricardo Radtke"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/30 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
              Sobre Mim
            </span>
            <h2 className="section-title mb-8">
              CONTANDO HISTÓRIAS
              <br />
              <span className="text-gradient-gold">ATRAVÉS DAS LENTES</span>
            </h2>
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Olá! Sou Ricardo Radtke, filmmaker e cinematógrafo apaixonado por criar 
                narrativas visuais que emocionam e conectam. Cada projeto é uma nova 
                oportunidade de transformar momentos em memórias cinematográficas.
              </p>
              <p>
                Especializado em vídeos de casamentos, conteúdo corporativo, videoclipes 
                e documentários, meu trabalho combina técnica apurada com sensibilidade 
                artística para entregar resultados que superam expectativas.
              </p>
              <p>
                Acredito que cada história merece ser contada de forma única. Por isso, 
                dedico tempo para entender sua visão e transformá-la em uma peça audiovisual 
                que capture a essência do momento.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-display text-3xl text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground text-xs uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
