// app/candidates/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  ChevronRight as ArrowRight,
  Edit,
  Mail,
  Calendar,
  Trash2,
  //User
} from 'lucide-react'
import { AddCandidateModal } from '../candidates/AddCandidateModal'
import { FilterDropdown } from './FilterDropdown'
import { motion, AnimatePresence, Variants } from 'framer-motion'

// Animation variants for different components
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    }
  }
};

const tableVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring', 
      stiffness: 100, 
      damping: 15 
    }
  },
  hover: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transition: { duration: 0.2 }
  }
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: -5 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -5,
    transition: { duration: 0.2 }
  }
};

const buttonVariants: Variants = {
  initial: { 
    backgroundColor: "#1D4E5F", 
    color: "#ffffff",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)"
  },
  hover: { 
    backgroundColor: "#123040",
    y: -2,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  },
  tap: { 
    y: 0,
    backgroundColor: "#0F2830",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)"
  }
};

interface Candidate {
  id: string
  name: string
  stage: string
  status: string
  appliedDate: string
}

// Dummy data until we wire up real API
const sampleCandidates: Candidate[] = [
  { id: '1', name: 'Alice Martin', stage: 'Interview Scheduled', status: 'In Progress', appliedDate: '2025-04-15' },
  { id: '2', name: 'Bob Johnson', stage: 'Received', status: 'New', appliedDate: '2025-04-13' },
  { id: '3', name: 'Carla Gomez', stage: 'Client Waiting', status: 'Pending', appliedDate: '2025-04-10' },
  { id: '4', name: 'David Kim', stage: 'Interview Completed', status: 'In Progress', appliedDate: '2025-04-08' },
  { id: '5', name: 'Emma Wilson', stage: 'Received', status: 'New', appliedDate: '2025-04-05' },
  { id: '6', name: 'Frank Miller', stage: 'Client Waiting', status: 'Pending', appliedDate: '2025-04-02' },
]

// Map filter IDs to actual values
const stageIdToValue: Record<string, string> = {
  'stage-received': 'Received',
  'stage-interview-scheduled': 'Interview Scheduled',
  'stage-interview-completed': 'Interview Completed',
  'stage-client-waiting': 'Client Waiting'
}

const statusIdToValue: Record<string, string> = {
  'status-new': 'New',
  'status-in-progress': 'In Progress',
  'status-pending': 'Pending'
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(sampleCandidates)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdown !== null && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const toggleDropdown = (candidateId: string) => {
    setActiveDropdown(activeDropdown === candidateId ? null : candidateId);
  };

  // Get the next stage for a candidate
  const getNextStage = (currentStage: string): string => {
    const stages = ['Received', 'Interview Scheduled', 'Interview Completed', 'Client Waiting', 'Offer Extended', 'Hired'];
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : currentStage;
  };

  // Advance candidate to next stage
  const advanceToNextStage = (candidateId: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, stage: getNextStage(candidate.stage) } 
        : candidate
    ));
    setActiveDropdown(null);
  };

  // Update candidate status
  const updateCandidateStatus = (candidateId: string, newStatus: string) => {
    setCandidates(candidates.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus } 
        : candidate
    ));
    setActiveDropdown(null);
  };

  // Handle candidate action (placeholder for future functionality)
  const handleCandidateAction = (action: string, candidateId: string) => {
    console.log(`Action: ${action} for candidate ${candidateId}`);
    setActiveDropdown(null);
  };

  const handleAddCandidate = (candidateData: { name: string; stage: string; status: string }) => {
    // In a real app, you would make an API call here
    // This is just for demonstration
    const newCandidate: Candidate = {
      id: (candidates.length + 1).toString(),
      name: candidateData.name,
      stage: candidateData.stage,
      status: candidateData.status,
      appliedDate: new Date().toISOString().split('T')[0]
    }
    
    setCandidates([newCandidate, ...candidates])
  }

  const handleFilterChange = (filters: {
    stage: string[];
    status: string[];
    appliedDateFrom: string;
    appliedDateTo: string;
  }) => {
    // Apply filters to candidates
    const filteredCandidates = sampleCandidates.filter(candidate => {
      // Check stage filter
      if (filters.stage.length > 0) {
        const stageValues = filters.stage.map(id => stageIdToValue[id]);
        if (!stageValues.includes(candidate.stage)) {
          return false;
        }
      }
      
      // Check status filter
      if (filters.status.length > 0) {
        const statusValues = filters.status.map(id => statusIdToValue[id]);
        if (!statusValues.includes(candidate.status)) {
          return false;
        }
      }
      
      // Check applied date range
      if (filters.appliedDateFrom && candidate.appliedDate < filters.appliedDateFrom) {
        return false;
      }
      
      if (filters.appliedDateTo && candidate.appliedDate > filters.appliedDateTo) {
        return false;
      }
      
      return true;
    });
    
    setCandidates(filteredCandidates);
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setCandidates(sampleCandidates);
      return;
    }
    
    const filtered = sampleCandidates.filter(candidate => 
      candidate.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setCandidates(filtered);
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page Title and Actions */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        variants={itemVariants}
      >
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Candidates</h2>
        </motion.div>
        <motion.div 
          className="flex flex-wrap gap-5"
          variants={itemVariants}
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.00 }}
            whileTap={{ scale: 0.98 }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <motion.input 
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
              initial={{ width: "100%" }}
              whileFocus={{ 
                width: "100%", 
                borderColor: "#1D4E5F",
                boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.2)",
                transition: { duration: 0.3 }
              }}
            />
          </motion.div>
          <FilterDropdown onFilterChange={handleFilterChange} />
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
          >
            <Plus className="mr-2" size={18} /> Add Candidate
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={tableVariants}
      >
        <Card className="overflow-hidden border border-neutral-700 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-neutral-700/30 border-b border-neutral-700">
                  <th className="px-6 py-3 text-sm font-medium text-neutral-300">Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-neutral-300">Stage</th>
                  <th className="px-6 py-3 text-sm font-medium text-neutral-300">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-neutral-300">Applied</th>
                  <th className="px-6 py-3 text-sm font-medium text-neutral-300">Actions</th>
                </tr>
              </thead>
              <motion.tbody 
                className="divide-y divide-neutral-700"
                initial="hidden"
                animate="visible"
                variants={tableVariants}
              >
                <AnimatePresence>
                  {candidates.map((c, index) => (
                    <motion.tr 
                      key={c.id} 
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      custom={index}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-neutral-700/20"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <motion.div 
                            className="h-10 w-10 rounded-full bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA] font-medium"
                            whileHover={{ 
                              scale: 1.1,
                              boxShadow: "0 0 0 2px rgba(128, 189, 202, 0.3)",
                              transition: { duration: 0.2 }
                            }}
                          >
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </motion.div>
                          <div className="ml-3">
                            <p className="font-medium text-white">{c.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.span 
                          className={`px-2.5 py-1 rounded-full text-xs font-medium 
                            ${c.stage === 'Received' ? 'bg-blue-900/30 text-blue-300' : ''}
                            ${c.stage === 'Interview Scheduled' ? 'bg-yellow-900/30 text-yellow-300' : ''}
                            ${c.stage === 'Interview Completed' ? 'bg-purple-900/30 text-purple-300' : ''}
                            ${c.stage === 'Client Waiting' ? 'bg-orange-900/30 text-orange-300' : ''}
                            ${c.stage === 'Offer Extended' ? 'bg-emerald-900/30 text-emerald-300' : ''}
                            ${c.stage === 'Hired' ? 'bg-green-900/30 text-green-300' : ''}
                          `}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
                          }}
                        >
                          {c.stage}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4">
                        <motion.span 
                          className={`px-2.5 py-1 rounded-full text-xs font-medium 
                            ${c.status === 'New' ? 'bg-[#1D4E5F]/20 text-[#80BDCA]' : ''}
                            ${c.status === 'In Progress' ? 'bg-[#37A794]/20 text-[#51B3A2]' : ''}
                            ${c.status === 'Pending' ? 'bg-amber-900/30 text-amber-300' : ''}
                          `}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)"
                          }}
                        >
                          {c.status}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-400">{c.appliedDate}</td>
                      <td className="px-6 py-4 relative">
                        <motion.button 
                          type="button" 
                          className="p-2 hover:bg-neutral-700 rounded" 
                          title="More actions"
                          onClick={() => toggleDropdown(c.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MoreHorizontal size={18} className="text-neutral-400" />
                        </motion.button>
                        
                        {/* Action Dropdown Menu */}
                        <AnimatePresence>
                          {activeDropdown === c.id && (
                            <motion.div 
                              ref={(el) => {
                                dropdownRefs.current[c.id] = el;
                              }}
                              className="absolute right-4 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-800 border border-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              <div className="py-1 divide-y divide-neutral-700">
                                {/* Stage Advancement */}
                                <div className="px-3 py-2">
                                  <p className="text-xs font-medium text-neutral-400 mb-1">Stage</p>
                                  <motion.button 
                                    onClick={() => advanceToNextStage(c.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    disabled={c.stage === 'Hired'}
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <ArrowRight size={16} className="mr-2 text-[#80BDCA]" />
                                    {c.stage === 'Hired' ? 'Completed Hire' : `Move to ${getNextStage(c.stage)}`}
                                  </motion.button>
                                </div>
                                
                                {/* Status Options */}
                                <div className="px-3 py-2">
                                  <p className="text-xs font-medium text-neutral-400 mb-1">Status</p>
                                  <motion.button 
                                    onClick={() => updateCandidateStatus(c.id, 'New')}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <motion.span 
                                      className="h-2 w-2 rounded-full bg-[#80BDCA] mr-2"
                                      whileHover={{ scale: 1.5 }}
                                    ></motion.span>
                                    New
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => updateCandidateStatus(c.id, 'In Progress')}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <motion.span 
                                      className="h-2 w-2 rounded-full bg-[#51B3A2] mr-2"
                                      whileHover={{ scale: 1.5 }}
                                    ></motion.span>
                                    In Progress
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => updateCandidateStatus(c.id, 'Pending')}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <motion.span 
                                      className="h-2 w-2 rounded-full bg-amber-300 mr-2"
                                      whileHover={{ scale: 1.5 }}
                                    ></motion.span>
                                    Pending
                                  </motion.button>
                                </div>
                                
                                {/* Quick Actions */}
                                <div className="px-3 py-2">
                                  <p className="text-xs font-medium text-neutral-400 mb-1">Actions</p>
                                  <motion.button 
                                    onClick={() => handleCandidateAction('edit', c.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Edit size={16} className="mr-2 text-neutral-400" />
                                    Edit Candidate
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCandidateAction('email', c.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Mail size={16} className="mr-2 text-neutral-400" />
                                    Send Email
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCandidateAction('schedule', c.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Calendar size={16} className="mr-2 text-neutral-400" />
                                    Schedule Interview
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCandidateAction('delete', c.id)}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ 
                                      backgroundColor: "rgba(220, 38, 38, 0.1)",
                                      color: "rgba(248, 113, 113, 1)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Candidate
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </div>
          <motion.div 
            className="flex items-center justify-between px-6 py-3 border-t border-neutral-700 bg-neutral-800"
            variants={itemVariants}
          >
            <div className="text-sm text-neutral-400">
              Showing <span className="font-medium text-neutral-300">1</span> to <span className="font-medium text-neutral-300">{candidates.length}</span> of <span className="font-medium text-neutral-300">42</span> candidates
            </div>
            <div className="flex items-center space-x-2">
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent" 
                disabled 
                title="Previous page"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded bg-[#1D4E5F] text-white text-sm hover:bg-[#123040]"
                whileHover={{ y: -2, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ y: 0, boxShadow: "none" }}
              >
                1
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" 
                title="Go to page 2"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                2
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" 
                title="Go to page 3"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                3
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" 
                title="Next page"
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </Card>
      </motion.div>

      {/* Add Candidate Modal */}
      <AddCandidateModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCandidate}
      />
    </motion.div>
  );
}