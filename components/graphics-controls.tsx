"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Building, Calendar, QrCode } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"
import type { CrescentStarElement } from "@/components/crescent-star"
import type { SkylineElement } from "@/components/skyline-silhouette"
import type { TimelineElement } from "@/components/timeline-ribbon"
import type { QRElement } from "@/components/qr-badge"

interface GraphicsControlsProps {
  // Crescent & Star
  crescentStar: CrescentStarElement | null
  onUpdateCrescentStar: (element: CrescentStarElement) => void
  onToggleCrescentStar: (enabled: boolean) => void
  crescentStarEnabled: boolean

  // Skyline
  skyline: SkylineElement | null
  onUpdateSkyline: (element: SkylineElement) => void
  onToggleSkyline: (enabled: boolean) => void
  skylineEnabled: boolean

  // Confetti
  confettiEnabled: boolean
  onToggleConfetti: (enabled: boolean) => void
  confettiDensity: number
  onUpdateConfettiDensity: (density: number) => void

  // Timeline
  timeline: TimelineElement | null
  onUpdateTimeline: (element: TimelineElement) => void
  onToggleTimeline: (enabled: boolean) => void
  timelineEnabled: boolean

  // QR Code
  qrCode: QRElement | null
  onUpdateQRCode: (element: QRElement) => void
  onToggleQRCode: (enabled: boolean) => void
  qrCodeEnabled: boolean
}

export function GraphicsControls({
  crescentStar,
  onUpdateCrescentStar,
  onToggleCrescentStar,
  crescentStarEnabled,
  skyline,
  onUpdateSkyline,
  onToggleSkyline,
  skylineEnabled,
  confettiEnabled,
  onToggleConfetti,
  confettiDensity,
  onUpdateConfettiDensity,
  timeline,
  onUpdateTimeline,
  onToggleTimeline,
  timelineEnabled,
  qrCode,
  onUpdateQRCode,
  onToggleQRCode,
  qrCodeEnabled,
}: GraphicsControlsProps) {
  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-poppins font-semibold text-lg text-pakistan-green dark:text-green-400">
        Graphics & Elements
      </h3>

      {/* Crescent & Star */}
      <div className="space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-lg">☪️</div>
            <Label className="text-sm font-medium">Crescent & Star</Label>
          </div>
          <Switch checked={crescentStarEnabled} onCheckedChange={onToggleCrescentStar} />
        </div>

        {crescentStarEnabled && crescentStar && (
          <div className="space-y-3 ml-6">
            <div className="space-y-2">
              <Label className="text-xs">Size: {crescentStar.size}px</Label>
              <Slider
                value={[crescentStar.size]}
                onValueChange={([value]) => onUpdateCrescentStar({ ...crescentStar, size: value })}
                min={20}
                max={100}
                step={5}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Rotation: {crescentStar.rotation}°</Label>
              <Slider
                value={[crescentStar.rotation]}
                onValueChange={([value]) => onUpdateCrescentStar({ ...crescentStar, rotation: value })}
                min={0}
                max={360}
                step={15}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Opacity: {Math.round(crescentStar.opacity * 100)}%</Label>
              <Slider
                value={[crescentStar.opacity]}
                onValueChange={([value]) => onUpdateCrescentStar({ ...crescentStar, opacity: value })}
                min={0.1}
                max={1}
                step={0.1}
              />
            </div>

            <ColorPicker
              color={crescentStar.color}
              onChange={(color) => onUpdateCrescentStar({ ...crescentStar, color })}
              label="Color"
            />
          </div>
        )}
      </div>

      {/* Confetti */}
      <div className="space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <Label className="text-sm font-medium">Confetti</Label>
          </div>
          <Switch checked={confettiEnabled} onCheckedChange={onToggleConfetti} />
        </div>

        {confettiEnabled && (
          <div className="space-y-2 ml-6">
            <Label className="text-xs">Density: {confettiDensity}</Label>
            <Slider
              value={[confettiDensity]}
              onValueChange={([value]) => onUpdateConfettiDensity(value)}
              min={1}
              max={10}
              step={1}
            />
          </div>
        )}
      </div>

      {/* Skyline */}
      <div className="space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <Label className="text-sm font-medium">Skyline</Label>
          </div>
          <Switch checked={skylineEnabled} onCheckedChange={onToggleSkyline} />
        </div>

        {skylineEnabled && skyline && (
          <div className="space-y-2 ml-6">
            <Label className="text-xs">Opacity: {Math.round(skyline.opacity * 100)}%</Label>
            <Slider
              value={[skyline.opacity]}
              onValueChange={([value]) => onUpdateSkyline({ ...skyline, opacity: value })}
              min={0.1}
              max={1}
              step={0.1}
            />
          </div>
        )}
      </div>

      {/* Timeline Ribbon */}
      <div className="space-y-3 border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <Label className="text-sm font-medium">Timeline</Label>
          </div>
          <Switch checked={timelineEnabled} onCheckedChange={onToggleTimeline} />
        </div>

        {timelineEnabled && timeline && (
          <div className="space-y-3 ml-6">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Start Year</Label>
                <Input
                  type="number"
                  value={timeline.startYear}
                  onChange={(e) =>
                    onUpdateTimeline({ ...timeline, startYear: Number.parseInt(e.target.value) || 1947 })
                  }
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">End Year</Label>
                <Input
                  type="number"
                  value={timeline.endYear}
                  onChange={(e) => onUpdateTimeline({ ...timeline, endYear: Number.parseInt(e.target.value) || 2025 })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Style</Label>
              <Select
                value={timeline.style}
                onValueChange={(value: "straight" | "curved") => onUpdateTimeline({ ...timeline, style: value })}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight">Straight</SelectItem>
                  <SelectItem value="curved">Curved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* QR Code */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            <Label className="text-sm font-medium">QR Code</Label>
          </div>
          <Switch checked={qrCodeEnabled} onCheckedChange={onToggleQRCode} />
        </div>

        {qrCodeEnabled && qrCode && (
          <div className="space-y-2 ml-6">
            <div>
              <Label className="text-xs">URL</Label>
              <Input
                type="url"
                value={qrCode.url}
                onChange={(e) => onUpdateQRCode({ ...qrCode, url: e.target.value })}
                placeholder="https://example.com"
                className="text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Size: {qrCode.size}px</Label>
              <Slider
                value={[qrCode.size]}
                onValueChange={([value]) => onUpdateQRCode({ ...qrCode, size: value })}
                min={30}
                max={80}
                step={5}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
