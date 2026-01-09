import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * Chat Loading Icon inside Lucide's MessageCircle
 * Three dots bounce up and down one-by-one.
 */

export default function ChatLoadingIcon({ size = 48, dotSize = 6 }) {
  const dotJump = {
    animate: (i) => ({
      y: [0, -6, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: i * 0.15,
      },
    }),
  };

  const dotStyle = {
    width: dotSize,
    height: dotSize,
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Lucide chat outline */}
      <MessageCircle size={size} className="text-blue-600" strokeWidth={2} />

      {/* Three dots inside */}
      <div className="absolute flex items-end gap-2 aline-center justify-center" style={{ bottom: size * 0.30 }}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            custom={i}
            variants={dotJump}
            animate="animate"
            className="rounded-full bg-blue-600"
            style={dotStyle}
          />
        ))}
      </div>
    </div>
  );
}
