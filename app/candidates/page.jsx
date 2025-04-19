'use client'

import { useState } from 'react'
import { Search, Filter, SlidersHorizontal, Plus } from 'lucide-react'
import AddCandidateModal from '../../components/AddCandidateModal'

export default function CandidatesPage() {
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortOption, setSortOption] = useState('newest')
  
  // Initial candidates data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Emma Thompson',
      position: 'Frontend Developer',
      experience: '4 years',
      location: 'New York, NY',
      status: 'Hired',
      rating: 5,
      skills: ['React', 'TypeScript', 'Node.js'],
      email: 'emma.t@example.com',
      lastContact: '2 days ago',
      avatar: 'ET'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Frontend Developer',
      experience: '5 years',
      location: 'San Francisco, CA',
      status: 'Interview',
      rating: 4,
      skills: ['React', 'TypeScript', 'Tailwind CSS'],
      email: 'michael.chen@example.com',
      lastContact: '2 days ago',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Jessica Reynolds',
      position: 'UX Designer',
      experience: '3 years',
      location: 'Austin, TX',
      status: 'Assessment',
      rating: 5,
      skills: ['Figma', 'User Research', 'Prototyping'],
      email: 'jessica.r@example.com',
      lastContact: '5 days ago',
      avatar: 'JR'
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      position: 'Product Manager',
      experience: '7 years',
      location: 'New York, NY',
      status: 'Screening',
      rating: 3,
      skills: ['Agile', 'Product Strategy', 'Data Analysis'],
      email: 'ahmed.h@example.com',
      lastContact: 'Today',
      avatar: 'AH'
    },
    {
      id: 5,
      name: 'Sophia Martinez',
      position: 'Backend Developer',
      experience: '4 years',
      location: 'Chicago, IL',
      status: 'New',
      rating: 4,
      skills: ['Node.js', 'Python', 'MongoDB'],
      email: 'sophia.m@example.com',
      lastContact: '1 week ago',
      avatar: 'SM'
    },
    {
      id: 6,
      name: 'Thomas Wilson',
      position: 'Marketing Specialist',
      experience: '2 years',
      location: 'Denver, CO',
      status: 'Offer',
      rating: 4,
      skills: ['SEO', 'Content Marketing', 'Analytics'],
      email: 'thomas.w@example.com',
      lastContact: '3 days ago',
      avatar: 'TW'
    },
  ])

  // Filter candidates based on search query and active filter
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (activeFilter === 'All') return matchesSearch
    return matchesSearch && candidate.status === activeFilter
  })

  // Sort candidates based on the selected sort option
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortOption === 'newest') return b.id - a.id
    if (sortOption === 'oldest') return a.id - b.id
    if (sortOption === 'nameAsc') return a.name.localeCompare(b.name)
    if (sortOption === 'nameDesc') return b.name.localeCompare(a.name)
    return 0
  })

  // Handle adding a new candidate
  const handleAddCandidate = (newCandidate) => {
    setCandidates(prevCandidates => [newCandidate, ...prevCandidates])
  }

  return (
    <div className="flex-1 p-4 md:p-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">Candidates</h1>
          <p className="text-[var(--muted-foreground)]">Manage your talent pool</p>
        </div>
        <button
          onClick={() => setIsAddCandidateModalOpen(true)}
          className="mt-4 md:mt-0 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span>Add Candidate</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
          </div>
          <input
            type="text"
            placeholder="Search candidates by name, skills or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveFilter(activeFilter === 'All' ? 'Hired' : 'All')}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--secondary)] transition-colors"
          >
            <Filter className="mr-2 h-4 w-4 text-[var(--primary)]" />
            <span>{activeFilter === 'All' ? 'Show Hired' : 'Show All'}</span>
          </button>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Candidate list */}
      <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] overflow-hidden">
        <div className="divide-y divide-[var(--border)]">
          {sortedCandidates.length > 0 ? (
            sortedCandidates.map((candidate) => (
              <div key={candidate.id} className="p-4 hover:bg-[var(--accent)] transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-medium text-sm">
                    {candidate.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-[var(--foreground)]">{candidate.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{candidate.email}</div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-[var(--foreground)]">
                  <span>{candidate.position}</span> - <span>{candidate.experience}</span> - <span>{candidate.location}</span>
                </div>
                <div className="mt-1 text-xs text-[var(--muted-foreground)]">
                  Last contact: {candidate.lastContact}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-[var(--muted-foreground)]">
              No candidates match your search criteria. Try adjusting your filters or adding new candidates.
            </div>
          )}
        </div>
      </div>

      {/* Add Candidate Modal */}
      {isAddCandidateModalOpen && (
        <AddCandidateModal 
          isOpen={isAddCandidateModalOpen}
          onClose={() => setIsAddCandidateModalOpen(false)}
          onAddCandidate={handleAddCandidate}
        />
      )}
    </div>
  )
}
