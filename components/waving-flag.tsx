"use client"

export function WavingFlag() {
  return (
    <div className="relative w-8 h-6 overflow-hidden">
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        className="absolute inset-0 animate-wave"
        style={{
          animation: "wave 2s ease-in-out infinite",
        }}
      >
        {/* White stripe (left side) */}
        <rect x="0" y="0" width="8" height="24" fill="#FFFFFF" />

        {/* Green field */}
        <rect x="8" y="0" width="24" height="24" fill="#01411C" />

        {/* Crescent */}
        <circle cx="20" cy="12" r="4" fill="#FFFFFF" />
        <circle cx="21" cy="12" r="3.2" fill="#01411C" />

        {/* Star */}
        <polygon
          points="26,8 26.8,10.4 29.2,10.4 27.2,12 28,14.4 26,12.8 24,14.4 24.8,12 22.8,10.4 25.2,10.4"
          fill="#FFFFFF"
        />
      </svg>

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: perspective(100px) rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: perspective(100px) rotateY(-5deg) rotateX(2deg);
          }
          50% {
            transform: perspective(100px) rotateY(0deg) rotateX(-2deg);
          }
          75% {
            transform: perspective(100px) rotateY(5deg) rotateX(2deg);
          }
        }
        
        .animate-wave {
          animation: wave 2s ease-in-out infinite;
          transform-origin: left center;
        }
      `}</style>
    </div>
  )
}
