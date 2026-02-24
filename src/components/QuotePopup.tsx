import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, User, MessageSquare } from "lucide-react";

interface QuotePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuotePopup = ({ isOpen, onClose }: QuotePopupProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    details: "",
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        details: "",
      });
      setFormErrors({});
      setIsSuccess(false);
      setCurrentStep(1);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!formData.service) {
      errors.service = "Please select a service";
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setIsSuccess(true);
      
      // Close after success message
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const step1Errors: Record<string, string> = {};
      if (!formData.name) step1Errors.name = "Name is required";
      if (!formData.phone) step1Errors.phone = "Phone is required";
      
      if (Object.keys(step1Errors).length > 0) {
        setFormErrors(step1Errors);
        return;
      }
    }
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-[#e9ddc8] rounded-2xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#502d13] rounded-2xl sm:rounded-3xl z-10 flex flex-col items-center justify-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl sm:text-2xl font-display font-bold text-[#e9ddc8] mb-2"
                  >
                    Request Sent!
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#e9ddc8]/80 text-sm sm:text-base text-center"
                  >
                    We'll get back to you within 24 hours
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header - Sticky on mobile */}
            <div className="sticky top-0 bg-[#e9ddc8] z-10 p-4 sm:p-6 border-b border-[#502d13]/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-[#502d13]">
                    Get Free Quote
                  </h3>
                  <p className="text-[#502d13]/60 text-xs sm:text-sm mt-1">
                    Fill in your details and we'll respond within 24 hours
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#502d13]/10 flex items-center justify-center hover:bg-[#502d13]/20 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]" />
                </button>
              </div>

              {/* Progress Steps - Mobile */}
              {isMobile && (
                <div className="flex items-center justify-between mt-4">
                  {[1, 2].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        currentStep >= step 
                          ? 'bg-[#502d13] text-[#e9ddc8]' 
                          : 'bg-[#502d13]/20 text-[#502d13]/60'
                      }`}>
                        {step}
                      </div>
                      {step === 1 && (
                        <div className={`flex-1 h-0.5 mx-2 ${
                          currentStep > step ? 'bg-[#502d13]' : 'bg-[#502d13]/20'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Step 1: Basic Info */}
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Name Input with Icon */}
                      <div>
                        <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]/40" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl focus:outline-none transition-colors text-sm sm:text-base ${
                              formErrors.name 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-[#502d13]/20 focus:border-[#502d13]'
                            }`}
                            placeholder="John Doe"
                          />
                        </div>
                        {formErrors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Phone Input with Icon */}
                      <div>
                        <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]/40" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl focus:outline-none transition-colors text-sm sm:text-base ${
                              formErrors.phone 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-[#502d13]/20 focus:border-[#502d13]'
                            }`}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>

                      {/* Next Button for Mobile */}
                      {isMobile && (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="w-full bg-[#502d13] text-[#e9ddc8] py-3 rounded-xl font-semibold text-sm hover:bg-[#7b4a26] transition-colors mt-4"
                        >
                          Next Step
                        </button>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Additional Info */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Email Input with Icon */}
                      <div>
                        <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]/40" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white border rounded-xl focus:outline-none transition-colors text-sm sm:text-base ${
                              formErrors.email 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-[#502d13]/20 focus:border-[#502d13]'
                            }`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {formErrors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Service Selection */}
                      <div>
                        <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                          Service Required <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className={`w-full px-4 py-2.5 sm:py-3 bg-white border rounded-xl focus:outline-none transition-colors text-sm sm:text-base ${
                            formErrors.service 
                              ? 'border-red-500 focus:border-red-500' 
                              : 'border-[#502d13]/20 focus:border-[#502d13]'
                          }`}
                          required
                        >
                          <option value="">Select a service</option>
                          <option value="products">🏗️ Construction Materials</option>
                          <option value="transport">🚚 Transport & Logistics</option>
                          <option value="rental">🔧 Equipment Rental</option>
                          <option value="contractors">👷 Contractors & Labor</option>
                        </select>
                        {formErrors.service && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {formErrors.service}
                          </p>
                        )}
                      </div>

                      {/* Project Details */}
                      <div>
                        <label className="block text-[#502d13] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                          Project Details
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-[#502d13]/40" />
                          <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            rows={isMobile ? 3 : 4}
                            className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-[#502d13]/20 rounded-xl focus:outline-none focus:border-[#502d13] transition-colors text-sm sm:text-base resize-none"
                            placeholder="Tell us about your project requirements..."
                          />
                        </div>
                      </div>

                      {/* Navigation Buttons for Mobile */}
                      {isMobile && (
                        <div className="flex gap-3 mt-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="flex-1 bg-[#502d13]/10 text-[#502d13] py-3 rounded-xl font-semibold text-sm hover:bg-[#502d13]/20 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-[#502d13] text-[#e9ddc8] py-3 rounded-xl font-semibold text-sm hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-[#e9ddc8] border-t-transparent rounded-full animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Submit
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Desktop: Show all fields with submit button */}
                {!isMobile && (
                  <>
                    {/* All fields shown on desktop (already in DOM) */}
                    <div className="space-y-4">
                      {/* All fields are already rendered above */}
                    </div>
                    
                    {/* Submit Button for Desktop */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#502d13] text-[#e9ddc8] py-3 sm:py-4 rounded-xl font-display font-semibold text-base sm:text-lg hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-[#e9ddc8] border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </>
                )}
              </form>

              {/* Trust Badge */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#502d13]/10">
                <p className="text-[#502d13]/40 text-xs text-center">
                  ✓ Your information is secure and will not be shared
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuotePopup;