"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { CanvasFrame, type CanvasPreset, type BackgroundType } from "@/components/canvas-frame"
import { TextControls, type Language } from "@/components/text-controls"
import { GraphicsControls } from "@/components/graphics-controls"
import { ExportControls } from "@/components/export-controls"
import { WavingFlag } from "@/components/waving-flag"
import type { TextElement } from "@/components/draggable-text"
import type { CrescentStarElement } from "@/components/crescent-star"
import type { SkylineElement } from "@/components/skyline-silhouette"
import type { TimelineElement } from "@/components/timeline-ribbon"
import type { QRElement } from "@/components/qr-badge"

export default function PakistanIndependenceCreator() {
  const { theme, setTheme } = useTheme()
  const [currentTime, setCurrentTime] = useState("")
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Canvas state
  const [canvasPreset, setCanvasPreset] = useState<CanvasPreset>("post")
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("solid")
  const [backgroundColor, setBackgroundColor] = useState("#01411C")
  const [gradientColors, setGradientColors] = useState<[string, string]>(["#01411C", "#FFFFFF"])
  const [backgroundImage, setBackgroundImage] = useState<string>()

  // Text state
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language>("english")

  // Graphics state
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

  useEffect(() => {
    setMounted(true)
    const updateTime = () => {
      const now = new Date()
      const pakistanTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now)
      setCurrentTime(pakistanTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleBackgroundImageChange = (event: CustomEvent) => {
      setBackgroundImage(event.detail)
    }

    document.addEventListener("backgroundImageChange", handleBackgroundImageChange as EventListener)
    return () => {
      document.removeEventListener("backgroundImageChange", handleBackgroundImageChange as EventListener)
    }
  }, [])

  const handleUpdateTextElement = (updatedElement: TextElement) => {
    setTextElements((prev) => prev.map((el) => (el.id === updatedElement.id ? updatedElement : el)))
  }

  const handleAddTextElement = (type: "headline" | "subheading" | "signature") => {
    const defaultTexts = {
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

    const isUrdu = language === "urdu"
    const texts = isUrdu ? defaultTexts.urdu : defaultTexts.english

    const newElement: TextElement = {
      id: `${type}-${Date.now()}`,
      text: texts[type],
      x: 20,
      y: type === "headline" ? 40 : type === "subheading" ? 100 : 160,
      fontSize: type === "headline" ? 32 : type === "subheading" ? 24 : 18,
      fontFamily: isUrdu ? "urdu" : "poppins",
      fontWeight: type === "headline" ? "700" : type === "subheading" ? "600" : "400",
      color: "#FFFFFF",
      align: "center",
      isRTL: isUrdu,
      dropShadow: true,
      shadowStrength: 4,
    }

    setTextElements((prev) => [...prev, newElement])
    setSelectedTextId(newElement.id)
  }

  const handleDeleteTextElement = (id: string) => {
    setTextElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedTextId(null)
  }

  const selectedElement = textElements.find((el) => el.id === selectedTextId) || null

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Export shortcut (Ctrl/Cmd + S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        // Trigger export
        const exportButton = document.querySelector("[data-export-button]") as HTMLButtonElement
        if (exportButton) {
          exportButton.click()
        }
      }

      // Delete selected element
      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedTextId) {
          handleDeleteTextElement(selectedTextId)
        }
      }

      // Arrow key nudging
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
        const nudgeAmount = e.shiftKey ? 10 : 1

        if (selectedTextId) {
          const element = textElements.find((el) => el.id === selectedTextId)
          if (element) {
            let newX = element.x
            let newY = element.y

            switch (e.key) {
              case "ArrowLeft":
                newX = Math.max(0, element.x - nudgeAmount)
                break
              case "ArrowRight":
                newX = element.x + nudgeAmount
                break
              case "ArrowUp":
                newY = Math.max(0, element.y - nudgeAmount)
                break
              case "ArrowDown":
                newY = element.y + nudgeAmount
                break
            }

            handleUpdateTextElement({ ...element, x: newX, y: newY })
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedTextId, textElements])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left - App Title */}
            <div className="flex items-center gap-3">
              <WavingFlag />
              <h1 className="text-xl font-poppins font-bold text-pakistan-green dark:text-green-400">
                Pakistan Independence Day Creator
              </h1>
            </div>

            {/* Center - Date and Time */}
            <div className="flex items-center gap-4 text-center">
              <div className="font-inter">
                <div className="text-2xl font-bold text-pakistan-green dark:text-green-400">14 August</div>
                <div className="text-sm text-muted-foreground">{currentTime} PKT</div>
              </div>
            </div>

            {/* Right - Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="border-green-200 hover:bg-green-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-gray-600" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-32">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="h-full p-6 bg-white/50 dark:bg-gray-800/50 border-green-200 dark:border-gray-600">
              <CanvasFrame
                ref={canvasRef}
                preset={canvasPreset}
                onPresetChange={setCanvasPreset}
                backgroundType={backgroundType}
                onBackgroundTypeChange={setBackgroundType}
                backgroundColor={backgroundColor}
                gradientColors={gradientColors}
                backgroundImage={backgroundImage}
                textElements={textElements}
                onUpdateTextElement={handleUpdateTextElement}
                selectedTextId={selectedTextId}
                onSelectText={setSelectedTextId}
                crescentStar={crescentStarEnabled ? crescentStar : null}
                onUpdateCrescentStar={setCrescentStar}
                selectedGraphicId={selectedGraphicId}
                onSelectGraphic={setSelectedGraphicId}
                skyline={skylineEnabled ? skyline : null}
                confettiEnabled={confettiEnabled}
                confettiDensity={confettiDensity}
                timeline={timelineEnabled ? timeline : null}
                qrCode={qrCodeEnabled ? qrCode : null}
              />
            </Card>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-4 overflow-y-auto pb-32">
            <Accordion type="multiple" defaultValue={["text", "graphics", "export"]} className="space-y-2">
              <AccordionItem value="text">
                <AccordionTrigger className="text-sm font-poppins font-semibold text-pakistan-green dark:text-green-400">
                  Text Controls
                </AccordionTrigger>
                <AccordionContent>
                  <TextControls
                    selectedElement={selectedElement}
                    onUpdateElement={handleUpdateTextElement}
                    onAddElement={handleAddTextElement}
                    onDeleteElement={handleDeleteTextElement}
                    language={language}
                    onLanguageChange={setLanguage}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="graphics">
                <AccordionTrigger className="text-sm font-poppins font-semibold text-pakistan-green dark:text-green-400">
                  Graphics & Elements
                </AccordionTrigger>
                <AccordionContent>
                  <GraphicsControls
                    crescentStar={crescentStar}
                    onUpdateCrescentStar={setCrescentStar}
                    onToggleCrescentStar={setCrescentStarEnabled}
                    crescentStarEnabled={crescentStarEnabled}
                    skyline={skyline}
                    onUpdateSkyline={setSkyline}
                    onToggleSkyline={setSkylineEnabled}
                    skylineEnabled={skylineEnabled}
                    confettiEnabled={confettiEnabled}
                    onToggleConfetti={setConfettiEnabled}
                    confettiDensity={confettiDensity}
                    onUpdateConfettiDensity={setConfettiDensity}
                    timeline={timeline}
                    onUpdateTimeline={setTimeline}
                    onToggleTimeline={setTimelineEnabled}
                    timelineEnabled={timelineEnabled}
                    qrCode={qrCode}
                    onUpdateQRCode={setQrCode}
                    onToggleQRCode={setQrCodeEnabled}
                    qrCodeEnabled={qrCodeEnabled}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Export Controls */}
              <AccordionItem value="export">
                <AccordionTrigger className="text-sm font-poppins font-semibold text-pakistan-green dark:text-green-400">
                  Export & Share
                </AccordionTrigger>
                <AccordionContent>
                  <ExportControls canvasPreset={canvasPreset} canvasRef={canvasRef} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Quick Guide */}
            <Card className="p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
              <h4 className="font-poppins font-medium text-sm mb-2 text-pakistan-green dark:text-green-400">
                Quick Guide
              </h4>
              <ol className="text-xs space-y-1 text-muted-foreground">
                <li>1. Pick a preset size</li>
                <li>2. Add and customize text</li>
                <li>3. Toggle graphics elements</li>
                <li>4. Export PNG (Ctrl+S)</li>
              </ol>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-green-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Hashtag Chips */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400 text-xs"
              >
                #PakistanZindabad
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400 text-xs"
              >
                #14August
              </Badge>
              <Badge
                variant="secondary"
                className="bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400 text-xs"
              >
                #AzadiMubarak
              </Badge>
            </div>

            {/* Credit and Share */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Made with ❤️ in Pakistan</span>
              <Button size="sm" className="bg-pakistan-green hover:bg-green-700 text-white text-xs">
                Share
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
