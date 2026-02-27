import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.svg"; // Ensure this path is correct
import {
  Menu,
  X,
  ChevronDown,
  Search,
  User,
} from "lucide-react";

// Define types for the navigation structure
interface MegaMenuColumn {
  title: string;
  links: string[];
}

interface NavLink {
  label: string;
  href: string;
  megaMenu?: {
    columns: MegaMenuColumn[];
  };
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#services",
    megaMenu: {
      columns: [
        {
          title: "Construction Materials",
          links: [
            "Cement & Concrete",
            "Bricks & Blocks",
            "Steel & TMT",
            "Sand & Aggregates",
            "Tiles & Flooring",
          ],
        },
        {
          title: "Equipment Rental",
          links: [
            "JCB & Excavators",
            "Cranes & Hoists",
            "Scaffolding",
            "Concrete Mixers",
            "Power Tools",
          ],
        },
        {
          title: "Professional Services",
          links: [
            "Contractors",
            "Architects",
            "Electricians",
            "Plumbers",
            "Interior Designers",
          ],
        },
      ],
    },
  },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setMobileMenuOpen(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMobileMenu = (label: string) => {
    setMobileMenuOpen(mobileMenuOpen === label ? null : label);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#502d13] backdrop-blur-lg shadow-2xl py-2"
            : "bg-[#502d13] py-2 lg:py-2"
        }`}
      >
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="/"
              className="flex items-center  group "
              whileHover={{ scale: windowWidth >= 768 ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                {/* REQUIREMENT: Remove white background (bg-transparent) */}
                <div className="w-16 h-16 md:w-16 md:h-16 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
                  <img 
                    src={logo}
                    alt="Casa Terminal Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // FIX: Type casting for TypeScript
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('span');
                        fallback.className = 'text-[#e9ddc8] font-display font-bold text-lg';
                        fallback.textContent = 'CT';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Text logo */}
              <div className="flex flex-col">
                <span className="text-[#f8e3be] font-display font-bold text-lg md:text-2xl lg:text-3xl leading-tight">
                  CASA TERMINAL
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (windowWidth >= 1024) {
                      link.megaMenu && setActiveMegaMenu(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (windowWidth >= 1024) {
                      setActiveMegaMenu(null);
                    }
                  }}
                >
                  <motion.a
                    href={link.href}
                    className="px-1 xl:px-12 py-1 text-[#e9ddc8]/80 hover:text-[#e9ddc8] font-medium text-sm xl:text-base tracking-wide rounded-lg transition-colors relative group inline-flex items-center gap-1"
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                    
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e9ddc8]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.megaMenu &&
                      activeMegaMenu === link.label &&
                      windowWidth >= 1024 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[700px] bg-[#502d13] rounded-2xl shadow-2xl border border-[#e9ddc8]/30 overflow-hidden"
                        >
                          <div className="grid grid-cols-3 gap-6 p-6">
                            {link.megaMenu.columns.map((column, idx) => (
                              <div key={idx}>
                                <h4 className="font-display font-semibold text-[#e9ddc8] mb-3 pb-2 border-b border-[#e9ddc8]/20">
                                  {column.title}
                                </h4>
                                <ul className="space-y-2">
                                  {column.links.map((item) => (
                                    <li key={item}>
                                      <a
                                        href="#"
                                        className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] text-sm transition-colors block hover:translate-x-1 transform duration-200"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Action Icons & Button */}
            <div className="flex items-center gap-1 md:gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>

              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors relative"
                aria-label="User account"
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>

              {/* REQUIREMENT: Removed Cart Icon */}

              {/* REQUIREMENT: Replaced Get Quote with Become a Member */}
              <motion.a
                href="#register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block ml-2 bg-[#e9ddc8] text-[#502d13] px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm hover:shadow-xl hover:shadow-[#e9ddc8]/20 transition-all duration-300 whitespace-nowrap"
              >
                Become a Member
              </motion.a>

              <button
                className="lg:hidden p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors ml-1"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Menu className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 top-[80px] lg:hidden bg-[#502d13] z-40 overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <div
                      key={link.label}
                      className="border-b border-[#e9ddc8]/10 last:border-0"
                    >
                      {link.megaMenu ? (
                        <>
                          <button
                            onClick={() => toggleMobileMenu(link.label)}
                            className="w-full flex items-center justify-between py-4 text-[#e9ddc8] font-medium"
                          >
                            <span>{link.label}</span>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform duration-300 ${
                                mobileMenuOpen === link.label
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {mobileMenuOpen === link.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pb-4 space-y-4">
                                  {link.megaMenu.columns.map((column, idx) => (
                                    <div key={idx}>
                                      <h4 className="text-[#e9ddc8]/50 text-sm font-semibold mb-2 px-2">
                                        {column.title}
                                      </h4>
                                      <ul className="space-y-2">
                                        {column.links.map((item) => (
                                          <li key={item}>
                                            <a
                                              href="#"
                                              className="block px-2 py-2 text-[#e9ddc8] hover:bg-[#e9ddc8]/10 rounded-lg transition-colors"
                                              onClick={() => setIsOpen(false)}
                                            >
                                              {item}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <a
                          href={link.href}
                          className="block py-4 text-[#e9ddc8] font-medium hover:text-[#e9ddc8]/80 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </a>
                      )}
                    </div>
                  ))}

                  {/* Mobile action buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                      href="#register"
                      className="bg-[#e9ddc8] text-[#502d13] px-6 py-3 rounded-xl font-semibold text-center hover:bg-[#d4c4a8] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Become a Member
                    </a>
                    <a
                      href="#"
                      className="bg-transparent border border-[#e9ddc8]/30 text-[#e9ddc8] px-6 py-3 rounded-xl font-semibold text-center hover:bg-[#e9ddc8]/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#502d13]/98 backdrop-blur-xl z-[60] flex items-start justify-center px-4 pt-16 sm:pt-24"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#e9ddc8] rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#502d13] ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for materials, equipment, contractors..."
                    className="flex-1 bg-transparent border-none outline-none text-[#502d13] placeholder-[#502d13]/50 py-4 text-sm sm:text-base"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="px-3 sm:px-4 py-2 bg-[#502d13] text-[#e9ddc8] rounded-xl hover:bg-[#7b4a26] transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;