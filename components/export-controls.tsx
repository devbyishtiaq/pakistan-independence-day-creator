"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Copy, Share2, Twitter, Instagram, Linkedin, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import type { CanvasPreset } from "@/components/canvas-frame"

interface ExportControlsProps {
  canvasPreset: CanvasPreset
  canvasRef: React.RefObject<HTMLDivElement>
}

const domToCanvas = async (element: HTMLElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Canvas context not available")

      const rect = element.getBoundingClientRect()
      const scale = 2 // High resolution export

      canvas.width = rect.width * scale
      canvas.height = rect.height * scale

      ctx.scale(scale, scale)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Create SVG with foreign object containing the HTML
      const data = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${rect.width}" height="${rect.height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Inter, system-ui, sans-serif;">
              ${element.innerHTML}
            </div>
          </foreignObject>
        </svg>
      `

      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL("image/png", 1.0))
      }
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(data)))
    } catch (error) {
      reject(error)
    }
  })
}

export function ExportControls({ canvasPreset, canvasRef }: ExportControlsProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [lastExportedImage, setLastExportedImage] = useState<string | null>(null)

  const getFilename = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "")
    const presetName = canvasPreset === "story" ? "Story" : canvasPreset === "post" ? "Post" : "TwitterX"
    return `14-August-${presetName}-${timestamp}.png`
  }

  const exportToPNG = async () => {
    if (!canvasRef.current) {
      toast({
        title: "Export Error",
        description: "Canvas not found. Please try again.",
        variant: "destructive",
      })
      return
    }

    setIsExporting(true)

    try {
      const canvasElement = canvasRef.current.querySelector("[data-canvas-content]") as HTMLElement
      if (!canvasElement) {
        throw new Error("Canvas content not found")
      }

      const dataUrl = await domToCanvas(canvasElement)
      setLastExportedImage(dataUrl)

      // Create download link
      const link = document.createElement("a")
      link.download = getFilename()
      link.href = dataUrl
      link.click()

      toast({
        title: "Export Successful!",
        description: `Your ${canvasPreset} design has been downloaded.`,
      })
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your design. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const copyToClipboard = async () => {
    if (!lastExportedImage) {
      toast({
        title: "No Image to Copy",
        description: "Please export your design first.",
        variant: "destructive",
      })
      return
    }

    try {
      // Convert data URL to blob
      const response = await fetch(lastExportedImage)
      const blob = await response.blob()

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ])

      toast({
        title: "Copied to Clipboard!",
        description: "Your design is ready to paste anywhere.",
      })
    } catch (error) {
      console.error("Copy failed:", error)
      toast({
        title: "Copy Failed",
        description: "Your browser doesn't support copying images to clipboard.",
        variant: "destructive",
      })
    }
  }

  const shareToSocial = (platform: "twitter" | "instagram" | "linkedin") => {
    const text = "Celebrating Pakistan Independence Day! 🇵🇰 #PakistanZindabad #14August #AzadiMubarak"
    const hashtags = "PakistanZindabad,14August,AzadiMubarak"

    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=${hashtags}`,
      instagram: "https://www.instagram.com/", // Instagram doesn't support direct posting via URL
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`,
    }

    if (platform === "instagram") {
      toast({
        title: "Instagram Sharing",
        description: "Please save your image and share it manually on Instagram.",
      })
      return
    }

    window.open(urls[platform], "_blank", "width=600,height=400")
  }

  const shareNative = async () => {
    if (!navigator.share) {
      toast({
        title: "Share Not Supported",
        description: "Your browser doesn't support native sharing.",
        variant: "destructive",
      })
      return
    }

    try {
      await navigator.share({
        title: "Pakistan Independence Day Design",
        text: "Check out my Pakistan Independence Day design! 🇵🇰",
        url: window.location.href,
      })
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-poppins font-semibold text-lg text-pakistan-green dark:text-green-400">Export & Share</h3>

      {/* Export Section */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Export Design</h4>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={exportToPNG}
            disabled={isExporting}
            className="bg-pakistan-green hover:bg-green-700 text-white"
            data-export-button
          >
            {isExporting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            {isExporting ? "Exporting..." : "Download PNG"}
          </Button>

          <Button
            onClick={copyToClipboard}
            variant="outline"
            disabled={!lastExportedImage}
            className="border-green-200 hover:bg-green-50 dark:border-gray-600 dark:hover:bg-gray-700 bg-transparent"
          >
            {lastExportedImage ? (
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            Copy Image
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>• High-quality PNG export at 2x resolution</p>
          <p>• Filename: {getFilename()}</p>
        </div>
      </div>

      <Separator />

      {/* Share Section */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Share Your Design</h4>

        {/* Native Share */}
        {typeof navigator !== "undefined" && navigator.share && (
          <Button
            onClick={shareNative}
            variant="outline"
            className="w-full border-green-200 hover:bg-green-50 dark:border-gray-600 dark:hover:bg-gray-700 bg-transparent"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        )}

        {/* Social Media Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => shareToSocial("twitter")} variant="outline" size="sm" className="text-xs">
            <Twitter className="h-3 w-3 mr-1" />
            Twitter
          </Button>
          <Button onClick={() => shareToSocial("instagram")} variant="outline" size="sm" className="text-xs">
            <Instagram className="h-3 w-3 mr-1" />
            Instagram
          </Button>
          <Button onClick={() => shareToSocial("linkedin")} variant="outline" size="sm" className="text-xs">
            <Linkedin className="h-3 w-3 mr-1" />
            LinkedIn
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          <p>• Twitter: Opens compose window with hashtags</p>
          <p>• Instagram: Save image and share manually</p>
          <p>• LinkedIn: Opens sharing dialog</p>
        </div>
      </div>

      <Separator />

      {/* Hashtag Suggestions */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Suggested Hashtags</h4>
        <div className="flex flex-wrap gap-1">
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400"
          >
            #PakistanZindabad
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400"
          >
            #14August
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400"
          >
            #AzadiMubarak
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400"
          >
            #IndependenceDay
          </Badge>
          <Badge
            variant="secondary"
            className="text-xs bg-green-100 text-pakistan-green dark:bg-green-900/30 dark:text-green-400"
          >
            #Pakistan
          </Badge>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-xs text-muted-foreground bg-gray-50 dark:bg-gray-800 p-2 rounded">
        <p className="font-medium mb-1">Keyboard Shortcuts:</p>
        <p>• Ctrl/Cmd + S: Export PNG</p>
        <p>• Delete: Remove selected element</p>
        <p>• Arrow keys: Nudge element (1px)</p>
        <p>• Shift + Arrow: Nudge element (10px)</p>
      </div>
    </Card>
  )
}
