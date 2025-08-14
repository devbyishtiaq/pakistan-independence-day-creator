"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { CanvasFrame } from "@/components/canvas-frame"
import { TextControls } from "@/components/text-controls"
import { GraphicsControls } from "@/components/graphics-controls"
import { ExportControls } from "@/components/export-controls"
import { WavingFlag } from "@/components/waving-flag"

import { useCanvasState } from "@/hooks/use-canvas-state"
import { useTextElements } from "@/hooks/use-text-elements"
import { useGraphicsElements } from "@/hooks/use-graphics-elements"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { usePakistanTime } from "@/hooks/use-pakistan-time"

export function PakistanCreator() {
  const { theme, setTheme } = useTheme()
  const canvasRef = useRef<HTMLDivElement>(null)

  const canvasState = useCanvasState()
  const textState = useTextElements()
  const graphicsState = useGraphicsElements()
  const { currentTime, mounted } = usePakistanTime()

  useKeyboardShortcuts({
    selectedTextId: textState.selectedTextId,
    textElements: textState.textElements,
    handleDeleteTextElement: textState.handleDeleteTextElement,
    handleUpdateTextElement: textState.handleUpdateTextElement,
  })

  useEffect(() => {
    const handleBackgroundImageChange = (event: CustomEvent) => {
      canvasState.setBackgroundImage(event.detail)
    }

    document.addEventListener("backgroundImageChange", handleBackgroundImageChange as EventListener)
    return () => {
      document.removeEventListener("backgroundImageChange", handleBackgroundImageChange as EventListener)
    }
  }, [canvasState])

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
      <main className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Canvas Area */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/50 dark:bg-gray-800/50 border-green-200 dark:border-gray-600">
              <CanvasFrame
                ref={canvasRef}
                preset={canvasState.canvasPreset}
                onPresetChange={canvasState.setCanvasPreset}
                backgroundType={canvasState.backgroundType}
                onBackgroundTypeChange={canvasState.setBackgroundType}
                backgroundColor={canvasState.backgroundColor}
                gradientColors={canvasState.gradientColors}
                backgroundImage={canvasState.backgroundImage}
                textElements={textState.textElements}
                onUpdateTextElement={textState.handleUpdateTextElement}
                selectedTextId={textState.selectedTextId}
                onSelectText={textState.setSelectedTextId}
                crescentStar={graphicsState.crescentStarEnabled ? graphicsState.crescentStar : null}
                onUpdateCrescentStar={graphicsState.setCrescentStar}
                selectedGraphicId={graphicsState.selectedGraphicId}
                onSelectGraphic={graphicsState.setSelectedGraphicId}
                skyline={graphicsState.skylineEnabled ? graphicsState.skyline : null}
                confettiEnabled={graphicsState.confettiEnabled}
                confettiDensity={graphicsState.confettiDensity}
                timeline={graphicsState.timelineEnabled ? graphicsState.timeline : null}
                qrCode={graphicsState.qrCodeEnabled ? graphicsState.qrCode : null}
              />
            </Card>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-4">
            <Accordion type="multiple" defaultValue={["text", "graphics", "export"]} className="space-y-2">
              <AccordionItem value="text">
                <AccordionTrigger className="text-sm font-poppins font-semibold text-pakistan-green dark:text-green-400">
                  Text Controls
                </AccordionTrigger>
                <AccordionContent>
                  <TextControls
                    selectedElement={textState.selectedElement}
                    onUpdateElement={textState.handleUpdateTextElement}
                    onAddElement={textState.handleAddTextElement}
                    onDeleteElement={textState.handleDeleteTextElement}
                    language={textState.language}
                    onLanguageChange={textState.setLanguage}
                  />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="graphics">
                <AccordionTrigger className="text-sm font-poppins font-semibold text-pakistan-green dark:text-green-400">
                  Graphics & Elements
                </AccordionTrigger>
                <AccordionContent>
                  <GraphicsControls
                    crescentStar={graphicsState.crescentStar}
                    onUpdateCrescentStar={graphicsState.setCrescentStar}
                    onToggleCrescentStar={graphicsState.setCrescentStarEnabled}
                    crescentStarEnabled={graphicsState.crescentStarEnabled}
                    skyline={graphicsState.skyline}
                    onUpdateSkyline={graphicsState.setSkyline}
                    onToggleSkyline={graphicsState.setSkylineEnabled}
                    skylineEnabled={graphicsState.skylineEnabled}
                    confettiEnabled={graphicsState.confettiEnabled}
                    onToggleConfetti={graphicsState.setConfettiEnabled}
                    confettiDensity={graphicsState.confettiDensity}
                    onUpdateConfettiDensity={graphicsState.setConfettiDensity}
                    timeline={graphicsState.timeline}
                    onUpdateTimeline={graphicsState.setTimeline}
                    onToggleTimeline={graphicsState.setTimelineEnabled}
                    timelineEnabled={graphicsState.timelineEnabled}
                    qrCode={graphicsState.qrCode}
                    onUpdateQRCode={graphicsState.setQrCode}
                    onToggleQRCode={graphicsState.setQrCodeEnabled}
                    qrCodeEnabled={graphicsState.qrCodeEnabled}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Export Controls */}
              <AccordionItem value="export">
                <AccordionTrigger className="text-sm font-poppins font-semibold text-pakistan-green dark:text-green-400">
                  Export & Share
                </AccordionTrigger>
                <AccordionContent>
                  <ExportControls canvasPreset={canvasState.canvasPreset} canvasRef={canvasRef} />
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

      <div className="pb-20"></div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-green-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
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
