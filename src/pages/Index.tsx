import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import AboutSection from "@/components/AboutSection";
import ShowreelSection from "@/components/ShowreelSection";
import DirectorSection from "@/components/DirectorSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <AboutSection />
      <ShowreelSection />
      <DirectorSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
