import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const projects = [
  {
    title: "Golden Hour",
    category: "Casamentos",
    image: project1,
    type: "video" as const,
  },
  {
    title: "Corporate Vision",
    category: "Institucional",
    image: project2,
    type: "video" as const,
  },
  {
    title: "Stage Presence",
    category: "Música",
    image: project3,
    type: "video" as const,
  },
  {
    title: "Wild Horizons",
    category: "Documentário",
    image: project4,
    type: "video" as const,
  },
  {
    title: "Elegance",
    category: "Moda",
    image: project5,
    type: "photo" as const,
  },
  {
    title: "Paradise Found",
    category: "Travel",
    image: project6,
    type: "video" as const,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4 block">
            Portfólio
          </span>
          <h2 className="section-title">
            PROJETOS EM <span className="text-gradient-gold">DESTAQUE</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://instagram.com/ricardoradtke_"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cinematic inline-flex items-center gap-3"
          >
            Ver Todos os Projetos
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
