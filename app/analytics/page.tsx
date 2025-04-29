// app/analytics/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  BarChart3, 
  PieChart, 
  LineChart,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Calendar
} from 'lucide-react'
import { DateRangePickerModal } from './DateRangePickerModal'
import { FilterDropdown } from './FilterDropdown'
import { motion, AnimatePresence } from 'framer-motion'

// Sample data for charts
const topPositionsData = [
  { position: 'Frontend Developer', count: 24 },
  { position: 'Product Manager', count: 18 },
  { position: 'UX Designer', count: 16 },
  { position: 'DevOps Engineer', count: 12 },
  { position: 'Data Analyst', count: 9 }
];

const hiringPipelineData = [
  { stage: 'Applied', count: 256 },
  { stage: 'Screening', count: 124 },
  { stage: 'Interview', count: 76 },
  { stage: 'Offer', count: 32 },
  { stage: 'Hired', count: 21 }
];

const monthlyTrendsData = [
  { month: 'Jan', applications: 120, hires: 12 },
  { month: 'Feb', applications: 145, hires: 15 },
  { month: 'Mar', applications: 162, hires: 14 },
  { month: 'Apr', applications: 180, hires: 18 },
  { month: 'May', applications: 200, hires: 21 },
  { month: 'Jun', applications: 220, hires: 22 }
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('last-30-days')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [customDateRange, setCustomDateRange] = useState<{ start: Date; end: Date } | null>(null)
  const [chartLoaded, setChartLoaded] = useState(false)
  
  // Date formatting for display
  const formatDateForDisplay = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  // Get display text for the current time range selection
  const getTimeRangeDisplayText = (): string => {
    if (timeRange === 'custom' && customDateRange) {
      return `${formatDateForDisplay(customDateRange.start)} - ${formatDateForDisplay(customDateRange.end)}`
    }
    
    switch (timeRange) {
      case 'last-30-days': return 'Last 30 days'
      case 'last-quarter': return 'Last quarter'
      case 'year-to-date': return 'Year to date'
      default: return 'Last 30 days'
    }
  }
  
  // Handle date range selection
  const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
    setCustomDateRange({ start: startDate, end: endDate })
    setTimeRange('custom')
    // Simulate chart reload
    setChartLoaded(false)
    setTimeout(() => setChartLoaded(true), 500)
  }
  
  // Handle filter changes
  const handleFilterChange = (selectedFilters: string[]) => {
    // In a real application, you would refresh the data based on filters here
    console.log('Filters applied:', selectedFilters)
    // Simulate chart reload
    setChartLoaded(false)
    setTimeout(() => setChartLoaded(true), 500)
  }

  // Animation variants
  const pageTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemTransition = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  }

  const cardHoverTransition = {
    rest: { 
      scale: 1,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      y: 0
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  }

  const chartContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  }

  const barChartVariants = {
    hidden: { scaleY: 0 },
    visible: (i: number) => ({ 
      scaleY: 1,
      transition: { 
        duration: 0.5,
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    })
  }

  const funnelChartVariants = {
    hidden: { width: 0 },
    visible: (i: number) => ({ 
      width: "100%",
      transition: { 
        duration: 0.7,
        delay: i * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 30
      }
    })
  }

  const timeRangeButtonVariants = {
    inactive: { 
      backgroundColor: "rgba(26, 26, 26, 0)",
      color: "#d1d5db"
    },
    active: { 
      backgroundColor: "#1D4E5F",
      color: "#ffffff",
      transition: { duration: 0.2 }
    }
  }

  const linePointVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: 0.5 + (i * 0.1),
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    })
  }

  useEffect(() => {
    // Initialize chart loaded state when component mounts
    setChartLoaded(true)
  }, [])
  
  return (
    <motion.div 
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Title and Filters */}
      <motion.div 
        variants={itemTransition}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="text-2xl font-semibold text-[#80BDCA]"
          >
            Analytics
          </motion.h2>
        </div>
        <motion.div 
          variants={itemTransition}
          className="flex flex-wrap items-center gap-3"
        >
          <motion.div 
            variants={itemTransition}
            className="relative inline-flex items-center p-1 bg-neutral-800 border border-neutral-700 rounded-lg text-sm"
          >
            <AnimatePresence mode="wait">
              <motion.button 
                initial="inactive"
                animate={timeRange === 'last-30-days' ? "active" : "inactive"}
                variants={timeRangeButtonVariants}
                whileHover={{ backgroundColor: timeRange === 'last-30-days' ? "#1D4E5F" : "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTimeRange('last-30-days')
                  setChartLoaded(false)
                  setTimeout(() => setChartLoaded(true), 500)
                }}
                className="px-3 py-1.5 rounded-md"
              >
                Last 30 days
              </motion.button>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.button 
                initial="inactive"
                animate={timeRange === 'last-quarter' ? "active" : "inactive"}
                variants={timeRangeButtonVariants}
                whileHover={{ backgroundColor: timeRange === 'last-quarter' ? "#1D4E5F" : "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTimeRange('last-quarter')
                  setChartLoaded(false)
                  setTimeout(() => setChartLoaded(true), 500)
                }}
                className="px-3 py-1.5 rounded-md"
              >
                Last quarter
              </motion.button>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.button 
                initial="inactive"
                animate={timeRange === 'year-to-date' ? "active" : "inactive"}
                variants={timeRangeButtonVariants}
                whileHover={{ backgroundColor: timeRange === 'year-to-date' ? "#1D4E5F" : "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setTimeRange('year-to-date')
                  setChartLoaded(false)
                  setTimeout(() => setChartLoaded(true), 500)
                }}
                className="px-3 py-1.5 rounded-md"
              >
                Year to date
              </motion.button>
            </AnimatePresence>
            <AnimatePresence>
              {timeRange === 'custom' && (
                <motion.button 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-[#1D4E5F] text-white rounded-md"
                >
                  Custom
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div variants={itemTransition} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDatePickerOpen(true)}
              className={`flex items-center px-3 py-2 border rounded-lg transition-colors ${
                timeRange === 'custom' 
                  ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
                  : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
              }`}
              title="Select custom date range"
            >
              <Calendar size={16} className="mr-2" />
              <motion.span 
                key={timeRange}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm"
              >
                {timeRange === 'custom' && customDateRange 
                  ? `${formatDateForDisplay(customDateRange.start)} - ${formatDateForDisplay(customDateRange.end)}`
                  : 'Custom Range'
                }
              </motion.span>
            </motion.button>
          </motion.div>
          
          <motion.div variants={itemTransition}>
            <FilterDropdown onFilterChange={handleFilterChange} />
          </motion.div>
          
          <motion.button 
            variants={itemTransition}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700"
          >
            <Download size={16} className="mr-2" /> Export
          </motion.button>
        </motion.div>
      </motion.div>

      {/* KPI summary */}
      <motion.div 
        variants={itemTransition}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div
          variants={itemTransition}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div 
            variants={cardHoverTransition}
            className="relative rounded-lg overflow-hidden"
          >
            <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
              <motion.div 
                className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <div className="px-6 py-5 flex justify-between items-center relative">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Total Candidates</p>
                  <div className="flex items-end gap-2 mt-1">
                    <motion.p 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      256
                    </motion.p>
                    <motion.span 
                      className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <TrendingUp size={12} className="mr-0.5" /> +18%
                    </motion.span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA]"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.3)" }}
                >
                  <Users size={24} />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemTransition}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div 
            variants={cardHoverTransition}
            className="relative rounded-lg overflow-hidden"
          >
            <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
              <motion.div 
                className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              ></motion.div>
              <div className="px-6 py-5 flex justify-between items-center relative">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Time to Hire (avg)</p>
                  <div className="flex items-end gap-2 mt-1">
                    <motion.p 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      30 <span className="text-base font-medium">days</span>
                    </motion.p>
                    <motion.span 
                      className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <TrendingDown size={12} className="mr-0.5" /> -2 days
                    </motion.span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2]"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(55, 167, 148, 0.3)" }}
                >
                  <Clock size={24} />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemTransition}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div 
            variants={cardHoverTransition}
            className="relative rounded-lg overflow-hidden"
          >
            <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
              <motion.div 
                className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              ></motion.div>
              <div className="px-6 py-5 flex justify-between items-center relative">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Hires</p>
                  <div className="flex items-end gap-2 mt-1">
                    <motion.p 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      143
                    </motion.p>
                    <motion.span 
                      className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <TrendingUp size={12} className="mr-0.5" /> +12%
                    </motion.span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA]"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.3)" }}
                >
                  <CheckCircle2 size={24} />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemTransition}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div 
            variants={cardHoverTransition}
            className="relative rounded-lg overflow-hidden"
          >
            <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
              <motion.div 
                className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              ></motion.div>
              <div className="px-6 py-5 flex justify-between items-center relative">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Rejections</p>
                  <div className="flex items-end gap-2 mt-1">
                    <motion.p 
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      58
                    </motion.p>
                    <motion.span 
                      className="text-xs font-medium text-red-400 pb-1 flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <TrendingUp size={12} className="mr-0.5" /> +4%
                    </motion.span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
                </div>
                <motion.div 
                  className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2]"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(55, 167, 148, 0.3)" }}
                >
                  <XCircle size={24} />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div 
        variants={itemTransition}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div 
          variants={itemTransition}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <motion.h3
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-semibold text-[#80BDCA] text-lg flex items-center"
              >
                <BarChart3 size={20} className="mr-2" /> Top Positions
              </motion.h3>
            </div>
            
            {/* Top Positions Chart - Bar Chart */}
            <AnimatePresence>
              {chartLoaded && (
                <motion.div 
                  key="bar-chart"
                  variants={chartContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-64"
                >
                  <div className="h-full flex items-end">
                    {topPositionsData.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="relative w-full flex justify-center mb-2">
                          <motion.div 
                            custom={index}
                            variants={barChartVariants}
                            className="w-12 bg-[#1D4E5F] hover:bg-[#123040] transition-all rounded-t-sm origin-bottom"
                            style={{ height: `${(item.count / 24) * 180}px` }}
                            whileHover={{ scaleX: 1.1 }}
                          ></motion.div>
                        </div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + (index * 0.1) }}
                          className="text-xs text-neutral-400 text-center truncate w-20 h-8"
                        >
                          {item.position}
                        </motion.div>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + (index * 0.1) }}
                          className="text-sm font-semibold text-neutral-300"
                        >
                          {item.count}
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemTransition}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
        >
          <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <motion.h3 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="font-semibold text-[#80BDCA] text-lg flex items-center"
              >
                <PieChart size={20} className="mr-2" /> Hiring Pipeline
              </motion.h3>
            </div>
            
            {/* Pipeline Chart - Funnel Visualization */}
            <AnimatePresence>
              {chartLoaded && (
                <motion.div 
                  key="funnel-chart"
                  variants={chartContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-64 flex flex-col justify-center"
                >
                  {hiringPipelineData.map((item, index) => (
                    <div key={index} className="flex items-center mb-4">
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-24 text-sm text-neutral-300"
                      >
                        {item.stage}
                      </motion.div>
                      <div className="flex-1 h-8 ml-2 overflow-hidden">
                        <motion.div 
                          custom={index}
                          variants={funnelChartVariants}
                          className="h-full rounded-r-sm origin-left"
                          style={{ 
                            width: `${(item.count / hiringPipelineData[0].count) * 100}%`,
                            backgroundColor: index === 0 ? '#1D4E5F' : 
                                            index === 1 ? '#2A6274' : 
                                            index === 2 ? '#37A794' : 
                                            index === 3 ? '#51B3A2' : 
                                            '#4ade80'
                          }}
                          whileHover={{ 
                            x: 5, 
                            transition: { duration: 0.2 } 
                          }}
                        ></motion.div>
                      </div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="ml-3 w-12 text-right text-sm font-medium text-neutral-300"
                      >
                        {item.count}
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </motion.div>

      {/* Monthly Trends Chart */}
      <motion.div 
        variants={itemTransition}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
      >
        <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="font-semibold text-[#80BDCA] text-lg flex items-center"
            >
              <LineChart size={20} className="mr-2" /> Monthly Trends
            </motion.h3>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-neutral-400"
            >
              {getTimeRangeDisplayText()}
            </motion.div>
          </div>
          
          <AnimatePresence>
            {chartLoaded && (
              <motion.div 
                key="trend-chart"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-80"
              >
                {/* Line Chart Visualization */}
                <div className="h-full flex flex-col">
                  {/* Chart Area */}
                  <div className="flex-1 relative">
                    {/* Y-axis grid lines */}
                    {[0, 1, 2, 3, 4].map((_, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.2 + (index * 0.1) }}
                        className="absolute w-full h-px bg-neutral-700/50 origin-left" 
                        style={{ bottom: `${index * 25}%` }}
                      ></motion.div>
                    ))}
                    
                    {/* Chart lines */}
                    <div className="absolute inset-0 flex items-end">
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        {/* Applications line */}
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          d={`M ${monthlyTrendsData.map((d, i) => 
                            `${(i / (monthlyTrendsData.length - 1)) * 100} ${100 - (d.applications / 220) * 100}`
                          ).join(' L ')}`}
                          fill="none"
                          stroke="#1D4E5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                        
                        {/* Hires line */}
                        <motion.path
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                          d={`M ${monthlyTrendsData.map((d, i) => 
                            `${(i / (monthlyTrendsData.length - 1)) * 100} ${100 - (d.hires / 25) * 100}`
                          ).join(' L ')}`}
                          fill="none"
                          stroke="#37A794"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                      
                      {/* Data points - Applications */}
                      <div className="absolute inset-0 flex justify-between items-end pointer-events-none">
                        {monthlyTrendsData.map((d, i) => (
                          <motion.div 
                            key={`app-${i}`} 
                            custom={i}
                            variants={linePointVariants}
                            initial="hidden"
                            animate="visible"
                            className="h-2 w-2 rounded-full bg-[#1D4E5F] ring-2 ring-[#1D4E5F]/30 ring-offset-1 ring-offset-neutral-800"
                            style={{ 
                              marginBottom: `${(d.applications / 220) * 100}%`,
                              transform: 'translateX(1px)'
                            }}
                          ></motion.div>
                        ))}
                      </div>
                      
                      {/* Data points - Hires */}
                      <div className="absolute inset-0 flex justify-between items-end pointer-events-none">
                        {monthlyTrendsData.map((d, i) => (
                          <motion.div 
                            key={`hire-${i}`} 
                            custom={i}
                            variants={linePointVariants}
                            initial="hidden"
                            animate="visible"
                            className="h-2 w-2 rounded-full bg-[#37A794] ring-2 ring-[#37A794]/30 ring-offset-1 ring-offset-neutral-800"
                            style={{ 
                              marginBottom: `${(d.hires / 25) * 100}%`,
                              transform: 'translateX(1px)'
                            }}
                          ></motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="h-6 flex justify-between mt-4">
                    {monthlyTrendsData.map((d, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="text-xs text-neutral-400"
                      >
                        {d.month}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Chart Legend */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center mt-4 space-x-6"
          >
            <div className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className="h-3 w-3 rounded-full bg-[#1D4E5F] mr-2"
              ></motion.div>
              <span className="text-sm text-neutral-300">Applications</span>
            </div>
            <div className="flex items-center">
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className="h-3 w-3 rounded-full bg-[#37A794] mr-2"
              ></motion.div>
              <span className="text-sm text-neutral-300">Hires</span>
            </div>
          </motion.div>
        </Card>
      </motion.div>

      {/* Date Range Picker Modal */}
      <DateRangePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onApply={handleDateRangeSelect}
      />
    </motion.div>
  )
}