import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface LoadingDotsProps {
  /**
   * The color of the dots. Defaults to "current" (inherits from parent).
   */
  color?: string;
  /**
   * The size of the dots in pixels. Defaults to 4.
   */
  size?: number;
  /**
   * The spacing between dots in pixels. Defaults to 4.
   */
  spacing?: number;
  /**
   * The animation duration in seconds. Defaults to 1.5.
   */
  duration?: number;
  /**
   * Additional CSS classes to apply to the container.
   */
  className?: string;
}

export function LoadingDots({
  color = "currentColor",
  size = 4,
  spacing = 4,
  duration = 1.5,
  className,
}: LoadingDotsProps) {
  const dotVariants = {
    initial: {
      scale: 0.6,
      opacity: 0.4,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  };

  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: duration / 3,
      },
    },
    animate: {
      transition: {
        staggerChildren: duration / 3,
        staggerDirection: 1,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  return (
    <motion.div
      className={cn("flex items-center justify-center", className)}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="rounded-full"
          variants={dotVariants}
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            marginLeft: index > 0 ? spacing : 0,
            marginRight: index < 2 ? spacing : 0,
          }}
          transition={{
            duration: duration / 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
