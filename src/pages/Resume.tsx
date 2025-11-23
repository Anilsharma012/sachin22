import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Download, Mail, MapPin, Phone, Briefcase, GraduationCap, Code } from "lucide-react";

const Resume = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
          <Button size="lg" className="mt-4">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </motion.div>

        {/* Resume Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8 p-8 rounded-lg border border-border bg-card"
        >
          {/* Personal Info */}
          <div className="text-center border-b border-border pb-8">
            <h2 className="text-3xl font-bold mb-4">Sachin Takoria</h2>
            <p className="text-xl text-primary mb-4">MERN Stack Web Developer</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:sachintakoria2204@gmail.com" className="hover:text-primary transition-colors">
                  sachintakoria2204@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Rohtak, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Professional Summary</h3>
            <p className="text-muted-foreground leading-relaxed">
              Passionate MERN Stack Developer with 1 year of experience building scalable web applications.
              Proficient in MongoDB, Express, React, and Node.js with expertise in REST APIs, authentication systems,
              database design, and deployment. Committed to writing clean, maintainable code and delivering
              exceptional user experiences.
            </p>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Experience</h3>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold">MERN Stack Web Developer</h4>
                    <p className="text-primary">Satya Web Technology</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Aug 2024 – Present</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Rohtak, Haryana</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Developed full-stack web applications using MERN stack</li>
                  <li>Implemented secure authentication systems with JWT and bcrypt</li>
                  <li>Built and integrated REST APIs for various client projects</li>
                  <li>Deployed applications on Linux servers using Nginx and PM2</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold">Full Stack Developer Intern</h4>
                    <p className="text-primary">CODE PLUS IT Services</p>
                  </div>
                  <span className="text-sm text-muted-foreground">Mar 2024 – Oct 2024</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Rohtak, Haryana</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Contributed to frontend and backend development of web applications</li>
                  <li>Worked with MongoDB for database management and schema design</li>
                  <li>Collaborated with team members using Git and GitHub</li>
                  <li>Implemented responsive designs using Tailwind CSS and React</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold">Bachelor of Science</h4>
                    <p className="text-primary">Maharshi Dayanand University</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2021</span>
                </div>
                <p className="text-sm text-muted-foreground">Rohtak, Haryana</p>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold">12th Grade</h4>
                    <p className="text-primary">SM Memorial Sr Sec School</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2018</span>
                </div>
                <p className="text-sm text-muted-foreground">Rohtak, Haryana</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Code className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Technical Skills</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2 text-primary">Frontend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>React, TypeScript</li>
                  <li>Tailwind CSS, ShadCN UI</li>
                  <li>Redux, React Router</li>
                  <li>REST API Integration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">Backend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Node.js, Express</li>
                  <li>MongoDB, Mongoose</li>
                  <li>JWT Authentication</li>
                  <li>REST APIs, MVC</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-primary">DevOps</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Linux, Nginx</li>
                  <li>PM2, SSL Setup</li>
                  <li>Git, GitHub</li>
                  <li>Netlify, Vercel</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Resume;
