// app/candidates/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  //Download, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react'
import { AddCandidateModal } from '../candidates/AddCandidateModal'
import { FilterDropdown } from './FilterDropdown'

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

  return (
    <div className="space-y-8">
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Candidates</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search candidates..."
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <FilterDropdown onFilterChange={handleFilterChange} />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
          >
            <Plus className="mr-2" size={18} /> Add Candidate
          </button>
        </div>
      </div>

      {/* Table */}
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
            <tbody className="divide-y divide-neutral-700">
              {candidates.map(c => (
                <tr key={c.id} className="hover:bg-neutral-700/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA] font-medium">
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-white">{c.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                      ${c.stage === 'Received' ? 'bg-blue-900/30 text-blue-300' : ''}
                      ${c.stage === 'Interview Scheduled' ? 'bg-yellow-900/30 text-yellow-300' : ''}
                      ${c.stage === 'Interview Completed' ? 'bg-purple-900/30 text-purple-300' : ''}
                      ${c.stage === 'Client Waiting' ? 'bg-orange-900/30 text-orange-300' : ''}
                    `}>
                      {c.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                      ${c.status === 'New' ? 'bg-[#1D4E5F]/20 text-[#80BDCA]' : ''}
                      ${c.status === 'In Progress' ? 'bg-[#37A794]/20 text-[#51B3A2]' : ''}
                      ${c.status === 'Pending' ? 'bg-amber-900/30 text-amber-300' : ''}
                    `}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">{c.appliedDate}</td>
                  <td className="px-6 py-4">
                    <button type="button" className="p-2 hover:bg-neutral-700 rounded" title="More actions">
                      <MoreHorizontal size={18} className="text-neutral-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-700 bg-neutral-800">
          <div className="text-sm text-neutral-400">
            Showing <span className="font-medium text-neutral-300">1</span> to <span className="font-medium text-neutral-300">{candidates.length}</span> of <span className="font-medium text-neutral-300">42</span> candidates
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent" disabled title="Previous page">
              <ChevronLeft size={16} />
            </button>
            <button className="px-3 py-1 border border-neutral-700 rounded bg-[#1D4E5F] text-white text-sm hover:bg-[#123040]">
              1
            </button>
            <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" title="Go to page 2">
              2
            </button>
            <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" title="Go to page 3">
              3
            </button>
            <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" title="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Add Candidate Modal */}
      <AddCandidateModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCandidate}
      />
    </div>
  )
}