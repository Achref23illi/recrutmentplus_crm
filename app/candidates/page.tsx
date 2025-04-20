// app/candidates/page.tsx
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Plus, MoreHorizontal } from 'lucide-react'

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
]

export default function CandidatesPage() {
  return (
    <div className="space-y-6">
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Candidates</h2>
        <Link
          href="/candidates/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" size={16} /> Add Candidate
        </Link>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Stage</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleCandidates.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.stage}</td>
                  <td className="px-4 py-3">{c.status}</td>
                  <td className="px-4 py-3">{c.appliedDate}</td>
                  <td className="px-4 py-3">
                    <button type="button" className="p-1 hover:bg-gray-100 rounded" title="More actions">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
