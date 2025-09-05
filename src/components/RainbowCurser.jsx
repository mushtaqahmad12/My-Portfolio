import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RainbowCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>

 
      {/* Outer Glow (lagging trail) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-40 h-40 rounded-full blur-3xl opacity-40 mix-blend-screen z-40"
        animate={{
          x: pos.x - 80,
          y: pos.y - 80,
          background: [
            "radial-gradient(circle, #ff0080, transparent)",
            "radial-gradient(circle, #39ff14, transparent)",
            "radial-gradient(circle, #ffd200, transparent)",
          ],
        }}
        transition={{
          x: { type: "spring", damping: 40, stiffness: 300, delay: 0.15 },
          y: { type: "spring", damping: 40, stiffness: 300, delay: 0.15 },
          background: { duration: 6, repeat: Infinity, repeatType: "mirror" },
        }}
      />

      {/* Middle Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-28 h-28 rounded-full blur-2xl opacity-60 mix-blend-screen z-50"
        animate={{
          x: pos.x - 56,
          y: pos.y - 56,
          background: [
            "radial-gradient(circle, #00ffff, transparent)",
            "radial-gradient(circle, #ff00ff, transparent)",
            "radial-gradient(circle, #ffff00, transparent)",
          ],
        }}
        transition={{
          x: { type: "spring", damping: 40, stiffness: 300, delay: 0.08 },
          y: { type: "spring", damping: 40, stiffness: 300, delay: 0.08 },
          background: { duration: 6, repeat: Infinity, repeatType: "mirror" },
        }}
      />

      {/* Inner Core (main cursor) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-16 h-16 rounded-full blur-xl opacity-80 mix-blend-screen z-50"
        animate={{
          x: pos.x - 32,
          y: pos.y - 32,
          background: [
            "radial-gradient(circle, #ffffff, #ff00ff, transparent)",
            "radial-gradient(circle, #39ff14, #00ffff, transparent)",
            "radial-gradient(circle, #ffd200, #ff0080, transparent)",
          ],
          boxShadow: [
            "0 0 25px #ff00ff",
            "0 0 25px #39ff14",
            "0 0 25px #ffd200",
          ],
        }}
        transition={{
          x: { type: "spring", damping: 40, stiffness: 300 },
          y: { type: "spring", damping: 40, stiffness: 300 },
          background: { duration: 6, repeat: Infinity, repeatType: "mirror" },
          boxShadow: { duration: 6, repeat: Infinity, repeatType: "mirror" },
        }}
      />
    </>
  );
}
