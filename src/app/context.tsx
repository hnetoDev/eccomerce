'use client'
import { createContext, useContext } from 'react'
import type { Theme } from '@/types'

const ThemeContext = createContext<Theme | null>(null)

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: Theme
  children: React.ReactNode
}) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
)
