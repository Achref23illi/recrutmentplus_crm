'use client'

import { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronDown, X } from 'lucide-react'

interface DateRange {
  label: string
  from: string
  to: string
}

const predefinedRanges: DateRange[] = [
  {
    label: 'Today',
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  },
  {
    label: 'Yesterday',
    from: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    to: new Date(Date.now() - 86400000).toISOString().split('T')[0],
  },
  {
    label: 'Last 7 days',
    from: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  },
  {
    label: 'Last 14 days',
    from: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  },
  {
    label: 'This month',
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  },
  {
    label: 'Last month',
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0],
    to: new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString().split('T')[0],
  }
]

interface DateRangePickerProps {
  onDateRangeChange: (range: { from: string; to: string; label: string }) => void
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<DateRange>(predefinedRanges[2]) // Default to Last 7 days
  const [customRange, setCustomRange] = useState<{from: string; to: string}>({
    from: '',
    to: ''
  })
  const [isCustomRange, setIsCustomRange] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleRangeSelect = (range: DateRange) => {
    setSelectedRange(range)
    setIsCustomRange(false)
    onDateRangeChange(range)
    setIsOpen(false)
  }

  const handleCustomRangeChange = (field: 'from' | 'to', value: string) => {
    setCustomRange(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const applyCustomRange = () => {
    if (customRange.from && customRange.to) {
      const newRange = {
        label: `${formatDate(customRange.from)} - ${formatDate(customRange.to)}`,
        ...customRange
      }
      setSelectedRange(newRange)
      setIsCustomRange(true)
      onDateRangeChange(newRange)
      setIsOpen(false)
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Date button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700"
      >
        <Calendar size={16} className="mr-2" />
        {selectedRange.label}
        <ChevronDown size={16} className="ml-2" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-80">
          <div className="p-3 border-b border-neutral-700">
            <h3 className="text-sm font-medium text-white">Select Date Range</h3>
            <p className="text-xs text-neutral-400 mt-1">Choose a predefined range or set custom dates</p>
          </div>
          
          <div className="max-h-60 overflow-y-auto p-3">
            {/* Predefined ranges */}
            <div className="mb-4">
              <h4 className="text-xs font-medium text-neutral-400 mb-2">Predefined Ranges</h4>
              <div className="space-y-2">
                {predefinedRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => handleRangeSelect(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      !isCustomRange && selectedRange.label === range.label
                        ? 'bg-[#1D4E5F]/30 text-[#80BDCA]'
                        : 'text-neutral-300 hover:bg-neutral-700/50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom range selector */}
            <div>
              <h4 className="text-xs font-medium text-neutral-400 mb-2">Custom Range</h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="fromDate" className="block text-xs text-neutral-400 mb-1">From</label>
                  <input
                    type="date"
                    id="fromDate"
                    value={customRange.from}
                    onChange={(e) => handleCustomRangeChange('from', e.target.value)}
                    className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="toDate" className="block text-xs text-neutral-400 mb-1">To</label>
                  <input
                    type="date"
                    id="toDate"
                    value={customRange.to}
                    onChange={(e) => handleCustomRangeChange('to', e.target.value)}
                    className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="p-3 border-t border-neutral-700 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-xs text-neutral-300 hover:text-neutral-100 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={applyCustomRange}
              disabled={!customRange.from || !customRange.to}
              className="px-3 py-1.5 bg-[#1D4E5F] text-white text-xs rounded hover:bg-[#123040] transition disabled:opacity-50 disabled:hover:bg-[#1D4E5F]"
            >
              Apply Custom Range
            </button>
          </div>
        </div>
      )}
    </div>
  )
}