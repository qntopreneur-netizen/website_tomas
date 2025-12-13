"use client"

import { useRef, useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
  Variants,
  useReducedMotion,
} from "framer-motion"

type MarginType = UseInViewOptions["margin"]

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  startOnView?: boolean
  inViewMargin?: MarginType
  blur?: string
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView: inViewProp,
  startOnView = true,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Use startOnView prop if provided, otherwise fall back to inView prop
  const shouldUseInView = inViewProp !== undefined ? inViewProp : startOnView
  const isInView = shouldUseInView ? inViewResult : true
  
  // Remove blur on mobile or when reduced motion is preferred
  const useBlur = !isMobile && !shouldReduceMotion && blur !== "0px"
  const blurValue = useBlur ? blur : "0px"

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        shouldReduceMotion ? 0 : (direction === "right" || direction === "down" ? -offset : offset),
      opacity: 0,
      filter: `blur(${blurValue})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: `blur(0px)`,
    },
  }
  const combinedVariants = variant || defaultVariants
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="hidden"
        variants={combinedVariants}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.04 + delay,
          duration: shouldReduceMotion ? 0.01 : duration,
          ease: "easeOut",
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

