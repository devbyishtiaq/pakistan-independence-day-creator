"use client"

import { QRCodeSVG } from "qrcode.react"

export interface QRElement {
  id: string
  url: string
  x: number
  y: number
  size: number
}

interface QRBadgeProps {
  element: QRElement
  onUpdate: (element: QRElement) => void
  canvasWidth: number
  canvasHeight: number
}

export function QRBadge({ element, onUpdate, canvasWidth, canvasHeight }: QRBadgeProps) {
  if (!element.url) return null

  return (
    <div
      className="absolute bg-white p-1 rounded shadow-sm"
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        width: `${element.size}px`,
        height: `${element.size}px`,
      }}
    >
      <QRCodeSVG value={element.url} size={element.size - 8} level="M" includeMargin={false} />
    </div>
  )
}
