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
      const activeElement = document.activeElement
      const isTyping =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.contentEditable === "true")

      // Export shortcut (Ctrl/Cmd + S)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        // Trigger export
        const exportButton = document.querySelector("[data-export-button]") as HTMLButtonElement
        if (exportButton) {
          exportButton.click()
        }
      }

      if ((e.key === "Delete" || e.key === "Backspace") && !isTyping) {
        if (selectedTextId) {
          e.preventDefault() // Prevent any default behavior
          handleDeleteTextElement(selectedTextId)
        }
      }

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key) && !isTyping) {
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
