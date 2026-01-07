import { Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl tracking-wider mb-2">
              RICARDO RADTKE
            </h3>
            <p className="text-muted-foreground text-sm">
              Filmmaker & Cinematographer
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/ricardoradtke_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href="mailto:contato@ricardoradtke.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Ricardo Radtke. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
