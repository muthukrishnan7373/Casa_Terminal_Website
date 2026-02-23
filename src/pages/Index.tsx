import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceCarousel from "@/components/ServiceCarousel";
import CoreServices from "@/components/CoreServices";
import WhyChoose from "@/components/WhyChoose";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServiceCarousel />
      <CoreServices />
      <WhyChoose />
      <Footer />
    </div>
  );
};

export default Index;
