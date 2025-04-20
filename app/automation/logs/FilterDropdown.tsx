'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'

interface FilterSelection {
  status: string[]
  workflow: string[]
}

const statusOptions = [
  { id: 'status-success', label: 'Success' },
  { id: 'status-failure', label: 'Failure' },
  { id: 'status-warning', label: 'Warning' },
  { id: 'status-pending', label: 'Pending' },
]

const workflowOptions = [
  { id: 'wf-new-application', label: 'New Application Notification' },
  { id: 'wf-client-followup', label: 'Client Follow-Up' },
  { id: 'wf-candidate-onboarding', label: 'Candidate Onboarding' },
]

interface FilterDropdownProps {
  onFilterChange: (filters: FilterSelection) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<FilterSelection>({
    status: [],
    workflow: []
  })
  const [activeTab, setActiveTab] = useState<'status' | 'workflow'>('status')
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

  const toggleFilter = (type: 'status' | 'workflow', filterId: string) => {
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
      status: [],
      workflow: []
    })
    onFilterChange({
      status: [],
      workflow: []
    })
  }

  const applyFilters = () => {
    onFilterChange(selectedFilters)
    setIsOpen(false)
  }

  const removeFilter = (type: 'status' | 'workflow', filterId: string) => {
    setSelectedFilters(prev => {
      const updatedFilters = {
        ...prev,
        [type]: prev[type].filter(id => id !== filterId)
      }
      onFilterChange(updatedFilters)
      return updatedFilters
    })
  }

  // Get all applied filters count
  const getFilterCount = () => {
    return selectedFilters.status.length + selectedFilters.workflow.length
  }

  const getFilterLabel = (type: 'status' | 'workflow', filterId: string): string => {
    const options = type === 'status' ? statusOptions : workflowOptions
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
                onClick={() => removeFilter('status', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('status', filterId)} filter`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
          
          {selectedFilters.workflow.map(filterId => (
            <div 
              key={filterId}
              className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
            >
              Workflow: {getFilterLabel('workflow', filterId)}
              <button 
                onClick={() => removeFilter('workflow', filterId)} 
                className="ml-1 hover:text-white"
                title={`Remove ${getFilterLabel('workflow', filterId)} filter`}
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
            <h3 className="text-sm font-medium text-white">Filter Activity Logs</h3>
            <p className="text-xs text-neutral-400 mt-1">Select options to filter logs</p>
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
              onClick={() => setActiveTab('workflow')}
              className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                activeTab === 'workflow' 
                  ? 'border-[#1D4E5F] text-[#80BDCA]' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Workflow
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
            
            {/* Workflow filters */}
            {activeTab === 'workflow' && workflowOptions.map(workflow => (
              <div key={workflow.id} className="mb-2 last:mb-0">
                <label className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer">
                  <div className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                    selectedFilters.workflow.includes(workflow.id)
                      ? 'bg-[#1D4E5F] text-white'
                      : 'border border-neutral-600'
                  }`}>
                    {selectedFilters.workflow.includes(workflow.id) && <Check size={12} />}
                  </div>
                  <input 
                    type="checkbox"
                    className="hidden"
                    checked={selectedFilters.workflow.includes(workflow.id)}
                    onChange={() => toggleFilter('workflow', workflow.id)}
                  />
                  <span className="text-sm text-neutral-300">{workflow.label}</span>
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