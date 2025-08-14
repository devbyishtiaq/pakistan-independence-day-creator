import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
