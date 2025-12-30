import { motion } from "framer-motion";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const categories = [
  {
    title: "Casamentos",
    image: project1,
    href: "#projects",
  },
  {
    title: "Corporativos",
    image: project2,
    href: "#projects",
  },
  {
    title: "Publicitários",
    image: project3,
    href: "#projects",
  },
  {
    title: "Documentário",
    image: project4,
    href: "#projects",
  },
  {
    title: "Fashion Film",
    image: project5,
    href: "#projects",
  },
  {
    title: "Videoclipes",
    image: project6,
    href: "#projects",
  },
];

const CategoriesSection = () => {
  return (
    <section id="projects" className="bg-background pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.a
              key={category.title}
              href={category.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="category-card group aspect-[4/3]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <h3 className="category-title">{category.title}</h3>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
