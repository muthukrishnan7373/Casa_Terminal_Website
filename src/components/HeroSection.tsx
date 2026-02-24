import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Truck, HardHat, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Mouse move effect for 3D tilt - responsive breakpoint
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dimensions.width < 1024) return; // Changed from 768 to 1024 for better desktop experience
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX - innerWidth / 2) / 30,
      y: (clientY - innerHeight / 2) / 30,
    });
  };

  // Service icons data for floating animation
  const serviceIcons = [
    { Icon: Truck, delay: 0, position: { top: '10%', right: '5%' } },
    { Icon: HardHat, delay: 0.5, position: { top: '30%', right: '15%' } },
    { Icon: Users, delay: 1, position: { top: '50%', right: '8%' } },
    { Icon: Award, delay: 1.5, position: { top: '70%', right: '12%' } },
  ];

  // Responsive title sizes based on screen width
  const getTitleClasses = () => {
    if (dimensions.width < 360) return "text-3xl mt-1";
    if (dimensions.width < 400) return "text-4xl mt-1.5";
    if (dimensions.width < 480) return "text-5xl mt-2";
    if (dimensions.width < 640) return "text-6xl mt-2.5";
    if (dimensions.width < 768) return "text-6xl mt-3";
    if (dimensions.width < 1024) return "text-7xl mt-3.5";
    if (dimensions.width < 1280) return "text-7xl mt-4";
    return "text-8xl mt-4";
  };

  // Responsive container padding
  const getContainerPadding = () => {
    if (dimensions.width < 360) return "px-3";
    if (dimensions.width < 400) return "px-4";
    if (dimensions.width < 480) return "px-5";
    if (dimensions.width < 640) return "px-6";
    if (dimensions.width < 768) return "px-7";
    if (dimensions.width < 1024) return "px-8";
    return "px-8 lg:px-12";
  };

  // Responsive description text size
  const getDescriptionClasses = () => {
    if (dimensions.width < 360) return "text-xs";
    if (dimensions.width < 480) return "text-sm";
    if (dimensions.width < 640) return "text-base";
    if (dimensions.width < 768) return "text-lg";
    return "text-xl";
  };

  // Responsive button size
  const getButtonClasses = () => {
    if (dimensions.width < 360) return "px-5 py-2.5 text-xs";
    if (dimensions.width < 480) return "px-6 py-3 text-sm";
    if (dimensions.width < 640) return "px-7 py-3.5 text-base";
    if (dimensions.width < 768) return "px-8 py-4 text-base";
    return "px-8 md:px-10 py-3 md:py-4 text-base md:text-lg";
  };

  // Responsive particle count
  const particleCount = dimensions.width < 360 ? 5 : 
                       dimensions.width < 480 ? 8 : 
                       dimensions.width < 640 ? 12 : 
                       dimensions.width < 768 ? 15 : 
                       dimensions.width < 1024 ? 20 : 30;

  // Responsive icon size
  const getIconSize = () => {
    if (dimensions.width < 1280) return "w-12 h-12";
    if (dimensions.width < 1536) return "w-14 h-14";
    return "w-16 h-16";
  };

  const getIconInnerSize = () => {
    if (dimensions.width < 1280) return "w-6 h-6";
    if (dimensions.width < 1536) return "w-7 h-7";
    return "w-8 h-8";
  };

  // Responsive spacing
  const getMainSpacing = () => {
    if (dimensions.width < 360) return "mt-4";
    if (dimensions.width < 480) return "mt-5";
    if (dimensions.width < 640) return "mt-6";
    if (dimensions.width < 768) return "mt-7";
    return "mt-8 md:mt-10";
  };

  const getDescriptionSpacing = () => {
    if (dimensions.width < 360) return "mt-4";
    if (dimensions.width < 480) return "mt-5";
    if (dimensions.width < 640) return "mt-6";
    return "mt-6 md:mt-8";
  };

  const getDescriptionPadding = () => {
    if (dimensions.width < 360) return "pl-4";
    if (dimensions.width < 480) return "pl-8";
    if (dimensions.width < 640) return "pl-12";
    if (dimensions.width < 768) return "pl-16";
    if (dimensions.width < 1024) return "pl-20";
    return "pl-20";
  };

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-[#502d13] to-[#7b4a26]"
    >
      {/* Parallax Background with 3D Effect */}
      <motion.div 
        style={{ 
          y, 
          rotateX: dimensions.width >= 1024 ? mousePosition.y : 0, // Changed from 768 to 1024
          rotateY: dimensions.width >= 1024 ? mousePosition.x : 0, // Changed from 768 to 1024
        }} 
        className="absolute inset-0 transform-gpu"
      >
        <img
          src={heroImage}
          alt="Construction site"
          className="w-full h-full object-cover"
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#502d13] via-[#502d13]/90 to-[#502d13]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#502d13] via-transparent to-transparent" />
      </motion.div>

      {/* Animated floating particles - responsive count */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#e9ddc8]/20 rounded-full"
            initial={{
              x: Math.random() * (dimensions.width || 1000),
              y: Math.random() * (dimensions.height || 1000),
            }}
            animate={{
              y: [null, -100],
              x: Math.random() * 20 - 10,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating service icons - responsive visibility */}
      <div className={`absolute inset-0 pointer-events-none ${
        dimensions.width < 1024 ? 'hidden' : // Changed from lg:block to dynamic class
        dimensions.width >= 1024 ? 'block' : 'hidden'
      }`}>
        {serviceIcons.map(({ Icon, delay, position }, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={position}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + delay, duration: 0.5 }}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: delay,
              }}
            >
              <div className={`${getIconSize()} bg-[#e9ddc8]/10 backdrop-blur-sm border border-[#e9ddc8]/20 rounded-2xl flex items-center justify-center`}>
                <Icon className={`${getIconInnerSize()} text-[#e9ddc8]`} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className={`relative z-10 container mx-auto ${getContainerPadding()} h-full flex items-center`}>
        <div className="w-full max-w-5xl mx-auto">
          {/* Main Heading - Responsive text sizes */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={`text-center ${dimensions.width >= 1024 ? 'lg:text-left' : ''}`} // Adjusted breakpoint
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`${getTitleClasses()} font-display font-bold text-[#e9ddc8] leading-tight`}
            >
              India's
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`${getTitleClasses()} font-display font-bold text-[#e9ddc8] leading-tight`}
            >
              Construction
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative inline-block"
            >
              <span className={`${getTitleClasses()} font-display font-bold bg-gradient-to-r from-[#e9ddc8] to-[#d4c4a8] bg-clip-text text-transparent`}>
                Marketplace
              </span>
              
              {/* Animated underline - responsive visibility */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className={`absolute -bottom-7 left-0 w-full ${
                  dimensions.width < 640 ? 'hidden' : // Changed from md:block to dynamic
                  dimensions.width >= 640 ? 'block' : 'hidden'
                }`}
                viewBox="0 0 400 20"
                fill="none"
              >
                <motion.path
                  d="M2 15C80 7 180 3 398 15"
                  stroke="#e9ddc8"
                  strokeWidth={dimensions.width < 768 ? "3" : "4"} // Responsive stroke width
                  strokeLinecap="round"
                  strokeDasharray={dimensions.width < 768 ? "4 4" : "5 5"} // Responsive dash array
                  animate={{ strokeDashoffset: [0, 10] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.svg>
            </motion.div>
          </motion.h1>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className={`relative ${getDescriptionSpacing()}`}
          >
            <motion.p
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`text-[#e9ddc8]/80 ${getDescriptionClasses()} text-center ${
                dimensions.width >= 1024 ? 'lg:text-left' : ''
              } max-w-2xl mx-auto lg:mx-0 leading-relaxed ${getDescriptionPadding()}`}
            >
              Transport • Rental • Contractors • Materials
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className={`flex flex-col ${
              dimensions.width >= 480 ? 'sm:flex-row' : 'flex-col'
            } gap-${dimensions.width < 360 ? '2' : dimensions.width < 480 ? '3' : '4'} justify-center ${
              dimensions.width >= 1024 ? 'lg:justify-start' : ''
            } ${getMainSpacing()}`}
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group ${getButtonClasses()} bg-[#e9ddc8] text-[#502d13] rounded-xl font-display font-semibold hover:shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 flex items-center gap-2 justify-center`}
            >
              Explore Services
              <ArrowRight className={`${
                dimensions.width < 360 ? 'w-3 h-3' : 
                dimensions.width < 480 ? 'w-3.5 h-3.5' : 
                'w-4 h-4 md:w-5 md:h-5'
              } group-hover:translate-x-1 transition-transform`} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className={`absolute left-1/2 -translate-x-1/2 ${
          dimensions.width < 360 ? 'bottom-2' :
          dimensions.width < 480 ? 'bottom-3' :
          dimensions.width < 640 ? 'bottom-4' :
          dimensions.width < 768 ? 'bottom-4' :
          'bottom-4 md:bottom-8'
        }`}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 md:gap-2 group cursor-pointer"
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className={`${
            dimensions.width < 360 ? 'text-[8px]' :
            dimensions.width < 480 ? 'text-[9px]' :
            'text-[10px] md:text-xs'
          } text-[#e9ddc8]/40 uppercase tracking-widest group-hover:text-[#e9ddc8] transition-colors`}>
            Scroll
          </span>
          <ChevronDown className={`${
            dimensions.width < 360 ? 'w-3 h-3' :
            dimensions.width < 480 ? 'w-3.5 h-3.5' :
            'w-4 h-4 md:w-5 md:h-5'
          } text-[#e9ddc8]/60 group-hover:text-[#e9ddc8] transition-colors`} />
          
          {/* Pulsing ring - responsive visibility */}
          <motion.div
            className={`absolute -inset-4 border border-[#e9ddc8]/20 rounded-full ${
              dimensions.width < 768 ? 'hidden' : // Changed from md:block to dynamic
              dimensions.width >= 768 ? 'block' : 'hidden'
            }`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Back to Top Button - responsive positioning */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed ${
          dimensions.width < 360 ? 'bottom-3 right-3 p-2' :
          dimensions.width < 480 ? 'bottom-4 right-4 p-2.5' :
          dimensions.width < 640 ? 'bottom-4 right-4 p-3' :
          dimensions.width < 768 ? 'bottom-4 right-4 p-3' :
          'bottom-4 right-4 md:bottom-8 md:right-8 p-3 md:p-4'
        } z-50 bg-[#e9ddc8] text-[#502d13] rounded-full shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 group`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowRight className={`${
          dimensions.width < 360 ? 'w-3 h-3' :
          dimensions.width < 480 ? 'w-3.5 h-3.5' :
          dimensions.width < 640 ? 'w-4 h-4' :
          'w-4 h-4 md:w-6 md:h-6'
        } rotate-[-90deg] group-hover:translate-y-1 transition-transform`} />
      </motion.button>
    </section>
  );
};

export default HeroSection;