// filepath: app/analytics/DateRangePickerModal.tsx
'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Animation variants
  const modalContentVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", damping: 25, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  }

  const calendarVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 }
    }
  }

  const dayVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    }
  }

  const monthTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  const presetVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const presetItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Date Range" className="max-w-md">
      <motion.div 
        variants={modalContentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-4"
      >
        {/* Date range display */}
        <motion.div 
          className="flex items-center justify-center gap-4 p-2 bg-neutral-900 rounded-lg"
          layout
        >
          <motion.div 
            layout
            className={`p-2 rounded ${selectionMode === 'start' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : ''}`}
            animate={{ 
              backgroundColor: selectionMode === 'start' ? 'rgba(29, 78, 95, 0.2)' : 'transparent',
              boxShadow: selectionMode === 'start' ? '0 0 0 1px rgba(29, 78, 95, 1)' : 'none' 
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-neutral-400 mb-1">Start Date</div>
            <motion.div 
              className="text-sm font-medium text-white"
              key={startDate.toString()}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formatDate(startDate)}
            </motion.div>
          </motion.div>
          <div className="text-neutral-500">→</div>
          <motion.div 
            layout
            className={`p-2 rounded ${selectionMode === 'end' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : ''}`}
            animate={{ 
              backgroundColor: selectionMode === 'end' ? 'rgba(29, 78, 95, 0.2)' : 'transparent',
              boxShadow: selectionMode === 'end' ? '0 0 0 1px rgba(29, 78, 95, 1)' : 'none' 
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-xs text-neutral-400 mb-1">End Date</div>
            <motion.div 
              className="text-sm font-medium text-white"
              key={endDate.toString()}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {formatDate(endDate)}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={presetVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2"
        >
          {presets.map((preset, index) => (
            <motion.button
              key={index}
              variants={presetItemVariants}
              whileHover={{ scale: 1.05, backgroundColor: "#4a4a4a" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyPreset(preset)}
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg px-2 py-1 transition-colors"
            >
              {preset.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Calendar */}
        <motion.div 
          className="bg-neutral-900 rounded-lg p-4 border border-neutral-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={prevMonth} 
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded"
            >
              <ChevronLeft size={16} />
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.h3 
                key={currentMonth.toString()}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={monthTransition}
                className="text-sm font-medium text-white"
              >
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </motion.h3>
            </AnimatePresence>
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.9 }}
              onClick={nextMonth} 
              className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded"
            >
              <ChevronRight size={16} />
            </motion.button>
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
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentMonth.toString()}
              variants={calendarVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-7 gap-1"
            >
              {days.map((day, index) => (
                <motion.button
                  key={index}
                  variants={dayVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: day.date.getTime() === startDate.getTime() || day.date.getTime() === endDate.getTime() 
                      ? "#1D4E5F" 
                      : isInRange(day.date) 
                        ? "rgba(29, 78, 95, 0.5)" 
                        : "rgba(255,255,255,0.1)" 
                  }}
                  whileTap={{ scale: 0.9 }}
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
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Action buttons */}
        <motion.div 
          className="flex justify-end gap-3"
          variants={presetVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={presetItemVariants}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition"
          >
            Cancel
          </motion.button>
          <motion.button
            variants={presetItemVariants}
            whileHover={{ scale: 1.05, backgroundColor: "#123040" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onApply(startDate, endDate)
              onClose()
            }}
            className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition flex items-center"
          >
            <Calendar size={16} className="mr-2" /> Apply Range
          </motion.button>
        </motion.div>
      </motion.div>
    </Modal>
  )
}