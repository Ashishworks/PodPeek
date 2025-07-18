import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const FadeInSection = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only animate once
    threshold: 0.1,     // Trigger when 10% of it is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
