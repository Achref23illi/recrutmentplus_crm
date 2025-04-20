'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

interface FilterSelection {
  stage: string[]
  status: string[]
  appliedDateFrom: string
  appliedDateTo: string
}

const stages = [
  { id: 'stage-received', label: 'Received' },
  { id: 'stage-interview-scheduled', label: 'Interview Scheduled' },
  { id: 'stage-interview-completed', label: 'Interview Completed' },
  { id: 'stage-client-waiting', label: 'Client Waiting' },
]

const statuses = [
  { id: 'status-new', label: 'New' },
  { id: 'status-in-progress', label: 'In Progress' },
  { id: 'status-pending', label: 'Pending' },
]

interface FilterDropdownProps {
  onFilterChange: (filters: FilterSelection) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<FilterSelection>({
    stage: [],
    status: [],
    appliedDateFrom: '',
    appliedDateTo: ''
  })
  const [activeTab, setActiveTab] = useState<'stage' | 'status' | 'date'>('stage')
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

  const toggleFilter = (type: 'stage' | 'status', filterId: string) => {
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

  const handleDateChange = (field: 'appliedDateFrom' | 'appliedDateTo', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      stage: [],
      status: [],
      appliedDateFrom: '',
      appliedDateTo: ''
    })
  }

  const applyFilters = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const removeFilter = (type: 'stage' | 'status', filterId: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(id => id !== filterId)
    }))
  }

  const clearDateFilter = (field: 'appliedDateFrom' | 'appliedDateTo') => {
    setSelectedFilters(prev => ({
      ...prev,
      [field]: ''
    }))
  }

  // Get all applied filters count
  const getFilterCount = () => {
    return selectedFilters.stage.length + 
           selectedFilters.status.length + 
           (selectedFilters.appliedDateFrom ? 1 : 0) + 
           (selectedFilters.appliedDateTo ? 1 : 0)
  }

  const getFilterLabel = (type: 'stage' | 'status', filterId: string): string => {
    const options = type === 'stage' ? stages : statuses
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
          {selectedFilters.stage.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              {getFilterLabel('stage', filterId)}
              <button 
                onClick={() => removeFilter('stage', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('stage', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.status.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              {getFilterLabel('status', filterId)}
              <button 
                onClick={() => removeFilter('status', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('status', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.appliedDateFrom && (
            <div 
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              From: {selectedFilters.appliedDateFrom}
              <button 
                onClick={() => clearDateFilter('appliedDateFrom')} 
                className="ml-1 hover:text-white"
                title="Remove from date filter"
              >
                <X size={12} />
              </button>
            </div>
          )}
          
          {selectedFilters.appliedDateTo && (
            <div 
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              To: {selectedFilters.appliedDateTo}
              <button 
                onClick={() => clearDateFilter('appliedDateTo')} 
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
            <h3 className="text-sm font-medium text-white">Filter Candidates</h3>
            <p className="text-xs text-neutral-400 mt-1">Select options to filter the candidate list</p>
          </div>
          
          {/* Filter categories tabs */}
          <div className="flex border-b border-neutral-700">
            <button 
              onClick={() => setActiveTab('stage')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'stage' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Stage
            </button>
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
              onClick={() => setActiveTab('date')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'date' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Date
            </button>
          </div>
          
          {/* Filter options */}
          <div className="max-h-60 overflow-y-auto p-3">
            {/* Stage filters */}
            {activeTab === 'stage' && stages.map(stage => (
              <div key={stage.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.stage.includes(stage.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.stage.includes(stage.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.stage.includes(stage.id)}
                    onChange={() => toggleFilter('stage', stage.id)}
                  />
                  <span className="text-sm text-neutral-300">{stage.label}</span>
                </label>
              </div>
            ))}
            
            {/* Status filters */}
            {activeTab === 'status' && statuses.map(status => (
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
            
            {/* Date filters */}
            {activeTab === 'date' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="appliedDateFrom" className="block text-sm font-medium text-neutral-300 mb-2">
                    Applied Date From
                  </label>
                  <input
                    type="date"
                    id="appliedDateFrom"
                    value={selectedFilters.appliedDateFrom}
                    onChange={(e) => handleDateChange('appliedDateFrom', e.target.value)}
                    className="w-full rounded-md border-neutral-700 bg-neutral-800 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="appliedDateTo" className="block text-sm font-medium text-neutral-300 mb-2">
                    Applied Date To
                  </label>
                  <input
                    type="date"
                    id="appliedDateTo"
                    value={selectedFilters.appliedDateTo}
                    onChange={(e) => handleDateChange('appliedDateTo', e.target.value)}
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