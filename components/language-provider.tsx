"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { en } from "@/locales/en"
import { km } from "@/locales/km"

type Language = "en" | "km"
type Translations = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<Translations>(en)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    setTranslations(language === "en" ? en : km)
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string) => {
    return (
      key.split(".").reduce((o, i) => {
        if (o) return o[i]
        return null
      }, translations as any) || key
    )
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
