"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { WavingFlag } from "@/components/waving-flag"
import { usePakistanTime } from "@/hooks/use-pakistan-time"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { currentTime, mounted } = usePakistanTime()

  if (!mounted) return null

  return (
    <header className="flex-shrink-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-200 dark:border-gray-700">
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
  )
}
