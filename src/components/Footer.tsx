import { Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <a
            href="#hero"
            className="font-display text-3xl tracking-wider text-primary hover:opacity-80 transition-opacity"
          >
            RR
          </a>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/ricardoradtke_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube size={22} />
            </a>
            <a
              href="mailto:contato@ricardoradtke.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={22} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Ricardo Radtke. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
