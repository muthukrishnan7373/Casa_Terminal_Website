import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Truck, HardHat, Wrench } from "lucide-react";

const coreServices = [
  {
    icon: Package,
    title: "Products",
    description: "Cement, bricks, steel, and all essential construction materials at competitive prices.",
    color: "bg-copper/10 text-copper",
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Reliable construction logistics and material delivery across every Indian city.",
    color: "bg-gold/10 text-gold",
  },
  {
    icon: Wrench,
    title: "Rental",
    description: "JCB, scaffolding, cranes, and heavy equipment available for rent on demand.",
    color: "bg-earth/10 text-earth",
  },
  {
    icon: HardHat,
    title: "Contractors",
    description: "Verified builders, masons, electricians & workforce for your construction needs.",
    color: "bg-copper/10 text-copper",
  },
];

const CoreServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-24 bg-section-gradient relative">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-copper/20" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-sm font-semibold uppercase tracking-[0.2em]">What We Offer</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mt-3">
            Our Core Services
          </h2>
          <div className="w-20 h-1 bg-copper mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative bg-card rounded-2xl p-8 border border-border hover:border-copper/30 transition-all duration-500 card-shine cursor-pointer hover:shadow-luxury hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                <div className="mt-6 flex items-center gap-1 text-copper text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
