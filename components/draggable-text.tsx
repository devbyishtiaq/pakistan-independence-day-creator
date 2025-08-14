"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export interface TextElement {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  fontFamily: "inter" | "poppins" | "urdu"
  fontWeight: "400" | "500" | "600" | "700"
  color: string
  align: "left" | "center" | "right"
  isRTL: boolean
  dropShadow: boolean
  shadowStrength: number
}

interface DraggableTextProps {
  element: TextElement
  onUpdate: (element: TextElement) => void
  onSelect: (id: string) => void
  isSelected: boolean
  canvasWidth: number
  canvasHeight: number
}

export function DraggableText({
  element,
  onUpdate,
  onSelect,
  isSelected,
  canvasWidth,
  canvasHeight,
}: DraggableTextProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 })
  const textRef = useRef<HTMLDivElement>(null)

  const getFontFamilyClass = () => {
    switch (element.fontFamily) {
      case "inter":
        return "font-inter"
      case "poppins":
        return "font-poppins"
      case "urdu":
        return "font-urdu"
      default:
        return "font-inter"
    }
  }

  const getTextAlignClass = () => {
    switch (element.align) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setElementStart({ x: element.x, y: element.y })
    onSelect(element.id)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    const newX = Math.max(0, Math.min(canvasWidth - 100, elementStart.x + deltaX))
    const newY = Math.max(0, Math.min(canvasHeight - 50, elementStart.y + deltaY))

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

  const textStyle = {
    fontSize: `${element.fontSize}px`,
    color: element.color,
    fontWeight: element.fontWeight,
    textShadow: element.dropShadow ? `2px 2px ${element.shadowStrength}px rgba(0,0,0,0.5)` : "none",
    direction: element.isRTL ? ("rtl" as const) : ("ltr" as const),
    left: `${element.x}px`,
    top: `${element.y}px`,
  }

  return (
    <div
      ref={textRef}
      className={cn(
        "absolute cursor-move select-none transition-all duration-200",
        getFontFamilyClass(),
        getTextAlignClass(),
        isSelected && "ring-2 ring-blue-500 ring-offset-2",
        isDragging && "scale-105 shadow-lg",
      )}
      style={textStyle}
      onMouseDown={handleMouseDown}
      onClick={() => onSelect(element.id)}
    >
      {element.text || "Click to edit"}

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
