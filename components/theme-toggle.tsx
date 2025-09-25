"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full transition-colors">
        ☀️
      </button>
    )
  }

  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      onClick={() => {
        const newTheme = currentTheme === "light" ? "dark" : "light"
        console.log('Switching theme from', currentTheme, 'to', newTheme) // Debug log
        setTheme(newTheme)
        
        // Debug: Check if the HTML element has the dark class
        setTimeout(() => {
          const htmlElement = document.documentElement
          console.log('HTML classes:', htmlElement.className)
          console.log('Has dark class:', htmlElement.classList.contains('dark'))
        }, 100)
      }}
      className="rounded-full px-3 py-2 bg-white/60 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700/60 backdrop-blur-md shadow-sm transition-all duration-300"
      aria-label="Toggle theme"
      title={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </button>
  )
}