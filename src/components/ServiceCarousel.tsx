import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Clock, MapPin, Package, HardHat, Wrench, Sparkles } from "lucide-react";

const services = [
  {
    title: "Premium Cement",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500",
    price: "₹350/bag",
    rating: 4.5,
    delivery: "24hrs",
    location: "All Cities",
  },
  {
    title: "JCB Rentals",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500",
    price: "₹1200/hr",
    rating: 4.8,
    delivery: "Same Day",
    location: "Major Cities",
  },
  {
    title: "Steel TMT Bars",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
    price: "₹65/kg",
    rating: 4.6,
    delivery: "48hrs",
    location: "All Cities",
  },
  {
    title: "Skilled Masons",
    category: "Labor",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
    price: "₹800/day",
    rating: 4.7,
    delivery: "24hrs",
    location: "Metros",
  },
  {
    title: "Scaffolding",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500",
    price: "₹50/sqft",
    rating: 4.4,
    delivery: "Same Day",
    location: "All Cities",
  },
  {
    title: "Architects",
    category: "Services",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4f?w=500",
    price: "Custom",
    rating: 4.9,
    delivery: "Flexible",
    location: "Remote",
  },
];

const ServiceCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (inView) setIsInView(true);
  }, [inView]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const isMobile = windowWidth < 640;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? 280 : 320;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      const newIndex = direction === "left" 
        ? Math.max(0, currentIndex - 1)
        : Math.min(services.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      scroll("right");
    } else if (isRightSwipe) {
      scroll("left");
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? 280 : 320;
      const gap = 24;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = isMobile ? 280 : 320;
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(services.length - 1, Math.max(0, newIndex)));
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="py-12 sm:py-16 md:py-20 bg-[#e9ddc8] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#502d13] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#502d13] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* "Everything Under One Roof" Section - Added */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#502d13] text-[#e9ddc8] px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold">Complete Solutions</span>
          </motion.div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#502d13] mt-2 md:mt-3 px-4">
            Everything Under One Roof
          </h2>
          <p className="text-[#502d13]/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-2 md:mt-4 px-4">
            From premium materials to expert contractors — all your construction needs in one place
          </p>

          {/* Service Categories */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6 md:mt-8">
            {[
              { icon: Package, label: "Products" },
              { icon: Wrench, label: "Rental" },
              { icon: HardHat, label: "Contractors" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md"
              >
                <item.icon className="w-4 h-4 text-[#502d13]" />
                <span className="text-sm font-medium text-[#502d13]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 md:mb-10"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#502d13]">
              Featured Services
            </h2>
            <p className="text-[#502d13]/60 text-sm sm:text-base mt-1 sm:mt-2">
              Hand-picked solutions for your project
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-3 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left")}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#502d13] text-[#e9ddc8] flex items-center justify-center hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right")}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#502d13] text-[#e9ddc8] flex items-center justify-center hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
              disabled={currentIndex === services.length - 1}
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#e9ddc8] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#e9ddc8] to-transparent z-10 pointer-events-none" />

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto pb-6 sm:pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: isMobile ? 0 : -10 }}
                onClick={() => isMobile && setSelectedService(selectedService === i ? null : i)}
                className={`group flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] snap-start cursor-pointer ${
                  isMobile ? 'active:scale-95 transition-transform' : ''
                }`}
              >
                <div className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  selectedService === i ? 'ring-2 ring-[#502d13]' : ''
                }`}>
                  {/* Image Container */}
                  <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-[#502d13] text-[#e9ddc8] text-[10px] sm:text-xs px-2 py-1 rounded-full">
                      {service.category}
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-[#e9ddc8] text-[#502d13] text-xs sm:text-sm font-bold px-2 py-1 rounded-full shadow-lg">
                      {service.price}
                    </div>

                    {/* Rating Badge - Mobile Only */}
                    {isMobile && (
                      <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{service.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="font-display font-bold text-base sm:text-lg md:text-xl text-[#502d13] mb-1 sm:mb-2">
                      {service.title}
                    </h3>
                    
                    {/* Desktop Rating */}
                    {!isMobile && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-[#502d13]">{service.rating}</span>
                        </div>
                        <span className="text-[#502d13]/40">•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-[#502d13]/60" />
                          <span className="text-xs text-[#502d13]/60">{service.delivery}</span>
                        </div>
                      </div>
                    )}

                    {/* Mobile: Show extra details when selected */}
                    {isMobile && selectedService === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 mb-3 pt-2 border-t border-[#502d13]/10">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-[#502d13]">{service.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#502d13]/60" />
                            <span className="text-xs text-[#502d13]/60">{service.delivery}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#502d13]/60" />
                            <span className="text-xs text-[#502d13]/60">{service.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Desktop: Always show description */}
                    {!isMobile && (
                      <p className="text-[#502d13]/60 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                        Premium quality guaranteed with manufacturer warranty
                      </p>
                    )}

                    {/* Book Now Button */}
                    <button 
                      className={`text-[#502d13] font-semibold flex items-center gap-1 sm:gap-2 group/btn text-sm sm:text-base ${
                        isMobile ? 'w-full justify-center py-2 bg-[#502d13]/5 rounded-lg' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Book:', service.title);
                      }}
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'w-6 bg-[#502d13]' 
                    : 'w-2 bg-[#502d13]/30'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-8 lg:mt-10"
        >
          <a
            href="#all-services"
            className="inline-flex items-center gap-2 text-[#502d13] font-semibold hover:gap-3 transition-all duration-300 group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ServiceCarousel;