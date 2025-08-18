import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Clock, Smile } from "lucide-react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { icon: Award, label: "Projects Completed", value: "15" },
    { icon: Users, label: "Happy Clients", value: "12+" },
    { icon: Clock, label: "Years Experience", value: "5+" },
    { icon: Smile, label: "Client Satisfaction", value: "99%" }
  ];

  const skills = [
    { category: "Video Editing", items: ["Adobe Premiere Pro", "Cap Cut Pro", "DaVinci Resolve",] },
    // { category: "Motion Graphics", items: ["After Effects", "Cinema 4D", "Blender", "Lottie"] },
    { category: "Graphic Design", items: ["Adobe Photoshop","Canva"] },
    { category: "Brand Design", items: ["Logo Design", "Brand Identity", "Typography", "Color Theory"] }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            About <span className="hero-text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating visual stories that connect, inspire, and make an impact.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h3 className="text-2xl font-semibold">My Creative Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over 5 years of experience in video editing and graphic design, I've had the privilege 
                of working with diverse clients ranging from startups to established corporations. My journey 
                began with a simple passion for storytelling through visuals.
              </p>
              <p>
                I specialize in creating compelling brand identities, engaging video content, and motion 
                graphics that not only look stunning but also drive results. Every project is an opportunity 
                to push creative boundaries and deliver exceptional value to my clients.
              </p>
              <p>
                When I'm not editing videos or designing logos, you'll find me exploring new creative techniques, 
                staying updated with industry trends, and collaborating with fellow creatives to bring 
                innovative ideas to life.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {stats.map((stat, index) => (
              <Card key={stat.label} className="admin-card text-center hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <stat.icon size={32} className="text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-semibold text-center mb-8">Skills & Expertise</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <Card key={skillGroup.category} className="admin-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold mb-4 text-primary">{skillGroup.category}</h4>
                  <div className="space-y-2">
                    {skillGroup.items.map((skill) => (
                      <Badge key={skill} variant="secondary" className="mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;