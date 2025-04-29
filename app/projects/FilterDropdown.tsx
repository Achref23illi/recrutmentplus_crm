'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

interface FilterSelection {
  status: string[]
  assignee: string[]
  dueDateRange: {
    from: string
    to: string
  }
}

// Filter options
const statusOptions = [
  { id: 'status-in-progress', label: 'In Progress' },
  { id: 'status-completed', label: 'Completed' },
  { id: 'status-on-hold', label: 'On Hold' },
]

const assigneeOptions = [
  { id: '1', label: 'John Peterson' },
  { id: '2', label: 'Emma Thompson' },
  { id: '3', label: 'Michael Chen' },
  { id: '4', label: 'Sarah Williams' },
  { id: '5', label: 'Robert Garcia' },
]

interface FilterDropdownProps {
  onFilterChange: (filters: FilterSelection) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<FilterSelection>({
    status: [],
    assignee: [],
    dueDateRange: {
      from: '',
      to: ''
    }
  })
  const [activeTab, setActiveTab] = useState<'status' | 'assignee' | 'dueDate'>('status')
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

  const toggleFilter = (type: 'status' | 'assignee', filterId: string) => {
    setSelectedFilters(prev => {
      const currentFilters = prev[type]
      if (currentFilters.includes(filterId)) {
        return {
          ...prev,
          [type]: currentFilters.filter(id => id !== filterId)
        }
      } else {
        return {
          ...prev,
          [type]: [...currentFilters, filterId]
        }
      }
    })
  }

  const handleDateChange = (field: 'from' | 'to', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      dueDateRange: {
        ...prev.dueDateRange,
        [field]: value
      }
    }))
  }

  const clearDateFilter = (field: 'from' | 'to') => {
    setSelectedFilters(prev => ({
      ...prev,
      dueDateRange: {
        ...prev.dueDateRange,
        [field]: ''
      }
    }))
  }

  const applyFilters = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const clearFilters = () => {
    setSelectedFilters({
      status: [],
      assignee: [],
      dueDateRange: {
        from: '',
        to: ''
      }
    })
    onFilterChange({
      status: [],
      assignee: [],
      dueDateRange: {
        from: '',
        to: ''
      }
    })
  }

  const getFilterCount = () => {
    return (
      selectedFilters.status.length +
      selectedFilters.assignee.length +
      (selectedFilters.dueDateRange.from ? 1 : 0) +
      (selectedFilters.dueDateRange.to ? 1 : 0)
    )
  }

  const getFilterLabel = (type: 'status' | 'assignee', filterId: string): string => {
    const options = type === 'status' ? statusOptions : assigneeOptions
    const filter = options.find(option => option.id === filterId)
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
        <Filter size={18} className="mr-2" /> 
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
          {selectedFilters.status.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              Status: {getFilterLabel('status', filterId)}
              <button 
                onClick={() => toggleFilter('status', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('status', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.assignee.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              Assignee: {getFilterLabel('assignee', filterId)}
              <button 
                onClick={() => toggleFilter('assignee', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('assignee', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.dueDateRange.from && (
            <div 
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              From: {selectedFilters.dueDateRange.from}
              <button 
                onClick={() => clearDateFilter('from')} 
                className="ml-1 hover:text-white"
                title="Remove from date filter"
              >
                <X size={12} />
              </button>
            </div>
          )}
          
          {selectedFilters.dueDateRange.to && (
            <div 
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              To: {selectedFilters.dueDateRange.to}
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
            <h3 className="text-sm font-medium text-white">Filter Projects</h3>
            <p className="text-xs text-neutral-400 mt-1">Select options to filter projects</p>
          </div>
          
          {/* Filter categories tabs */}
          <div className="flex border-b border-neutral-700">
            <button 
              onClick={() => setActiveTab('status')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'status' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Status
            </button>
            <button 
              onClick={() => setActiveTab('assignee')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'assignee' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Assignee
            </button>
            <button 
              onClick={() => setActiveTab('dueDate')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'dueDate' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Due Date
            </button>
          </div>
          
          {/* Filter options */}
          <div className="max-h-60 overflow-y-auto p-3">
            {/* Status filters */}
            {activeTab === 'status' && statusOptions.map(status => (
              <div key={status.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.status.includes(status.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.status.includes(status.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.status.includes(status.id)}
                    onChange={() => toggleFilter('status', status.id)}
                  />
                  <span className="text-sm text-neutral-300">{status.label}</span>
                </label>
              </div>
            ))}
            
            {/* Assignee filters */}
            {activeTab === 'assignee' && assigneeOptions.map(assignee => (
              <div key={assignee.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.assignee.includes(assignee.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.assignee.includes(assignee.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.assignee.includes(assignee.id)}
                    onChange={() => toggleFilter('assignee', assignee.id)}
                  />
                  <span className="text-sm text-neutral-300">{assignee.label}</span>
                </label>
              </div>
            ))}
            
            {/* Due Date filters */}
            {activeTab === 'dueDate' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="dueDateFrom" className="block text-sm font-medium text-neutral-300 mb-2">
                    Due Date From
                  </label>
                  <input
                    type="date"
                    id="dueDateFrom"
                    value={selectedFilters.dueDateRange.from}
                    onChange={(e) => handleDateChange('from', e.target.value)}
                    className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="dueDateTo" className="block text-sm font-medium text-neutral-300 mb-2">
                    Due Date To
                  </label>
                  <input
                    type="date"
                    id="dueDateTo"
                    value={selectedFilters.dueDateRange.to}
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