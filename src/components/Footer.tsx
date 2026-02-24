import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#502d13] text-[#e9ddc8] relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e9ddc8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
      </div>

      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-[#e9ddc8]/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-display font-bold mb-4"
            >
              Stay Updated with Latest Construction Trends
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[#e9ddc8]/60 mb-6"
            >
              Subscribe to get updates on new materials, equipment, and industry insights
            </motion.p>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-[#e9ddc8]/10 border border-[#e9ddc8]/20 rounded-xl text-[#e9ddc8] placeholder-[#e9ddc8]/50 focus:outline-none focus:border-[#e9ddc8] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#e9ddc8] text-[#502d13] rounded-xl font-semibold hover:bg-[#d4c4a8] transition-colors flex items-center justify-center gap-2 group"
              >
                Subscribe
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#e9ddc8] flex items-center justify-center">
                <span className="text-[#502d13] font-display font-bold text-xl">CT</span>
              </div>
              <span className="font-display font-bold text-xl">CASA TERMINAL</span>
            </div>
            <p className="text-[#e9ddc8]/60 text-sm mb-6 leading-relaxed">
              India's premier construction marketplace connecting builders, suppliers, and contractors with cutting-edge technology and trusted partnerships.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-lg bg-[#e9ddc8]/10 flex items-center justify-center hover:bg-[#e9ddc8] hover:text-[#502d13] transition-all duration-300"
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
              {["About Us", "Services", "Projects", "Vendors", "Careers"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group">
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
              {["Help Center", "FAQs", "Terms of Service", "Privacy Policy", "Contact Us"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group">
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
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#e9ddc8] flex-shrink-0 mt-0.5" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#e9ddc8] flex-shrink-0" />
                <span>+91 xxxxx xxxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-[#e9ddc8] flex-shrink-0" />
                <span>+91 xxxxx xxxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#e9ddc8] flex-shrink-0" />
                <span>contact@casaterminal.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e9ddc8]/10 relative z-10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#e9ddc8]/40 text-sm">
            © 2026 CASA TERMINAL. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[#e9ddc8]/40 text-sm hover:text-[#e9ddc8] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;