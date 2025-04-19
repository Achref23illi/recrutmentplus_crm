// app/page.jsx
'use client'

import { useState } from 'react'
import KPICard from '../components/KPICard'
import AddPositionModal from '../components/AddPositionModal'
import { Calendar, Users, Briefcase, Clock, Filter, ArrowRight, PlusCircle } from 'lucide-react'

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [isAddPositionModalOpen, setIsAddPositionModalOpen] = useState(false)

  const tasks = [
    { id: 1, title: 'Review Sarah Smith application', type: 'Candidate', priority: 'High', deadline: 'Today' },
    { id: 2, title: 'Schedule interview with John Miller', type: 'Candidate', priority: 'Medium', deadline: 'Tomorrow' },
    { id: 3, title: 'Provide feedback for Tech Lead role', type: 'Position', priority: 'Low', deadline: 'Apr 22' },
    { id: 4, title: 'Update job description for UX position', type: 'Position', priority: 'Medium', deadline: 'Apr 23' },
  ]

  const recentActivity = [
    { id: 1, action: 'New application received', name: 'Michael Chen', position: 'Frontend Developer', time: '10 mins ago' },
    { id: 2, action: 'Interview scheduled', name: 'Jessica Reynolds', position: 'UX Designer', time: '1 hour ago' },
    { id: 3, action: 'Candidate shortlisted', name: 'Ahmed Hassan', position: 'Product Manager', time: '3 hours ago' },
  ]

  const upcomingInterviews = [
    { id: 1, name: 'Alex Morgan', position: 'Backend Developer', time: '10:00 AM', date: 'Today' },
    { id: 2, name: 'Priya Patel', position: 'Sales Manager', time: '2:30 PM', date: 'Today' },
    { id: 3, name: 'Thomas Wilson', position: 'Marketing Specialist', time: '11:15 AM', date: 'Tomorrow' },
  ]

  const filterOptions = ['All', 'Candidates', 'Positions', 'Interviews']

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Recruitment Dashboard</h1>
          <button 
            onClick={() => setIsAddPositionModalOpen(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add Position</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Welcome back, Sarah. Here&apos;s what&apos;s happening with your recruitment pipeline.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Active Candidates" 
          value="145" 
          change="23.36%" 
          trend="up" 
        />
        <KPICard 
          title="Open Positions" 
          value="37" 
          change="12.05%" 
          trend="up" 
        />
        <KPICard 
          title="Placements" 
          value="24" 
          change="28.12%" 
          trend="up" 
        />
        <KPICard 
          title="Time to Hire" 
          value="18.5 days" 
          change="4.3%" 
          trend="down" 
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-[var(--foreground)]">Tasks</h2>
              
              {/* Filter tabs */}
              <div className="flex space-x-1 bg-[var(--secondary)] p-1 rounded-lg">
                {filterOptions.map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeFilter === filter
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                        : 'text-[var(--foreground)] hover:text-[var(--primary)]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tasks list */}
            <div className="space-y-3">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className="flex items-center p-4 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--foreground)]">{task.title}</h3>
                    <div className="flex items-center mt-1 text-xs text-[var(--muted-foreground)]">
                      <span>
                        {task.type}
                      </span>
                      <span className="mx-2">•</span>
                      <span className={`
                        ${task.priority === 'High' ? 'text-rose-500' : ''}
                        ${task.priority === 'Medium' ? 'text-amber-500' : ''}
                        ${task.priority === 'Low' ? 'text-emerald-500' : ''}
                      `}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      Due {task.deadline}
                    </span>
                  </div>
                </div>
              ))}
              
              <button className="flex items-center justify-center w-full py-3 text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">
                <span className="font-medium">View All Tasks</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Stats & Upcoming */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
            <h2 className="text-xl font-medium text-[var(--foreground)] mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary-foreground)] mr-3">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--foreground)]">
                      <span className="font-medium">{activity.action}</span>
                    </p>
                    <p className="text-sm">
                      {activity.name} • <span className="text-[var(--muted-foreground)]">{activity.position}</span>
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Interviews */}
          <div className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
            <h2 className="text-xl font-medium text-[var(--foreground)] mb-4">Upcoming Interviews</h2>
            <div className="space-y-4">
              {upcomingInterviews.map(interview => (
                <div key={interview.id} className="flex p-3 rounded-lg bg-[var(--background)] border border-[var(--border)]">
                  <div className="mr-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--accent)] text-white flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">{interview.date}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[var(--foreground)]">{interview.name}</h3>
                    <p className="text-xs text-[var(--muted-foreground)]">{interview.position}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-[var(--foreground)]">{interview.time}</span>
                  </div>
                </div>
              ))}
              
              <button className="flex items-center justify-center w-full py-2 text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">
                <Calendar className="mr-2 h-4 w-4" />
                <span className="font-medium">View Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Position Modal */}
      <AddPositionModal 
        isOpen={isAddPositionModalOpen} 
        onClose={() => setIsAddPositionModalOpen(false)} 
      />
    </div>
  )
}
