import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Eye, Users, Award, Clock } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All materials tested and certified for construction standards",
    stat: "100%",
    statLabel: "Quality Checked",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Same-day delivery and instant service booking",
    stat: "24/7",
    statLabel: "Service Available",
  },
  {
    icon: Eye,
    title: "Best Prices",
    description: "Direct from manufacturers, no middlemen markup",
    stat: "30%",
    statLabel: "Cost Savings",
  },
  {
    icon: Users,
    title: "Expert Network",
    description: "10,000+ verified contractors and skilled workers",
    stat: "10k+",
    statLabel: "Professionals",
  },
  {
    icon: Award,
    title: "Trusted Brand",
    description: "Preferred by top construction companies in India",
    stat: "500+",
    statLabel: "Corporate Clients",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer service and site support",
    stat: "24/7",
    statLabel: "Support Available",
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 bg-[#502d13] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#e9ddc8]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#e9ddc8]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#e9ddc8]/60 text-sm font-semibold uppercase tracking-[0.2em]">
            Why Choose Us
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#e9ddc8] mt-3">
            The CASA Terminal Advantage
          </h2>
          <div className="w-24 h-1 bg-[#e9ddc8] mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
                className="group relative bg-[#e9ddc8]/5 backdrop-blur-sm border border-[#e9ddc8]/10 rounded-2xl p-8 hover:bg-[#e9ddc8]/10 transition-all duration-500 overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#e9ddc8]/0 via-[#e9ddc8]/5 to-[#e9ddc8]/0"
                  animate={{
                    x: activeIndex === i ? ["-100%", "200%"] : "-100%",
                  }}
                  transition={{ duration: 1.5, repeat: activeIndex === i ? Infinity : 0 }}
                />

                {/* Icon with Animation */}
                <motion.div
                  animate={{ rotate: activeIndex === i ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 rounded-2xl bg-[#e9ddc8] flex items-center justify-center mb-6"
                >
                  <Icon className="w-8 h-8 text-[#502d13]" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display font-bold text-xl text-[#e9ddc8] mb-3">
                  {reason.title}
                </h3>
                <p className="text-[#e9ddc8]/60 text-sm leading-relaxed mb-4">
                  {reason.description}
                </p>

                {/* Stat that appears on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-[#e9ddc8]/20"
                >
                  <div className="text-2xl font-display font-bold text-[#e9ddc8]">
                    {reason.stat}
                  </div>
                  <div className="text-[#e9ddc8]/40 text-xs">
                    {reason.statLabel}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;