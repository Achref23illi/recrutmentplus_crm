// filepath: c:\Users\Achref\Projects\Big Projects\recruitmentplus_crm\app\analytics\FilterDropdown.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  type: 'department' | 'position' | 'source' | 'location'
}

const filterOptions: FilterOption[] = [
  // Departments
  { id: 'dept-engineering', label: 'Engineering', type: 'department' },
  { id: 'dept-marketing', label: 'Marketing', type: 'department' },
  { id: 'dept-sales', label: 'Sales', type: 'department' },
  { id: 'dept-hr', label: 'Human Resources', type: 'department' },
  { id: 'dept-product', label: 'Product', type: 'department' },
  
  // Positions
  { id: 'pos-frontend', label: 'Frontend Developer', type: 'position' },
  { id: 'pos-backend', label: 'Backend Developer', type: 'position' },
  { id: 'pos-fullstack', label: 'Fullstack Developer', type: 'position' },
  { id: 'pos-designer', label: 'UX Designer', type: 'position' },
  { id: 'pos-pm', label: 'Product Manager', type: 'position' },
  { id: 'pos-sales', label: 'Sales Representative', type: 'position' },
  
  // Sources
  { id: 'src-linkedin', label: 'LinkedIn', type: 'source' },
  { id: 'src-jobboard', label: 'Job Board', type: 'source' },
  { id: 'src-referral', label: 'Referral', type: 'source' },
  { id: 'src-website', label: 'Company Website', type: 'source' },
  { id: 'src-agency', label: 'Recruiting Agency', type: 'source' },
  
  // Locations
  { id: 'loc-remote', label: 'Remote', type: 'location' },
  { id: 'loc-onsite', label: 'On-site', type: 'location' },
  { id: 'loc-hybrid', label: 'Hybrid', type: 'location' },
]

interface FilterDropdownProps {
  onFilterChange: (selectedFilters: string[]) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'department' | 'position' | 'source' | 'location'>('department')
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
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId)
      } else {
        return [...prev, filterId]
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

  const applyFilters = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const removeFilter = (filterId: string) => {
    setSelectedFilters(prev => prev.filter(id => id !== filterId))
    onFilterChange(selectedFilters.filter(id => id !== filterId))
  }

  const getFilterLabel = (filterId: string): string => {
    const filter = filterOptions.find(option => option.id === filterId)
    return filter ? filter.label : ''
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors
          ${selectedFilters.length > 0 
            ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'}`}
      >
        <Filter size={16} className="mr-2" /> 
        Filter
        {selectedFilters.length > 0 && (
          <span className="ml-2 bg-[#1D4E5F] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
            {selectedFilters.length}
          </span>
        )}
        <ChevronDown size={16} className="ml-2" />
      </button>

      {/* Selected filters display */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFilters.map(filterId => (
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
            <h3 className="text-sm font-medium text-white">Filter Analytics</h3>
            <p className="text-xs text-neutral-400 mt-1">Select options to filter the analytics data</p>
          </div>
          
          {/* Filter categories tabs */}
          <div className="flex border-b border-neutral-700">
            <button 
              onClick={() => setActiveTab('department')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'department' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Department
            </button>
            <button 
              onClick={() => setActiveTab('position')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'position' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Position
            </button>
            <button 
              onClick={() => setActiveTab('source')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'source' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Source
            </button>
            <button 
              onClick={() => setActiveTab('location')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'location' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Location
            </button>
          </div>
          
          {/* Filter options */}
          <div className="max-h-60 overflow-y-auto p-3">
            {filterOptions
              .filter(option => option.type === activeTab)
              .map(option => (
                <div key={option.id} className="mb-2 last:mb-0">
                  <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                    <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                      selectedFilters.includes(option.id)
                        ? 'bg-[#1D4E5F] text-white'
                        : 'border border-neutral-600'
                    }`}>
                      {selectedFilters.includes(option.id) && <Check size={12} />}
                    </div>
                    <input 
                      type="checkbox"
                      className="hidden"
                      checked={selectedFilters.includes(option.id)}
                      onChange={() => toggleFilter(option.id)}
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