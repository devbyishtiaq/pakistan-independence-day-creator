"use client"

import { useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Toaster } from "@/components/ui/toaster"
import { CanvasFrame } from "@/components/canvas-frame"
import { TextControls } from "@/components/text-controls"
import { GraphicsControls } from "@/components/graphics-controls"
import { ExportControls } from "@/components/export-controls"

import { useCanvasState } from "@/hooks/use-canvas-state"
import { useTextElements } from "@/hooks/use-text-elements"
import { useGraphicsElements } from "@/hooks/use-graphics-elements"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"

export function HomeComponent() {
  const canvasRef = useRef<HTMLDivElement>(null)

  const canvasState = useCanvasState()
  const textState = useTextElements()
  const graphicsState = useGraphicsElements()

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

  return (
    <>
      <main className="flex-1 overflow-hidden">
        <div className="h-full container mx-auto px-4 py-6">
          <div className="h-full grid lg:grid-cols-3 gap-6">
            {/* Canvas Area */}
            <div className="lg:col-span-2 h-full">
              <Card className="h-full p-6 bg-white/50 dark:bg-gray-800/50 border-green-200 dark:border-gray-600 flex flex-col">
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

            <div className="max-h-[80vh] overflow-y-auto">
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
          </div>
        </div>
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </>
  )
}
