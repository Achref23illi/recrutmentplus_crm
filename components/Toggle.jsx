// components/Toggle.jsx
'use client'

import { useState, useEffect } from 'react'

export default function Toggle({ enabled = false, onChange }) {
  const [isEnabled, setIsEnabled] = useState(enabled)

  useEffect(() => {
    setIsEnabled(enabled)
  }, [enabled])

  const toggle = () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)
    onChange?.(newValue)
  }

  return (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-1 ${
        isEnabled ? 'bg-[var(--primary)]' : 'bg-[var(--muted)]'
      }`}
      onClick={toggle}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}
