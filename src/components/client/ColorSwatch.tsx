'use client'

import * as React from "react"
import { Check } from "lucide-react"

export interface ColorOption {
  id: string
  name: string
  color: string // Tailwind bg class or hex code
}

interface ColorSwatchProps {
  options: ColorOption[]
  selectedId?: string
  onChange?: (id: string) => void
  disabled?: boolean
  className?: string
}

export function ColorSwatch({
  options,
  selectedId,
  onChange,
  disabled = false,
  className = ""
}: ColorSwatchProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {options.map((option) => {
        const isSelected = selectedId === option.id
        // Handle custom hex colors or Tailwind bg classes
        const style = option.color.startsWith('#') || option.color.startsWith('rgb') || option.color.startsWith('oklch')
          ? { backgroundColor: option.color } 
          : {}
          
        const bgClass = Object.keys(style).length === 0 ? option.color : ''

        return (
          <button
            key={option.id}
            type="button"
            className={`
              relative w-10 h-10 rounded-md
              transition-all duration-200 ease-in-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
              ${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-105'}
              ${disabled ? 'opacity-50 cursor-not-allowed hidden' : ''}
              ${bgClass}
            `}
            style={style}
            onClick={() => !disabled && onChange && onChange(option.id)}
            aria-label={`Select ${option.name} finish`}
            aria-pressed={isSelected}
            disabled={disabled}
          >
            {/* Adding an inner gradient overlay for realism (wood/grain simulation) */}
            <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </button>
        )
      })}
    </div>
  )
}
