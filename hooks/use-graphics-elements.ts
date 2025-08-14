"use client"

import { useState } from "react"
import type { CrescentStarElement } from "@/components/crescent-star"
import type { SkylineElement } from "@/components/skyline-silhouette"
import type { TimelineElement } from "@/components/timeline-ribbon"
import type { QRElement } from "@/components/qr-badge"

export function useGraphicsElements() {
  const [selectedGraphicId, setSelectedGraphicId] = useState<string | null>(null)

  // Crescent & Star
  const [crescentStarEnabled, setCrescentStarEnabled] = useState(true)
  const [crescentStar, setCrescentStar] = useState<CrescentStarElement>({
    id: "crescent-star",
    x: 200,
    y: 20,
    size: 50,
    rotation: 0,
    opacity: 0.8,
    color: "#FFFFFF",
  })

  // Skyline
  const [skylineEnabled, setSkylineEnabled] = useState(true)
  const [skyline, setSkyline] = useState<SkylineElement>({
    id: "skyline",
    opacity: 0.3,
    color: "#000000",
  })

  // Confetti
  const [confettiEnabled, setConfettiEnabled] = useState(false)
  const [confettiDensity, setConfettiDensity] = useState(5)

  // Timeline
  const [timelineEnabled, setTimelineEnabled] = useState(true)
  const [timeline, setTimeline] = useState<TimelineElement>({
    id: "timeline",
    startYear: 1947,
    endYear: 2025,
    style: "straight",
    color: "#FFFFFF",
    textColor: "#01411C",
  })

  // QR Code
  const [qrCodeEnabled, setQrCodeEnabled] = useState(false)
  const [qrCode, setQrCode] = useState<QRElement>({
    id: "qr-code",
    url: "",
    x: 10,
    y: 10,
    size: 50,
  })

  return {
    selectedGraphicId,
    setSelectedGraphicId,
    crescentStarEnabled,
    setCrescentStarEnabled,
    crescentStar,
    setCrescentStar,
    skylineEnabled,
    setSkylineEnabled,
    skyline,
    setSkyline,
    confettiEnabled,
    setConfettiEnabled,
    confettiDensity,
    setConfettiDensity,
    timelineEnabled,
    setTimelineEnabled,
    timeline,
    setTimeline,
    qrCodeEnabled,
    setQrCodeEnabled,
    qrCode,
    setQrCode,
  }
}
