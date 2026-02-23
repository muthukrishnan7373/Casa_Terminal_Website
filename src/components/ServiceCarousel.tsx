import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import transportImg from "@/assets/service-transport.jpg";
import contractorsImg from "@/assets/service-contractors.jpg";
import productsImg from "@/assets/service-products.jpg";
import rentalImg from "@/assets/service-rental.jpg";

const services = [
  {
    title: "Transport",
    description: "Construction logistics & material delivery across India",
    image: transportImg,
  },
  {
    title: "Contractors",
    description: "Verified builders & skilled workforce for every project",
    image: contractorsImg,
  },
  {
    title: "Seller",
    description: "Connect with trusted construction material suppliers",
    image: productsImg,
  },
  {
    title: "Products",
    description: "Cement, bricks, steel & all construction materials",
    image: productsImg,
  },
  {
    title: "Rental",
    description: "JCB, scaffolding & heavy equipment on rent",
    image: rentalImg,
  },
];

const ServiceCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <span className="text-copper text-sm font-semibold uppercase tracking-widest">Quick Access</span>
            <h2 className="text-primary-foreground font-display font-bold text-2xl md:text-3xl mt-1">
              Browse Services
            </h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-copper/30 flex items-center justify-center text-primary-foreground/60 hover:bg-copper/10 hover:text-copper transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-copper/30 flex items-center justify-center text-primary-foreground/60 hover:bg-copper/10 hover:text-copper transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, i) => (
            <motion.a
              key={service.title}
              href="#"
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex-shrink-0 w-[280px] snap-start rounded-xl overflow-hidden relative cursor-pointer"
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-primary-foreground font-display font-bold text-xl mb-1">{service.title}</h3>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{service.description}</p>
                  <div className="flex items-center gap-1 text-copper text-sm font-semibold mt-3 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {services.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-copper" : "bg-primary-foreground/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;
