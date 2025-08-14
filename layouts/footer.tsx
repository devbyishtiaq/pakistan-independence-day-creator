import { Badge } from "@/components/ui/badge"

export function Footer() {
  return (
    <footer className="flex-shrink-0 border-t border-green-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
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
            <span className="text-xs text-muted-foreground">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/devbyishtiaq"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pakistan-green dark:text-green-400 hover:underline font-medium"
              >
                devbyishtiaq
              </a>{" "}
              in Pakistan
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
