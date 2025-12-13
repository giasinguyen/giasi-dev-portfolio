import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaLaptopCode,
  FaFile,
  FaEnvelope,
  FaCogs,
  FaGithub,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Navigation items configuration
  const navItems = [
    { id: "home", label: "Home", icon: FaHome },
    { id: "about", label: "About", icon: FaUser },
    { id: "projects", label: "Projects", icon: FaLaptopCode },
    { id: "tech-stack", label: "Tech Stack", icon: FaCogs },
    { id: "resume", label: "Resume", icon: FaFile },
    { id: "contact", label: "Contact", icon: FaEnvelope },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);

      // Determine active section based on scroll position
      const sections = navItems.map(item => item.id);
      const sectionElements = sections.map((id) => document.getElementById(id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, navItems]);

  const scrollToSection = useCallback((sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  }, [location.pathname, navigate]);

  const handleMobileNavClick = useCallback((sectionId) => {
    setIsOpen(false);
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 150);
  }, [scrollToSection]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2"
            : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Main Navbar Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`relative flex items-center justify-between rounded-2xl transition-all duration-500 ${
              scrolled
                ? "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl shadow-black/20 px-6 py-3"
                : "bg-transparent px-2 py-2"
            }`}
            layout
          >
            {/* Logo Section */}
            <motion.button
              onClick={() => scrollToSection("home")}
              className="relative flex items-center gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated Logo Container */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <div className="relative w-11 h-11 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
                  <img 
                    src="/logo-bg.png" 
                    alt="GiaSi Dev Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              
              {/* Brand Name */}
              <div className="hidden sm:block">
                <motion.span 
                  className="text-xl font-bold bg-gradient-to-r from-slate-100 via-blue-200 to-violet-200 bg-clip-text text-transparent"
                >
                  GiaSi
                </motion.span>
                <span className="text-slate-500 font-medium text-sm block -mt-1">Developer</span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              {/* Nav Pills Container */}
              <div className="relative flex items-center gap-1 p-1.5 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/30">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active Background */}
                    {activeSection === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-500/25"
                        layoutId="navbar-active-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover Background */}
                    {hoveredItem === item.id && activeSection !== item.id && (
                      <motion.div
                        className="absolute inset-0 bg-slate-700/50 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </nav>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Social Links */}
              <div className="flex items-center gap-2 mr-2">
                <motion.a
                  href="https://github.com/giasinguyen"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/giasinguyen"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="w-5 h-5" />
                </motion.a>
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={() => scrollToSection("contact")}
                className="group relative px-6 py-2.5 rounded-xl font-semibold text-sm overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                
                <span className="relative z-10 flex items-center gap-2 text-white">
                  Let's Talk
                  <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-12 h-12 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-slate-900/95 backdrop-blur-xl border-l border-slate-700/50 z-50 lg:hidden overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
                    <img 
                      src="/logo-bg.png" 
                      alt="Logo" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-lg font-bold text-white">Menu</span>
                    <p className="text-xs text-slate-400">Navigate to sections</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleMobileNavClick(item.id)}
                    className={`group w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30"
                        : "hover:bg-slate-800/50 border border-transparent"
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700/50 group-hover:text-blue-400"
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    
                    {/* Label */}
                    <div className="flex-1 text-left">
                      <span className={`font-medium transition-colors duration-300 ${
                        activeSection === item.id ? "text-white" : "text-slate-300 group-hover:text-white"
                      }`}>
                        {item.label}
                      </span>
                      {activeSection === item.id && (
                        <span className="block text-xs text-blue-400 mt-0.5">Current section</span>
                      )}
                    </div>

                    {/* Arrow */}
                    <FaArrowRight className={`w-4 h-4 transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-blue-400"
                        : "text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1"
                    }`} />
                  </motion.button>
                ))}
              </div>

              {/* Social Links */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider">Connect with me</p>
                <div className="flex items-center gap-3">
                  <motion.a
                    href="https://github.com/giasinguyen"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/50 border border-slate-700/30 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub className="w-5 h-5" />
                    <span className="text-sm font-medium">GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/giasinguyen"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaLinkedin className="w-5 h-5" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
