import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function QuickInfo() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <motion.button
        type="button"
        className="quick-info-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsVisible(!isVisible)}
        aria-expanded={isVisible}
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        {isVisible ? "Hide" : "Quick Info"}
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="quickinfo"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="quick-info-panel"
          >
            <ul className="space-y-3">
              <li>
                <strong>Location</strong>
                Karachi, Pakistan
              </li>
              <li>
                <strong>Phone</strong>
                03102240347
              </li>
              <li>
                <strong>Email</strong>
                mtaq075@gmail.com
              </li>
              <li className="pt-1">
                <span className="status-pill">● Open to work</span>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
