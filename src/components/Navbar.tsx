import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  ShoppingBag,
  Phone,
  Mail,
} from "lucide-react";

const navLinks = [
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
  { label: "Projects", href: "#projects" },
  { label: "Members", href: "#members" },
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
            : "bg-[#502d13] py-3 lg:py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo - responsive sizing */}
            <motion.a
              href="/"
              className="flex items-center gap-2 md:gap-3 group"
              whileHover={{ scale: windowWidth >= 768 ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <img
                  src="./public/logo.jpg"
                  alt="Casa Terminal Logo"
                  className="w-12 h-12 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#502d13] to-[#7b4a26] flex items-center justify-center shadow-lg overflow-hidden border-2 border-[#e9ddc8]/20"
                />

                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-[#e9ddc8]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Text logo with your span */}
              <div className="flex flex-col">
                <span className="text-[#e9ddc8] font-display font-bold text-lg md:text-2xl lg:text-3xl leading-tight">
                  CASA TERMINAL
                </span>
               
              </div>
            </motion.a>

            {/* Desktop Navigation - lg and above */}
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
                    className="px-3 xl:px-4 py-2 text-[#e9ddc8]/80 hover:text-[#e9ddc8] font-medium text-sm xl:text-base tracking-wide rounded-lg transition-colors relative group inline-flex items-center gap-1"
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

                  {/* Mega Menu - Desktop */}
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

            {/* Action Icons - responsive */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search - visible on all devices */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </motion.button>

              {/* User - hidden on mobile */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors relative"
                aria-label="User account"
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>

              {/* Cart - visible on all devices */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e9ddc8] text-[#502d13] text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </motion.a>

              {/* Get Quote - hidden on mobile, visible on tablet and up */}
              <motion.a
                href="#quote"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block ml-2 bg-[#e9ddc8] text-[#502d13] px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold text-xs md:text-sm hover:shadow-xl hover:shadow-[#e9ddc8]/20 transition-all duration-300 whitespace-nowrap"
              >
                Get Quote
              </motion.a>

              {/* Mobile Menu Button */}
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

        {/* Mobile Menu - Slide from right */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 top-[72px] lg:hidden bg-[#502d13] z-40 overflow-y-auto"
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
                      href="#quote"
                      className="bg-[#e9ddc8] text-[#502d13] px-6 py-3 rounded-xl font-semibold text-center hover:bg-[#d4c4a8] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Quote
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

      {/* Search Modal - responsive */}
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

                {/* Quick search suggestions - hidden on mobile */}
                <div className="hidden sm:block px-4 pb-4">
                  <p className="text-[#502d13]/50 text-xs mb-2">
                    Popular searches:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Cement",
                      "JCB",
                      "TMT Steel",
                      "Contractors",
                      "Scaffolding",
                    ].map((item) => (
                      <button
                        key={item}
                        className="px-3 py-1 bg-[#502d13]/10 text-[#502d13] text-xs rounded-full hover:bg-[#502d13]/20 transition-colors"
                        onClick={() => {
                          console.log("Search:", item);
                          setShowSearch(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
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
