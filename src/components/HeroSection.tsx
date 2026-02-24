import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ChevronDown, Truck, HardHat, Users, Award, 
  Phone, Mail, MapPin, Star, Shield, Clock, Package,
  Wrench, Zap, CheckCircle
} from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    setIsLoaded(true);
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Track scroll progress for quick actions
  useEffect(() => {
    const handleScroll = () => {
      const progress = window.scrollY / (window.innerHeight * 0.5);
      setScrollProgress(Math.min(progress, 1));
      if (dimensions.width < 1024) {
        setShowQuickActions(window.scrollY > 200);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dimensions.width]);

  // Rotating words based on screen size
  const getRotatingWords = () => {
    if (dimensions.width < 360) return ["Build", "Create"];
    if (dimensions.width < 480) return ["Build", "Create", "Design"];
    if (dimensions.width < 640) return ["Build", "Construct", "Create"];
    if (dimensions.width < 768) return ["Build", "Construct", "Create", "Design"];
    return ["Build", "Construct", "Create", "Design", "Innovate"];
  };

  const rotatingWords = getRotatingWords();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, dimensions.width < 480 ? 3500 : 3000);
    return () => clearInterval(interval);
  }, [rotatingWords.length, dimensions.width]);

  // Mouse move effect for 3D tilt (desktop only)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dimensions.width < 1024) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX - innerWidth / 2) / 40,
      y: (clientY - innerHeight / 2) / 40,
    });
  };

  // Service icons with responsive positions
  const serviceIcons = [
    { Icon: Truck, delay: 0, position: { top: '15%', right: '5%' }, color: 'from-blue-400 to-blue-600' },
    { Icon: HardHat, delay: 0.5, position: { top: '30%', right: '12%' }, color: 'from-yellow-400 to-orange-600' },
    { Icon: Package, delay: 1, position: { top: '45%', right: '8%' }, color: 'from-green-400 to-emerald-600' },
    { Icon: Wrench, delay: 1.5, position: { top: '60%', right: '15%' }, color: 'from-purple-400 to-pink-600' },
    { Icon: Users, delay: 2, position: { top: '75%', right: '10%' }, color: 'from-red-400 to-rose-600' },
    { Icon: Award, delay: 2.5, position: { top: '90%', right: '5%' }, color: 'from-indigo-400 to-blue-600' },
  ];

  // Responsive typography system
  const getTitleSize = () => {
    if (dimensions.width < 320) return "text-2xl";
    if (dimensions.width < 360) return "text-3xl";
    if (dimensions.width < 400) return "text-4xl";
    if (dimensions.width < 480) return "text-5xl";
    if (dimensions.width < 640) return "text-6xl";
    if (dimensions.width < 768) return "text-7xl";
    if (dimensions.width < 1024) return "text-7xl";
    if (dimensions.width < 1280) return "text-8xl";
    if (dimensions.width < 1536) return "text-8xl";
    return "text-9xl";
  };

  const getDescriptionSize = () => {
    if (dimensions.width < 360) return "text-xs";
    if (dimensions.width < 480) return "text-sm";
    if (dimensions.width < 640) return "text-base";
    if (dimensions.width < 768) return "text-lg";
    return "text-xl";
  };

  const getButtonSize = () => {
    if (dimensions.width < 360) return "px-4 py-2 text-xs";
    if (dimensions.width < 480) return "px-5 py-2.5 text-sm";
    if (dimensions.width < 640) return "px-6 py-3 text-base";
    if (dimensions.width < 768) return "px-7 py-3.5 text-base";
    return "px-8 py-4 text-lg";
  };

  const getSpacing = () => {
    if (dimensions.width < 360) return "mt-1";
    if (dimensions.width < 480) return "mt-2";
    if (dimensions.width < 640) return "mt-3";
    if (dimensions.width < 768) return "mt-4";
    return "mt-5";
  };

  const getContainerPadding = () => {
    if (dimensions.width < 320) return "px-2";
    if (dimensions.width < 360) return "px-3";
    if (dimensions.width < 400) return "px-4";
    if (dimensions.width < 480) return "px-5";
    if (dimensions.width < 640) return "px-6";
    if (dimensions.width < 768) return "px-7";
    if (dimensions.width < 1024) return "px-8";
    return "px-12";
  };

  const getBadgeSize = () => {
    if (dimensions.width < 320) return "text-[6px] px-1.5 py-0.5";
    if (dimensions.width < 360) return "text-[7px] px-2 py-1";
    if (dimensions.width < 400) return "text-[8px] px-2.5 py-1.5";
    if (dimensions.width < 480) return "text-[9px] px-3 py-1.5";
    if (dimensions.width < 640) return "text-xs px-4 py-2";
    return "text-sm px-5 py-2.5";
  };

  // Particle count based on screen size
  const getParticleCount = () => {
    if (dimensions.width < 360) return 5;
    if (dimensions.width < 480) return 8;
    if (dimensions.width < 640) return 12;
    if (dimensions.width < 768) return 15;
    if (dimensions.width < 1024) return 20;
    if (dimensions.width < 1280) return 25;
    return 35;
  };

  // Stats data with responsive display
  const statsData = [
    { value: "500+", label: "Vendors", icon: Users, color: "from-blue-400 to-blue-600" },
    { value: "100+", label: "Cities", icon: MapPin, color: "from-green-400 to-green-600" },
    { value: "1000+", label: "Projects", icon: Award, color: "from-purple-400 to-purple-600" },
    { value: "24/7", label: "Support", icon: Clock, color: "from-orange-400 to-orange-600" },
  ];

  // Quick actions data
  const quickActions = [
    { icon: Phone, label: 'Call', href: 'tel:+919876543210', color: 'from-green-500 to-green-600' },
    { icon: Mail, label: 'Email', href: 'mailto:contact@casaterminal.com', color: 'from-blue-500 to-blue-600' },
    { icon: MapPin, label: 'Visit', href: '#contact', color: 'from-purple-500 to-purple-600' },
    { icon: Star, label: 'Quote', href: '#quote', color: 'from-yellow-500 to-yellow-600' },
  ];

  // Service tags data
  const serviceTags = [
    { text: 'Transport', icon: Truck, color: 'from-blue-500/20 to-cyan-500/20' },
    { text: 'Rental', icon: Wrench, color: 'from-yellow-500/20 to-orange-500/20' },
    { text: 'Contractors', icon: Users, color: 'from-green-500/20 to-emerald-500/20' },
    { text: 'Materials', icon: Package, color: 'from-purple-500/20 to-pink-500/20' },
  ];

  // Show fewer stats on very small screens
  const visibleStats = dimensions.width < 480 ? statsData.slice(0, 2) : statsData;
  const statsColumns = dimensions.width < 480 ? 2 : 4;

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-[#502d13] via-[#5e3517] to-[#7b4a26]"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #e9ddc8 0%, transparent 40%)",
            "radial-gradient(circle at 80% 70%, #e9ddc8 0%, transparent 40%)",
            "radial-gradient(circle at 20% 30%, #e9ddc8 0%, transparent 40%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Parallax Background */}
      <motion.div 
        style={{ 
          y, 
          scale,
          rotateX: dimensions.width >= 1024 ? mousePosition.y : 0,
          rotateY: dimensions.width >= 1024 ? mousePosition.x : 0,
        }} 
        className="absolute inset-0 transform-gpu will-change-transform"
      >
        <img
          src={heroImage}
          alt="Construction site"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#502d13] via-[#502d13]/95 to-[#502d13]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#502d13] via-[#502d13]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#502d13]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(getParticleCount())].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#e9ddc8]/30 rounded-full"
            initial={{
              x: Math.random() * (dimensions.width || 1000),
              y: Math.random() * (dimensions.height || 1000),
            }}
            animate={{
              y: [null, -300],
              x: Math.random() * 20 - 40,
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: Math.random() * 12 + 12,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating service icons - desktop only */}
      {dimensions.width >= 1280 && (
        <div className="absolute inset-0 pointer-events-none justify-end flex">
          {serviceIcons.map(({ Icon, delay, position, color }, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={position}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1 + delay, duration: 0.8, type: "spring" }}
            >
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
              >
                <div className={`w-14 h-14 xl:w-16 xl:h-16 bg-gradient-to-br ${color} backdrop-blur-md border-2 border-[#e9ddc8]/30 rounded-xl xl:rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <Icon className="w-8 h-8 xl:w-8 xl:h-8 text-white" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 container mx-auto ${getContainerPadding()} h-full flex items-center`}>
        <div className="w-full max-w-7xl mx-auto">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`flex ${dimensions.width < 768 ? 'justify-center' : 'lg:justify-start'} mb-3 sm:mb-4 md:mb-6 lg:mb-8`}
          >
            <div className={`inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#e9ddc8]/20 to-[#e9ddc8]/5 backdrop-blur-md border border-[#e9ddc8]/30 rounded-full ${getBadgeSize()} shadow-xl`}>
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(74, 222, 128, 0.4)",
                    "0 0 0 8px rgba(74, 222, 128, 0)",
                    "0 0 0 0 rgba(74, 222, 128, 0)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"
              />
              <span className="font-medium tracking-wider text-[#e9ddc8]">
                {dimensions.width < 480 ? "⭐ INDIA'S #1" : "✨ INDIA'S PREMIER CONSTRUCTION MARKETPLACE"}
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`text-center ${dimensions.width >= 768 ? 'lg:text-left' : ''}`}
          >
            {/* Rotating Word */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWordIndex}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 90 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className={`${getTitleSize()} font-display font-bold bg-gradient-to-r from-[#e9ddc8] via-[#f0e0c0] to-[#d4c4a8] bg-clip-text text-transparent leading-[1.1]`}
              >
                {rotatingWords[currentWordIndex]}
              </motion.div>
            </AnimatePresence>

            {/* Better */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${getTitleSize()} font-display font-bold text-[#e9ddc8] leading-[1.1] ${getSpacing()}`}
            >
              Better,
            </motion.div>

            {/* India's */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`${getTitleSize()} font-display font-bold text-[#e9ddc8] leading-[1.1] ${getSpacing()}`}
            >
              India's
            </motion.div>

            {/* Construction */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className={`${getTitleSize()} font-display font-bold text-[#e9ddc8] leading-[1.1] ${getSpacing()}`}
            >
              Construction
            </motion.div>

            {/* Marketplace */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative inline-block"
            >
              <span className={`${getTitleSize()} font-display font-bold bg-gradient-to-r from-[#e9ddc8] via-[#ecd8b0] to-[#e9ddc8] bg-clip-text text-transparent`}>
                Marketplace
              </span>
              
              {/* Animated underline */}
              {dimensions.width >= 640 && (
                <motion.svg
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className={`absolute -bottom-3 sm:-bottom-4 md:-bottom-5 left-0 w-full ${
                    dimensions.width < 768 ? 'h-2' : 
                    dimensions.width < 1024 ? 'h-3' : 'h-4'
                  }`}
                  viewBox="0 0 400 20"
                  fill="none"
                >
                  <motion.path
                    d="M2 15C80 7 180 3 398 15"
                    stroke="url(#gradient)"
                    strokeWidth={dimensions.width < 768 ? "2" : "3"}
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    animate={{ 
                      strokeDashoffset: [0, 12],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e9ddc8" stopOpacity="0.5" />
                      <stop offset="50%" stopColor="#e9ddc8" />
                      <stop offset="100%" stopColor="#e9ddc8" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              )}
            </motion.div>
          </motion.h1>

          {/* Service Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className={`flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mt-4 sm:mt-6 md:mt-8 lg:mt-10 ${
              dimensions.width < 768 ? 'justify-center' : 'lg:justify-start'
            }`}
          >
            {serviceTags.map(({ text, icon: Icon, color }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`relative ${
                  dimensions.width < 360 ? 'px-2 py-1 text-[8px]' :
                  dimensions.width < 480 ? 'px-3 py-1.5 text-[10px]' :
                  dimensions.width < 640 ? 'px-4 py-2 text-xs' :
                  'px-5 py-2.5 text-sm'
                } bg-[#e9ddc8]/10 backdrop-blur-sm border border-[#e9ddc8]/30 rounded-full text-[#e9ddc8] font-medium flex items-center gap-1 sm:gap-1.5`}>
                  <Icon className={`${
                    dimensions.width < 480 ? 'w-2.5 h-2.5' : 
                    dimensions.width < 640 ? 'w-3 h-3' : 'w-4 h-4'
                  }`} />
                  {text}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className={`flex flex-col xs:flex-row gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8 lg:mt-10 ${
              dimensions.width < 768 ? 'items-center' : 'lg:justify-start'
            }`}
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-full xs:w-auto"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e9ddc8] to-[#d4c4a8] rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              <div className={`relative ${getButtonSize()} bg-[#e9ddc8] text-[#502d13] rounded-xl font-display font-semibold transition-all duration-300 flex items-center gap-2 justify-center`}>
                Explore Services
                <ArrowRight className={`${
                  dimensions.width < 480 ? 'w-3 h-3' : 
                  dimensions.width < 640 ? 'w-3.5 h-3.5' : 'w-5 h-5'
                } group-hover:translate-x-2 transition-transform duration-300`} />
              </div>
            </motion.a>

            {dimensions.width >= 480 && (
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full xs:w-auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#e9ddc8]/50 to-[#d4c4a8]/50 rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <div className={`relative ${getButtonSize()} bg-transparent border-2 border-[#e9ddc8]/30 text-[#e9ddc8] rounded-xl font-display font-semibold hover:bg-[#e9ddc8]/10 transition-all duration-300 flex items-center gap-2 justify-center`}>
                  Contact Us
                </div>
              </motion.a>
            )}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className={`grid grid-cols-${statsColumns} gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-16`}
          >
            {visibleStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 1.9 + i * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#e9ddc8]/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-[#e9ddc8]/5 backdrop-blur-sm border border-[#e9ddc8]/20 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 mx-auto mb-1 sm:mb-2 rounded-lg bg-gradient-to-br ${stat.color} p-1 sm:p-1.5 md:p-2`}
                  >
                    <stat.icon className="w-full h-full text-white" />
                  </motion.div>
                  <div className={`${
                    dimensions.width < 360 ? 'text-sm' :
                    dimensions.width < 480 ? 'text-base' :
                    dimensions.width < 640 ? 'text-lg' :
                    dimensions.width < 768 ? 'text-xl' :
                    'text-2xl'
                  } font-display font-bold text-[#e9ddc8]`}>
                    {stat.value}
                  </div>
                  <div className={`${
                    dimensions.width < 360 ? 'text-[8px]' :
                    dimensions.width < 480 ? 'text-[9px]' :
                    dimensions.width < 640 ? 'text-[10px]' :
                    dimensions.width < 768 ? 'text-xs' :
                    'text-sm'
                  } text-[#e9ddc8]/60 mt-0.5 sm:mt-1`}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: opacity.get() * (1 - scrollProgress) }}
        className={`absolute left-1/2 -translate-x-1/2 ${
          dimensions.width < 480 ? 'bottom-1' :
          dimensions.width < 640 ? 'bottom-2' :
          dimensions.width < 768 ? 'bottom-3' :
          'bottom-4 md:bottom-8'
        }`}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-0.5 sm:gap-1 group cursor-pointer"
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className={`${
            dimensions.width < 360 ? 'text-[6px]' :
            dimensions.width < 480 ? 'text-[7px]' :
            dimensions.width < 640 ? 'text-[8px]' :
            'text-[10px] md:text-xs'
          } text-[#e9ddc8]/60 uppercase tracking-widest group-hover:text-[#e9ddc8] transition-colors`}>
            Scroll
          </span>
          <ChevronDown className={`${
            dimensions.width < 360 ? 'w-2.5 h-2.5' :
            dimensions.width < 480 ? 'w-3 h-3' :
            dimensions.width < 640 ? 'w-3.5 h-3.5' :
            'w-4 h-4 md:w-5 md:h-5'
          } text-[#e9ddc8]/60 group-hover:text-[#e9ddc8] transition-colors`} />
          
          {/* Pulsing rings */}
          {dimensions.width >= 768 && (
            <>
              <motion.div
                className="absolute -inset-2 border border-[#e9ddc8]/20 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -inset-4 border border-[#e9ddc8]/10 rounded-full"
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Quick Actions Bar - Mobile & Tablet */}
      <AnimatePresence>
        {dimensions.width < 1024 && showQuickActions && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-[#502d13]/95 backdrop-blur-lg border-t border-[#e9ddc8]/20 p-2 sm:p-3 flex justify-around items-center z-50"
          >
            {quickActions.map(({ icon: Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-0.5 sm:gap-1 group"
              >
                <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${color} p-1.5 sm:p-2 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] text-[#e9ddc8]/70 group-hover:text-[#e9ddc8] transition-colors">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed ${
          dimensions.width < 480 ? 'bottom-16 right-2' :
          dimensions.width < 640 ? 'bottom-16 right-3' :
          dimensions.width < 768 ? 'bottom-20 right-3' :
          dimensions.width < 1024 ? 'bottom-20 right-4' :
          'bottom-4 right-4 md:bottom-8 md:right-8'
        } z-50 bg-gradient-to-br from-[#e9ddc8] to-[#d4c4a8] text-[#502d13] ${
          dimensions.width < 360 ? 'p-1.5' :
          dimensions.width < 480 ? 'p-2' :
          dimensions.width < 640 ? 'p-2.5' :
          dimensions.width < 768 ? 'p-3' :
          'p-3 md:p-4'
        } rounded-full shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 group`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowRight className={`${
          dimensions.width < 360 ? 'w-2.5 h-2.5' :
          dimensions.width < 480 ? 'w-3 h-3' :
          dimensions.width < 640 ? 'w-3.5 h-3.5' :
          dimensions.width < 768 ? 'w-4 h-4' :
          'w-4 h-4 md:w-6 md:h-6'
        } rotate-[-90deg] group-hover:translate-y-1 transition-transform`} />
      </motion.button>

      {/* Add bottom padding for mobile when quick actions are visible */}
      {dimensions.width < 1024 && showQuickActions && (
        <style>{`
          @media (max-width: 1023px) {
            body {
              padding-bottom: ${dimensions.width < 480 ? '64px' : 
                              dimensions.width < 640 ? '72px' : 
                              '80px'};
            }
          }
        `}</style>
      )}
    </section>
  );
};

export default HeroSection;