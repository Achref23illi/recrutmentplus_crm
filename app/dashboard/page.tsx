// app/dashboard/page.tsx
import { Card } from '@/components/ui/card'
import {
  UserCheck,
  Clock,
  Briefcase,
  TrendingUp,
  CalendarClock,
  CircleUser,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data for pipeline stages
  const pipelineStages = [
    { name: 'Applied', count: 45, color: 'bg-[#1D4E5F]' },
    { name: 'Screening', count: 28, color: 'bg-[#2A6274]' },
    { name: 'Interview', count: 16, color: 'bg-[#37A794]' },
    { name: 'Offer', count: 8, color: 'bg-[#51B3A2]' },
    { name: 'Hired', count: 4, color: 'bg-green-500' },
  ]

  // Mock data for upcoming activities
  const upcomingActivities = [
    {
      id: 1,
      type: 'Interview',
      candidate: 'Emma Thompson',
      position: 'Senior Developer',
      company: 'TechCorp',
      time: '10:00 AM',
      date: 'Today'
    },
    {
      id: 2,
      type: 'Follow-up',
      candidate: 'Michael Rodriguez',
      position: 'Product Manager',
      company: 'Innovate Inc.',
      time: '2:30 PM',
      date: 'Today'
    },
    {
      id: 3,
      type: 'Screening',
      candidate: 'Sarah Chen',
      position: 'UX Designer',
      company: 'DesignHub',
      time: '9:15 AM',
      date: 'Tomorrow'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome section with date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#80BDCA]">Welcome back, John</h2>
          <p className="text-neutral-400 mt-1">Here&apos;s what&apos;s happening with your recruitment today</p>
        </div>
        <div className="flex items-center gap-2 bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700">
          <CalendarClock size={18} className="text-[#80BDCA]" />
          <span className="font-medium text-neutral-300">April 20, 2025</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Active Candidates</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">128</p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">From last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA]">
              <CircleUser size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Open Positions</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">24</p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +5%
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">From last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2]">
              <Briefcase size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Placements</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">76</p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +18%
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">From last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA]">
              <UserCheck size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-neutral-800 overflow-hidden border-none shadow-md relative" hover={true}>
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-neutral-400">Avg. Time to Hire</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-white">32<span className="text-base ml-1 font-medium">days</span></p>
                <span className="text-xs font-medium text-[#51B3A2] pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> Better
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Industry avg: 36 days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2]">
              <Clock size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Recruitment pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-neutral-800 p-6 border-none shadow-md" hover={true}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#80BDCA] text-lg">Recruitment Pipeline</h3>
              <Link href="/analytics" className="text-sm text-[#80BDCA] hover:text-[#9AB3BB] font-medium flex items-center">
                View Details <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {/* Pipeline bar */}
              <div className="h-8 flex rounded-lg overflow-hidden">
                {pipelineStages.map((stage, index) => (
                  <div 
                    key={stage.name} 
                    className={`${stage.color} ${index === 0 ? 'rounded-l-lg' : ''} ${index === pipelineStages.length - 1 ? 'rounded-r-lg' : ''}`} 
                    style={{width: `${stage.count / pipelineStages.reduce((sum, s) => sum + s.count, 0) * 100}%`}}
                  />
                ))}
              </div>
              
              {/* Pipeline legend */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {pipelineStages.map(stage => (
                  <div key={stage.name} className="flex flex-col">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full ${stage.color} mr-2`} />
                      <span className="text-sm text-neutral-300 font-medium">{stage.name}</span>
                    </div>
                    <p className="text-lg font-bold text-white ml-5">{stage.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Upcoming activities */}
        <div>
          <Card className="bg-neutral-800 p-6 border-none shadow-md h-full" hover={true}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#80BDCA] text-lg">Upcoming Activities</h3>
              <Link href="/calendar" className="text-sm text-[#80BDCA] hover:text-[#9AB3BB] font-medium flex items-center">
                View Calendar <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingActivities.map(activity => (
                <div key={activity.id} className="p-3 bg-neutral-700 rounded-lg border border-neutral-600 hover:border-[#1D4E5F]/40 transition-colors">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#1D4E5F]/20 text-[#80BDCA]">
                      {activity.type}
                    </span>
                    <span className="text-xs text-neutral-400">{activity.time}, {activity.date}</span>
                  </div>
                  <p className="font-medium text-white mt-2">{activity.candidate}</p>
                  <div className="text-xs text-neutral-400 mt-1 flex items-center">
                    <Briefcase size={12} className="mr-1" /> 
                    {activity.position} at {activity.company}
                  </div>
                </div>
              ))}
              
              <Link href="/calendar" className="inline-flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-[#80BDCA] bg-[#1D4E5F]/20 hover:bg-[#1D4E5F]/30 rounded-lg transition-colors">
                View All Activities
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}