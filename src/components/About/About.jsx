import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FaCode,
  FaServer,
  FaGraduationCap,
  FaMapMarkerAlt
} from "react-icons/fa";

function About() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(window.resizeTimeout);
    };
  }, []);

  const highlights = [
    {
      icon: <FaCode />,
      title: "Full-Stack Developer",
      description: "Specialized in Java Spring Boot & React ecosystem"
    },
    {
      icon: <FaServer />,
      title: "Backend Focus",
      description: "Building scalable APIs and microservices"
    },
    {
      icon: <FaGraduationCap />,
      title: "IT Student",
      description: "Industrial University of Ho Chi Minh City"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Based in",
      description: "Ho Chi Minh City, Vietnam"
    }
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-amber-400">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
          
          {/* Left: Avatar */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Avatar Container */}
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-neutral-800 bg-neutral-900">
                <img
                  src="/avatar.jpg"
                  alt="Nguyen Tran Gia Si"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-amber-500"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full bg-amber-400/60"></div>
              <div className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-neutral-700"></div>
              
              {/* Status Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-neutral-900 border border-neutral-700 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-neutral-300 whitespace-nowrap">Open to Work</span>
              </div>
            </div>
          </motion.div>

          {/* Right: About Text */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl font-bold text-neutral-100 mb-2">
                Hi, I'm <span className="text-amber-400">Gia Si</span>
              </h3>
              <p className="text-amber-500/80 font-medium">Full-Stack Developer</p>
            </div>
            
            <div className="space-y-4 text-neutral-400 leading-relaxed">
              <p>
                I'm passionate about building <span className="text-neutral-200">enterprise-level applications</span> using 
                modern technologies. My expertise lies in <span className="text-amber-400">Java Spring Boot</span> for 
                backend development and <span className="text-amber-400">React</span> for creating interactive user interfaces.
              </p>
              <p>
                I believe in writing clean, maintainable code and continuously learning new technologies 
                to deliver exceptional solutions that drive business growth.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">5+</div>
                <div className="text-xs text-neutral-500">Projects</div>
              </div>
              <div className="w-px h-12 bg-neutral-800"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">1+</div>
                <div className="text-xs text-neutral-500">Year Exp</div>
              </div>
              <div className="w-px h-12 bg-neutral-800"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">100%</div>
                <div className="text-xs text-neutral-500">Dedication</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              className="group p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-amber-500/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
            >
              <div className="text-amber-400 text-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h4 className="font-semibold text-neutral-100 text-sm mb-1">{item.title}</h4>
              <p className="text-neutral-500 text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
