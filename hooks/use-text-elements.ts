"use client"

import { useState } from "react"
import type { TextElement } from "@/components/draggable-text"
import type { Language } from "@/components/text-controls"

export function useTextElements() {
  const [textElements, setTextElements] = useState<TextElement[]>([])
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
  const [language, setLanguage] = useState<Language>("english")

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

  return {
    textElements,
    selectedTextId,
    setSelectedTextId,
    language,
    setLanguage,
    selectedElement,
    handleUpdateTextElement,
    handleAddTextElement,
    handleDeleteTextElement,
  }
}
