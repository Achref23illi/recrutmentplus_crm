// filepath: app/calendar/FilterDropdown.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterSelection {
  eventTypes: string[]
  dateRange: {
    from: string
    to: string
  }
}

const eventTypes = [
  { id: 'type-interview', label: 'Interview' },
  { id: 'type-meeting', label: 'Meeting' },
  { id: 'type-screening', label: 'Screening' },
  { id: 'type-internal', label: 'Internal' },
  { id: 'type-followup', label: 'Follow-up' },
]

interface FilterDropdownProps {
  onFilterChange: (filters: FilterSelection) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<FilterSelection>({
    eventTypes: [],
    dateRange: {
      from: '',
      to: ''
    }
  })
  const [activeTab, setActiveTab] = useState<'eventTypes' | 'dateRange'>('eventTypes')
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

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev.eventTypes
      if (currentFilters.includes(filterId)) {
        return {
          ...prev,
          eventTypes: currentFilters.filter(id => id !== filterId)
        }
      } else {
        return {
          ...prev,
          eventTypes: [...currentFilters, filterId]
        }
      }
    })
  }

  const handleDateChange = (field: 'from' | 'to', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      eventTypes: [],
      dateRange: {
        from: '',
        to: ''
      }
    })
  }

  const applyFilters = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const removeFilter = (filterId: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.filter(id => id !== filterId)
    }))
  }

  const clearDateFilter = (field: 'from' | 'to') => {
    setSelectedFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: ''
      }
    }))
  }

  // Get all applied filters count
  const getFilterCount = () => {
    return selectedFilters.eventTypes.length + 
           (selectedFilters.dateRange.from ? 1 : 0) + 
           (selectedFilters.dateRange.to ? 1 : 0)
  }

  const getFilterLabel = (filterId: string): string => {
    const filter = eventTypes.find(option => option.id === filterId)
    return filter ? filter.label : ''
  }

  // Animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300 
      }
    }
  }

  const filterTagVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 500, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 10,
      transition: { duration: 0.2 }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors
          ${getFilterCount() > 0 
            ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'}`}
      >
        <Filter size={16} className="mr-2" /> 
        Filter
        {getFilterCount() > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-2 bg-[#1D4E5F] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center"
          >
            {getFilterCount()}
          </motion.span>
        )}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} className="ml-2" />
        </motion.div>
      </motion.button>

      {/* Selected filters display */}
      {getFilterCount() > 0 && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-2 mt-2"
        >
          <AnimatePresence>
            {selectedFilters.eventTypes.map(filterId => (
              <motion.div 
                key={filterId}
                layout
                variants={filterTagVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
              >
                {getFilterLabel(filterId)}
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFilter(filterId)} 
                  className="ml-1 hover:text-white"
                  title={`Remove ${getFilterLabel(filterId)} filter`}
                >
                  <X size={12} />
                </motion.button>
              </motion.div>
            ))}
            
            {selectedFilters.dateRange.from && (
              <motion.div 
                layout
                variants={filterTagVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
              >
                From: {selectedFilters.dateRange.from}
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => clearDateFilter('from')} 
                  className="ml-1 hover:text-white"
                  title="Remove from date filter"
                >
                  <X size={12} />
                </motion.button>
              </motion.div>
            )}
            
            {selectedFilters.dateRange.to && (
              <motion.div 
                layout
                variants={filterTagVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
              >
                To: {selectedFilters.dateRange.to}
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => clearDateFilter('to')} 
                  className="ml-1 hover:text-white"
                  title="Remove to date filter"
                >
                  <X size={12} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="inline-flex items-center px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs rounded-lg hover:bg-neutral-700"
          >
            Clear all
          </motion.button>
        </motion.div>
      )}

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 z-50 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-80"
          >
            <div className="p-3 border-b border-neutral-700">
              <h3 className="text-sm font-medium text-white">Filter Calendar Events</h3>
              <p className="text-xs text-neutral-400 mt-1">Select options to filter calendar events</p>
            </div>
            
            {/* Filter categories tabs */}
            <div className="flex border-b border-neutral-700">
              <motion.button 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                onClick={() => setActiveTab('eventTypes')}
                className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                  activeTab === 'eventTypes' 
                    ? 'border-[#1D4E5F] text-[#80BDCA]' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Event Types
              </motion.button>
              <motion.button 
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                onClick={() => setActiveTab('dateRange')}
                className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                  activeTab === 'dateRange' 
                    ? 'border-[#1D4E5F] text-[#80BDCA]' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Date Range
              </motion.button>
            </div>
            
            {/* Filter options */}
            <div className="max-h-60 overflow-y-auto p-3">
              {/* Event Types filters */}
              <AnimatePresence mode="wait">
                {activeTab === 'eventTypes' && (
                  <motion.div
                    key="eventTypes"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {eventTypes.map(eventType => (
                      <motion.div 
                        key={eventType.id} 
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="mb-2 last:mb-0"
                      >
                        <label className="flex items-center p-2 rounded cursor-pointer">
                          <motion.div 
                            initial={false}
                            animate={{ 
                              backgroundColor: selectedFilters.eventTypes.includes(eventType.id) ? "#1D4E5F" : "transparent",
                              borderColor: selectedFilters.eventTypes.includes(eventType.id) ? "#1D4E5F" : "#666666"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-4 h-4 rounded mr-2 flex items-center justify-center border`}
                          >
                            {selectedFilters.eventTypes.includes(eventType.id) && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                              >
                                <Check size={12} />
                              </motion.div>
                            )}
                          </motion.div>
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.eventTypes.includes(eventType.id)}
                            onChange={() => toggleFilter(eventType.id)}
                          />
                          <span className="text-sm text-neutral-300">{eventType.label}</span>
                        </label>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {/* Date Range filters */}
                {activeTab === 'dateRange' && (
                  <motion.div
                    key="dateRange"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="dateRangeFrom" className="block text-sm font-medium text-neutral-300 mb-2">
                        From Date
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.3)" }}
                        type="date"
                        id="dateRangeFrom"
                        value={selectedFilters.dateRange.from}
                        onChange={(e) => handleDateChange('from', e.target.value)}
                        className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-2 focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="dateRangeTo" className="block text-sm font-medium text-neutral-300 mb-2">
                        To Date
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.3)" }}
                        type="date"
                        id="dateRangeTo"
                        value={selectedFilters.dateRange.to}
                        onChange={(e) => handleDateChange('to', e.target.value)}
                        className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-2 focus:outline-none text-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Actions */}
            <div className="p-3 border-t border-neutral-700 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="text-xs text-neutral-400 hover:text-neutral-200"
              >
                Clear all
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#123040" }}
                whileTap={{ scale: 0.95 }}
                onClick={applyFilters}
                className="px-3 py-1 bg-[#1D4E5F] text-white text-xs rounded hover:bg-[#123040] transition"
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}