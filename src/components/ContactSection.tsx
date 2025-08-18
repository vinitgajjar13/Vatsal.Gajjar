import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Linkedin, Instagram, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, subject, message } = formData;

    // WhatsApp message format
    const whatsappMessage = `New Inquiry:%0A
👤 Name: ${name}%0A
📧 Email: ${email}%0A
📝 Subject: ${subject}%0A
💬 Message: ${message}`;

    // WhatsApp Redirect (your number)
    const whatsappURL = `https://wa.me/919904799452?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, "_blank");

    toast({
      title: "Redirecting to WhatsApp...",
      description: "Your message is ready to be sent.",
    });

    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "vatsalsonigra37@example.com",
      link: "mailto:vatsalsonigra37@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 99047 99452",
      link: "tel:+919904799452"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ahmedabad, India",
      link: null
    }
  ];

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/vatsalgajjar" },
    { icon: Instagram, label: "Instagram", link: "https://instagram.com/vatsalgajjar" },
    { icon: Youtube, label: "YouTube", link: "https://youtube.com/@vatsalgajjar" }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Let's <span className="hero-text-gradient">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your creative vision to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="admin-card">
            <CardHeader>
              <CardTitle className="text-2xl">Send Me a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Project subject"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-elegant transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="admin-card">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <info.icon size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* <Card className="admin-card">
              <CardHeader>
                <CardTitle className="text-2xl">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon size={24} className="text-primary group-hover:text-primary-foreground" />
                    </a>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 text-sm">
                  Follow me on social media for behind-the-scenes content and creative tips.
                </p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
