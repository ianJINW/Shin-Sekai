import type { ReactNode } from "react"
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y:0, transition: { duration: 0.4 } },
  exit: { opacityy: 0, y: -20, transition: { duration: 0.3 } }
}

interface transitionProps {
  children: ReactNode
  className?: string
}

const PageTransition: React.FC<transitionProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial='initial' animate='animate' exit="exit" variants={pageVariants} className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition