import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInElementProps {
  children: ReactNode
  delay: number
}

export default function FadeIn({children, delay}: FadeInElementProps) {
  return (
    <motion.div initial = {{opacity: 0}} animate = {{opacity: 1}} transition={{duration: 0.4, ease: "easeOut", delay: delay}} >
      {children}
    </motion.div>
  )
}
