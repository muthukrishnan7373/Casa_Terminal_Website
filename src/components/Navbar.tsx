import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Search, User, ShoppingBag } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { 
    label: "Services", 
    href: "#services",
    megaMenu: {
      columns: [
        {
          title: "Construction Materials",
          links: ["Cement & Concrete", "Bricks & Blocks", "Steel & TMT", "Sand & Aggregates", "Tiles & Flooring"]
        },
        {
          title: "Equipment Rental",
          links: ["JCB & Excavators", "Cranes & Hoists", "Scaffolding", "Concrete Mixers", "Power Tools"]
        },
        {
          title: "Professional Services",
          links: ["Contractors", "Architects", "Electricians", "Plumbers", "Interior Designers"]
        }
      ]
    }
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#502d13]/95 backdrop-blur-lg shadow-2xl py-2"
            : "bg-transparent py-4"
        }`}
      >
        {/* Top bar with contact info */}
        <div className="hidden lg:block border-b border-[#e9ddc8]/10 py-1 text-xs">
         
          </div>


        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced animation */}
            <motion.a
              href="/"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#502d13] to-[#7b4a26] flex items-center justify-center shadow-lg overflow-hidden">
                  <img src="./public/logo.jpg" alt="Casa Terminal Logo" className="text-[#e9ddc8] font-display font-bold text-xl" />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-[#e9ddc8]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div>
                <span className="font-display font-bold text-3xl  text-[#e5da8f] block leading-tight">
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
                  onMouseEnter={() => link.megaMenu && setActiveMegaMenu(link.label)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <motion.a
                    href={link.href}
                    className="px-4 py-2 text-[#e9ddc8]/80 hover:text-[#e9ddc8] font-medium text-sm tracking-wide rounded-lg transition-colors relative group inline-flex items-center gap-1"
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                    {link.megaMenu && <ChevronDown className="w-4 h-4" />}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e9ddc8]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.megaMenu && activeMegaMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full  mt-4 w-[750px] bg-[#502d13] rounded-2xl shadow-2xl border border-[#e9ddc8]/50 overflow-hidden"
                      >
                        <div className="grid grid-cols-3 gap-6 p-6">
                          {link.megaMenu.columns.map((column, idx) => (
                            <div key={idx}>
                              <h4 className="font-display font-semibold text-[#e3ddd1] mb-3 pb-2 border-b border-[#e9ddc8]/20">
                                {column.title}
                              </h4>
                              <ul className="space-y-2">
                                {column.links.map((item) => (
                                  <li key={item}>
                                    <a
                                      href="#"
                                      className="text-[#e9ddc8]/60 hover:text-[#e9ddc8] text-sm transition-colors block"
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

            {/* Action Icons */}
            <div className="hidden lg:flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(233, 221, 200, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </motion.button>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors relative"
              >
                <User className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors relative"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#e9ddc8] text-[#502d13] text-xs rounded-full flex items-center justify-center font-bold">
                  3
                </span>
              </motion.a>

              <motion.a
                href="#quote"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 bg-[#e9ddc8] text-[#502d13] px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-xl hover:shadow-[#e9ddc8]/20 transition-all duration-300"
              >
                Get Quote
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#e9ddc8]"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#502d13] border-t border-[#e9ddc8]/10 mt-4"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[#e9ddc8]/80 hover:text-[#e9ddc8] font-medium py-2 border-b border-[#e9ddc8]/10"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#quote"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#e9ddc8] text-[#502d13] px-6 py-3 rounded-xl font-semibold text-center mt-4"
                  >
                    Get Quote
                  </a>
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
            className="fixed inset-0 bg-[#502d13]/95 backdrop-blur-xl z-[60] flex items-start justify-center pt-24"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#e9ddc8] rounded-2xl p-2 flex items-center gap-2">
                <Search className="w-5 h-5 text-[#502d13] ml-3" />
                <input
                  type="text"
                  placeholder="Search for materials, equipment, contractors..."
                  className="flex-1 bg-transparent border-none outline-none text-[#502d13] placeholder-[#502d13]/50 py-4"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="px-4 py-2 bg-[#502d13] text-[#e9ddc8] rounded-xl hover:bg-[#7b4a26] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;