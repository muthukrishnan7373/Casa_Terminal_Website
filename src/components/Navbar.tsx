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

// --- Types ---
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

// --- Data ---
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
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setMobileMenuOpen(null);
      }
    };
    // Initial set
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close on Escape Key
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

  // Lock Body Scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const toggleMobileMenu = (label: string) => {
    setMobileMenuOpen(mobileMenuOpen === label ? null : label);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#502d13]/95 backdrop-blur-md shadow-xl py-2"
            : "bg-[#502d13] py-3 lg:py-4"
        }`}
      >
        {/* Responsive Container: px-4 on mobile, px-6 on tablet, px-8 on desktop */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* --- Logo Section --- */}
            <motion.a
              href="/"
              className="flex items-center gap-2 md:gap-3 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                {/* Responsive Logo Size: w-10 (mobile) -> w-14 (desktop) */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
                  <img 
                    src={logo}
                    alt="Casa Terminal Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
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

              {/* Responsive Text Size */}
              <div className="flex flex-col">
                <span className="text-[#f8e3be] font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight tracking-tight">
                  CASA TERMINAL
                </span>
              </div>
            </motion.a>

            {/* --- Desktop Navigation --- */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative px-8"
                  onMouseEnter={() => {
                    if (windowWidth >= 1024) link.megaMenu && setActiveMegaMenu(link.label);
                  }}
                  onMouseLeave={() => {
                    if (windowWidth >= 1024) setActiveMegaMenu(null);
                  }}
                >
                  <motion.a
                    href={link.href}
                    className="px-3 xl:px-5 py-2 text-[#e9ddc8]/80 hover:text-[#e9ddc8] font-medium text-sm xl:text-base tracking-wide rounded-lg transition-colors relative group inline-flex items-center gap-1"
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

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {link.megaMenu &&
                      activeMegaMenu === link.label &&
                      windowWidth >= 1024 && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[650px] xl:w-[750px] bg-[#502d13] rounded-2xl shadow-2xl border border-[#e9ddc8]/20 overflow-hidden z-50"
                        >
                          <div className="grid grid-cols-3 gap-6 p-6">
                            {link.megaMenu.columns.map((column, idx) => (
                              <div key={idx}>
                                <h4 className="font-display font-semibold text-[#f8e3be] mb-3 pb-2 border-b border-[#e9ddc8]/10 text-base">
                                  {column.title}
                                </h4>
                                <ul className="space-y-2">
                                  {column.links.map((item) => (
                                    <li key={item}>
                                      <a
                                        href="#"
                                        className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] text-sm transition-all duration-200 block hover:translate-x-1 hover:bg-[#e9ddc8]/5 rounded px-2 py-1"
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

            {/* --- Action Icons & Mobile Toggle --- */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="p-2 sm:p-2.5 rounded-xl text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:flex p-2 sm:p-2.5 rounded-xl text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </motion.a>

              {/* Become a Member - Visible on Tablet/Desktop, hidden on Mobile */}
              <motion.a
                href="#register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex ml-2 bg-[#e9ddc8] text-[#502d13] px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-semibold text-xs lg:text-sm hover:shadow-lg hover:shadow-[#e9ddc8]/20 transition-all duration-300 whitespace-nowrap items-center justify-center"
              >
                Become a Member
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 rounded-xl text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors ml-1"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              // Adjust top offset based on whether nav is scrolled (compact) or not
              className={`fixed inset-0 lg:hidden bg-[#502d13] z-40 overflow-y-auto ${
                scrolled ? 'top-[60px]' : 'top-[70px] sm:top-[76px]'
              }`}
            >
              <div className="container mx-auto px-4 py-6 pb-24">
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
                            className="w-full flex items-center justify-between py-4 text-[#e9ddc8] font-medium text-lg"
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
                                <div className="pb-4 pl-4 space-y-6 bg-[#e9ddc8]/5 rounded-xl mb-4 p-4">
                                  {link.megaMenu.columns.map((column, idx) => (
                                    <div key={idx}>
                                      <h4 className="text-[#f8e3be] text-sm font-bold uppercase tracking-wider mb-3">
                                        {column.title}
                                      </h4>
                                      <ul className="space-y-3">
                                        {column.links.map((item) => (
                                          <li key={item}>
                                            <a
                                              href="#"
                                              className="block text-[#e9ddc8]/80 hover:text-white text-base transition-colors"
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
                          className="block py-4 text-[#e9ddc8] font-medium text-lg hover:text-[#e9ddc8]/80 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </a>
                      )}
                    </div>
                  ))}

                  {/* Mobile Action Buttons */}
                  <div className="mt-8 flex flex-col gap-4">
                    <a
                      href="#register"
                      className="w-full bg-[#e9ddc8] text-[#502d13] px-6 py-4 rounded-xl font-bold text-center hover:bg-[#d4c4a8] transition-colors shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Become a Member
                    </a>
                    
                    {/* Sign In / Account (Mobile) */}
                    <a
                      href="#"
                      className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#e9ddc8]/30 text-[#e9ddc8] px-6 py-4 rounded-xl font-semibold text-center hover:bg-[#e9ddc8]/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      Sign In
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* --- Search Modal --- */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#502d13]/95 backdrop-blur-xl z-[60] flex items-start justify-center px-4 pt-20 sm:pt-28"
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
                <div className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#502d13] ml-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search materials, equipment..."
                    className="flex-1 bg-transparent border-none outline-none text-[#502d13] placeholder-[#502d13]/50 py-2 text-base sm:text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="px-4 py-2 bg-[#502d13] text-[#e9ddc8] rounded-xl hover:bg-[#7b4a26] transition-colors text-sm font-semibold whitespace-nowrap"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Backdrop for Mobile Menu --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;