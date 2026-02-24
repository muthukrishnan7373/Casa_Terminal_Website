import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Play, Award, Truck, HardHat, Users } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Mouse move effect for 3D tilt
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePosition({
      x: (clientX - innerWidth / 1) / 50,
      y: (clientY - innerHeight / 1) / 50,
    });
  };

  // Rotating words
  const rotatingWords = [];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative h-screen overflow-hidden bg-[#b57646] "
    >
      {/* Parallax Background with 3D Effect */}
      <motion.div 
        style={{ 
          y, 
          scale,
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
        }} 
        className="absolute inset-0 transform-gpu"
      >
        <img
          src={heroImage}
          alt="Construction site"
          className="w-full h-full object-cover"
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#502d13] via-[#502d13]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#502d13] via-transparent to-transparent" />
      </motion.div>

      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#e9ddc8]/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
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

      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute border border-[#e9ddc8]/10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              rotate: Math.random() * 360,
            }}
            animate={{
              rotate: [null, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-4xl">
          {/* Premium Badge with Glow Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative inline-block mb-8"
          >
            <motion.div
              className="absolute inset-0 bg-[#e9ddc8]/20 blur-xl rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
          </motion.div>

          {/* Dynamic Main Heading with Rotating Words */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-display font-bold text-6xl md:text-7xl lg:text-8xl text-[#e9ddc8] leading-[0.9] mb-6"
          >
            <motion.span
              key={currentWordIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="mt-6 justify-center flex items-center gap-2 text-[#e9ddc8] font-display font-bold text-6xl md:text-6xl bg-gradient-to-r from-[#e9ddc8] to-[#d4c4a8] bg-clip-text text-transparent"
            >
              {rotatingWords[currentWordIndex]}
            </motion.span>
            {" India’s,".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 + 0.4 }}
                className=" pl-14 gap-2 text-[#e9ddc8] font-display font-bold text-8xl md:text-8xl bg-gradient-to-r from-[#e9ddc8] to-[#d4c4a8] bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
           <br />
            <span className="relative pt-8 pb-4">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-[#e9ddc8] justify-center flex items-center gap-2 mt-2 font-display font-bold text-7xl md:text-7xl bg-gradient-to-r from-[#e9ddc8] to-[#d4c4a8] bg-clip-text text-transparent"
              >
                Construction
                <br></br>
                Marketplace
              </motion.span>
              
              
                <motion.path
                  d="M2 15C80 7 180 3 398 15"
                  stroke="#e9ddc8"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="5 5"
                  animate={{ strokeDashoffset: [0, 10] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              
            </span>
          </motion.h1>

          {/* Enhanced Description with Typing Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="relative"
          >
            <motion.p
              className="text-[#e9ddc8]/80 text-lg md:text-xl max-w-2xl justify-center pl-28"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
             Rental Transport• Contractors • Materials Remove active members, cities covered, orders delivered
            </motion.p>
            
            {/* Floating service icons */}
            <div className="absolute -right-60 -top-20 hidden lg:block pl-28">
              {[Truck, HardHat, Users, Award].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    right: i * 80,
                    top: i * 60,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <div className="w-12 h-12 bg-[#e9ddc8]/10 backdrop-blur-sm border border-[#e9ddc8]/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#e9ddc8]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center pl-28 mt-3"
          >
            <motion.a
              href="#services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-[#e9ddc8] text-[#502d13] px-10 py-4 rounded-xl font-display font-semibold text-lg overflow-hidden"
            >
             
              <span className="relative flex items-center gap-2 ">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a> 
          </motion.div>

          {/* Enhanced Stats with Progress Bars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 pl-20"
          >
            {[
              {  label: "Vendors", progress: 85 },
              {  label: "Cities", progress: 70 },
              {  label: "Projects", progress: 95 },
              { label: "Support", progress: 100 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2 + i * 0.1, type: "spring" }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <div className="text-2xl md:text-3xl font-display font-bold text-[#e9ddc8] ">
                    {stat.label === "Support" ? "24/7" : stat.progress + "%"}
                  </div>
                  <div className="text-[#e9ddc8]/50 text-sm mt-1">{stat.label}</div>
                  
                  {/* Progress bar that fills on hover */}
                  <motion.div
                    className="absolute -bottom-4 left-0 h-0.5 bg-[#e9ddc8]/30 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="h-full bg-[#e9ddc8]"
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.progress}%` }}
                      transition={{ delay: 2.5 + i * 0.1, duration: 1 }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 group cursor-pointer"
          onClick={() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[#e9ddc8]/40 text-xs uppercase tracking-widest group-hover:text-[#e9ddc8] transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-[#e9ddc8]/60 group-hover:text-[#e9ddc8] transition-colors" />
          </motion.div>
          
          {/* Pulsing ring */}
          <motion.div
            className="absolute -inset-4 border border-[#e9ddc8]/20 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Quick Action Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 bg-[#e9ddc8] text-[#502d13] p-4 rounded-full shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 group hidden lg:block"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowRight className="w-6 h-6 rotate-[-90deg] group-hover:translate-y-1 transition-transform" />
      </motion.button>
    </section>
  );
};

export default HeroSection;