// app/dashboard/page.tsx
import { Card } from '@/components/ui/card'
import {
  UserCheck,
  Clock,
  Building,
  Briefcase,
  TrendingUp,
  CalendarClock,
  CircleUser
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  // Mock data for pipeline stages
  const pipelineStages = [
    { name: 'Applied', count: 45, color: 'bg-blue-500' },
    { name: 'Screening', count: 28, color: 'bg-yellow-500' },
    { name: 'Interview', count: 16, color: 'bg-orange-500' },
    { name: 'Offer', count: 8, color: 'bg-pink-500' },
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
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, John</h2>
          <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your recruitment today</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <CalendarClock size={18} className="text-blue-600" />
          <span className="font-medium text-gray-700">April 20, 2025</span>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white overflow-hidden border-none shadow-md relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-blue-50 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Candidates</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-800">128</p>
                <span className="text-xs font-medium text-green-600 pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +12%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">From last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <CircleUser size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-white overflow-hidden border-none shadow-md relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-50 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-gray-500">Open Positions</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-800">24</p>
                <span className="text-xs font-medium text-green-600 pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +5%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">From last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Briefcase size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-white overflow-hidden border-none shadow-md relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-purple-50 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-gray-500">Placements</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-800">76</p>
                <span className="text-xs font-medium text-green-600 pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> +18%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">From last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <UserCheck size={24} />
            </div>
          </div>
        </Card>

        <Card className="bg-white overflow-hidden border-none shadow-md relative">
          <div className="absolute top-0 right-0 h-24 w-24 bg-amber-50 rounded-full -mt-8 -mr-8"></div>
          <div className="px-6 py-5 flex justify-between items-center relative">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Time to Hire</p>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-800">32<span className="text-base ml-1 font-medium">days</span></p>
                <span className="text-xs font-medium text-green-600 pb-1 flex items-center">
                  <TrendingUp size={12} className="mr-0.5" /> Better
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Industry avg: 36 days</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Recruitment pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-white p-6 border-none shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800 text-lg">Recruitment Pipeline</h3>
              <Link href="/analytics" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
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
                      <span className="text-sm text-gray-600 font-medium">{stage.name}</span>
                    </div>
                    <p className="text-lg font-bold ml-5">{stage.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Upcoming activities */}
        <div>
          <Card className="bg-white p-6 border-none shadow-md h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800 text-lg">Upcoming Activities</h3>
              <Link href="/calendar" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Calendar
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingActivities.map(activity => (
                <div key={activity.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800">
                      {activity.type}
                    </span>
                    <span className="text-xs text-gray-500">{activity.time}, {activity.date}</span>
                  </div>
                  <p className="font-medium text-gray-800 mt-2">{activity.candidate}</p>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    <Briefcase size={12} className="mr-1" /> 
                    {activity.position} at {activity.company}
                  </div>
                </div>
              ))}
              
              <Link href="/calendar" className="inline-flex items-center justify-center w-full py-2 mt-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                View All Activities
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent candidates and companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent candidates */}
        <Card className="bg-white p-6 border-none shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">Recent Candidates</h3>
            <Link href="/candidates" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {['AT', 'JD', 'RH'][i-1]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{['Alex Taylor', 'Jane Doe', 'Robert Harris'][i-1]}</p>
                    <p className="text-xs text-gray-500">{['UI/UX Designer', 'Frontend Developer', 'Product Manager'][i-1]}</p>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {['New', 'Interview', 'Screening'][i-1]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Recent companies */}
        <Card className="bg-white p-6 border-none shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-800 text-lg">Active Companies</h3>
            <Link href="/companies" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Building size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{['TechCorp Inc.', 'Innovate Labs', 'Designo Agency'][i-1]}</p>
                    <p className="text-xs text-gray-500">{['4 open positions', '2 open positions', '3 open positions'][i-1]}</p>
                  </div>
                </div>
                <div>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
