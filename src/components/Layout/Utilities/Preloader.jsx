import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

const Preloader = memo(function Preloader() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Code lines for animation
  const codeLines = [
    { text: 'const', type: 'keyword' },
    { text: ' developer', type: 'variable' },
    { text: ' = ', type: 'operator' },
    { text: '"Gia Si"', type: 'string' },
    { text: ';', type: 'punctuation' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0c]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isMobile ? 0.3 : 0.5 }}
    >
      {/* Subtle background glow */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="relative z-10 text-center">
        {/* Code-style Name Display */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Terminal-like container */}
          <div className="inline-block bg-neutral-900/80 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-neutral-800">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-3 text-neutral-500 text-xs font-mono">portfolio.js</span>
            </div>
            
            {/* Code content */}
            <motion.div 
              className="font-mono text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1 text-lg md:text-xl">
                <span className="text-amber-400">const</span>
                <span className="text-neutral-100"> developer</span>
                <span className="text-neutral-500"> = </span>
                <motion.span 
                  className="text-green-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  "Gia Si"
                </motion.span>
                <span className="text-neutral-500">;</span>
              </div>
              
              <motion.div 
                className="flex items-center gap-1 text-lg md:text-xl mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span className="text-amber-400">const</span>
                <span className="text-neutral-100"> role</span>
                <span className="text-neutral-500"> = </span>
                <span className="text-green-400">"Full-Stack Dev"</span>
                <span className="text-neutral-500">;</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <div className="relative">
          {/* Dots */}
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-amber-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.15,
                }}
              />
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-48 h-0.5 bg-neutral-800 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>

          <motion.p
            className="text-neutral-500 text-sm mt-4 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Loading<motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >...</motion.span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
});

export default Preloader;
