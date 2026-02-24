import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const services = [
  {
    title: "Premium Cement",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500",
    price: "₹350/bag",
  },
  {
    title: "JCB Rentals",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500",
    price: "₹1200/hr",
  },
  {
    title: "Steel TMT Bars",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
    price: "₹65/kg",
  },
  {
    title: "Skilled Masons",
    category: "Labor",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
    price: "₹800/day",
  },
  {
    title: "Scaffolding",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500",
    price: "₹50/sqft",
  },
  {
    title: "Architects",
    category: "Services",
    image: "",
    price: "Custom",
  },
];

const ServiceCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{ scale, opacity }}
      className="py-20 bg-[#e9ddc8] relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#502d13]">
              Featured Services
            </h2>
            <p className="text-[#502d13]/60 mt-2">Hand-picked solutions for your project</p>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full bg-[#502d13] text-[#e9ddc8] flex items-center justify-center hover:bg-[#7b4a26] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#502d13] text-[#e9ddc8] flex items-center justify-center hover:bg-[#7b4a26] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group flex-shrink-0 w-[320px] snap-start"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#502d13] text-[#e9ddc8] text-xs px-3 py-1 rounded-full">
                    {service.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#e9ddc8] text-[#502d13] text-sm font-bold px-3 py-1 rounded-full">
                    {service.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-[#502d13] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#502d13]/60 text-sm mb-4">
                    Premium quality guaranteed with manufacturer warranty
                  </p>
                  <button className="text-[#502d13] font-semibold flex items-center gap-2 group/btn">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ServiceCarousel;