import { useEffect, useRef, useState } from "react";

export default function RainbowCursor() {
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      setActive(true);
    };
    const onLeave = () => setActive(false);

    const tick = () => {
      const ease = 0.11;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;
      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.body.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden="true">
      {/* Soft outer halo */}
      <div
        className="absolute rounded-full will-change-transform"
        style={{
          width: 120,
          height: 120,
          left: pos.x - 60,
          top: pos.y - 60,
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
          opacity: 0.7,
        }}
      />
      {/* Inner accent */}
      <div
        className="absolute rounded-full will-change-transform"
        style={{
          width: 48,
          height: 48,
          left: pos.x - 24,
          top: pos.y - 24,
          background: "radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(236,72,153,0.08) 50%, transparent 70%)",
          filter: "blur(8px)",
          opacity: 0.85,
        }}
      />
      {/* Tiny core dot */}
      <div
        className="absolute rounded-full will-change-transform"
        style={{
          width: 6,
          height: 6,
          left: pos.x - 3,
          top: pos.y - 3,
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 0 12px rgba(168,85,247,0.6)",
        }}
      />
    </div>
  );
}
