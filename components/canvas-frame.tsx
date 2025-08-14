"use client"

import type React from "react"
import { useState, forwardRef } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { DraggableText, type TextElement } from "@/components/draggable-text"
import { CrescentStar, type CrescentStarElement } from "@/components/crescent-star"
import { SkylineSilhouette, type SkylineElement } from "@/components/skyline-silhouette"
import { ConfettiLayer } from "@/components/confetti-layer"
import { TimelineRibbon, type TimelineElement } from "@/components/timeline-ribbon"
import { QRBadge, type QRElement } from "@/components/qr-badge"

export type CanvasPreset = "story" | "post" | "twitter"

export interface CanvasPresetConfig {
  name: string
  width: number
  height: number
  aspectRatio: string
  description: string
}

export const CANVAS_PRESETS: Record<CanvasPreset, CanvasPresetConfig> = {
  story: {
    name: "Instagram Story",
    width: 1080,
    height: 1920,
    aspectRatio: "9/16",
    description: "1080×1920 (9:16)",
  },
  post: {
    name: "Instagram Post",
    width: 1080,
    height: 1080,
    aspectRatio: "1/1",
    description: "1080×1080 (1:1)",
  },
  twitter: {
    name: "Twitter/X Post",
    width: 1600,
    height: 900,
    aspectRatio: "16/9",
    description: "1600×900 (16:9)",
  },
}

export type BackgroundType = "solid" | "gradient" | "image"

interface CanvasFrameProps {
  preset: CanvasPreset
  onPresetChange: (preset: CanvasPreset) => void
  backgroundType: BackgroundType
  onBackgroundTypeChange: (type: BackgroundType) => void
  backgroundColor: string
  gradientColors: [string, string]
  backgroundImage?: string
  textElements: TextElement[]
  onUpdateTextElement: (element: TextElement) => void
  selectedTextId: string | null
  onSelectText: (id: string | null) => void

  // Graphics elements
  crescentStar: CrescentStarElement | null
  onUpdateCrescentStar: (element: CrescentStarElement) => void
  selectedGraphicId: string | null
  onSelectGraphic: (id: string | null) => void
  skyline: SkylineElement | null
  confettiEnabled: boolean
  confettiDensity: number
  timeline: TimelineElement | null
  qrCode: QRElement | null
}

export const CanvasFrame = forwardRef<HTMLDivElement, CanvasFrameProps>(
  (
    {
      preset,
      onPresetChange,
      backgroundType,
      onBackgroundTypeChange,
      backgroundColor,
      gradientColors,
      backgroundImage,
      textElements,
      onUpdateTextElement,
      selectedTextId,
      onSelectText,
      crescentStar,
      onUpdateCrescentStar,
      selectedGraphicId,
      onSelectGraphic,
      skyline,
      confettiEnabled,
      confettiDensity,
      timeline,
      qrCode,
    },
    ref,
  ) => {
    const [dragOver, setDragOver] = useState(false)
    const config = CANVAS_PRESETS[preset]

    const getBackgroundStyle = () => {
      switch (backgroundType) {
        case "solid":
          return { backgroundColor }
        case "gradient":
          return {
            background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          }
        case "image":
          return backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { backgroundColor: "#f3f4f6" }
        default:
          return { backgroundColor }
      }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            // Set the background image in parent component
            onBackgroundTypeChange("image")
            // We need to pass this up to the parent - for now we'll use a data URL
            const canvas = document.createElement("canvas")
            const img = new Image()
            img.onload = () => {
              canvas.width = img.width
              canvas.height = img.height
              const ctx = canvas.getContext("2d")
              if (ctx) {
                ctx.drawImage(img, 0, 0)
                const dataURL = canvas.toDataURL("image/jpeg", 0.8)
                // This is a workaround - ideally we'd have onBackgroundImageChange prop
                const event = new CustomEvent("backgroundImageChange", { detail: dataURL })
                document.dispatchEvent(event)
              }
            }
            img.src = result
          }
        }
        reader.readAsDataURL(file)
      }
    }

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault()
      setDragOver(false)
      const files = Array.from(event.dataTransfer.files)
      const imageFile = files.find((file) => file.type.startsWith("image/"))
      if (imageFile) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            onBackgroundTypeChange("image")
            const event = new CustomEvent("backgroundImageChange", { detail: result })
            document.dispatchEvent(event)
          }
        }
        reader.readAsDataURL(imageFile)
      }
    }

    const handleCanvasClick = (event: React.MouseEvent) => {
      // Only deselect if clicking directly on the canvas background
      if (event.target === event.currentTarget) {
        onSelectText(null)
        onSelectGraphic(null)
      }
    }

    const handleImageUploadClick = () => {
      const input = document.createElement("input")
      input.type = "file"
      input.accept = "image/*"
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const result = e.target?.result as string
            if (result) {
              onBackgroundTypeChange("image")
              const event = new CustomEvent("backgroundImageChange", { detail: result })
              document.dispatchEvent(event)
            }
          }
          reader.readAsDataURL(file)
        }
      }
      input.click()
    }

    const canvasWidth = preset === "story" ? 200 : preset === "post" ? 280 : 320
    const canvasHeight = preset === "story" ? 356 : preset === "post" ? 280 : 180

    return (
      <div className="space-y-4" ref={ref}>
        {/* Preset Tabs */}
        <Tabs value={preset} onValueChange={(value) => onPresetChange(value as CanvasPreset)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="story" className="text-xs">
              Story
              <span className="ml-1 text-[10px] opacity-70">9:16</span>
            </TabsTrigger>
            <TabsTrigger value="post" className="text-xs">
              Post
              <span className="ml-1 text-[10px] opacity-70">1:1</span>
            </TabsTrigger>
            <TabsTrigger value="twitter" className="text-xs">
              Twitter/X
              <span className="ml-1 text-[10px] opacity-70">16:9</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={preset} className="mt-4">
            <Card className="p-4 bg-gray-50 dark:bg-gray-800">
              <div className="text-center mb-4">
                <h3 className="font-poppins font-medium text-sm text-pakistan-green dark:text-green-400">
                  {config.name}
                </h3>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>

              {/* Canvas Container with Responsive Scaling */}
              <div className="flex justify-center">
                <div
                  data-canvas-content
                  className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-lg"
                  style={{
                    aspectRatio: config.aspectRatio,
                    width: `${canvasWidth}px`,
                    height: `${canvasHeight}px`,
                    maxWidth: "100%",
                  }}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOver(true)
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={handleCanvasClick}
                >
                  {/* Canvas Background */}
                  <div className="absolute inset-0 transition-all duration-300" style={getBackgroundStyle()}>
                    {backgroundType === "image" && !backgroundImage && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-gray-100/50 transition-colors"
                        onClick={handleImageUploadClick}
                      >
                        <div className="text-center space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-xs text-gray-500">Drop image or click to upload</p>
                        </div>
                      </div>
                    )}

                    {/* Drag Overlay */}
                    {dragOver && (
                      <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500 border-dashed flex items-center justify-center">
                        <p className="text-blue-600 font-medium">Drop image here</p>
                      </div>
                    )}

                    {/* Skyline Silhouette */}
                    {skyline && (
                      <SkylineSilhouette
                        element={skyline}
                        onUpdate={() => {}}
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                      />
                    )}

                    {/* Timeline Ribbon */}
                    {timeline && <TimelineRibbon element={timeline} onUpdate={() => {}} canvasWidth={canvasWidth} />}

                    {/* Text Elements */}
                    {textElements.map((element) => (
                      <DraggableText
                        key={element.id}
                        element={element}
                        onUpdate={onUpdateTextElement}
                        onSelect={onSelectText}
                        isSelected={selectedTextId === element.id}
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                      />
                    ))}

                    {/* Crescent & Star */}
                    {crescentStar && (
                      <CrescentStar
                        element={crescentStar}
                        onUpdate={onUpdateCrescentStar}
                        onSelect={onSelectGraphic}
                        isSelected={selectedGraphicId === crescentStar.id}
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                      />
                    )}

                    {/* QR Code */}
                    {qrCode && qrCode.url && (
                      <QRBadge
                        element={qrCode}
                        onUpdate={() => {}}
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                      />
                    )}

                    {/* Confetti Layer */}
                    <ConfettiLayer
                      isActive={confettiEnabled}
                      density={confettiDensity}
                      canvasWidth={canvasWidth}
                      canvasHeight={canvasHeight}
                    />

                    {/* Safe Area Guides */}
                    <div className="absolute inset-4 border border-white/30 rounded pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Background Type Controls */}
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Background</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={backgroundType === "solid" ? "default" : "outline"}
                    onClick={() => onBackgroundTypeChange("solid")}
                    className="text-xs"
                  >
                    Solid
                  </Button>
                  <Button
                    size="sm"
                    variant={backgroundType === "gradient" ? "default" : "outline"}
                    onClick={() => onBackgroundTypeChange("gradient")}
                    className="text-xs"
                  >
                    Gradient
                  </Button>
                  <Button
                    size="sm"
                    variant={backgroundType === "image" ? "default" : "outline"}
                    onClick={() => onBackgroundTypeChange("image")}
                    className="text-xs"
                  >
                    Image
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
)

CanvasFrame.displayName = "CanvasFrame"
