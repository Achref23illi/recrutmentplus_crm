'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { 
  Plus, 
  Search, 
  CalendarClock,
  //Users,
  CheckCircle2,
  Briefcase,
  //Clock,
  ChevronRight
} from 'lucide-react'
import { FilterDropdown } from './FilterDropdown'
import { getStaggeredAnimation } from '@/lib/animations'

interface Project {
  id: string
  title: string
  status: 'In Progress' | 'Completed' | 'On Hold'
  dueDate: string
  progress: number
  assignees: string[] 
  tasks: {
    total: number
    completed: number
  }
}

interface TeamMember {
  id: string
  name: string
  role: string
  activeProjects: number
  completedProjects: number
}

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Senior Developer Hiring',
    status: 'In Progress',
    dueDate: '2025-05-15',
    progress: 65,
    assignees: ['1', '2', '4'],
    tasks: {
      total: 12,
      completed: 8
    }
  },
  {
    id: '2',
    title: 'Marketing Team Expansion',
    status: 'In Progress',
    dueDate: '2025-06-01',
    progress: 30,
    assignees: ['2', '5'],
    tasks: {
      total: 15,
      completed: 4
    }
  },
  {
    id: '3',
    title: 'UX Designer Recruitment',
    status: 'Completed',
    dueDate: '2025-04-20',
    progress: 100,
    assignees: ['1', '3', '4', '5'],
    tasks: {
      total: 10,
      completed: 10
    }
  },
  {
    id: '4',
    title: 'Product Manager Search',
    status: 'On Hold',
    dueDate: '2025-05-30',
    progress: 20,
    assignees: ['1', '3'],
    tasks: {
      total: 8,
      completed: 2
    }
  },
  {
    id: '5',
    title: 'DevOps Engineer Hiring',
    status: 'In Progress',
    dueDate: '2025-06-15',
    progress: 45,
    assignees: ['3', '4'],
    tasks: {
      total: 14,
      completed: 6
    }
  }
]

// Sample team members data
const sampleTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Peterson', role: 'Senior Recruiter', activeProjects: 3, completedProjects: 12 },
  { id: '2', name: 'Emma Thompson', role: 'HR Manager', activeProjects: 2, completedProjects: 8 },
  { id: '3', name: 'Michael Chen', role: 'Technical Recruiter', activeProjects: 3, completedProjects: 15 },
  { id: '4', name: 'Sarah Williams', role: 'Talent Acquisition', activeProjects: 3, completedProjects: 7 },
  { id: '5', name: 'Robert Garcia', role: 'HR Specialist', activeProjects: 2, completedProjects: 9 }
]

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(sampleProjects)
  const [members] = useState<TeamMember[]>(sampleTeamMembers)
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>(sampleTeamMembers)
  
  // Function to format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  // Function to get the status color class
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[#1D4E5F] text-[#80BDCA]'
      case 'Completed':
        return 'bg-green-900/30 text-green-300'
      case 'On Hold':
        return 'bg-amber-900/30 text-amber-300'
      default:
        return 'bg-neutral-700 text-neutral-300'
    }
  }

  // Function to get projects for a team member
  const getMemberProjects = (memberId: string) => {
    return projects.filter(project => 
      project.assignees.includes(memberId)
    ).sort((a, b) => {
      // Sort by date descending (most recent first)
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    });
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  // Handle filter changes from the dropdown
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (filters: any) => {
    // Filter the members based on the selected filters
    const filtered = members.filter(member => {
      const memberProjects = getMemberProjects(member.id);
      
      // Check if any project matches the status filter
      const matchesStatus = filters.status.length === 0 || 
        memberProjects.some(project => 
          filters.status.some((statusId: string) => {
            // Extract the actual status from the id (status-in-progress -> In Progress)
            const status = statusId.split('-').slice(1).join('-').replace(/-/g, ' ')
                           .split(' ')
                           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                           .join(' ');
            return project.status === status;
          })
        );
      
      // Check if the member is in the assignees filter
      const isAssigneeSelected = filters.assignee.length === 0 || 
        filters.assignee.includes(member.id);
      
      // Check if any project matches the due date range
      const matchesDueDate = (!filters.dueDateRange.from && !filters.dueDateRange.to) ||
        memberProjects.some(project => {
          const dueDate = new Date(project.dueDate);
          const fromDate = filters.dueDateRange.from ? new Date(filters.dueDateRange.from) : null;
          const toDate = filters.dueDateRange.to ? new Date(filters.dueDateRange.to) : null;
          
          return (!fromDate || dueDate >= fromDate) && 
                 (!toDate || dueDate <= toDate);
        });
      
      return matchesStatus && isAssigneeSelected && matchesDueDate;
    });
    
    setFilteredMembers(filtered);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-[#80BDCA]">Team Projects</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search team members or projects..."
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <FilterDropdown onFilterChange={handleFilterChange} />
          <Link href="/projects/create">
            <button className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition">
              <Plus className="mr-2" size={18} /> Create Project
            </button>
          </Link>
        </div>
      </div>

      {/* Team Members with their Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMembers.map((member, index) => {
          const memberProjects = getMemberProjects(member.id);
          const latestProjects = memberProjects.slice(0, 3); // Get only the three most recent projects
          
          return (
            <Card 
              key={member.id} 
              className="bg-neutral-800 border-none shadow-md" 
              hover="glow"
              animate="fadeIn"
              {...getStaggeredAnimation(index)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  {/* Team Member Info */}
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-[#1D4E5F]/40 text-[#80BDCA] flex items-center justify-center text-xl font-medium mr-4 transition-transform duration-300 hover:scale-110">
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                      <p className="text-neutral-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                  
                  {/* Project Stats */}
                  <div className="flex items-center space-x-4">
                    <div className="text-center transition-transform hover:scale-110 duration-200">
                      <p className="text-xs text-neutral-400">Active</p>
                      <p className="text-lg font-semibold text-white">{member.activeProjects}</p>
                    </div>
                    <div className="text-center transition-transform hover:scale-110 duration-200">
                      <p className="text-xs text-neutral-400">Completed</p>
                      <p className="text-lg font-semibold text-white">{member.completedProjects}</p>
                    </div>
                  </div>
                </div>
                
                {/* Member's Projects */}
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-neutral-400">Current Projects</h4>
                  <Link href={`/team/${member.id}/projects`}>
                    <span className="text-xs text-[#80BDCA] hover:text-[#37A794] flex items-center cursor-pointer transition-all duration-200 hover:translate-x-0.5">
                      View All <ChevronRight size={12} className="ml-0.5" />
                    </span>
                  </Link>
                </div>
                
                {latestProjects.length > 0 ? (
                  <div className="space-y-3">
                    {latestProjects.map((project, projIndex) => (
                      <Link key={project.id} href={`/projects/${project.id}`}>
                        <div 
                          className="p-3 bg-neutral-700/20 border border-neutral-700 rounded-lg hover:border-[#1D4E5F]/50 transition-all duration-200 hover:shadow-md"
                          style={{
                            animationDelay: `${(index * 3 + projIndex) * 70}ms`,
                            animation: 'fadeInUp 0.4s ease-out forwards',
                            opacity: 0
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <h5 className="font-medium text-white">{project.title}</h5>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center text-xs text-neutral-400">
                              <CalendarClock size={14} className="mr-1" />
                              <span>Due {formatDate(project.dueDate)}</span>
                            </div>
                            <div className="flex items-center text-xs text-neutral-400">
                              <CheckCircle2 size={14} className="mr-1" />
                              <span>{project.tasks.completed}/{project.tasks.total}</span>
                            </div>
                          </div>
                          
                          {/* Progress bar with animated fill */}
                          <div className="mt-2">
                            <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#37A794] progress-animation"
                                style={{ 
                                  '--progress-width': `${project.progress}%`,
                                  animationDelay: `${(index * 3 + projIndex) * 100 + 200}ms`
                                } as React.CSSProperties}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    {memberProjects.length > 3 && (
                      <Link href={`/team/${member.id}/projects`}>
                        <button className="w-full mt-2 py-2 border border-[#1D4E5F]/30 bg-[#1D4E5F]/10 hover:bg-[#1D4E5F]/20 text-[#80BDCA] rounded-lg transition-all duration-200 flex items-center justify-center hover:shadow-md">
                          <span className="text-sm">View {memberProjects.length - 3} more projects</span>
                          <ChevronRight size={16} className="ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-neutral-700/10 rounded-lg border border-dashed border-neutral-700">
                    <Briefcase size={28} className="mx-auto mb-2 text-neutral-500" />
                    <p className="text-neutral-400">No active projects</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
        
        {/* Create Project Card */}
        <Link href="/projects/create">
          <Card 
            className="h-full border-dashed border-2 border-neutral-700 bg-transparent shadow-none hover:border-[#1D4E5F]/70 transition-colors flex items-center justify-center cursor-pointer"
            animate="fadeIn"
            {...getStaggeredAnimation(filteredMembers.length)}
          >
            <div className="p-6 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110 hover:bg-[#1D4E5F]/20">
                <Plus size={24} className="text-[#80BDCA]" />
              </div>
              <h3 className="text-lg font-medium text-white">Create New Project</h3>
              <p className="text-neutral-400 text-sm mt-1">Add a new recruitment project</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Show message when no results found */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-10 bg-neutral-800/50 rounded-lg border border-neutral-700 animate-fadeInUp">
          <Briefcase size={40} className="mx-auto mb-3 text-neutral-500" />
          <h3 className="text-lg font-medium text-white mb-1">No matches found</h3>
          <p className="text-neutral-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  )
}