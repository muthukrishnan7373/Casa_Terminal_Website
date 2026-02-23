import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Members", href: "#members" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  "Cement", "Bricks", "Steel & TMT Bars", "Sand & Aggregates",
  "Tiles & Flooring", "Plumbing", "Electrical", "Paints",
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-luxury py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-copper flex items-center justify-center">
            <span className="text-copper-foreground font-display font-bold text-lg">C</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-primary-foreground">
            CASA TERMINAL
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-primary-foreground/80 hover:text-copper font-medium text-sm tracking-wide uppercase transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-copper after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}

          {/* Categories Dropdown */}
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button className="flex items-center gap-1 text-primary-foreground/80 hover:text-copper font-medium text-sm tracking-wide uppercase transition-colors duration-300">
              Categories <ChevronDown className={`w-4 h-4 transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-primary rounded-lg shadow-luxury border border-copper/20 overflow-hidden"
                >
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="block px-4 py-3 text-sm text-primary-foreground/80 hover:bg-copper/10 hover:text-copper transition-colors duration-200 border-b border-copper/5 last:border-0"
                    >
                      {cat}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#services"
            className="bg-copper text-copper-foreground px-6 py-2.5 rounded-lg font-display font-semibold text-sm hover:bg-gold transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/98 backdrop-blur-md border-t border-copper/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-copper font-medium text-base py-2 border-b border-copper/10"
                >
                  {link.label}
                </a>
              ))}
              <details className="group">
                <summary className="text-primary-foreground/80 hover:text-copper font-medium text-base py-2 border-b border-copper/10 cursor-pointer list-none flex items-center justify-between">
                  Categories <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="pl-4 mt-2 flex flex-col gap-2">
                  {categories.map((cat) => (
                    <a key={cat} href="#" className="text-sm text-primary-foreground/60 hover:text-copper py-1">{cat}</a>
                  ))}
                </div>
              </details>
              <a
                href="#services"
                onClick={() => setIsOpen(false)}
                className="bg-copper text-copper-foreground px-6 py-3 rounded-lg font-display font-semibold text-center mt-2"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
