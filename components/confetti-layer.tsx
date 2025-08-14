"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ConfettiParticle {
  id: number
  x: number
  y: number
  color: string
  size: number
  rotation: number
  delay: number
}

interface ConfettiLayerProps {
  isActive: boolean
  density: number
  canvasWidth: number
  canvasHeight: number
}

const CONFETTI_COLORS = ["#01411C", "#059669", "#10B981", "#FFFFFF", "#F59E0B", "#EF4444"]

export function ConfettiLayer({ isActive, density, canvasWidth, canvasHeight }: ConfettiLayerProps) {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const particleCount = Math.floor(density * 20) // density 1-10 -> 20-200 particles
    const newParticles: ConfettiParticle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * canvasWidth,
        y: -10 - Math.random() * 50,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 3 + Math.random() * 4,
        rotation: Math.random() * 360,
        delay: Math.random() * 2,
      })
    }

    setParticles(newParticles)
  }, [isActive, density, canvasWidth, canvasHeight])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
            }}
            initial={{
              x: particle.x,
              y: particle.y,
              rotate: particle.rotation,
              opacity: 1,
            }}
            animate={{
              y: canvasHeight + 20,
              rotate: particle.rotation + 360,
              opacity: 0,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: particle.delay,
              ease: "easeOut",
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
