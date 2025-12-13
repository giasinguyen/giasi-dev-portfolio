import { useMemo } from 'react'
import { motion } from 'framer-motion'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { 
  SiSpringboot, 
  SiReact, 
  SiTailwindcss, 
  SiMysql, 
  SiMongodb, 
  SiDocker, 
  SiGit,
  SiIntellijidea,
  SiPostman,
  SiMariadb,
  SiFramer,
  SiCloudinary,
  SiVercel,
  SiGithub,
  SiJavascript,
  SiTypescript,
  SiNeo4J
} from 'react-icons/si'
import { FaDatabase, FaTools, FaCloud, FaRocket, FaJava, FaCube, FaBox, FaCode, FaBrain } from 'react-icons/fa'

function TechStack() {
  // Tech Stack data organized by categories
  const techCategories = useMemo(() => [
    {
      id: 1,
      title: "Backend Development",
      icon: FaCode,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      technologies: [
        { name: "Java", icon: FaJava, level: "Expert", color: "#ED8B00" },
        { name: "Spring Boot", icon: SiSpringboot, level: "Advanced", color: "#6DB33F" },
        { name: "Spring Security", icon: SiSpringboot, level: "Advanced", color: "#6DB33F" },
        { name: "Spring Data JPA", icon: SiSpringboot, level: "Advanced", color: "#6DB33F" },
        { name: "WebSocket", icon: FaCode, level: "Intermediate", color: "#FF6B6B" },
        { name: "Maven", icon: FaBox, level: "Proficient", color: "#C71A36" }
      ]
    },
    {
      id: 2,
      title: "Frontend Development",
      icon: FaRocket,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      technologies: [
        { name: "React.js", icon: SiReact, level: "Advanced", color: "#61DAFB" },
        { name: "TailwindCSS", icon: SiTailwindcss, level: "Expert", color: "#06B6D4" },
        { name: "Three.js", icon: FaCube, level: "Intermediate", color: "#000000" },
        { name: "Framer Motion", icon: SiFramer, level: "Advanced", color: "#0055FF" }
      ]
    },
    {
      id: 3,
      title: "Database Systems",
      icon: FaDatabase,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      technologies: [
        { name: "MySQL", icon: SiMysql, level: "Advanced", color: "#4479A1" },
        { name: "MariaDB", icon: SiMariadb, level: "Advanced", color: "#003545" },
        { name: "MongoDB", icon: SiMongodb, level: "Intermediate", color: "#47A248" },
        { name: "Neo4J", icon: SiNeo4J, level: "Beginner", color: "#008CC1" }
      ]
    },
    {
      id: 4,
      title: "Development Tools",
      icon: FaTools,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      technologies: [
        { name: "IntelliJ IDEA", icon: SiIntellijidea, level: "Expert", color: "#000000" },
        { name: "VS Code", icon: FaCode, level: "Advanced", color: "#007ACC" },
        { name: "Git", icon: SiGit, level: "Advanced", color: "#F05032" },
        { name: "Postman", icon: SiPostman, level: "Proficient", color: "#FF6C37" }
      ]
    },
    {
      id: 5,
      title: "Cloud & Deployment",
      icon: FaCloud,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      technologies: [
        { name: "Docker", icon: SiDocker, level: "Intermediate", color: "#2496ED" },
        { name: "Vercel", icon: SiVercel, level: "Advanced", color: "#000000" },
        { name: "Cloudinary", icon: SiCloudinary, level: "Proficient", color: "#3448C5" },
        { name: "GitHub", icon: SiGithub, level: "Advanced", color: "#181717" }
      ]
    },
    {
      id: 6,
      title: "AI & Automation",
      icon: FaBrain,
      color: "text-amber-300",
      bgColor: "bg-amber-500/10", 
      borderColor: "border-amber-500/20",
      technologies: [
        { name: "ChatGPT", icon: FaBrain, level: "Advanced", color: "#10A37F" },
        { name: "Claude AI", icon: FaBrain, level: "Proficient", color: "#CC785C" }
      ]
    }
  ], [])

  // Project highlights using tech stack
  const projectHighlights = useMemo(() => [
    {
      id: 1,
      name: "CodeHub Platform",
      description: "Full-stack collaboration platform with real-time features",
      techUsed: ["Java 23", "Spring Boot", "React", "WebSocket", "MariaDB"],
      highlight: "Real-time code collaboration with 70+ language support"
    },
    {
      id: 2,
      name: "NatureGrain E-commerce",
      description: "Complete e-commerce solution with admin dashboard",
      techUsed: ["Spring Security", "React", "MySQL", "Cloudinary"],
      highlight: "JWT authentication with comprehensive admin panel"
    },
    {
      id: 3,
      name: "Portfolio Website",
      description: "Modern responsive portfolio with 3D animations",
      techUsed: ["React 19", "Three.js", "TailwindCSS 4", "Framer Motion"],
      highlight: "Performance-optimized with engaging user experience"
    }
  ], [])

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'text-amber-400'
      case 'Advanced': return 'text-amber-300'
      case 'Intermediate': return 'text-yellow-400'
      case 'Proficient': return 'text-amber-500'
      default: return 'text-neutral-400'
    }
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.techStack} />
      <section className="section-padding pt-28">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-neutral-700/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaCode className="w-6 h-6 text-amber-400" />
              <span className="text-lg font-semibold text-neutral-300">
                Technology Stack
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="gradient-text">Technologies</span> & Tools
            </motion.h1>

            <motion.p 
              className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A comprehensive overview of the technologies, frameworks, and tools I use to build 
              modern, scalable applications. From backend development to cloud deployment.
            </motion.p>
          </div>

          {/* Tech Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {techCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.id}
                  className={`glass-effect rounded-2xl p-6 border ${category.borderColor} ${category.bgColor}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-100">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.technologies.map((tech, techIndex) => {
                      const TechIcon = tech.icon
                      return (
                        <motion.div
                          key={techIndex}
                          className="flex items-center justify-between p-3 bg-neutral-800/30 rounded-lg border border-neutral-700/30"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + techIndex * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            x: 5,
                            backgroundColor: "rgba(38, 38, 38, 0.5)"
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <TechIcon 
                              className="w-5 h-5" 
                              style={{ color: tech.color }}
                            />
                            <span className="font-medium text-neutral-200">
                              {tech.name}
                            </span>
                          </div>
                          <span className={`text-sm font-semibold ${getLevelColor(tech.level)}`}>
                            {tech.level}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Project Highlights */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold gradient-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Tech Stack in Action
              </motion.h2>
              <motion.p 
                className="text-neutral-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Real projects showcasing how I apply these technologies to solve problems
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectHighlights.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass-effect rounded-2xl p-6 border border-neutral-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <h3 className="text-xl font-bold text-neutral-100 mb-3">
                    {project.name}
                  </h3>
                  <p className="text-neutral-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-amber-400 font-medium text-sm mb-2">
                      Key Technologies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techUsed.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-neutral-700/50 text-neutral-300 rounded-full text-xs font-medium border border-neutral-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-700/50">
                    <p className="text-amber-400 font-medium text-sm">
                      💡 {project.highlight}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center glass-effect rounded-3xl p-12 border border-neutral-700/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FaRocket className="text-neutral-900 text-2xl" />
            </motion.div>

            <h3 className="text-3xl font-bold text-neutral-100 mb-4">
              Let's Build Something Amazing
            </h3>

            <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
              Ready to leverage these technologies for your next project? 
              Let's discuss how we can create innovative solutions together.
            </p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#contact"
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="#projects"
                className="btn-secondary inline-flex items-center gap-3 px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default TechStack
