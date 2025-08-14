"use client"

export interface SkylineElement {
  id: string
  opacity: number
  color: string
}

interface SkylineSilhouetteProps {
  element: SkylineElement
  onUpdate: (element: SkylineElement) => void
  canvasWidth: number
  canvasHeight: number
}

export function SkylineSilhouette({ element, onUpdate, canvasWidth, canvasHeight }: SkylineSilhouetteProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ opacity: element.opacity }}>
      <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="xMidYMax slice">
        {/* Minar-e-Pakistan inspired skyline silhouette */}
        <path
          d="M0 60 L0 45 L20 45 L20 35 L40 35 L40 25 L60 25 L60 15 L80 15 L80 10 L100 10 L100 5 L120 5 L120 10 L140 10 L140 15 L160 15 L160 25 L180 25 L180 35 L200 35 L200 25 L220 25 L220 15 L240 15 L240 20 L260 20 L260 30 L280 30 L280 40 L300 40 L300 35 L320 35 L320 45 L340 45 L340 50 L360 50 L360 55 L380 55 L380 60 L400 60 Z"
          fill={element.color}
        />

        {/* Additional building details */}
        <rect x="95" y="5" width="10" height="3" fill={element.color} />
        <circle cx="100" cy="3" r="2" fill={element.color} />

        {/* More buildings */}
        <rect x="50" y="20" width="8" height="5" fill={element.color} />
        <rect x="150" y="20" width="6" height="5" fill={element.color} />
        <rect x="250" y="25" width="4" height="5" fill={element.color} />
      </svg>
    </div>
  )
}
