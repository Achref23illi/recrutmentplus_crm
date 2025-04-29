'use client'

import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Filter, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transformOrigin: "top right"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        stiffness: 500,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  }

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  }

  const chipVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { 
        duration: 0.2 
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
    },
    tap: {
      scale: 0.95
    }
  }

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
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border rounded-lg transition-colors
          ${getFilterCount() > 0 
            ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'}`}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 } 
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 1 }}
      >
        <Filter size={18} className="mr-2" /> 
        Filter
        {getFilterCount() > 0 && (
          <motion.span 
            className="ml-2 bg-[#1D4E5F] text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 25
              }
            }}
          >
            {getFilterCount()}
          </motion.span>
        )}
        <ChevronDown size={16} className="ml-2" />
      </motion.button>

      {/* Selected filters display */}
      {getFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          <AnimatePresence>
            {selectedFilters.industry.map(filterId => (
              <motion.div 
                key={filterId}
                className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
                variants={chipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
                layout
              >
                {getFilterLabel('industry', filterId)}
                <motion.button 
                  onClick={() => removeFilter('industry', filterId)} 
                  className="ml-1 hover:text-white"
                  title={`Remove ${getFilterLabel('industry', filterId)} filter`}
                  whileHover={{ rotate: 90, transition: { duration: 0.2 } }}
                >
                  <X size={12} />
                </motion.button>
              </motion.div>
            ))}
            
            {selectedFilters.openPositions.map(filterId => (
              <motion.div 
                key={filterId}
                className="inline-flex items-center px-2 py-1 bg-[#1D4E5F]/10 border border-[#1D4E5F]/30 text-[#80BDCA] text-xs rounded-lg"
                variants={chipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
                layout
              >
                {getFilterLabel('openPositions', filterId)}
                <motion.button 
                  onClick={() => removeFilter('openPositions', filterId)} 
                  className="ml-1 hover:text-white"
                  title={`Remove ${getFilterLabel('openPositions', filterId)} filter`}
                  whileHover={{ rotate: 90, transition: { duration: 0.2 } }}
                >
                  <X size={12} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.button 
            onClick={clearFilters}
            className="inline-flex items-center px-2 py-1 bg-neutral-800 border border-neutral-700 text-neutral-400 text-xs rounded-lg hover:bg-neutral-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear all
          </motion.button>
        </div>
      )}

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 z-50 bg-neutral-800 border border-neutral-700 rounded-lg shadow-lg w-80"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-3 border-b border-neutral-700">
              <h3 className="text-sm font-medium text-white">Filter Companies</h3>
              <p className="text-xs text-neutral-400 mt-1">Select options to filter the company list</p>
            </div>
            
            {/* Filter categories tabs */}
            <div className="flex border-b border-neutral-700">
              <motion.button 
                onClick={() => setActiveTab('industry')}
                className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                  activeTab === 'industry' 
                    ? 'border-[#1D4E5F] text-[#80BDCA]' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                Industry
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('openPositions')}
                className={`flex-1 py-2 text-xs font-medium border-b-2 ${
                  activeTab === 'openPositions' 
                    ? 'border-[#1D4E5F] text-[#80BDCA]' 
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                Open Positions
              </motion.button>
            </div>
            
            {/* Filter options */}
            <motion.div 
              className="max-h-60 overflow-y-auto p-3"
              variants={staggerItems}
              initial="hidden"
              animate="visible"
            >
              {/* Industry filters */}
              <AnimatePresence mode="wait">
                {activeTab === 'industry' && (
                  <motion.div
                    key="industry-tab"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.3,
                        staggerChildren: 0.05
                      }
                    }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    {industries.map(industry => (
                      <motion.div 
                        key={industry.id} 
                        className="mb-2 last:mb-0"
                        variants={itemVariants}
                      >
                        <motion.label 
                          className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer"
                          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                              selectedFilters.industry.includes(industry.id)
                                ? 'bg-[#1D4E5F] text-white'
                                : 'border border-neutral-600'
                            }`}
                            animate={{ 
                              backgroundColor: selectedFilters.industry.includes(industry.id) 
                                ? 'rgb(29, 78, 95)' 
                                : 'transparent',
                              borderColor: selectedFilters.industry.includes(industry.id)
                                ? 'rgb(29, 78, 95)'
                                : 'rgb(82, 82, 82)'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <AnimatePresence>
                              {selectedFilters.industry.includes(industry.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30
                                  }}
                                >
                                  <Check size={12} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.industry.includes(industry.id)}
                            onChange={() => toggleFilter('industry', industry.id)}
                          />
                          <span className="text-sm text-neutral-300">{industry.label}</span>
                        </motion.label>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                
                {/* Open Positions filters */}
                {activeTab === 'openPositions' && (
                  <motion.div
                    key="positions-tab"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.3,
                        staggerChildren: 0.05
                      }
                    }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    {openPositionsOptions.map(option => (
                      <motion.div 
                        key={option.id} 
                        className="mb-2 last:mb-0"
                        variants={itemVariants}
                      >
                        <motion.label 
                          className="flex items-center hover:bg-neutral-700/30 p-2 rounded cursor-pointer"
                          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                              selectedFilters.openPositions.includes(option.id)
                                ? 'bg-[#1D4E5F] text-white'
                                : 'border border-neutral-600'
                            }`}
                            animate={{ 
                              backgroundColor: selectedFilters.openPositions.includes(option.id) 
                                ? 'rgb(29, 78, 95)' 
                                : 'transparent',
                              borderColor: selectedFilters.openPositions.includes(option.id)
                                ? 'rgb(29, 78, 95)'
                                : 'rgb(82, 82, 82)'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <AnimatePresence>
                              {selectedFilters.openPositions.includes(option.id) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30
                                  }}
                                >
                                  <Check size={12} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                          <input 
                            type="checkbox"
                            className="hidden"
                            checked={selectedFilters.openPositions.includes(option.id)}
                            onChange={() => toggleFilter('openPositions', option.id)}
                          />
                          <span className="text-sm text-neutral-300">{option.label}</span>
                        </motion.label>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Actions */}
            <div className="p-3 border-t border-neutral-700 flex justify-between">
              <motion.button
                onClick={clearFilters}
                className="text-xs text-neutral-400 hover:text-neutral-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear all
              </motion.button>
              <motion.button
                onClick={applyFilters}
                className="px-3 py-1 bg-[#1D4E5F] text-white text-xs rounded hover:bg-[#123040] transition"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgb(18, 48, 64)'
                }}
                whileTap={{ scale: 0.95 }}
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