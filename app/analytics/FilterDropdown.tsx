// filepath: app/analytics/FilterDropdown.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  const tabContentVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 300,
        staggerChildren: 0.03
      }
    },
    exit: { opacity: 0, x: -10 }
  }

  const checkboxVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 300 }
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

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors
          ${selectedFilters.length > 0 
            ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'}`}
      >
        <Filter size={16} className="mr-2" /> 
        Filter
        {selectedFilters.length > 0 && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-2 bg-[#1D4E5F] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center"
          >
            {selectedFilters.length}
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
      <AnimatePresence>
        {selectedFilters.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { duration: 0.3 }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.3 }
            }}
            className="flex flex-wrap gap-2 mt-2 overflow-hidden"
          >
            <AnimatePresence>
              {selectedFilters.map(filterId => (
                <motion.div 
                  key={filterId}
                  variants={filterTagVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
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
            </AnimatePresence>
            <motion.button 
              variants={filterTagVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="inline-flex items-center px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs rounded-lg hover:bg-neutral-700"
            >
              Clear all
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

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
              <h3 className="text-sm font-medium text-white">Filter Analytics</h3>
              <p className="text-xs text-neutral-400 mt-1">Select options to filter the analytics data</p>
            </div>
            
            {/* Filter categories tabs */}
            <div className="flex border-b border-neutral-700">
              {(['department', 'position', 'source', 'location'] as const).map((tab) => (
                <motion.button 
                  key={tab}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                    activeTab === tab 
                      ? 'border-[#1D4E5F] text-[#80BDCA]' 
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
            
            {/* Filter options */}
            <div className="max-h-60 overflow-y-auto p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {filterOptions
                    .filter(option => option.type === activeTab)
                    .map(option => (
                      <motion.div 
                        key={option.id} 
                        variants={checkboxVariants}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        className="mb-2 last:mb-0"
                      >
                        <label className="flex items-center p-2 rounded cursor-pointer">
                          <motion.div 
                            initial={false}
                            animate={{ 
                              backgroundColor: selectedFilters.includes(option.id) ? "#1D4E5F" : "transparent",
                              borderColor: selectedFilters.includes(option.id) ? "#1D4E5F" : "#666666"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-4 h-4 rounded mr-2 flex items-center justify-center border`}
                          >
                            <AnimatePresence>
                              {selectedFilters.includes(option.id) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Check size={12} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.includes(option.id)}
                            onChange={() => toggleFilter(option.id)}
                          />
                          <span className="text-sm text-neutral-300">{option.label}</span>
                        </label>
                      </motion.div>
                    ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Actions */}
            <motion.div 
              className="p-3 border-t border-neutral-700 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}