import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <PortfolioSection />
        <AboutSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2025 Vatsal Gajjar. All rights reserved. Built with passion for creativity.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;