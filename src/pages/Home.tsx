import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Sparkles, ExternalLink, Github, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { api } from "@/lib/api";

interface HeroContent {
  title?: string;
  subtitle?: string;
  ctas?: Array<{ text: string; href: string }>;
}

interface SkillsContent {
  frontend?: string[];
  backend?: string[];
}

interface BannerContent {
  items?: Array<{
    image_url: string;
    alt: string;
    link_url: string;
    order: number;
  }>;
}

const Home = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({});
  const [skillsContent, setSkillsContent] = useState<SkillsContent>({});
  const [bannersContent, setBannersContent] = useState<BannerContent>({});
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [hero, skills, banners] = await Promise.all([
          api.get<HeroContent>("/api/content/hero").catch(() => ({})),
          api.get<SkillsContent>("/api/content/skills").catch(() => ({})),
          api.get<BannerContent>("/api/content/banners").catch(() => ({})),
        ]);
        setHeroContent(hero);
        setSkillsContent(skills);
        setBannersContent(banners);
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    };
    loadContent();
  }, []);

  const {
    data: projects = [],
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.get("/api/projects"),
  });

  const featuredProjects = projects.filter((p: any) => p.is_featured).slice(0, 3);
  const allTechs = [
    ...(skillsContent.frontend || []),
    ...(skillsContent.backend || []),
  ].filter((t, i, arr) => arr.indexOf(t) === i);

  const bannerItems = bannersContent.items?.sort((a, b) => a.order - b.order) || [];

  useEffect(() => {
    if (bannerItems.length > 0) {
      const timer = setInterval(() => {
        setCurrentBanner((prev) => (prev + 1) % bannerItems.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [bannerItems.length]);

  return (
    <PageLayout>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Animated Background Elements */}
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary animate-spin" />
                <span className="text-sm font-medium">Available for Projects</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 relative z-10"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="block">Hi, I'm</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow">
                  {heroContent.title || "Sachin Takoria"}
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                <p className="text-xl md:text-2xl text-muted-foreground">
                  {heroContent.subtitle || "MERN Stack Web Developer"}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl relative z-10"
            >
              Specializing in building full-stack applications with MongoDB, Express, React, and Node.js.
              1 year of experience crafting modern web solutions with clean code and intuitive design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 relative z-10"
            >
              {heroContent.ctas ? (
                heroContent.ctas.map((cta: any, index) => (
                  <Link key={index} to={cta.href}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant={index === 0 ? "default" : "outline"}
                        className={index === 0 ? "group" : ""}
                      >
                        {cta.text}
                        {index === 0 && (
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        )}
                      </Button>
                    </motion.div>
                  </Link>
                ))
              ) : (
                <>
                  <Link to="/projects">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="group">
                        View Projects
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </Link>
                  <Link to="/contact">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button size="lg" variant="outline">
                        Contact Me
                      </Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-12 relative z-10"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">Year Experience</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{projects.length}+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects Section */}
        {featuredProjects.length > 0 && (
          <section className="container mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Check out some of my best work
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredProjects.map((project: any, index: number) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group rounded-lg overflow-hidden border border-border bg-card hover:border-primary/50 transition-all"
                >
                  {/* Project Image */}
                  {project.cover_image_url && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <motion.img
                        src={project.cover_image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e: any) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop";
                        }}
                      />
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.category && (
                        <p className="text-sm text-muted-foreground mt-1">{project.category}</p>
                      )}
                    </div>

                    <p className="text-muted-foreground line-clamp-2">
                      {project.short_description}
                    </p>

                    {/* Tech Stack */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.slice(0, 3).map((tech: string) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1 }}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.tech_stack.length > 3 && (
                          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            +{project.tech_stack.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                      <Link to={`/projects/${project.slug}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      {project.github_url && (
                        <motion.a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="sm" variant="ghost">
                            <Github className="h-4 w-4" />
                          </Button>
                        </motion.a>
                      )}
                      {project.live_url && (
                        <motion.a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.is_featured && (
                    <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/projects">
                <Button size="lg" variant="outline" className="group">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </section>
        )}

        {/* Banners Carousel */}
        {bannerItems.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden h-96 md:h-[500px] group cursor-pointer"
            >
              <AnimatePresence>
                <motion.div
                  key={currentBanner}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={bannerItems[currentBanner].image_url}
                    alt={bannerItems[currentBanner].alt}
                    className="w-full h-full object-cover"
                    onError={(e: any) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=500&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Banner Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 text-white"
              >
                <h3 className="text-2xl md:text-4xl font-bold mb-4">
                  {bannerItems[currentBanner].alt}
                </h3>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a href={bannerItems[currentBanner].link_url}>
                    <Button size="lg" className="group bg-white text-black hover:bg-white/90">
                      Explore Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </motion.div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {bannerItems.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentBanner
                        ? "bg-white w-8"
                        : "bg-white/50 w-2 hover:bg-white/75"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <motion.button
                onClick={() => setCurrentBanner((prev) => (prev - 1 + bannerItems.length) % bannerItems.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={() => setCurrentBanner((prev) => (prev + 1) % bannerItems.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                →
              </motion.button>
            </motion.div>
          </section>
        )}

        {/* Featured Skills */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-muted-foreground">Technologies I work with</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {(allTechs.length > 0
              ? allTechs
              : [
                  "MongoDB",
                  "Express.js",
                  "React",
                  "Node.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "PostgreSQL",
                  "REST APIs",
                ]
            ).map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08, y: -5 }}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer group"
              >
                <p className="font-semibold group-hover:text-primary transition-colors">{tech}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 p-12 md:p-20 text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
            />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Let's Work Together
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Have a project in mind? I'd love to hear about it and discuss how we can
                collaborate to bring your ideas to life.
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/contact">
                  <Button size="lg" className="group">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
};

// AnimatePresence component for conditional rendering
function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default Home;
