import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Construction site at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-copper/10 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Grid lines decoration */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(38 42% 85%) 1px, transparent 1px), linear-gradient(90deg, hsl(38 42% 85%) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-copper/20 backdrop-blur-sm border border-copper/30 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
          <span className="text-copper-foreground text-sm font-medium tracking-wide">India's #1 Construction Marketplace</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-foreground leading-[0.95] mb-6"
        >
          India's
          <br />
          <span className="relative">
            Construction
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 12" fill="none">
              <path d="M2 10C80 2 180 2 398 10" stroke="hsl(25, 80%, 45%)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
          <br />
          Marketplace
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-primary-foreground/70 text-lg md:text-xl font-body max-w-2xl mx-auto mb-10 tracking-wide"
        >
          Transport • Rental • Contractors • Materials — All in One Platform
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#services"
            className="group bg-copper text-copper-foreground px-8 py-4 rounded-xl font-display font-semibold text-lg hover:bg-gold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            Explore Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-xl font-display font-semibold text-lg hover:bg-primary-foreground/20 transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Vendors" },
            { value: "50+", label: "Cities" },
            { value: "10K+", label: "Projects" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-copper font-display font-bold text-2xl md:text-3xl">{stat.value}</div>
              <div className="text-primary-foreground/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/40 text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 text-copper/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
