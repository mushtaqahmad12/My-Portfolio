"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function QuickInfo() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      {/* Button fixed top-right */}
      <motion.button
        className="px-4 py-2  text-white font-bold rounded-full 
  bg-gradient-to-br from-indigo-500/20 via-transparent to-fuchsia-500/20"
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide Info" : "Quick Info"}
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="quickinfo"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full mt-2 right-0 w-44 rounded-xl p-3 bg-gradient-to-br from-indigo-500/20 via-transparent to-fuchsia-500/20 text-xs"
          >
            <ul className="space-y-1">
              <li><span className="opacity-70">Location: </span>Karachi</li>
              <li><span className="opacity-70">Email: </span>mtaq075@gmail.com</li>
              <li><span className="opacity-70">Open to Work: </span>Yes</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
