// app/companies/page.tsx
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Plus, MoreHorizontal } from 'lucide-react'

interface Company {
  id: string
  name: string
  industry: string
  openPositions: number
  contact: string
}

// Dummy data for now
const sampleCompanies: Company[] = [
  { id: '1', name: 'Acme Corp', industry: 'Tech', openPositions: 5, contact: 'hr@acme.com' },
  { id: '2', name: 'Global Health', industry: 'Healthcare', openPositions: 2, contact: 'jobs@gh.com' },
  { id: '3', name: 'FinTrust', industry: 'Finance', openPositions: 8, contact: 'careers@fintrust.com' },
]

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Companies</h2>
        <Link
          href="/companies/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="mr-2" size={16} /> Add Company
        </Link>
      </div>

      {/* Table of companies */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Industry</th>
                <th className="px-4 py-2">Open Positions</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleCompanies.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.industry}</td>
                  <td className="px-4 py-3">{c.openPositions}</td>
                  <td className="px-4 py-3">{c.contact}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-gray-100 rounded" title="More actions">
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
