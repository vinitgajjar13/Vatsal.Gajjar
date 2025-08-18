import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  LogOut, 
  Video, 
  Image, 
  Calendar,
  User,
  BarChart3,
  FolderOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'image';
  client: string;
  year: string;
  status: 'published' | 'draft';
  createdAt: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const { toast } = useToast();
  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Brand Identity Design",
      description: "Complete brand identity package for TechFlow Inc.",
      category: "Branding",
      type: "image",
      client: "TechFlow Inc.",
      year: "2024",
      status: "published",
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      title: "Product Launch Video",
      description: "Dynamic product showcase video with motion graphics",
      category: "Video Editing",
      type: "video",
      client: "InnovateCorp",
      year: "2024",
      status: "published",
      createdAt: "2024-01-10"
    },
    {
      id: "3",
      title: "Event Poster Series",
      description: "Creative poster designs for music festival",
      category: "Graphic Design",
      type: "image",
      client: "SoundWave Festival",
      year: "2023",
      status: "draft",
      createdAt: "2024-01-05"
    }
  ]);

  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderOpen, color: "text-blue-500" },
    { label: "Published", value: projects.filter(p => p.status === 'published').length, icon: BarChart3, color: "text-green-500" },
    { label: "Videos", value: projects.filter(p => p.type === 'video').length, icon: Video, color: "text-purple-500" },
    { label: "Images", value: projects.filter(p => p.type === 'image').length, icon: Image, color: "text-orange-500" }
  ];

  const handleDeleteProject = (projectId: string) => {
    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted.",
    });
  };

  const handleAddProject = () => {
    toast({
      title: "Add Project",
      description: "Add project feature will be implemented next.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold hero-text-gradient">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="admin-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>
                    <stat.icon size={32} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects Management */}
        <Card className="admin-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Project Management</CardTitle>
            <Button onClick={handleAddProject} className="admin-button">
              <Plus size={18} className="mr-2" />
              Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${project.type === 'video' ? 'bg-purple-500/10' : 'bg-orange-500/10'}`}>
                      {project.type === 'video' ? (
                        <Video size={20} className="text-purple-500" />
                      ) : (
                        <Image size={20} className="text-orange-500" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                        <Badge 
                          variant={project.status === 'published' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-muted-foreground mr-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {project.client}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {project.year}
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline">
                      <Edit size={16} />
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Published "Brand Identity Design"</span>
                  <span className="text-muted-foreground ml-auto">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Updated "Product Launch Video"</span>
                  <span className="text-muted-foreground ml-auto">1 day ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Created draft "Event Poster Series"</span>
                  <span className="text-muted-foreground ml-auto">3 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">This Month</span>
                  <span className="font-semibold">8 projects</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Client Inquiries</span>
                  <span className="font-semibold">12 new</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Revenue</span>
                  <span className="font-semibold text-green-500">+25%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;