// app/team/page.jsx
'use client'

import { useState } from 'react'
import { 
  Plus, Search, Filter, UserPlus, Users, Briefcase, 
  Mail, Phone, Shield, Settings, ChevronDown
} from 'lucide-react'
import TeamMemberCard from '../../components/TeamMemberCard'
import AddTeamMemberModal from '../../components/AddTeamMemberModal'

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState('members')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [isAddTeamMemberModalOpen, setIsAddTeamMemberModalOpen] = useState(false)
  
  // Sample data with enhanced information
  const [members, setMembers] = useState([
    {
      id: 1,
      avatar: '/avatars/sarah.jpg',
      name: 'Sarah Johnson',
      role: 'Lead Recruiter',
      assigned: 24,
      completed: 18,
      contact: {
        email: 'sarah.johnson@example.com',
        phone: '(555) 123-4567'
      },
      department: 'Recruitment',
      joinedDate: 'Jan 2023',
      status: 'active'
    },
    {
      id: 2,
      avatar: '/avatars/john.jpg',
      name: 'John Smith',
      role: 'Recruitment Consultant',
      assigned: 15,
      completed: 12,
      contact: {
        email: 'john.smith@example.com',
        phone: '(555) 234-5678'
      },
      department: 'Recruitment',
      joinedDate: 'Mar 2023',
      status: 'active'
    },
    {
      id: 3,
      avatar: '/avatars/emily.jpg',
      name: 'Emily Davis',
      role: 'HR Manager',
      assigned: 30,
      completed: 28,
      contact: {
        email: 'emily.davis@example.com',
        phone: '(555) 345-6789'
      },
      department: 'HR',
      joinedDate: 'Nov 2022',
      status: 'active'
    },
    {
      id: 4,
      name: 'Michael Wilson',
      role: 'Technical Recruiter',
      assigned: 18,
      completed: 14,
      contact: {
        email: 'michael.wilson@example.com',
        phone: '(555) 456-7890'
      },
      department: 'Recruitment',
      joinedDate: 'Apr 2023',
      status: 'active'
    },
    {
      id: 5,
      name: 'Jessica Brown',
      role: 'Onboarding Specialist',
      assigned: 12,
      completed: 10,
      contact: {
        email: 'jessica.brown@example.com',
        phone: '(555) 567-8901'
      },
      department: 'HR',
      joinedDate: 'May 2023',
      status: 'active'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      role: 'HR Coordinator',
      assigned: 8,
      completed: 6,
      contact: {
        email: 'robert.martinez@example.com',
        phone: '(555) 678-9012'
      },
      department: 'HR',
      joinedDate: 'Jul 2023',
      status: 'on leave'
    }
  ])

  // Handle adding a new team member
  const handleAddTeamMember = (newMember) => {
    if (newMember) {
      setMembers(prevMembers => [...prevMembers, newMember])
      
      // Update department stats based on the new member
      updateDepartmentStats(newMember.department)
    }
    setIsAddTeamMemberModalOpen(false)
  }

  // Department stats
  const [departmentStats, setDepartmentStats] = useState([
    { name: 'Recruitment', count: 3, color: 'bg-blue-500' },
    { name: 'HR', count: 3, color: 'bg-amber-500' },
    { name: 'Executive', count: 1, color: 'bg-emerald-500' },
    { name: 'IT Support', count: 1, color: 'bg-purple-500' }
  ])

  // Update department stats when a new member is added
  const updateDepartmentStats = (departmentName) => {
    setDepartmentStats(prevStats => 
      prevStats.map(stat => 
        stat.name === departmentName 
          ? { ...stat, count: stat.count + 1 } 
          : stat
      )
    )
  }

  // Role definitions
  const roles = [
    {
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: ['Manage users', 'Manage roles', 'View analytics', 'Edit all data', 'System configuration']
    },
    {
      name: 'HR Manager',
      description: 'Manages HR processes and team members',
      permissions: ['View analytics', 'Manage candidates', 'Manage team members', 'Edit workflow']
    },
    {
      name: 'Recruiter',
      description: 'Handles recruitment tasks and candidate management',
      permissions: ['View candidates', 'Edit candidates', 'Schedule interviews', 'Send emails']
    },
    {
      name: 'Interviewer',
      description: 'Participates in interviews and evaluations',
      permissions: ['View assigned candidates', 'Submit evaluations', 'Access interview schedule']
    },
    {
      name: 'Read Only',
      description: 'View-only access for stakeholders',
      permissions: ['View candidates', 'View analytics', 'View reports']
    }
  ]

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Team</h1>
          <button 
            onClick={() => setIsAddTeamMemberModalOpen(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Add Team Member</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Manage your team members and their access
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[var(--border)]">
        <div className="flex space-x-8">
          {['members', 'roles', 'activity', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab === 'members' && <Users className="mr-2 h-4 w-4 inline-block" />}
              {tab === 'roles' && <Shield className="mr-2 h-4 w-4 inline-block" />}
              {tab === 'activity' && <Briefcase className="mr-2 h-4 w-4 inline-block" />}
              {tab === 'settings' && <Settings className="mr-2 h-4 w-4 inline-block" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Members Tab Content */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
              />
            </div>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--secondary)] transition-colors"
            >
              <Filter className="mr-2 h-4 w-4 text-[var(--primary)]" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filter Panel - Display when filterOpen is true */}
          {filterOpen && (
            <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-soft grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Department</label>
                <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                  <option>All Departments</option>
                  <option>Recruitment</option>
                  <option>HR</option>
                  <option>Executive</option>
                  <option>IT Support</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Role</label>
                <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                  <option>All Roles</option>
                  <option>Lead Recruiter</option>
                  <option>Recruitment Consultant</option>
                  <option>HR Manager</option>
                  <option>Technical Recruiter</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Status</label>
                <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="md:col-span-3 flex justify-end space-x-2">
                <button className="px-3 py-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  Clear All
                </button>
                <button className="px-3 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)]">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* Department Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {departmentStats.map((dept) => (
              <div key={dept.name} className="bg-[var(--card)] rounded-lg border border-[var(--border)] p-4 shadow-soft">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${dept.color} mr-2`}></div>
                  <h3 className="text-[var(--foreground)] font-medium">{dept.name}</h3>
                </div>
                <div className="mt-2 text-2xl font-bold text-[var(--foreground)]">{dept.count}</div>
                <div className="mt-1 text-xs text-[var(--muted-foreground)]">team members</div>
              </div>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Show message when no members match the search */}
          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[var(--muted-foreground)]">No team members found matching your search.</p>
            </div>
          )}
        </div>
      )}

      {/* Roles & Permissions Tab Content */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-[var(--foreground)]">Roles & Permissions</h2>
            <button className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Role</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {roles.map((role) => (
              <div 
                key={role.name} 
                className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden shadow-soft"
              >
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--foreground)]">{role.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">{role.description}</p>
                  </div>
                  <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)] font-medium">
                    Edit Role
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="text-xs text-[var(--muted-foreground)] mb-2">Permissions</div>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <span 
                        key={permission} 
                        className="inline-flex items-center bg-[var(--secondary)] px-2.5 py-1 rounded-full text-xs text-[var(--foreground)]"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab Content - Placeholder */}
      {activeTab === 'settings' && (
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-soft space-y-6">
          <div>
            <h2 className="text-lg font-medium text-[var(--foreground)]">Team Settings</h2>
            <p className="text-[var(--muted-foreground)]">Configure team settings and notifications</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Team Notifications</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Enable email notifications for team activities</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[var(--muted)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
              </label>
            </div>
            
            {/* Placeholder for more settings */}
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Team Default View</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Set default view for team members</p>
              </div>
              <select className="p-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm">
                <option>Calendar view</option>
                <option>List view</option>
                <option>Board view</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Team Member Directory</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Allow team members to view the directory</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-[var(--muted)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
              </label>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Activity Tab Content - Placeholder */}
      {activeTab === 'activity' && (
        <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-medium text-[var(--foreground)]">Team Activity</h2>
            <select className="text-sm border-none bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-0">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          <div className="divide-y divide-[var(--border)]">
            {/* Sample activity items */}
            <div className="p-4 hover:bg-[var(--secondary)] transition-colors">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">SJ</div>
                <div>
                  <div className="text-[var(--foreground)]"><span className="font-medium">Sarah Johnson</span> completed 3 interviews</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Today at 2:30 PM</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-[var(--secondary)] transition-colors">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mr-3">ED</div>
                <div>
                  <div className="text-[var(--foreground)]"><span className="font-medium">Emily Davis</span> updated candidate status</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Yesterday at 11:15 AM</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-[var(--secondary)] transition-colors">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-3">JS</div>
                <div>
                  <div className="text-[var(--foreground)]"><span className="font-medium">John Smith</span> scheduled 5 new interviews</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Apr 17, 2025 at 3:45 PM</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-[var(--secondary)] transition-colors">
              <div className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mr-3">MW</div>
                <div>
                  <div className="text-[var(--foreground)]"><span className="font-medium">Michael Wilson</span> added 2 new candidates</div>
                  <div className="text-xs text-[var(--muted-foreground)] mt-1">Apr 16, 2025 at 10:30 AM</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 text-center">
            <button className="text-[var(--primary)] hover:text-[var(--primary-light)] text-sm">
              View All Activity
            </button>
          </div>
        </div>
      )}

      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={isAddTeamMemberModalOpen}
        onClose={handleAddTeamMember}
      />
    </div>
  )
}
