'use client'

import * as React from "react"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export function QuantitySelector({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  className = ""
}: QuantitySelectorProps) {
  
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1)
    }
  }

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1)
    }
  }

  return (
    <div className={`flex items-center inline-flex border border-border rounded-full p-1 bg-background ${className}`}>
      <button 
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center rounded-full text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <span className="text-lg leading-none select-none">&minus;</span>
      </button>
      
      <span className="w-8 text-center font-medium text-sm tabular-nums">
        {value < 10 ? `0${value}` : value}
      </span>
      
      <button 
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center rounded-full text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Increase quantity"
      >
        <span className="text-lg leading-none select-none">&#43;</span>
      </button>
    </div>
  )
}
