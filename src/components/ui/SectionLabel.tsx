import { motion } from 'framer-motion';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function SectionLabel({ children, className = '', delay = 0 }: SectionLabelProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`section-label ${className}`}
    >
      {children}
    </motion.span>
  );
}

export default SectionLabel;
