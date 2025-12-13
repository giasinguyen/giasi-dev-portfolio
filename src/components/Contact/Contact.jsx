import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaTimes,
  FaExternalLinkAlt,
  FaSpinner
} from "react-icons/fa";
import SEOHead from '../SEO/SEOHead'
import { SEO_CONFIGS } from '../SEO/seoConfigs'

const WEB3FORMS_ACCESS_KEY = "110d43b6-1f58-4df5-a1bb-1363142e734b";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Real email submission using Web3Forms
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: Message from ${formData.name}`,
          from_name: "GiaSi Portfolio"
        })
      });

      const result = await response.json();

      if (result.success) {
        showToast("success", "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast("error", "Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, showToast]);

  // Direct contact methods
  const contactMethods = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "giasinguyentran@gmail.com",
      href: "mailto:giasinguyentran@gmail.com",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "(+84) 34 899 6487",
      href: "tel:+84348996487",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Ho Chi Minh City, Vietnam",
      href: "https://maps.google.com/?q=Ho+Chi+Minh+City",
    }
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/giasinguyen", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com/in/giasinguyen", label: "LinkedIn" }
  ];

  return (
    <>
      <SEOHead config={SEO_CONFIGS.contact} />
      
      <section className="section-padding pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-medium mb-6">
              Available for opportunities
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-100 mb-4">
              Get In Touch
            </h1>
            
            <p className="text-neutral-400 text-lg max-w-xl mx-auto">
              Looking for a Java Backend Developer? Let's connect and discuss how I can contribute to your team.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-8">
            
            {/* Contact Form - Takes 3 columns */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-neutral-800">
                <h2 className="text-xl font-semibold text-neutral-100 mb-6">
                  Send a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                      placeholder="Nguyễn Trần Gia Sĩ"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
                      placeholder="giasinguyentran@gmail.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                      placeholder="Tell me about your project or opportunity..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 font-semibold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="text-sm animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                <p className="text-neutral-500 text-xs text-center mt-4">
                  Your message will be sent directly to my inbox
                </p>
              </div>
            </motion.div>

            {/* Contact Info - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Direct Contact */}
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-800">
                <h2 className="text-lg font-semibold text-neutral-100 mb-5">
                  Direct Contact
                </h2>
                
                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={index}
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 p-4 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/70 border border-neutral-700/50 hover:border-amber-500/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                          <Icon className="text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-neutral-500 mb-0.5">{method.label}</p>
                          <p className="text-sm text-neutral-200 truncate">{method.value}</p>
                        </div>
                        <FaExternalLinkAlt className="text-xs text-neutral-500 group-hover:text-amber-400 transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-6 border border-neutral-800">
                <h2 className="text-lg font-semibold text-neutral-100 mb-5">
                  Connect Online
                </h2>
                
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800/40 hover:bg-neutral-800/70 border border-neutral-700/50 hover:border-amber-500/30 text-neutral-400 hover:text-amber-400 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="text-xl" />
                        <span className="text-sm font-medium">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-6 border border-amber-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-amber-400">Open to Work</span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Currently seeking internship opportunities as a Java Backend Developer. Available to start immediately.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <div className={`px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 ${
                toast.type === 'success' 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-red-500/90 text-white'
              }`}>
                {toast.type === 'success' ? (
                  <FaCheckCircle className="text-lg" />
                ) : (
                  <FaTimes className="text-lg" />
                )}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default memo(Contact);
