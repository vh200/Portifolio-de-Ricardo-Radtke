import { motion } from "framer-motion";
import profileImage from "@/assets/profile.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="section-title mb-4">
              Facilitamos a sua produção
            </h2>
            <h2 className="section-title text-gradient-yellow mb-8">
              de vídeos e fotos.
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Atendemos a <span className="text-foreground font-medium">mais de 5 anos o mercado audiovisual</span> com 
                soluções profissionais para casamentos, eventos, conteúdo corporativo e muito mais.
              </p>
              <p>
                Realizamos a produção de filmes e vídeos cinematográficos, ensaios 
                fotográficos e conteúdo para redes sociais.
              </p>
              <p>
                Nosso objetivo é transformar cada momento em uma história visual 
                inesquecível, com qualidade técnica e sensibilidade artística.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={profileImage}
                alt="Studio de produção"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
