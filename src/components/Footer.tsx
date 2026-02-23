import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const footerSections = [
  {
    title: "About Us",
    links: ["About CASA Terminal", "Construction Services", "Vendors", "Our Location"],
  },
  {
    title: "Policy",
    links: ["Privacy Policy", "Terms & Conditions", "FAQ"],
  },
  {
    title: "My Account",
    links: ["My Account", "My Orders", "Order Tracking"],
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark-section text-primary-foreground relative overflow-hidden">
      {/* Top decorative line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Contact Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-copper flex items-center justify-center">
                <span className="text-copper-foreground font-display font-bold text-base">C</span>
              </div>
              <span className="font-display font-bold text-lg">CASA TERMINAL</span>
            </div>
            <p className="text-primary-foreground/50 text-sm mb-6 leading-relaxed">
              India's premier construction marketplace connecting builders, suppliers, and contractors.
            </p>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-copper flex-shrink-0" />
                Chennai, Tamil Nadu, India
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-copper flex-shrink-0" />
                +91-XXXXX XXXXX
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-copper flex-shrink-0" />
                WhatsApp: +91-XXXXX XXXXX
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-copper flex-shrink-0" />
                contact@casaterminal.com
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-display font-bold text-base mb-5 relative">
                {section.title}
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-copper rounded-full" />
              </h4>
              <ul className="flex flex-col gap-3 mt-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-primary-foreground/50 hover:text-copper transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-copper/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-primary-foreground/40 text-sm">
            © 2026 CASA TERMINAL — The Construction Marketplace
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Sitemap"].map((link) => (
              <a key={link} href="#" className="text-primary-foreground/40 text-sm hover:text-copper transition-colors duration-300">
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
