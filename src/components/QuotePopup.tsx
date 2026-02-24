import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-[#e9ddc8] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display font-bold text-[#502d13]">
                  Get Free Quote
                </h3>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-[#502d13]/10 flex items-center justify-center hover:bg-[#502d13]/20 transition-colors"
                >
                  <X className="w-5 h-5 text-[#502d13]" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#502d13] text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#502d13]/20 rounded-xl focus:outline-none focus:border-[#502d13] transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-[#502d13] text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#502d13]/20 rounded-xl focus:outline-none focus:border-[#502d13] transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-[#502d13] text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#502d13]/20 rounded-xl focus:outline-none focus:border-[#502d13] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#502d13] text-sm font-medium mb-2">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#502d13]/20 rounded-xl focus:outline-none focus:border-[#502d13] transition-colors"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="products">Construction Materials</option>
                    <option value="transport">Transport & Logistics</option>
                    <option value="rental">Equipment Rental</option>
                    <option value="contractors">Contractors & Labor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#502d13] text-sm font-medium mb-2">
                    Project Details
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-[#502d13]/20 rounded-xl focus:outline-none focus:border-[#502d13] transition-colors"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#502d13] text-[#e9ddc8] py-4 rounded-xl font-display font-semibold text-lg hover:bg-[#7b4a26] transition-colors flex items-center justify-center gap-2 group"
                >
                  Submit Request
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuotePopup;