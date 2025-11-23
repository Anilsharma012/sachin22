import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

const About = () => {
  const experiences = [
    {
      title: "MERN Stack Web Developer",
      company: "Satya Web Technology",
      period: "Aug 2024 – Present",
      location: "Rohtak, Haryana",
      description: "Building full-stack web applications using MongoDB, Express, React, and Node.js. Implementing authentication systems, REST APIs, and deployment solutions.",
    },
    {
      title: "Full Stack Developer Intern",
      company: "CODE PLUS IT Services",
      period: "Mar 2024 – Oct 2024",
      location: "Rohtak, Haryana",
      description: "Developed and maintained web applications. Worked on frontend and backend integration, database management, and API development.",
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science",
      institution: "Maharshi Dayanand University",
      year: "2021",
      location: "Rohtak",
    },
    {
      degree: "12th Grade",
      institution: "SM Memorial Sr Sec School",
      year: "2018",
      location: "Rohtak",
    },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate developer crafting digital experiences
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Rohtak, Haryana, India</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">MERN Stack Web Developer</h2>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with 1 year of hands-on experience building modern web applications. 
                I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have a strong foundation in creating 
                scalable, secure, and user-friendly applications. My expertise includes REST API development, authentication 
                systems, database design, and deploying applications on various platforms. I'm constantly learning and 
                adapting to new technologies to deliver the best solutions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-2 mb-8">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </div>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-primary"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="p-6 rounded-lg border border-border bg-card">
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground mb-3">
                    <span className="font-semibold text-primary">{exp.company}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{exp.period}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-8">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-primary font-semibold mb-1">{edu.institution}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{edu.year}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {edu.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default About;
