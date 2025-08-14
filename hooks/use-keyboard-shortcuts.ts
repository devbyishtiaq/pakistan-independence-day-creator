"use client"

import { useEffect } from "react"
import type { TextElement } from "@/components/draggable-text"

interface UseKeyboardShortcutsProps {
  selectedTextId: string | null
  textElements: TextElement[]
  handleDeleteTextElement: (id: string) => void
  handleUpdateTextElement: (element: TextElement) => void
}

export function useKeyboardShortcuts({
  selectedTextId,
  textElements,
  handleDeleteTextElement,
  handleUpdateTextElement,
}: UseKeyboardShortcutsProps) {
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
  }, [selectedTextId, textElements, handleDeleteTextElement, handleUpdateTextElement])
}
