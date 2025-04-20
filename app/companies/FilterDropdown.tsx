'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

interface FilterSelection {
  industry: string[]
  openPositions: string[]
}

const industries = [
  { id: 'industry-tech', label: 'Tech' },
  { id: 'industry-healthcare', label: 'Healthcare' },
  { id: 'industry-finance', label: 'Finance' },
  { id: 'industry-environmental', label: 'Environmental' },
  { id: 'industry-construction', label: 'Construction' },
]

const openPositionsOptions = [
  { id: 'positions-0', label: 'No positions' },
  { id: 'positions-1-5', label: '1-5 positions' },
  { id: 'positions-6-10', label: '6-10 positions' },
  { id: 'positions-10+', label: '10+ positions' },
]

interface FilterDropdownProps {
  onFilterChange: (filters: FilterSelection) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<FilterSelection>({
    industry: [],
    openPositions: []
  })
  const [activeTab, setActiveTab] = useState<'industry' | 'openPositions'>('industry')
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

  const toggleFilter = (type: 'industry' | 'openPositions', filterId: string) => {
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

  const clearFilters = () => {
    setSelectedFilters({
      industry: [],
      openPositions: []
    })
  }

  const applyFilters = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const removeFilter = (type: 'industry' | 'openPositions', filterId: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(id => id !== filterId)
    }))
  }

  // Get all applied filters count
  const getFilterCount = () => {
    return selectedFilters.industry.length + selectedFilters.openPositions.length
  }

  const getFilterLabel = (type: 'industry' | 'openPositions', filterId: string): string => {
    const options = type === 'industry' ? industries : openPositionsOptions
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
          {selectedFilters.industry.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              {getFilterLabel('industry', filterId)}
              <button 
                onClick={() => removeFilter('industry', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('industry', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.openPositions.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              {getFilterLabel('openPositions', filterId)}
              <button 
                onClick={() => removeFilter('openPositions', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('openPositions', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
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
            <h3 className="text-sm font-medium text-white">Filter Companies</h3>
            <p className="text-xs text-neutral-400 mt-1">Select options to filter the company list</p>
          </div>
          
          {/* Filter categories tabs */}
          <div className="flex border-b border-neutral-700">
            <button 
              onClick={() => setActiveTab('industry')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'industry' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Industry
            </button>
            <button 
              onClick={() => setActiveTab('openPositions')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'openPositions' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Open Positions
            </button>
          </div>
          
          {/* Filter options */}
          <div className="max-h-60 overflow-y-auto p-3">
            {/* Industry filters */}
            {activeTab === 'industry' && industries.map(industry => (
              <div key={industry.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.industry.includes(industry.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.industry.includes(industry.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.industry.includes(industry.id)}
                    onChange={() => toggleFilter('industry', industry.id)}
                  />
                  <span className="text-sm text-neutral-300">{industry.label}</span>
                </label>
              </div>
            ))}
            
            {/* Open Positions filters */}
            {activeTab === 'openPositions' && openPositionsOptions.map(option => (
              <div key={option.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.openPositions.includes(option.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.openPositions.includes(option.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.openPositions.includes(option.id)}
                    onChange={() => toggleFilter('openPositions', option.id)}
                  />
                  <span className="text-sm text-neutral-300">{option.label}</span>
                </label>
              </div>
            ))}
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