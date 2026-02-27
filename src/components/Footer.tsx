import { motion } from "framer-motion";
import { 
  MapPin, Phone, Mail, MessageCircle, 
  Facebook, Twitter, Instagram, Linkedin, 
  Send, ArrowUp, ChevronRight 
} from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const footerSections = [
    {
      title: "Quick Links",
      links: ["About Us", "Services", "Vendors", "Careers"]
    },
    {
      title: "Support",
      links: ["Help Center", "FAQs", "Terms of Service", "Privacy Policy", "Contact Us"]
    }
  ];

  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const contactInfo = [
    { Icon: MapPin, text: "Chennai, Tamil Nadu, India" },
    { Icon: Phone, text: "+91 xxxxx xxxxx", href: "tel:+91xxxxx xxxxx" },
    { Icon: MessageCircle, text: "+91 xxxxx xxxxx", href: "tel:+91xxxxx xxxxx" },
    { Icon: Mail, text: "xxxxxx@casaterminal.com", href: "mailto:contact@casaterminal.com" }
  ];

  return (
    <footer id="contact" className="bg-[#502d13] text-[#e9ddc8] relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 md:opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e9ddc8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 relative z-10">
        {/* Mobile: Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {/* Company Info - Mobile */}
          <div className="relative">
            <div className=" gap-1 ">
              <div className="w-16 h-16 md:w-16 md:h-16 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="Casa Terminal Logo" 
                  
                  style={{ mixBlendMode: 'multiply' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('span');
                      fallback.className = 'text-[#e9ddc8] font-display font-bold text-xl';
                      fallback.textContent = 'CT';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <span className="font-display font-bold text-xl text-[#e9ddc8]">CASA TERMINAL</span>
            </div>
            <p className="text-[#e9ddc8]/60 text-sm mb-6 leading-relaxed">
              India's premier construction marketplace connecting builders, suppliers, and contractors.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[#e9ddc8]/10 flex items-center justify-center hover:bg-[#e9ddc8] hover:text-[#502d13] transition-all duration-300 flex-shrink-0"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Accordion Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="border border-[#e9ddc8]/10 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex items-center justify-between p-4 text-left bg-[#e9ddc8]/5 hover:bg-[#e9ddc8]/10 transition-colors"
              >
                <span className="font-display font-bold text-base">{section.title}</span>
                <ChevronRight 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    expandedSection === section.title ? 'rotate-90' : ''
                  }`} 
                />
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: expandedSection === section.title ? 'auto' : 0,
                  opacity: expandedSection === section.title ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="p-4 space-y-3 bg-[#e9ddc8]/5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 text-sm"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}

          {/* Contact Info */}
          <div className="mt-6 p-4 bg-[#e9ddc8]/5 rounded-lg">
            <h4 className="font-display font-bold text-base mb-4">Get in Touch</h4>
            <div className="space-y-3 text-[#e9ddc8]/60">
              {contactInfo.map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#e9ddc8] flex-shrink-0" />
                  {href ? (
                    <a href={href} className="text-sm hover:text-[#e9ddc8] transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 xl:gap-10">
          {/* Company Info - Desktop */}
          <div>
            <div className="flex items-center  mb-6">
              <div className="w-20 h-20 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
                <img 
                  src={logo} 
                  alt="Casa Terminal Logo" 
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('span');
                      fallback.className = 'text-[#e9ddc8] font-display font-bold text-xl';
                      fallback.textContent = 'CT';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <span className="font-display font-bold text-xl text-[#e9ddc8]">CASA TERMINAL</span>
            </div>
            <p className="text-[#e9ddc8]/60 text-sm mb-6 leading-relaxed">
              India's premier construction marketplace connecting builders, suppliers, and contractors with cutting-edge technology and trusted partnerships.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-[#e9ddc8]/10 flex items-center justify-center hover:bg-[#e9ddc8] hover:text-[#502d13] transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#e9ddc8] rounded-full" />
            </h4>
            <ul className="space-y-3">
              {footerSections[0].links.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full group-hover:bg-[#e9ddc8] transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 relative">
              Support
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#e9ddc8] rounded-full" />
            </h4>
            <ul className="space-y-3">
              {footerSections[1].links.map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full group-hover:bg-[#e9ddc8] transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-6 relative">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#e9ddc8] rounded-full" />
            </h4>
            <div className="space-y-4 text-[#e9ddc8]/60">
              {contactInfo.map(({ Icon, text, href }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-[#e9ddc8] flex-shrink-0 mt-0.5" />
                  {href ? (
                    <a href={href} className="text-sm hover:text-[#e9ddc8] transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Removed Sitemap */}
      <div className="border-t border-[#e9ddc8]/10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-[#e9ddc8]/40 text-xs sm:text-sm order-2 sm:order-1">
              © {new Date().getFullYear()} CASA TERMINAL. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 order-1 sm:order-2">
              {["Privacy", "Terms"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#e9ddc8]/40 text-xs sm:text-sm hover:text-[#e9ddc8] transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showScrollTop ? 1 : 0,
          opacity: showScrollTop ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-[#e9ddc8] text-[#502d13] p-3 md:p-4 rounded-full shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" />
      </motion.button>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#502d13] border-t border-[#e9ddc8]/10 py-2 px-4 flex justify-around items-center z-40 md:hidden">
        {[
          { icon: MapPin, label: "Visit", href: "#" },
          { icon: Phone, label: "Call", href: "#" },
          { icon: Mail, label: "Email", href: "#" },
          { icon: MessageCircle, label: "WhatsApp", href: "#" },
        ].map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="flex flex-col items-center gap-1 text-[#e9ddc8]/60 hover:text-[#e9ddc8] transition-colors"
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px]">{label}</span>
          </a>
        ))}
      </div>

      {/* Add bottom padding on mobile */}
      <style>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 64px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;