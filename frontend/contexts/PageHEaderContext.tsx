"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface PageHeaderContextType {
  title: string
  subtitle?: string
  setHeader: (title: string, subtitle?: string) => void
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined)

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Dashboard")
  const [subtitle, setSubtitle] = useState<string | undefined>("Welcome back!")

  const setHeader = (t: string, s?: string) => {
    setTitle(t)
    setSubtitle(s)
  }

  return (
    <PageHeaderContext.Provider value={{ title, subtitle, setHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}

export function usePageHeader() {
  const ctx = useContext(PageHeaderContext)
  if (!ctx) throw new Error("usePageHeader must be used inside PageHeaderProvider")
  return ctx
}
