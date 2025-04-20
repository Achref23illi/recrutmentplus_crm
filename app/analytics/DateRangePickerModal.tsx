// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\analytics\DateRangePickerModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface DateRangePickerModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (startDate: Date, endDate: Date) => void
}

export function DateRangePickerModal({ isOpen, onClose, onApply }: DateRangePickerModalProps) {
  const [startDate, setStartDate] = useState<Date>(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // 30 days ago
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [selectionMode, setSelectionMode] = useState<'start' | 'end'>('start')

  // Quick select presets
  const presets = [
    { label: 'Last 7 days', start: -7, end: 0 },
    { label: 'Last 30 days', start: -30, end: 0 },
    { label: 'Last 90 days', start: -90, end: 0 },
    { label: 'This month', start: 'month-start', end: 0 },
    { label: 'Last month', start: 'last-month-start', end: 'last-month-end' },
    { label: 'This year', start: 'year-start', end: 0 },
  ]

  // Apply preset date range
  const applyPreset = (preset: { label: string, start: number | string, end: number | string }) => {
    const now = new Date()
    let newStartDate: Date
    let newEndDate: Date = new Date()

    // Handle string-based date calculations
    if (typeof preset.start === 'string') {
      if (preset.start === 'month-start') {
        newStartDate = new Date(now.getFullYear(), now.getMonth(), 1)
      } else if (preset.start === 'last-month-start') {
        newStartDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      } else if (preset.start === 'year-start') {
        newStartDate = new Date(now.getFullYear(), 0, 1)
      } else {
        newStartDate = new Date()
      }
    } else {
      // Handle number of days ago
      newStartDate = new Date(now.getTime() + (preset.start * 24 * 60 * 60 * 1000))
    }

    if (typeof preset.end === 'string') {
      if (preset.end === 'last-month-end') {
        newEndDate = new Date(now.getFullYear(), now.getMonth(), 0)
      } else {
        newEndDate = new Date()
      }
    } else if (preset.end !== 0) {
      newEndDate = new Date(now.getTime() + (preset.end * 24 * 60 * 60 * 1000))
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  // Generate calendar days for current month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    const startingDayOfWeek = firstDay.getDay()
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    
    // Previous month days to display
    const prevMonthDays = startingDayOfWeek
    
    // Calculate days from previous month
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate()
    
    const days = []
    
    // Add previous month days
    for (let i = 0; i < prevMonthDays; i++) {
      const day = daysInPrevMonth - prevMonthDays + i + 1
      const date = new Date(prevMonthYear, prevMonth, day)
      days.push({
        date,
        isCurrentMonth: false,
      })
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      days.push({
        date,
        isCurrentMonth: true,
      })
    }
    
    // Add next month days to complete the grid
    const totalDaysToShow = 42 // 6 rows of 7 days
    const nextMonthDays = totalDaysToShow - days.length
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year
    
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(nextMonthYear, nextMonth, i)
      days.push({
        date,
        isCurrentMonth: false,
      })
    }
    
    return days
  }

  const days = generateCalendarDays()

  const handleDayClick = (date: Date) => {
    if (selectionMode === 'start') {
      setStartDate(date)
      setSelectionMode('end')
    } else {
      // Make sure end date is not before start date
      if (date < startDate) {
        setEndDate(startDate)
        setStartDate(date)
      } else {
        setEndDate(date)
      }
      setSelectionMode('start')
    }
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Format date as "MMM DD, YYYY"
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const isInRange = (date: Date): boolean => {
    return date >= startDate && date <= endDate
  }

  const isToday = (date: Date): boolean => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Date Range" className="max-w-md">
      <div className="space-y-4">
        {/* Date range display */}
        <div className="flex items-center justify-center gap-4 p-2 bg-neutral-900 rounded-lg">
          <div className={`p-2 rounded ${selectionMode === 'start' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : ''}`}>
            <div className="text-xs text-neutral-400 mb-1">Start Date</div>
            <div className="text-sm font-medium text-white">{formatDate(startDate)}</div>
          </div>
          <div className="text-neutral-500">→</div>
          <div className={`p-2 rounded ${selectionMode === 'end' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : ''}`}>
            <div className="text-xs text-neutral-400 mb-1">End Date</div>
            <div className="text-sm font-medium text-white">{formatDate(endDate)}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg px-2 py-1 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={prevMonth} 
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded"
            >
              <ChevronLeft size={16} />
            </button>
            <h3 className="text-sm font-medium text-white">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button 
              onClick={nextMonth} 
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-neutral-400">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDayClick(day.date)}
                className={`
                  p-2 text-xs rounded-sm transition-colors flex items-center justify-center h-8 w-8 relative
                  ${!day.isCurrentMonth ? 'text-neutral-600' : isToday(day.date) ? 'text-[#80BDCA] font-medium' : 'text-white'}
                  ${isInRange(day.date) ? 'bg-[#1D4E5F]/30 hover:bg-[#1D4E5F]/40' : 'hover:bg-neutral-800'}
                  ${day.date.getTime() === startDate.getTime() ? 'bg-[#1D4E5F] text-white' : ''}
                  ${day.date.getTime() === endDate.getTime() ? 'bg-[#1D4E5F] text-white' : ''}
                `}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onApply(startDate, endDate)
              onClose()
            }}
            className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition flex items-center"
          >
            <Calendar size={16} className="mr-2" /> Apply Range
          </button>
        </div>
      </div>
    </Modal>
  )
}