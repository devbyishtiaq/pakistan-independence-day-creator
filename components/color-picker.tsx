"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const PAKISTAN_COLOR_SWATCHES = [
  "#01411C", // Pakistan Flag Green
  "#059669", // Emerald Green
  "#FFFFFF", // White
  "#1F2937", // Charcoal
  "#10B981", // Light Green
  "#065F46", // Dark Green
  "#F3F4F6", // Light Gray
  "#374151", // Gray
]

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="space-y-2">
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-10 p-1 border-2 bg-transparent"
            style={{ backgroundColor: color }}
          >
            <div className="w-full h-full rounded border border-white/20" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            {/* Color Swatches */}
            <div>
              <p className="text-xs font-medium mb-2">Quick Colors</p>
              <div className="grid grid-cols-4 gap-2">
                {PAKISTAN_COLOR_SWATCHES.map((swatch) => (
                  <button
                    key={swatch}
                    className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: swatch }}
                    onClick={() => {
                      onChange(swatch)
                      setIsOpen(false)
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div>
              <p className="text-xs font-medium mb-2">Custom Color</p>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-12 h-8 p-0 border-0"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder="#000000"
                  className="text-xs"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
