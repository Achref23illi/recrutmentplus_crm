// app/team/page.jsx
'use client'

import { Plus } from 'lucide-react'
import TeamMemberCard from '../../components/TeamMemberCard'

export default function TeamPage() {
  // Sample data; replace with real data later
  const members = [
    {
      id: 1,
      avatar: '/avatars/sarah.jpg',
      name: 'Sarah Johnson',
      role: 'Lead Recruiter',
      assigned: 24,
      completed: 18,
    },
    {
      id: 2,
      avatar: '/avatars/john.jpg',
      name: 'John Smith',
      role: 'Consultant',
      assigned: 15,
      completed: 12,
    },
    {
      id: 3,
      avatar: '/avatars/emily.jpg',
      name: 'Emily Davis',
      role: 'HR Manager',
      assigned: 30,
      completed: 28,
    },
    // …add more members as needed
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Team</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => (
          <TeamMemberCard key={m.id} member={m} />
        ))}
      </div>

      {/* Roles & Permissions Section */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Roles & Permissions
        </h2>
        <p className="text-gray-500">
          Roles & permissions management coming soon…
        </p>
      </section>
    </div>
  )
}
