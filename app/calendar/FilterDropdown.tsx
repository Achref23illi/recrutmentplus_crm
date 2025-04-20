'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors
          ${getFilterCount() > 0 
            ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'}`}
      >
        <Filter size={16} className="mr-2" /> 
        Filter
        {getFilterCount() > 0 && (
          <span className="ml-2 bg-[#1D4E5F] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
            {getFilterCount()}
          </span>
        )}
        <ChevronDown size={16} className="ml-2" />
      </button>

      {/* Selected filters display */}
      {getFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFilters.eventTypes.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              {getFilterLabel(filterId)}
              <button 
                onClick={() => removeFilter(filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel(filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.dateRange.from && (
            <div 
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              From: {selectedFilters.dateRange.from}
              <button 
                onClick={() => clearDateFilter('from')} 
                className="ml-1 hover:text-white"
                title="Remove from date filter"
              >
                <X size={12} />
              </button>
            </div>
          )}
          
          {selectedFilters.dateRange.to && (
            <div 
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              To: {selectedFilters.dateRange.to}
              <button 
                onClick={() => clearDateFilter('to')} 
                className="ml-1 hover:text-white"
                title="Remove to date filter"
              >
                <X size={12} />
              </button>
            </div>
          )}
          
          <button 
            onClick={clearFilters}
            className="inline-flex items-center px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs rounded-lg hover:bg-neutral-700"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-80">
          <div className="p-3 border-b border-neutral-700">
            <h3 className="text-sm font-medium text-white">Filter Calendar Events</h3>
            <p className="text-xs text-neutral-400 mt-1">Select options to filter calendar events</p>
          </div>
          
          {/* Filter categories tabs */}
          <div className="flex border-b border-neutral-700">
            <button 
              onClick={() => setActiveTab('eventTypes')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'eventTypes' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Event Types
            </button>
            <button 
              onClick={() => setActiveTab('dateRange')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'dateRange' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Date Range
            </button>
          </div>
          
          {/* Filter options */}
          <div className="max-h-60 overflow-y-auto p-3">
            {/* Event Types filters */}
            {activeTab === 'eventTypes' && eventTypes.map(eventType => (
              <div key={eventType.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.eventTypes.includes(eventType.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.eventTypes.includes(eventType.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.eventTypes.includes(eventType.id)}
                    onChange={() => toggleFilter(eventType.id)}
                  />
                  <span className="text-sm text-neutral-300">{eventType.label}</span>
                </label>
              </div>
            ))}
            
            {/* Date Range filters */}
            {activeTab === 'dateRange' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="dateRangeFrom" className="block text-sm font-medium text-neutral-300 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    id="dateRangeFrom"
                    value={selectedFilters.dateRange.from}
                    onChange={(e) => handleDateChange('from', e.target.value)}
                    className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="dateRangeTo" className="block text-sm font-medium text-neutral-300 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    id="dateRangeTo"
                    value={selectedFilters.dateRange.to}
                    onChange={(e) => handleDateChange('to', e.target.value)}
                    className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="p-3 border-t border-neutral-700 flex justify-between">
            <button
              onClick={clearFilters}
              className="text-xs text-neutral-400 hover:text-neutral-200"
            >
              Clear all
            </button>
            <button
              onClick={applyFilters}
              className="px-3 py-1 bg-[#1D4E5F] text-white text-xs rounded hover:bg-[#123040] transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}