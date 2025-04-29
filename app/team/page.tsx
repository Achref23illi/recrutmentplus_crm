// app/team/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  BarChart, 
  Calendar, 
  CheckCircle, 
  Users,
  User
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import AddTeamMemberModal from './AddTeamMemberModal'

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string | null;
  tasksCompleted: number;
  activeRecruitments: number;
  successfulPlacements: number;
  lastActive: string;
}

const sampleTeam: TeamMember[] = [
  { 
    id: '1', 
    name: 'Emma Dupont', 
    role: 'Admin', 
    email: 'emma@rp.com', 
    phone: '+1 (555) 123-4567',
    avatar: 'ED',
    tasksCompleted: 42,
    activeRecruitments: 8,
    successfulPlacements: 16,
    lastActive: '10 min ago'
  },
  { 
    id: '2', 
    name: 'Karim Said', 
    role: 'Recruiter', 
    email: 'karim@rp.com', 
    phone: '+1 (555) 234-5678',
    avatar: 'KS',
    tasksCompleted: 27,
    activeRecruitments: 12,
    successfulPlacements: 8,
    lastActive: '3 hours ago'
  },
  { 
    id: '3', 
    name: 'Lina Benali', 
    role: 'Consultant', 
    email: 'lina@rp.com', 
    phone: '+1 (555) 345-6789',
    avatar: 'LB',
    tasksCompleted: 15,
    activeRecruitments: 6,
    successfulPlacements: 4,
    lastActive: '1 day ago'
  },
  { 
    id: '4', 
    name: 'David Chen', 
    role: 'Recruiter', 
    email: 'david@rp.com', 
    phone: '+1 (555) 456-7890',
    avatar: 'DC',
    tasksCompleted: 31,
    activeRecruitments: 9,
    successfulPlacements: 11,
    lastActive: '2 hours ago'
  },
  { 
    id: '5', 
    name: 'Sarah Johnson', 
    role: 'HR Manager', 
    email: 'sarah@rp.com', 
    phone: '+1 (555) 567-8901',
    avatar: 'SJ',
    tasksCompleted: 53,
    activeRecruitments: 4,
    successfulPlacements: 22,
    lastActive: '20 min ago'
  },
  { 
    id: '6', 
    name: 'Michael Rodriguez', 
    role: 'Consultant', 
    email: 'michael@rp.com', 
    phone: '+1 (555) 678-9012',
    avatar: 'MR',
    tasksCompleted: 19,
    activeRecruitments: 7,
    successfulPlacements: 6,
    lastActive: '5 hours ago'
  },
]

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20
    }
  }
};

const statsVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    }
  }
};

const buttonVariants: Variants = {
  hover: { 
    scale: 1.05, 
    backgroundColor: "#123040",
    transition: { 
      duration: 0.2 
    } 
  },
  tap: { 
    scale: 0.95 
  }
};

// Role colors for visual distinction
const roleColors = {
  'Admin': 'bg-purple-900/30 text-purple-300',
  'Recruiter': 'bg-[#1D4E5F]/20 text-[#80BDCA]',
  'Consultant': 'bg-amber-900/30 text-amber-300',
  'HR Manager': 'bg-blue-900/30 text-blue-300',
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(sampleTeam);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Filter team members based on search query and role filter
  const filteredTeam = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || member.role === activeFilter;
    return matchesSearch && matchesFilter;
  });
  
  // Get unique roles for the filter dropdown
  const roles = ['All', ...Array.from(new Set(teamMembers.map(m => m.role)))];
  
  // Handle adding a new team member
  const handleAddTeamMember = (newTeamMember: TeamMember) => {
    setTeamMembers(prev => [...prev, newTeamMember]);
  };
  
  // Open modal to add team member
  const openAddModal = () => setIsAddModalOpen(true);
  
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div 
          className="flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Team</h2>
        </motion.div>
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <motion.input 
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
              whileFocus={{ borderColor: "#1D4E5F", boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.25)" }}
            />
          </div>
          
          <div className="relative">
            <motion.select
              id="role-filter"
              aria-label="Filter by role"
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="pl-4 pr-10 py-2 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
              whileFocus={{ borderColor: "#1D4E5F", boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.25)" }}
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </motion.select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
          </div>
          
          <motion.button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Plus className="mr-2" size={18} /> Add Team Member
          </motion.button>
        </motion.div>
      </div>

      {/* Team Overview Stats */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={statsVariants}>
          <Card className="bg-neutral-800 border border-neutral-700 p-5 h-full">
            <div className="flex items-center mb-4">
              <motion.div 
                className="p-2 bg-[#1D4E5F]/20 rounded-lg mr-3"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.3)" }}
              >
                <Users size={20} className="text-[#80BDCA]" />
              </motion.div>
              <h3 className="text-sm font-medium text-neutral-300">Total Members</h3>
            </div>
            <motion.p 
              className="text-3xl font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {teamMembers.length}
            </motion.p>
          </Card>
        </motion.div>
        
        <motion.div variants={statsVariants}>
          <Card className="bg-neutral-800 border border-neutral-700 p-5 h-full">
            <div className="flex items-center mb-4">
              <motion.div 
                className="p-2 bg-[#1D4E5F]/20 rounded-lg mr-3"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.3)" }}
              >
                <CheckCircle size={20} className="text-[#80BDCA]" />
              </motion.div>
              <h3 className="text-sm font-medium text-neutral-300">Tasks Completed</h3>
            </div>
            <motion.p 
              className="text-3xl font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              {teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0)}
            </motion.p>
          </Card>
        </motion.div>
        
        <motion.div variants={statsVariants}>
          <Card className="bg-neutral-800 border border-neutral-700 p-5 h-full">
            <div className="flex items-center mb-4">
              <motion.div 
                className="p-2 bg-[#1D4E5F]/20 rounded-lg mr-3"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.3)" }}
              >
                <BarChart size={20} className="text-[#80BDCA]" />
              </motion.div>
              <h3 className="text-sm font-medium text-neutral-300">Active Recruitments</h3>
            </div>
            <motion.p 
              className="text-3xl font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {teamMembers.reduce((sum, member) => sum + member.activeRecruitments, 0)}
            </motion.p>
          </Card>
        </motion.div>
        
        <motion.div variants={statsVariants}>
          <Card className="bg-neutral-800 border border-neutral-700 p-5 h-full">
            <div className="flex items-center mb-4">
              <motion.div 
                className="p-2 bg-[#1D4E5F]/20 rounded-lg mr-3"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.3)" }}
              >
                <Calendar size={20} className="text-[#80BDCA]" />
              </motion.div>
              <h3 className="text-sm font-medium text-neutral-300">Successful Placements</h3>
            </div>
            <motion.p 
              className="text-3xl font-bold text-white"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              {teamMembers.reduce((sum, member) => sum + member.successfulPlacements, 0)}
            </motion.p>
          </Card>
        </motion.div>
      </motion.div>

      {/* Team Member Cards */}
      <AnimatePresence>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTeam.length > 0 ? (
            filteredTeam.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05, type: "spring" }}
              >
                <motion.div
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    borderColor: "rgba(29, 78, 95, 0.6)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card className="bg-neutral-800 border border-neutral-700 transition-colors shadow-sm overflow-hidden h-full">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center">
                          <motion.div 
                            className="h-14 w-14 rounded-lg bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA] font-semibold text-xl mr-4"
                            whileHover={{ scale: 1.1, backgroundColor: "rgba(29, 78, 95, 0.5)" }}
                          >
                            {member.avatar}
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-medium text-white">{member.name}</h3>
                            <motion.span 
                              className={`inline-block px-2.5 py-1 mt-1 rounded-full text-xs font-medium ${roleColors[member.role as keyof typeof roleColors] || 'bg-neutral-700 text-neutral-300'}`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {member.role}
                            </motion.span>
                          </div>
                        </div>
                        <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
                          <Link 
                            href={`/team/${member.id}`}
                            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded"
                          >
                            <User size={18} />
                          </Link>
                        </motion.div>
                      </div>
                      
                      <div className="space-y-3">
                        <motion.div 
                          className="flex items-center text-sm"
                          whileHover={{ x: 3 }}
                        >
                          <Mail className="text-neutral-500 mr-2" size={16} />
                          <span className="text-neutral-300">{member.email}</span>
                        </motion.div>
                        <motion.div 
                          className="flex items-center text-sm"
                          whileHover={{ x: 3 }}
                        >
                          <Phone className="text-neutral-500 mr-2" size={16} />
                          <span className="text-neutral-300">{member.phone}</span>
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-700">
                        <motion.div 
                          className="text-center"
                          whileHover={{ y: -3, scale: 1.05 }}
                        >
                          <p className="text-xs text-neutral-500">Tasks</p>
                          <p className="text-lg font-semibold text-white">{member.tasksCompleted}</p>
                        </motion.div>
                        <motion.div 
                          className="text-center"
                          whileHover={{ y: -3, scale: 1.05 }}
                        >
                          <p className="text-xs text-neutral-500">Recruitments</p>
                          <p className="text-lg font-semibold text-white">{member.activeRecruitments}</p>
                        </motion.div>
                        <motion.div 
                          className="text-center"
                          whileHover={{ y: -3, scale: 1.05 }}
                        >
                          <p className="text-xs text-neutral-500">Placements</p>
                          <p className="text-lg font-semibold text-white">{member.successfulPlacements}</p>
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="mt-4 text-xs text-neutral-500 text-right"
                        whileHover={{ color: "#80BDCA" }}
                      >
                        Last active: {member.lastActive}
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full p-10 bg-neutral-800 border border-neutral-700 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                  }}
                >
                  <Users size={48} className="text-neutral-600 mb-3" />
                </motion.div>
                <motion.h3 
                  className="text-lg font-medium text-white mb-1"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  No team members found
                </motion.h3>
                <motion.p 
                  className="text-neutral-400 mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Try adjusting your search filters
                </motion.p>
                <motion.button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                  }} 
                  className="px-4 py-2 bg-neutral-700 text-white rounded-lg"
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "#1D4E5F" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Reset Filters
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Add new team member card */}
          <motion.button
            onClick={openAddModal}
            className="group border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center h-full min-h-64 hover:border-[#1D4E5F] transition-colors"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              borderColor: "#1D4E5F"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center space-y-2 text-center p-4">
              <motion.div 
                className="h-12 w-12 rounded-full bg-neutral-700/50 group-hover:bg-[#1D4E5F]/20 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Plus size={24} className="text-neutral-400 group-hover:text-[#80BDCA] transition-colors" />
              </motion.div>
              <motion.p 
                className="text-neutral-400 group-hover:text-[#80BDCA] font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Add Team Member
              </motion.p>
              <p className="text-neutral-500 text-sm">Invite a new team member to the platform</p>
            </div>
          </motion.button>
        </motion.div>
      </AnimatePresence>
      
      {/* Add Team Member Modal */}
      <AddTeamMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTeamMember}
      />
    </motion.div>
  )
}