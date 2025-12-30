import { motion } from "framer-motion";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            <span className="text-gradient-yellow">Vamos trabalhar juntos?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entre em contato para discutir seu projeto. Estou sempre disponível 
            para novos desafios e colaborações criativas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <motion.a
            href="https://instagram.com/ricardoradtke_"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true }}
            className="group p-8 bg-card rounded-lg text-center hover:bg-secondary transition-colors duration-300"
          >
            <Instagram className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl text-foreground mb-2">Instagram</h3>
            <p className="text-muted-foreground text-sm">@ricardoradtke_</p>
          </motion.a>

          <motion.a
            href="mailto:contato@ricardoradtke.com"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group p-8 bg-card rounded-lg text-center hover:bg-secondary transition-colors duration-300"
          >
            <Mail className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl text-foreground mb-2">Email</h3>
            <p className="text-muted-foreground text-sm">contato@ricardoradtke.com</p>
          </motion.a>

          <motion.a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group p-8 bg-card rounded-lg text-center hover:bg-secondary transition-colors duration-300"
          >
            <Phone className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-xl text-foreground mb-2">WhatsApp</h3>
            <p className="text-muted-foreground text-sm">Clique para conversar</p>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="group p-8 bg-card rounded-lg text-center"
          >
            <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">Localização</h3>
            <p className="text-muted-foreground text-sm">Rio Grande do Sul, Brasil</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
