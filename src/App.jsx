import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Navbar from './components/Layout/Navigation/Navbar'
import Footer from './components/Layout/Navigation/Footer'
import ScrollToTop from './components/Layout/Utilities/ScrollToTop'
import Preloader from './components/Layout/Utilities/Preloader'
import MobilePreloader from './components/Layout/Mobile/MobilePreloader'
import MobileSafeSection from './components/Layout/Mobile/MobileSafeSection'

// Only Home loaded immediately for faster initial render
import Home from './components/Home/Home'

// Lazy load everything else
const About = lazy(() => import('./components/About/About'))
const Projects = lazy(() => import('./components/Projects/Projects'))
const Resume = lazy(() => import('./components/Resume/Resume'))
const TechStack = lazy(() => import('./components/TechStack/TechStack'))
const Contact = lazy(() => import('./components/Contact/Contact'))

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      return mobile;
    };
    
    const mobile = checkMobile();
    
    // Ultra-fast loading for mobile devices
    const loadTime = mobile ? 150 : 500; // Extremely fast on mobile
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, loadTime);

    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lightweight fallback for mobile
  const FastFallback = ({ message = 'Loading...' }) => (
    <div className="py-4 flex items-center justify-center min-h-[30vh]">
      <div className="text-center">
        <div className="w-4 h-4 border border-neutral-700 border-t-amber-500 rounded-full animate-spin mx-auto mb-1"></div>
        <p className="text-neutral-500 text-xs">{message}</p>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallbackMessage="Something went wrong. Please refresh the page.">
      <Router>
        <div className="App min-h-screen relative">
          {/* Global Background - Rich Dark Theme */}
          <div className="fixed inset-0 bg-[#0a0a0c]">
            {/* Elegant Background decoration */}
            <div className="absolute inset-0 w-full h-full">
              {/* Subtle radial gradient for depth */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,179,8,0.08),transparent)]"></div>
              
              {/* Subtle ambient light - warm tones */}
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/[0.02] rounded-full blur-[120px]"></div>
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/[0.015] rounded-full blur-[100px]"></div>
              
              {/* Very subtle grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
              
              {/* Noise texture for premium feel */}
              <div className="absolute inset-0 opacity-[0.015]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"}}></div>
            </div>
          </div>

          {/* Content with relative positioning */}
          <div className="relative z-10 text-neutral-100">{loading ? (
            isMobile ? <MobilePreloader /> : <Preloader />
          ) : (
            <>
              <Navbar />
              <main className="relative">
                <ScrollToTop />
                <ErrorBoundary fallbackMessage="There was an error loading the page content.">
                  <Routes>
                    {/* Main Portfolio Page - Mobile Optimized */}
                    <Route path="/" element={
                      <>
                        {/* Home section - always priority */}
                        <MobileSafeSection id="home" priority={true}>
                          <Home />
                        </MobileSafeSection>

                        {/* About section - lazy load with intersection observer */}
                        <MobileSafeSection id="about" fallback={<FastFallback message="Loading about..." />}>
                          <Suspense fallback={<FastFallback message="Loading about..." />}>
                            <About />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Projects section */}
                        <MobileSafeSection id="projects" fallback={<FastFallback message="Loading projects..." />}>
                          <Suspense fallback={<FastFallback message="Loading projects..." />}>
                            <Projects />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Tech Stack section */}
                        <MobileSafeSection id="tech-stack" fallback={<FastFallback message="Loading tech stack..." />}>
                          <Suspense fallback={<FastFallback message="Loading tech stack..." />}>
                            <TechStack />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Resume section */}
                        <MobileSafeSection id="resume" fallback={<FastFallback message="Loading resume..." />}>
                          <Suspense fallback={<FastFallback message="Loading resume..." />}>
                            <Resume />
                          </Suspense>
                        </MobileSafeSection>

                        {/* Contact section */}
                        <MobileSafeSection id="contact" fallback={<FastFallback message="Loading contact..." />}>
                          <Suspense fallback={<FastFallback message="Loading contact..." />}>
                            <Contact />
                          </Suspense>
                        </MobileSafeSection>
                      </>
                    } />
                  </Routes>
                </ErrorBoundary>
              </main>
              <Footer />
            </>
          )}
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
