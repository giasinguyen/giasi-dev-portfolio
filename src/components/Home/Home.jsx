import { useEffect, useRef, useState } from "react";
import TypeWriter from "./TypeWriter";
import { FaArrowRight, FaGithub, FaLinkedin, FaJava } from "react-icons/fa";
import {
  SiSpringboot,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiSpring,
} from "react-icons/si";

// Lazy load heavy dependencies only when needed
let HeroModel = null;
let gsap = null;
let ScrollTrigger = null;

// Dynamic imports for better mobile performance
const loadHeavyDependencies = async () => {
  try {
    const [heroModelModule, gsapModule] = await Promise.all([
      import("./HeroModel"),
      import("gsap")
    ]);
    
    HeroModel = heroModelModule.default;
    gsap = gsapModule.default;
    
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    console.warn('Failed to load heavy dependencies:', error);
  }
};

function Home() {
  const contentRef = useRef(null);
  const techStackRef = useRef(null);
  const [show3D, setShow3D] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Performance check to decide whether to show 3D model and heavy animations
  useEffect(() => {
    const checkPerformance = () => {
      const mobile = window.innerWidth < 768;
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isHighPerformance = !connection || connection.effectiveType === '4g';
      const hasGoodHardware = window.devicePixelRatio <= 2;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsMobile(mobile);
      setShow3D(isHighPerformance && hasGoodHardware && !mobile && !prefersReducedMotion);
      setAnimationsEnabled(!mobile && !prefersReducedMotion);
    };

    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Load heavy dependencies only when needed
  useEffect(() => {
    if (animationsEnabled && !gsap) {
      loadHeavyDependencies();
    }
  }, [animationsEnabled]);

  useEffect(() => {
    // Only run animations if enabled and dependencies loaded
    if (!animationsEnabled || !gsap) return;

    // Wait a bit for gsap to be fully loaded
    const timer = setTimeout(() => {
      if (!gsap) return;

      // Staggered entrance animation for hero section
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-element",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      // Floating animation for tech stack tags
      const techTags = techStackRef.current?.querySelectorAll(".tech-tag");

      if (techTags) {
        techTags.forEach((tag, index) => {
          gsap.to(tag, {
            y: "-=6",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
            ease: "power1.inOut",
          });
        });
      }

      // Clean up animations on component unmount
      return () => {
        tl.kill();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [animationsEnabled]);

  return (
    <section className="section-padding pt-32 pb-24 min-h-screen flex items-center">
      <div
        className="max-w-6xl mx-auto w-full"
        ref={contentRef}
      >
        {/* Main Hero Content - Centered Layout */}
        <div className="text-center space-y-8">
          
          {/* Status Badge */}
          <div className="hero-element flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-neutral-900/80 border border-neutral-700/50 backdrop-blur-sm">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-neutral-300 text-sm font-medium">Available for opportunities</span>
            </div>
          </div>

          {/* Main Name Section */}
          <div className="hero-element space-y-4">
            <p className="text-neutral-400 text-lg font-medium tracking-wide">Hello, I'm</p>
            
            {/* Name Display - Clean & Bold */}
            <h1 className="relative">
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-100 tracking-tight mb-2">
                Nguyen Tran
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Gia Si
                </span>
              </span>
            </h1>
          </div>

          {/* Role TypeWriter */}
          <div className="hero-element">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-2xl">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-xl md:text-2xl font-semibold text-neutral-200">
                <TypeWriter
                  texts={[
                    "Java Backend Developer",
                    "Spring Boot Specialist", 
                    "Software Engineer",
                    "Full Stack Developer",
                  ]}
                  delay={isMobile ? 100 : 80}
                  deleteDelay={isMobile ? 50 : 30}
                />
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="hero-element text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Final-year <span className="text-amber-400 font-medium">Software Engineering</span> student 
            specializing in <span className="text-amber-400 font-medium">Java & Spring Boot</span>. 
            Passionate about building scalable, high-performance backend systems.
          </p>

          {/* CTA Buttons */}
          <div className="hero-element flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: "smooth" });
                }
              }}
              className="btn-primary flex items-center gap-3 px-8 py-4 text-lg group"
            >
              View My Work
              <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) {
                  const offsetTop = element.offsetTop - 80;
                  window.scrollTo({ top: offsetTop, behavior: "smooth" });
                }
              }}
              className="px-8 py-4 text-lg font-medium text-neutral-200 bg-neutral-800/60 hover:bg-neutral-700/60 border border-neutral-700/50 hover:border-amber-500/30 rounded-xl transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links */}
          <div className="hero-element flex justify-center gap-4 pt-2">
            <a
              href="https://github.com/giasinguyen"
              target="_blank"
              rel="noreferrer"
              className="p-3 text-neutral-400 hover:text-amber-400 bg-neutral-800/40 hover:bg-neutral-800/80 border border-neutral-700/30 hover:border-amber-500/30 rounded-xl transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/giasinguyen"
              target="_blank"
              rel="noreferrer"
              className="p-3 text-neutral-400 hover:text-amber-400 bg-neutral-800/40 hover:bg-neutral-800/80 border border-neutral-700/30 hover:border-amber-500/30 rounded-xl transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </div>

          {/* Tech Stack */}
          <div className="hero-element pt-8" ref={techStackRef}>
            <p className="text-neutral-500 text-sm font-medium mb-4 uppercase tracking-wider">
              Tech Stack
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: FaJava, name: "Java", color: "text-red-400", hoverBorder: "hover:border-red-500/40" },
                { icon: SiSpring, name: "Spring", color: "text-green-400", hoverBorder: "hover:border-green-500/40" },
                { icon: SiSpringboot, name: "Spring Boot", color: "text-green-500", hoverBorder: "hover:border-green-500/40" },
                { icon: SiReact, name: "React", color: "text-cyan-400", hoverBorder: "hover:border-cyan-500/40" },
                { icon: SiTypescript, name: "TypeScript", color: "text-blue-400", hoverBorder: "hover:border-blue-500/40" },
                { icon: SiTailwindcss, name: "Tailwind", color: "text-sky-400", hoverBorder: "hover:border-sky-500/40" },
              ].map((tech, index) => (
                <span
                  key={index}
                  className={`tech-tag flex items-center gap-2 px-4 py-2.5 bg-neutral-800/40 ${tech.color} text-sm font-medium rounded-xl border border-neutral-700/40 ${tech.hoverBorder} transition-all duration-300 ${!isMobile ? 'hover:-translate-y-0.5' : ''}`}
                >
                  <tech.icon className="text-lg" /> {tech.name}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        {!isMobile && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 border-2 border-neutral-600 rounded-full flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-amber-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;
