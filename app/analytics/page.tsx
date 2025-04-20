// app/analytics/page.tsx
'use client'

import { useState } from 'react'
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
  //Filter,
  Download,
  Calendar
} from 'lucide-react'
import { DateRangePickerModal } from './DateRangePickerModal'
import { FilterDropdown } from './FilterDropdown'

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
  //const [appliedFilters, setAppliedFilters] = useState<string[]>([])
  
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
  }
  
  // Handle filter changes
  const handleFilterChange = (selectedFilters: string[]) => {
    //setAppliedFilters(selectedFilters)
    // In a real application, you would refresh the data based on filters here
    console.log('Filters applied:', selectedFilters)
  }
  
  return (
    <div className="space-y-8">
      {/* Page Title and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Analytics</h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-flex items-center p-1 bg-neutral-800 border border-neutral-700 rounded-lg text-sm">
            <button 
              onClick={() => setTimeRange('last-30-days')}
              className={`px-3 py-1.5 rounded-md ${
                timeRange === 'last-30-days' ? 'bg-[#1D4E5F] text-white' : 'text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Last 30 days
            </button>
            <button 
              onClick={() => setTimeRange('last-quarter')}
              className={`px-3 py-1.5 rounded-md ${
                timeRange === 'last-quarter' ? 'bg-[#1D4E5F] text-white' : 'text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Last quarter
            </button>
            <button 
              onClick={() => setTimeRange('year-to-date')}
              className={`px-3 py-1.5 rounded-md ${
                timeRange === 'year-to-date' ? 'bg-[#1D4E5F] text-white' : 'text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              Year to date
            </button>
            {timeRange === 'custom' && (
              <button className="px-3 py-1.5 bg-[#1D4E5F] text-white rounded-md">
                Custom
              </button>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsDatePickerOpen(true)}
              className={`flex items-center px-3 py-2 border rounded-lg transition-colors ${
                timeRange === 'custom' 
                  ? 'bg-[#1D4E5F]/20 border-[#1D4E5F]/40 text-[#80BDCA]' 
                  : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
              }`}
              title="Select custom date range"
            >
              <Calendar size={16} className="mr-2" />
              <span className="text-sm">
                {timeRange === 'custom' && customDateRange 
                  ? `${formatDateForDisplay(customDateRange.start)} - ${formatDateForDisplay(customDateRange.end)}`
                  : 'Custom Range'
                }
              </span>
            </button>
          </div>
          
          <FilterDropdown onFilterChange={handleFilterChange} />
          
          <button className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700">
            <Download size={16} className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Total Candidates</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">256</p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +18%
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA]">
              <Users size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Time to Hire (avg)</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">30 <span className="text-base font-medium">days</span></p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingDown size={12} className="mr-0.5" /> -2 days
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2]">
              <Clock size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Hires</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">143</p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA]">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Rejections</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">58</p>
                <span className="text-xs font-medium text-red-400 pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +4%
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Compared to last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2]">
              <XCircle size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#80BDCA] text-lg flex items-center">
              <BarChart3 size={20} className="mr-2" /> Top Positions
            </h3>
          </div>
          
          {/* Top Positions Chart - Bar Chart */}
          <div className="h-64">
            <div className="h-full flex items-end">
              {topPositionsData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex justify-center mb-2">
                    <div 
                      className="w-12 bg-[#1D4E5F] hover:bg-[#123040] transition-all rounded-t-sm"
                      style={{ height: `${(item.count / 24) * 180}px` }}
                    ></div>
                  </div>
                  <div className="text-xs text-neutral-400 text-center truncate w-20 h-8">{item.position}</div>
                  <div className="text-sm font-semibold text-neutral-300">{item.count}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-[#80BDCA] text-lg flex items-center">
              <PieChart size={20} className="mr-2" /> Hiring Pipeline
            </h3>
          </div>
          
          {/* Pipeline Chart - Funnel Visualization */}
          <div className="h-64 flex flex-col justify-center">
            {hiringPipelineData.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="w-24 text-sm text-neutral-300">{item.stage}</div>
                <div className="flex-1 h-8 ml-2">
                  <div 
                    className="h-full rounded-r-sm"
                    style={{ 
                      width: `${(item.count / hiringPipelineData[0].count) * 100}%`,
                      backgroundColor: index === 0 ? '#1D4E5F' : 
                                        index === 1 ? '#2A6274' : 
                                        index === 2 ? '#37A794' : 
                                        index === 3 ? '#51B3A2' : 
                                        '#4ade80'
                    }}
                  ></div>
                </div>
                <div className="ml-3 w-12 text-right text-sm font-medium text-neutral-300">{item.count}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Monthly Trends Chart */}
      <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-[#80BDCA] text-lg flex items-center">
            <LineChart size={20} className="mr-2" /> Monthly Trends
          </h3>
          <div className="text-sm text-neutral-400">
            {getTimeRangeDisplayText()}
          </div>
        </div>
        
        <div className="h-80">
          {/* Line Chart Visualization */}
          <div className="h-full flex flex-col">
            {/* Chart Area */}
            <div className="flex-1 relative">
              {/* Y-axis grid lines */}
              {[0, 1, 2, 3, 4].map((_, index) => (
                <div 
                  key={index} 
                  className="absolute w-full h-px bg-neutral-700/50" 
                  style={{ bottom: `${index * 25}%` }}
                ></div>
              ))}
              
              {/* Chart lines */}
              <div className="absolute inset-0 flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  {/* Applications line */}
                  <polyline
                    points={
                      monthlyTrendsData.map((d, i) => 
                        `${(i / (monthlyTrendsData.length - 1)) * 100}% ${100 - (d.applications / 220) * 100}%`
                      ).join(' ')
                    }
                    fill="none"
                    stroke="#1D4E5F"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Hires line */}
                  <polyline
                    points={
                      monthlyTrendsData.map((d, i) => 
                        `${(i / (monthlyTrendsData.length - 1)) * 100}% ${100 - (d.hires / 25) * 100}%`
                      ).join(' ')
                    }
                    fill="none"
                    stroke="#37A794"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                
                {/* Data points - Applications */}
                <div className="absolute inset-0 flex justify-between items-end pointer-events-none">
                  {monthlyTrendsData.map((d, i) => (
                    <div 
                      key={`app-${i}`} 
                      className="h-2 w-2 rounded-full bg-[#1D4E5F] ring-2 ring-[#1D4E5F]/30 ring-offset-1 ring-offset-neutral-800"
                      style={{ 
                        marginBottom: `${(d.applications / 220) * 100}%`,
                        transform: 'translateX(1px)'
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Data points - Hires */}
                <div className="absolute inset-0 flex justify-between items-end pointer-events-none">
                  {monthlyTrendsData.map((d, i) => (
                    <div 
                      key={`hire-${i}`} 
                      className="h-2 w-2 rounded-full bg-[#37A794] ring-2 ring-[#37A794]/30 ring-offset-1 ring-offset-neutral-800"
                      style={{ 
                        marginBottom: `${(d.hires / 25) * 100}%`,
                        transform: 'translateX(1px)'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="h-6 flex justify-between mt-4">
              {monthlyTrendsData.map((d, i) => (
                <div key={i} className="text-xs text-neutral-400">{d.month}</div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chart Legend */}
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#1D4E5F] mr-2"></div>
            <span className="text-sm text-neutral-300">Applications</span>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-[#37A794] mr-2"></div>
            <span className="text-sm text-neutral-300">Hires</span>
          </div>
        </div>
      </Card>

      {/* Date Range Picker Modal */}
      <DateRangePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        onApply={handleDateRangeSelect}
      />
    </div>
  )
}