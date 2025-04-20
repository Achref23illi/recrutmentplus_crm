// app/team/page.tsx
'use client'

import { Card } from '@/components/ui/card'
import { Plus, Mail, Users } from 'lucide-react'
import Link from 'next/link'

interface Member {
  id: string
  name: string
  role: string
  email: string
  tasksCompleted: number
}

const sampleTeam: Member[] = [
  { id: '1', name: 'Emma Dupont', role: 'Admin', email: 'emma@rp.com', tasksCompleted: 42 },
  { id: '2', name: 'Karim Said', role: 'Recruiter', email: 'karim@rp.com', tasksCompleted: 27 },
  { id: '3', name: 'Lina Benali', role: 'Consultant', email: 'lina@rp.com', tasksCompleted: 15 },
]

export default function TeamPage() {
  return (
    <div className="space-y-6">
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Team</h2>
        <Link
          href="/team/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" size={16} /> Add Member
        </Link>
      </div>

      {/* Team list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleTeam.map(member => (
          <Card key={member.id} className="space-y-2">
            <div className="flex items-center space-x-3">
              <Users size={24} className="text-blue-500" />
              <div>
                <p className="text-lg font-medium text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <Mail size={16} /> <span>{member.email}</span>
            </div>
            <div className="text-sm text-gray-600">
              Tasks completed: <strong>{member.tasksCompleted}</strong>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
