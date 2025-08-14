"use client"

export interface TimelineElement {
  id: string
  startYear: number
  endYear: number
  style: "straight" | "curved"
  color: string
  textColor: string
}

interface TimelineRibbonProps {
  element: TimelineElement
  onUpdate: (element: TimelineElement) => void
  canvasWidth: number
}

export function TimelineRibbon({ element, onUpdate, canvasWidth }: TimelineRibbonProps) {
  const ribbonWidth = Math.min(canvasWidth * 0.8, 200)
  const ribbonHeight = 30

  return (
    <div
      className="absolute top-4 left-1/2 transform -translate-x-1/2 pointer-events-none"
      style={{ width: ribbonWidth }}
    >
      <svg width={ribbonWidth} height={ribbonHeight} viewBox={`0 0 ${ribbonWidth} ${ribbonHeight}`}>
        {element.style === "curved" ? (
          // Curved ribbon
          <path
            d={`M10 15 Q${ribbonWidth / 2} 5 ${ribbonWidth - 10} 15 Q${ribbonWidth / 2} 25 10 15`}
            fill={element.color}
            stroke="none"
          />
        ) : (
          // Straight ribbon
          <rect x="0" y="10" width={ribbonWidth} height="10" fill={element.color} rx="5" />
        )}

        {/* Text */}
        <text
          x={ribbonWidth / 2}
          y="18"
          textAnchor="middle"
          fill={element.textColor}
          fontSize="10"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          {element.startYear} → {element.endYear}
        </text>
      </svg>
    </div>
  )
}
