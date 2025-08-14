"use client"

import { useState } from "react"
import type { CanvasPreset, BackgroundType } from "@/components/canvas-frame"

export function useCanvasState() {
  const [canvasPreset, setCanvasPreset] = useState<CanvasPreset>("post")
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("solid")
  const [backgroundColor, setBackgroundColor] = useState("#01411C")
  const [gradientColors, setGradientColors] = useState<[string, string]>(["#01411C", "#FFFFFF"])
  const [backgroundImage, setBackgroundImage] = useState<string>()

  return {
    canvasPreset,
    setCanvasPreset,
    backgroundType,
    setBackgroundType,
    backgroundColor,
    setBackgroundColor,
    gradientColors,
    setGradientColors,
    backgroundImage,
    setBackgroundImage,
  }
}
