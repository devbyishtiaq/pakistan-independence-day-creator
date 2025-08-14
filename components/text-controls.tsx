"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlignLeft, AlignCenter, AlignRight, Plus, Trash2 } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"
import type { TextElement } from "@/components/draggable-text"

export type Language = "english" | "urdu" | "mixed"

interface TextControlsProps {
  selectedElement: TextElement | null
  onUpdateElement: (element: TextElement) => void
  onAddElement: (type: "headline" | "subheading" | "signature") => void
  onDeleteElement: (id: string) => void
  language: Language
  onLanguageChange: (language: Language) => void
}

const DEFAULT_TEXTS = {
  english: {
    headline: "Pakistan Zindabad!",
    subheading: "Happy Independence Day",
    signature: "Your Name",
  },
  urdu: {
    headline: "پاکستان زندہ باد!",
    subheading: "یومِ آزادی مبارک",
    signature: "آپ کا نام",
  },
}

export function TextControls({
  selectedElement,
  onUpdateElement,
  onAddElement,
  onDeleteElement,
  language,
  onLanguageChange,
}: TextControlsProps) {
  const [customText, setCustomText] = useState("")

  const handleTextChange = (text: string) => {
    if (selectedElement) {
      onUpdateElement({ ...selectedElement, text })
    }
  }

  const handleFontFamilyChange = (fontFamily: "inter" | "poppins" | "urdu") => {
    if (selectedElement) {
      const isRTL = fontFamily === "urdu"
      onUpdateElement({
        ...selectedElement,
        fontFamily,
        isRTL,
      })
    }
  }

  const handleAlignmentChange = (align: "left" | "center" | "right") => {
    if (selectedElement) {
      onUpdateElement({ ...selectedElement, align })
    }
  }

  const addTextElement = (type: "headline" | "subheading" | "signature") => {
    onAddElement(type)
  }

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-poppins font-semibold text-lg text-pakistan-green dark:text-green-400">Text Controls</h3>
        {selectedElement && (
          <Button size="sm" variant="destructive" onClick={() => onDeleteElement(selectedElement.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Language Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Language</Label>
        <Tabs value={language} onValueChange={(value) => onLanguageChange(value as Language)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="urdu">اردو</TabsTrigger>
            <TabsTrigger value="mixed">Mixed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Add Text Elements */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Add Text</Label>
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" variant="outline" onClick={() => addTextElement("headline")} className="text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Headline
          </Button>
          <Button size="sm" variant="outline" onClick={() => addTextElement("subheading")} className="text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Subtitle
          </Button>
          <Button size="sm" variant="outline" onClick={() => addTextElement("signature")} className="text-xs">
            <Plus className="h-3 w-3 mr-1" />
            Name
          </Button>
        </div>
      </div>

      {selectedElement ? (
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-sm">Edit Selected Text</h4>

          {/* Text Input */}
          <div className="space-y-2">
            <Label className="text-sm">Text Content</Label>
            <Input
              value={selectedElement.text}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="Enter your text..."
              className={selectedElement.isRTL ? "text-right" : "text-left"}
              dir={selectedElement.isRTL ? "rtl" : "ltr"}
            />
          </div>

          {/* Font Family */}
          <div className="space-y-2">
            <Label className="text-sm">Font Family</Label>
            <Select value={selectedElement.fontFamily} onValueChange={handleFontFamilyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inter">Inter</SelectItem>
                <SelectItem value="poppins">Poppins</SelectItem>
                <SelectItem value="urdu">Noto Nastaliq Urdu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label className="text-sm">Font Size: {selectedElement.fontSize}px</Label>
            <Slider
              value={[selectedElement.fontSize]}
              onValueChange={([value]) => onUpdateElement({ ...selectedElement, fontSize: value })}
              min={12}
              max={72}
              step={1}
              className="w-full"
            />
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <Label className="text-sm">Font Weight</Label>
            <Select
              value={selectedElement.fontWeight}
              onValueChange={(value: "400" | "500" | "600" | "700") =>
                onUpdateElement({ ...selectedElement, fontWeight: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="400">Regular (400)</SelectItem>
                <SelectItem value="500">Medium (500)</SelectItem>
                <SelectItem value="600">Semibold (600)</SelectItem>
                <SelectItem value="700">Bold (700)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Text Color */}
          <ColorPicker
            color={selectedElement.color}
            onChange={(color) => onUpdateElement({ ...selectedElement, color })}
            label="Text Color"
          />

          {/* Text Alignment */}
          <div className="space-y-2">
            <Label className="text-sm">Alignment</Label>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant={selectedElement.align === "left" ? "default" : "outline"}
                onClick={() => handleAlignmentChange("left")}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={selectedElement.align === "center" ? "default" : "outline"}
                onClick={() => handleAlignmentChange("center")}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={selectedElement.align === "right" ? "default" : "outline"}
                onClick={() => handleAlignmentChange("right")}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Drop Shadow */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Drop Shadow</Label>
              <Switch
                checked={selectedElement.dropShadow}
                onCheckedChange={(checked) => onUpdateElement({ ...selectedElement, dropShadow: checked })}
              />
            </div>

            {selectedElement.dropShadow && (
              <div className="space-y-2">
                <Label className="text-sm">Shadow Strength: {selectedElement.shadowStrength}px</Label>
                <Slider
                  value={[selectedElement.shadowStrength]}
                  onValueChange={([value]) => onUpdateElement({ ...selectedElement, shadowStrength: value })}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">Select a text element to edit</p>
          <p className="text-xs mt-1">or add a new text element above</p>
        </div>
      )}
    </Card>
  )
}
