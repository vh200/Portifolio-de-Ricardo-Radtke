import { motion } from "framer-motion";
import profileImage from "@/assets/profile.jpg";

const DirectorSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={profileImage}
                alt="Ricardo Radtke"
                className="w-full aspect-[3/4] object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-gradient-yellow mb-8">
              Sobre o diretor
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-light leading-relaxed">
              <p>
                Minha relação com a fotografia e vídeo começou como hobby, onde tive a 
                oportunidade de aprender de forma muito natural diversas técnicas, com 
                amigos e grandes profissionais.
              </p>
              <p>
                Foi assim que entrei no mundo da <span className="text-foreground font-medium">produção audiovisual</span>, 
                dirigindo e criando conteúdos para diversos clientes. Desse modo, comecei 
                a desenvolver um estilo de direção única e com muita verdade.
              </p>
              <p>
                Com anos de experiência, conto com equipamentos profissionais para poder 
                atender aos trabalhos com produção, roteiro, gravação, iluminação, som, 
                edição e fotografia.
              </p>
              <p>
                Já assinei como diretor diversos <span className="text-foreground font-medium">filmes de casamento, vídeos corporativos 
                e documentários</span>, vai ser um prazer desenvolver o seu projeto também.
              </p>
            </div>

            <motion.a
              href="https://instagram.com/ricardoradtke_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="btn-primary inline-block mt-8"
            >
              Siga no Instagram
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DirectorSection;
