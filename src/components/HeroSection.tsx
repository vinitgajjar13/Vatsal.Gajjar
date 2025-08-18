import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Sparkles } from "lucide-react";

const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const textArray = [
    "Video Editor",
    "Graphic Designer",
    "Creative Storyteller",
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % textArray.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [textArray.length]);

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    element?.scrollIntoView({ behavior: "smooth" });
  };
  // const scrollToContactSection= () => {
  //   const element = document.getElementById("Contact");
  //   element?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div
          className={`space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Sparkles size={20} />
              <span className="text-sm font-medium tracking-wider uppercase">
                Creative Professional
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Hi, I'm <span className="hero-text-gradient">Vatsal</span>
            </h1>

            <div className="h-16 overflow-hidden">
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${currentText * 4}rem)` }}
              >
                {textArray.map((text, index) => (
                  <h2
                    key={index}
                    className="text-3xl lg:text-4xl font-semibold text-muted-foreground h-16 flex items-center"
                  >
                    {text}
                  </h2>
                ))}
              </div>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Crafting compelling visual stories through innovative video
              editing and stunning graphic design. Let's bring your creative
              vision to life.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-elegant transition-all duration-300"
              onClick={scrollToPortfolio}
            >
              <Play size={20} className="mr-2" />
              View My Work
            </Button>

            {/* <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              onClick={scrollToContactSection}
            >
              
              Contact Us
            </Button> */}
          </div>
        </div>

        {/* Character Image */}
        <div
          className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-accent rounded-full blur-3xl opacity-20 animate-glow-pulse"></div>

            {/* Main Image */}
            <img
              src="/lovable-uploads/06d01413-3eb5-42a6-b835-b945b4f78ab1.png"
              alt="Vatsal Gajjar - Video Editor & Graphic Designer"
              className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />

            {/* Floating Elements */}
            <div
              className="absolute top-20 -right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-20 -left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={scrollToPortfolio}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
