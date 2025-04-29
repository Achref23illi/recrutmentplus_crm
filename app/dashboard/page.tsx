// app/dashboard/page.tsx
import { Card } from '@/components/ui/card'
import {
  UserCheck,
  Clock,
  Briefcase,
  TrendingUp,
  CalendarClock,
  CircleUser,
  ChevronRight,
  FolderPlus,
  Folders
} from 'lucide-react'
import Link from 'next/link'
//import { animations } from '@/lib/animations'

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
        <Card 
          className="bg-neutral-800 overflow-hidden border-none shadow-md relative transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4E5F]/20 hover:-translate-y-1 hover:border-[#1D4E5F]/30" 
          hover="scale"
        >
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8 transition-transform duration-300 group-hover:scale-110"></div>
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
            <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA] transition-all duration-300 hover:scale-110 hover:bg-[#1D4E5F]/30">
              <CircleUser size={24} />
            </div>
          </div>
        </Card>

        <Card 
          className="bg-neutral-800 overflow-hidden border-none shadow-md relative transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#37A794]/20 hover:-translate-y-1 hover:border-[#37A794]/30" 
          hover="scale"
        >
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8 transition-transform duration-300 group-hover:scale-110"></div>
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
            <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2] transition-all duration-300 hover:scale-110 hover:bg-[#37A794]/30">
              <Briefcase size={24} />
            </div>
          </div>
        </Card>

        <Card 
          className="bg-neutral-800 overflow-hidden border-none shadow-md relative transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4E5F]/20 hover:-translate-y-1 hover:border-[#1D4E5F]/30" 
          hover="scale"
        >
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#1D4E5F]/10 rounded-full -mt-8 -mr-8 transition-transform duration-300 group-hover:scale-110"></div>
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
            <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA] transition-all duration-300 hover:scale-110 hover:bg-[#1D4E5F]/30">
              <UserCheck size={24} />
            </div>
          </div>
        </Card>

        <Card 
          className="bg-neutral-800 overflow-hidden border-none shadow-md relative transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#37A794]/20 hover:-translate-y-1 hover:border-[#37A794]/30" 
          hover="scale"
        >
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#37A794]/10 rounded-full -mt-8 -mr-8 transition-transform duration-300 group-hover:scale-110"></div>
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
            <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2] transition-all duration-300 hover:scale-110 hover:bg-[#37A794]/30">
              <Clock size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Recruitment pipeline and Upcoming Activities with Project buttons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline visualization */}
        <div className="lg:col-span-2">
          <Card 
            className="bg-neutral-800 p-6 border-none shadow-md transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4E5F]/20" 
            hover="glow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#80BDCA] text-lg">Recruitment Pipeline</h3>
              <Link href="/analytics" className="text-sm text-[#80BDCA] hover:text-white flex items-center group transition-colors duration-300">
                View Details <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
            
            <div className="space-y-6">
              {/* Pipeline bar */}
              <div className="h-8 flex rounded-lg overflow-hidden">
                {pipelineStages.map((stage, index) => (
                  <div 
                    key={stage.name} 
                    className={`${stage.color} ${index === 0 ? 'rounded-l-lg' : ''} ${index === pipelineStages.length - 1 ? 'rounded-r-lg' : ''} transition-all duration-500 hover:brightness-125`} 
                    style={{width: `${stage.count / pipelineStages.reduce((sum, s) => sum + s.count, 0) * 100}%`}}
                  />
                ))}
              </div>
              
              {/* Pipeline legend */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {pipelineStages.map(stage => (
                  <div key={stage.name} className="flex flex-col group transition-transform duration-200 hover:scale-105">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full ${stage.color} mr-2 group-hover:scale-125 transition-transform duration-200`} />
                      <span className="text-sm text-neutral-300 font-medium">{stage.name}</span>
                    </div>
                    <p className="text-lg font-bold text-white ml-5">{stage.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Project Action Cards - Now under the Recruitment Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <Link href="/projects/create">
              <Card className="bg-neutral-800 border-none shadow-md h-full group transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4E5F]/20 hover:-translate-y-1">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/20 flex items-center justify-center text-[#80BDCA] group-hover:bg-[#1D4E5F]/30 group-hover:scale-110 transition-all mb-3">
                    <FolderPlus size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#80BDCA] transition-colors duration-300">Create New Project</h3>
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Define roles and requirements</p>
                </div>
              </Card>
            </Link>

            <Link href="/projects">
              <Card className="bg-neutral-800 border-none shadow-md h-full group transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#37A794]/20 hover:-translate-y-1">
                <div className="p-5 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-[#37A794]/20 flex items-center justify-center text-[#51B3A2] group-hover:bg-[#37A794]/30 group-hover:scale-110 transition-all mb-3">
                    <Folders size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#51B3A2] transition-colors duration-300">View All Projects</h3>
                  <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Manage recruitment campaigns</p>
                </div>
              </Card>
            </Link>
          </div>
        </div>
        
        {/* Upcoming activities */}
        <div>
          <Card 
            className="bg-neutral-800 p-6 border-none shadow-md h-full transform-gpu transition-all duration-300 hover:shadow-xl hover:shadow-[#1D4E5F]/20" 
            hover="glow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-[#80BDCA] text-lg">Upcoming Activities</h3>
              <Link href="/calendar" className="text-sm text-[#80BDCA] hover:text-white flex items-center group transition-colors duration-300">
                View Calendar <ChevronRight size={16} className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-3 bg-neutral-700 rounded-lg border border-neutral-600 hover:border-[#1D4E5F]/40 transition-all duration-300 hover:bg-neutral-700/80 hover:shadow-md transform-gpu hover:translate-y-[-2px]"
                >
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-[#1D4E5F]/20 text-[#80BDCA] hover:bg-[#1D4E5F]/30 transition-colors duration-200">
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
              
              <Link href="/calendar" className="inline-flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-[#80BDCA] bg-[#1D4E5F]/20 hover:bg-[#1D4E5F]/30 rounded-lg transition-all duration-300 hover:shadow-md group">
                View All Activities
                <ChevronRight size={14} className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}