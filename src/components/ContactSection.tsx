import { motion } from "framer-motion";
import { Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

import { RevealText } from "./RevealText";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Contato
          </span>
          <h2 className="section-title">
            VAMOS CRIAR <span className="text-white/80">JUNTOS</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto font-light">
            Tem um projeto em mente? Entre em contato para discutirmos como posso 
            transformar sua visão em realidade cinematográfica.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-wide mb-1">Email</h3>
                <a
                  href="mailto:contato@ricardoradtke.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  contato@ricardoradtke.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-wide mb-1">Telefone</h3>
                <a
                  href="tel:+5500000000000"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +55 (00) 00000-0000
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl tracking-wide mb-1">Localização</h3>
                <p className="text-muted-foreground">Brasil</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="font-display text-2xl tracking-wide mb-6">
              Siga nas Redes
            </h3>
            <div className="space-y-4">
              <a
                href="https://instagram.com/ricardoradtke_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <Instagram className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Instagram
                  </div>
                  <div className="text-sm text-muted-foreground">@ricardoradtke_</div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <Youtube className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    YouTube
                  </div>
                  <div className="text-sm text-muted-foreground">Ricardo Radtke</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
