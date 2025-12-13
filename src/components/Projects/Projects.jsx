import { useState, useMemo, useCallback } from 'react'
import { FaGithub, FaExternalLinkAlt, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa'
import { useProjects, getProjectCategories } from '../../hooks/useProjects'
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'
import { motion, AnimatePresence } from 'framer-motion'

function Projects() {
  const [filter, setFilter] = useState('all')
  const { projects = [], loading, error, filteredProjects = [] } = useProjects(filter)
  const categories = useMemo(() => getProjectCategories(Array.isArray(projects) ? projects : []), [projects])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
  }, [])

  // Loading state
  if (loading) {
    return (
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-48 h-10 bg-neutral-800/50 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="w-96 h-6 bg-neutral-800/50 rounded-lg mx-auto animate-pulse" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-800/30 rounded-2xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="section-padding py-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading projects</p>
          <p className="text-neutral-400">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEOHead {...SEO_CONFIGS.projects} />
      <section className="section-padding py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              A collection of projects showcasing my skills in full-stack development
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterChange(category.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category.value
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 shadow-lg shadow-amber-500/20'
                    : 'bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-700/50 border border-neutral-700/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects List */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-neutral-400">No projects found in this category</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

// Clean Project Card Component
function ProjectCard({ project, index }) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`relative bg-neutral-900/60 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden ${
        project.featured 
          ? 'border-amber-500/20 hover:border-amber-400/40 shadow-lg shadow-amber-500/5' 
          : 'border-neutral-800 hover:border-neutral-700'
      }`}>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 text-xs font-medium">
              <FaStar className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-72 lg:w-80 flex-shrink-0">
            <div className="relative h-48 md:h-full overflow-hidden bg-neutral-800/50">
              {!imageError ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                  <span className="text-4xl font-bold text-neutral-600">{project.title.charAt(0)}</span>
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6 md:p-8 flex flex-col">
            {/* Title & Role */}
            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                {project.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-amber-400" />
                  {project.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaUsers className="w-3.5 h-3.5 text-amber-500" />
                  {project.role}
                </span>
                {project.teamSize > 1 && (
                  <span className="text-neutral-500">
                    Team of {project.teamSize}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-5 flex-grow">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.slice(0, 6).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium bg-neutral-800/80 text-neutral-300 rounded-lg border border-neutral-700/50"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 6 && (
                <span className="px-2.5 py-1 text-xs font-medium text-neutral-500">
                  +{project.tags.length - 6} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/50 hover:border-neutral-600 text-sm font-medium transition-all duration-300"
              >
                <FaGithub className="w-4 h-4" />
                <span>Source</span>
              </a>
              {project.demoUrl && project.demoUrl !== project.githubUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-900 text-sm font-medium transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default Projects
