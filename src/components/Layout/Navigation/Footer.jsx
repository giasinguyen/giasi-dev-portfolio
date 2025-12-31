import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaHeart, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/giasinguyen'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/giasinguyen'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:giasinguyentran@gmail.com'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <footer className="relative">
      {/* Subtle top border with gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
      
      <div className="py-12 px-6">
        <motion.div 
          className="flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Logo & Name */}
          <motion.a 
            href="#home"
            className="group flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-2xl font-bold text-neutral-100 tracking-tight">
              Nguyen Tran Gia Si
            </span>
            <span className="text-amber-500 text-2xl">.</span>
          </motion.a>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-amber-400 transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel={social.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="w-10 h-10 rounded-full bg-neutral-800/50 border border-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-500/30 hover:bg-neutral-800 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                <social.icon className="text-base" />
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-neutral-800"></div>

          {/* Copyright & Info */}
          <div className="flex flex-col items-center gap-2 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              Made with
              <motion.span
                className="text-amber-500"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ 
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                <FaHeart className="text-xs" />
              </motion.span>
              by <span className="text-neutral-400">Nguyen Tran Gia Si</span>
            </span>
            <span className="text-neutral-600">
              © {currentYear} All rights reserved.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-6 right-6 w-10 h-10 bg-neutral-800/80 backdrop-blur-sm border border-neutral-700/50 text-neutral-400 rounded-full shadow-lg flex items-center justify-center z-50 hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </footer>
  )
}

export default Footer
