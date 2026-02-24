import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Package, Truck, HardHat, Wrench, ArrowRight, Sparkles } from "lucide-react";

const coreServices = [
  {
    icon: Package,
    title: "Products",
    description: "Premium construction materials at factory prices. Cement, steel, bricks, and more.",
    features: ["50+ Brands", "Quality Guaranteed", "Bulk Discounts"],
    color: "from-amber-600 to-orange-600",
    bgImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
  },
  {
    icon: Truck,
    title: "Transport",
    description: "Fast, reliable logistics with real-time tracking for your construction materials.",
    features: [ "Real-time Tracking", "Insurance Covered"],
    color: "from-blue-600 to-cyan-600",
    bgImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=500",
  },
  {
    icon: Wrench,
    title: "Rental",
    description: "Heavy equipment and machinery on flexible rental terms. JCB, cranes, and more.",
    features: ["Latest Models", "Maintained Fleet", "Operator Available"],
    color: "from-purple-600 to-pink-600",
    bgImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500",
  },
  {
    icon: HardHat,
    title: "Contractors",
    description: "Verified professionals and skilled workforce for your construction needs.",
    features: ["Background Verified", "Skill Tested", "Insurance Covered"],
    color: "from-green-600 to-emerald-600",
    bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
  },
];

const CoreServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} className="py-24 bg-[#e9ddc8] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#502d13] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#502d13] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#502d13] text-[#e9ddc8] px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Premium Services</span>
          </motion.div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#502d13] mt-3">
            Everything Under One Roof
          </h2>
          <p className="text-[#502d13]/60 text-lg max-w-2xl mx-auto mt-4">
            From raw materials to skilled workforce — we've got your construction needs covered
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Background Image with Overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: hoveredCard === i ? 1.1 : 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={service.bgImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-90 mix-blend-multiply`} />
                </motion.div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <motion.div
                    animate={{ y: hoveredCard === i ? -20 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <h3 className="font-display font-bold text-2xl mb-2">{service.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{service.description}</p>
                    
                    {/* Features that appear on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: hoveredCard === i ? 1 : 0,
                        height: hoveredCard === i ? "auto" : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2 mb-4 overflow-hidden"
                    >
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1 h-1 bg-white rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </motion.div>
                    
                    <motion.div
                      animate={{ x: hoveredCard === i ? 10 : 0 }}
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      Learn More <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;