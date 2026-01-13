import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
}

export const CustomCursor = ({ className }: CustomCursorProps) => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Use Framer Motion values for performance
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center the cursor (32px width/2)
      cursorY.set(e.clientY - 16);
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(
        cursorX.get() + 16, 
        cursorY.get() + 16
      );
      
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(computedStyle.cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", updateCursorType);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", updateCursorType);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center backdrop-blur-[1px]",
        className
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div 
        animate={{ scale: isPointer ? 0.5 : 1 }}
        className="w-1 h-1 bg-white rounded-full"
      />
    </motion.div>
  );
};
