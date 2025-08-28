import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Image, ExternalLink, Filter, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "video" | "image";
  thumbnail: string;   // Always image (for preview)
  videoUrl?: string;   // Only for videos
  client: string;
  year: string;
  tags: string[];
}

const ProjectList: Project[] = [
  {
    id: "1",
    title: "Thumbnail 1",
    description: "Sample image project from Thumbnail 1",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/Attachment 1.png",
    client: "Unknown Client",
    year: "2025",
    tags: ["Design", "Image"]
  },
  {
    id: "2",
    title: "Thumbnail 2",
    description: "Sample image project from Thumbnail 2",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/Attachment 2.png",
    client: "Unknown Client",
    year: "2025",
    tags: ["Design", "Image"]
  },
  {
    id: "3",
    title: "Stocks Futures Channel Banner",
    description: "Stocks Futures channel YouTube banner design.",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/Blue Modern Dance Channel Youtube Banner_20240822_102751_0000.png",
    client: "Unknown Client",
    year: "2024",
    tags: ["Banner", "Design"]
  },
  {
    id: "4",
    title: "BMW M3 Wall Poster",
    description: "BMW M3 Wall Poster",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/BMW M3.jpg",
    client: "Unknown Client",
    year: "2025",
    tags: ["Automobile", "BMW"]
  },
  {
    id: "5",
    title: "BMW M5 Wall Poster",
    description: "BMW M5 Wall Poster.",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/BMW_20250803_171133_0000.png",
    client: "Unknown Client",
    year: "2025",
    tags: ["Automobile", "BMW"]
  },
  {
    id: "6",
    title: "Balaji Agro Logo",
    description: "logo for Balaji Agro.",
    category: "Branding",
    type: "image",
    thumbnail: "/project/final Balaji agro logo.jpg",
    client: "Balaji Agro",
    year: "2025",
    tags: ["Logo", "Branding"]
  },
  {
    id: "7",
    title: "Jadibutti Panchgavya Logo",
    description: "Green typography Ayurveda local business logo.",
    category: "Branding",
    type: "image",
    thumbnail: "/project/Green Typography Ayurveda Local Business Logo_20250302_100920_0000.png",
    client: "Unknown Client",
    year: "2025",
    tags: ["Logo", "Ayurveda"]
  },
  {
    id: "8",
    title: "Hanumant Auto logo",
    description: "Branding logo for Hanumant Auto.",
    category: "Branding",
    type: "image",
    thumbnail: "/project/Hanumant Auto.jpg",
    client: "Hanumant Auto",
    year: "2025",
    tags: ["Logo", "Automobile"]
  },
  {
    id: "9",
    title: "Bentley Wall Poster",
    description: "Bentley Wall Poster design",
    category: "Branding",
    type: "image",
    thumbnail: "/project/our brand_20250607_180502_0000.jpg",
    client: "Unknown Client",
    year: "2025",
    tags: ["Branding"]
  },
  {
    id: "10",
    title: "Porsche 918 Spyder Wall Poster",
    description: "Porsche 918 Spyder Wall Poster.",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/PORSCHE 918 SPYDER_20250803_201926_0000.png",
    client: "Unknown Client",
    year: "2025",
    tags: ["Automobile", "Porsche"]
  },
  {
    id: "11",
    title: "Stocks Future Logo",
    description: "Stocks Future Logo",
    category: "Graphic Design",
    type: "image",
    thumbnail: "/project/Rv5QzASE_4x.jpg",
    client: "Unknown Client",
    year: "2025",
    tags: ["Image"]
  },
  {
    id: "12",
    title: "Rydes Light App Logo",
    description: "Rydes Light Application Logo.",
    category: "Branding",
    type: "image",
    thumbnail: "/project/RYDES LIGHT.png",
    client: "Unknown Client",
    year: "2025",
    tags: ["Branding", "Logo"]
  },
  {
    id: "13",
    title: "Kankotri",
    description: "Kankotri video.",
    category: "Video Editing",
    type: "video",
    thumbnail: "/project/kankotri-thumb.jpg",
    videoUrl: "/project/KANKOTRI.mp4",
    client: "Unknown Client",
    year: "2025",
    tags: ["Video"]
  },
  {
    id: "14",
    title: "Ved-ENT Hospital",
    description: "Ved-Ent hospital video.",
    category: "Video Editing",
    type: "video",
    thumbnail: "/project/lv-thumb.png",
    videoUrl: "/project/lv_0_20240204224222.mp4",
    client: "Unknown Client",
    year: "2024",
    tags: ["Video"]
  },
  {
    id: "15",
    title: "Lagan Lakhe Video",
    description: "Lagan Lakhe video project.",
    category: "Video Editing",
    type: "video",
    thumbnail: "/project/whatsapp-thumb.jpg",
    videoUrl: "/project/WhatsApp Video 2025-08-08 at 11.26.09_a701b074.mp4",
    client: "Milan",
    year: "2025",
    tags: ["Video"]
  }
];

const PortfolioSection = () => {
  const [projects] = useState<Project[]>(ProjectList);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(ProjectList);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isVisible, setIsVisible] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Video Editing", "Graphic Design", "Branding"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("portfolio");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            My <span className="hero-text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my latest projects in video editing and graphic design. Each piece tells a unique story.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`project-card transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                  />

                  {/* Project Overlay */}
                  <div className="project-overlay">
                    <div className="text-center space-y-4">
                      <div className="flex justify-center">
                        {project.type === "video" ? (
                          <div className="bg-primary text-primary-foreground p-3 rounded-full">
                            <Play size={24} />
                          </div>
                        ) : (
                          <div className="bg-primary text-primary-foreground p-3 rounded-full">
                            <Image size={24} />
                          </div>
                        )}
                      </div>
                      <Button variant="secondary" size="sm" onClick={() => openModal(project)}>
                        <ExternalLink size={16} className="mr-2" />
                        View Project
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="text-sm text-muted-foreground">
                    Client: <span className="text-foreground font-medium">{project.client}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
{isModalOpen && selectedProject && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="relative w-full max-w-6xl h-auto max-h-[90vh] overflow-hidden flex flex-col md:flex-row rounded-2xl shadow-2xl bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white animate-in fade-in-50 zoom-in-95 duration-300">

      {/* ✅ Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 z-50 bg-orange-500/90 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition"
      >
        <X size={22} />
      </button>

      {/* Left Side (Image / Video) */}
      <div className="flex items-center justify-center p-4 w-full md:w-1/2 bg-black/40 backdrop-blur-md">
        {selectedProject.type === "video" ? (
          <video
            src={selectedProject.videoUrl}
            controls
            autoPlay
            className="max-h-[80vh] w-auto rounded-lg shadow-lg border-2 border-orange-500/50"
            poster={selectedProject.thumbnail}
          />
        ) : (
          <img
            src={selectedProject.thumbnail}
            alt={selectedProject.title}
            className="max-h-[80vh] w-auto rounded-lg object-contain shadow-lg border-2 border-orange-500/50"
          />
        )}
      </div>

      {/* Right Side (Details) */}
      <div className="p-6 w-full md:w-1/2 overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          {selectedProject.title}
        </h2>

        <p className="text-gray-300 mb-4">{selectedProject.description}</p>

        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/40">
            {selectedProject.category}
          </Badge>
          <span className="text-sm text-gray-400">{selectedProject.year}</span>
        </div>

        <div className="mb-4 text-sm text-gray-300">
          Client: <span className="font-medium text-orange-400">{selectedProject.client}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedProject.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-gray-800 text-gray-200 border border-orange-500/30 hover:bg-orange-600/20 transition"
            >
              {tag}
            </Badge>
          ))}
        </div>

       
      </div>
    </div>
  </div>
)}


        {/* View All Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
