"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface CrescentStarElement {
  id: string
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  color: string
}

interface CrescentStarProps {
  element: CrescentStarElement
  onUpdate: (element: CrescentStarElement) => void
  onSelect: (id: string) => void
  isSelected: boolean
  canvasWidth: number
  canvasHeight: number
}

export function CrescentStar({
  element,
  onUpdate,
  onSelect,
  isSelected,
  canvasWidth,
  canvasHeight,
}: CrescentStarProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setElementStart({ x: element.x, y: element.y })
    onSelect(element.id)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    const newX = Math.max(0, Math.min(canvasWidth - element.size, elementStart.x + deltaX))
    const newY = Math.max(0, Math.min(canvasHeight - element.size, elementStart.y + deltaY))

    onUpdate({
      ...element,
      x: newX,
      y: newY,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, dragStart, elementStart])

  return (
    <div
      className={cn(
        "absolute cursor-move transition-all duration-200",
        isSelected && "ring-2 ring-blue-500 ring-offset-2 rounded",
        isDragging && "scale-105",
      )}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.size}px`,
        height: `${element.size}px`,
      }}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(element.id)
      }}
    >
      <svg
        ref={svgRef}
        width={element.size}
        height={element.size}
        viewBox="0 0 100 100"
        style={{
          transform: `rotate(${element.rotation}deg)`,
          opacity: element.opacity,
        }}
      >
        {/* Crescent */}
        <path
          d="M30 20 C15 35, 15 65, 30 80 C25 75, 22 65, 22 50 C22 35, 25 25, 30 20 Z"
          fill={element.color}
          stroke="none"
        />

        {/* Star */}
        <path
          d="M65 25 L67 32 L75 32 L69 37 L71 44 L65 39 L59 44 L61 37 L55 32 L63 32 Z"
          fill={element.color}
          stroke="none"
        />
      </svg>

      {/* Selection handles */}
      {isSelected && (
        <>
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize" />
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize" />
        </>
      )}
    </div>
  )
}
