import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Shield, Eye, Zap } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "All-in-One Platform",
    description: "Every construction need — materials, transport, rental, and contractors — under one roof.",
  },
  {
    icon: Check,
    title: "Verified Partners",
    description: "All suppliers and contractors are background-verified for quality and trust.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    description: "Compare quotes side-by-side. No hidden charges, no middlemen.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Quick service booking and speedy material delivery to your project site.",
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-sand-light relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full border border-copper/10" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full border border-copper/10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-copper text-sm font-semibold uppercase tracking-[0.2em]">Why Us</span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mt-3">
            Why Choose CASA TERMINAL
          </h2>
          <div className="w-20 h-1 bg-copper mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-copper/10 border border-copper/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-copper group-hover:border-copper transition-all duration-300">
                  <Icon className="w-7 h-7 text-copper group-hover:text-copper-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{reason.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
