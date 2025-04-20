// app/companies/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Building,
  Briefcase
} from 'lucide-react'
import { AddCompanyModal } from './AddCompanyModal'

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
  { id: '4', name: 'EcoSolutions', industry: 'Environmental', openPositions: 3, contact: 'jobs@ecosolutions.com' },
  { id: '5', name: 'DataVision', industry: 'Tech', openPositions: 6, contact: 'hiring@datavision.com' },
  { id: '6', name: 'BuildWell', industry: 'Construction', openPositions: 4, contact: 'hr@buildwell.com' },
]

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(sampleCompanies)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddCompany = (companyData: { 
    name: string; 
    website: string; 
    industry: string; 
    employeeCount: string; 
    status: string; 
    location: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    notes: string;
  }) => {
    // In a real app, you would make an API call here
    // This is just for demonstration
    const newCompany: Company = {
      id: (companies.length + 1).toString(),
      name: companyData.name,
      industry: companyData.industry,
      openPositions: 0, // Default value
      contact: companyData.contactEmail || 'No contact available',
    }
    
    setCompanies([newCompany, ...companies])
  }

  return (
    <div className="space-y-8">
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Companies</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input 
              type="text"
              placeholder="Search companies..."
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700">
            <Filter size={18} className="mr-2" /> Filter
          </button>
          <button className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700">
            <Download size={18} className="mr-2" /> Export
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
          >
            <Plus className="mr-2" size={18} /> Add Company
          </button>
        </div>
      </div>

      {/* Table of companies */}
      <Card className="overflow-hidden border border-neutral-700 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-neutral-700/30 border-b border-neutral-700">
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Company</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Industry</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Open Positions</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Contact</th>
                <th className="px-6 py-3 text-sm font-medium text-neutral-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {companies.map(company => (
                <tr key={company.id} className="hover:bg-neutral-700/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA]">
                        <Building size={20} />
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-white">{company.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1D4E5F]/20 text-[#80BDCA]">
                      {company.industry}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Briefcase size={16} className="mr-2 text-[#51B3A2]" />
                      <span className="text-white">{company.openPositions}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">{company.contact}</td>
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
            Showing <span className="font-medium text-neutral-300">1</span> to <span className="font-medium text-neutral-300">6</span> of <span className="font-medium text-neutral-300">15</span> companies
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
            <button className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" title="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Card>

      {/* Add Company Modal */}
      <AddCompanyModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCompany}
      />
    </div>
  )
}