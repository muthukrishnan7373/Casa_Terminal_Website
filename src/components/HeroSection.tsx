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

  // Mouse move effect for 3D tilt (disabled on mobile)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dimensions.width < 768) return; // Disable on mobile
    
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
          rotateX: dimensions.width >= 768 ? mousePosition.y : 0,
          rotateY: dimensions.width >= 768 ? mousePosition.x : 0,
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

      {/* Animated floating particles - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(dimensions.width < 768 ? 10 : 30)].map((_, i) => (
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

      {/* Floating service icons - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
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
              <div className="w-16 h-16 bg-[#e9ddc8]/10 backdrop-blur-sm border border-[#e9ddc8]/20 rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-[#e9ddc8]" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full max-w-5xl mx-auto">
         

          {/* Main Heading - Responsive text sizes */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[#e9ddc8] leading-tight"
            >
              India's
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[#e9ddc8] leading-tight mt-2"
            >
              Construction
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="relative inline-block"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold bg-gradient-to-r from-[#e9ddc8] to-[#d4c4a8] bg-clip-text text-transparent">
                Marketplace
              </span>
              
              {/* Animated underline - hidden on mobile */}
              <motion.svg
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -bottom-7 left-0 w-full hidden md:block "
                viewBox="0 0 400 20"
                fill="none"
              >
                <motion.path
                  d="M2 15C80 7 180 3 398 15"
                  stroke="#e9ddc8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="5 5"
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
            className="relative mt-6 md:mt-8"
          >
            <motion.p
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#e9ddc8]/80 text-base sm:text-lg ml-6 text-center lg:text-left max-w-2xl mx-auto lg:mx-0 leading-relaxed pl-20"
            >
              Transport • Rental • Contractors • Materials
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8 md:mt-10"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#e9ddc8] text-[#502d13] px-8 md:px-10 py-3 md:py-4 rounded-xl font-display font-semibold text-base md:text-lg hover:shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 flex items-center gap-2 justify-center"
            >
              Explore Services
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 md:gap-2 group cursor-pointer"
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[#e9ddc8]/40 text-[10px] md:text-xs uppercase tracking-widest group-hover:text-[#e9ddc8] transition-colors">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-[#e9ddc8]/60 group-hover:text-[#e9ddc8] transition-colors" />
          
          {/* Pulsing ring - hidden on mobile */}
          <motion.div
            className="absolute -inset-4 border border-[#e9ddc8]/20 rounded-full hidden md:block"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Back to Top Button - adjusted for mobile */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-[#e9ddc8] text-[#502d13] p-3 md:p-4 rounded-full shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 group"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowRight className="w-4 h-4 md:w-6 md:h-6 rotate-[-90deg] group-hover:translate-y-1 transition-transform" />
      </motion.button>
    </section>
  );
};

export default HeroSection;