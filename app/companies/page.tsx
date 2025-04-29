// app/companies/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  MoreHorizontal, 
  Search, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Building,
  Briefcase,
  Edit,
  Mail,
  Phone,
  FileText,
  Globe,
  Trash2,
  Users
} from 'lucide-react'
import { AddCompanyModal } from './AddCompanyModal'
import { FilterDropdown } from './FilterDropdown'

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

// Map filter IDs to actual values
const industryIdToValue: Record<string, string> = {
  'industry-tech': 'Tech',
  'industry-healthcare': 'Healthcare',
  'industry-finance': 'Finance',
  'industry-environmental': 'Environmental',
  'industry-construction': 'Construction'
}

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(sampleCompanies)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
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

  const toggleDropdown = (companyId: string) => {
    setActiveDropdown(activeDropdown === companyId ? null : companyId);
  };

  // Handle company actions
  const handleCompanyAction = (action: string, companyId: string, companyName: string) => {
    // In a real app, these would perform actual actions
    switch(action) {
      case 'email':
        console.log(`Sending email to ${companyName}`);
        break;
      case 'call':
        console.log(`Calling ${companyName}`);
        break;
      case 'edit':
        console.log(`Editing ${companyName}`);
        break;
      case 'positions':
        console.log(`Managing positions for ${companyName}`);
        break;
      case 'view-note':
        console.log(`Viewing notes for ${companyName}`);
        break;
      case 'website':
        console.log(`Opening website for ${companyName}`);
        break;
      case 'delete':
        console.log(`Deleting ${companyName}`);
        break;
    }
    setActiveDropdown(null);
  };

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

  const handleFilterChange = (filters: {
    industry: string[];
    openPositions: string[];
  }) => {
    // Apply filters to companies
    const filteredCompanies = sampleCompanies.filter(company => {
      // Check industry filter
      if (filters.industry.length > 0) {
        const industryValues = filters.industry.map(id => industryIdToValue[id]);
        if (!industryValues.includes(company.industry)) {
          return false;
        }
      }
      
      // Check open positions filter
      if (filters.openPositions.length > 0) {
        // Handle position ranges
        return filters.openPositions.some(positionFilter => {
          switch(positionFilter) {
            case 'positions-0':
              return company.openPositions === 0;
            case 'positions-1-5':
              return company.openPositions >= 1 && company.openPositions <= 5;
            case 'positions-6-10':
              return company.openPositions >= 6 && company.openPositions <= 10;
            case 'positions-10+':
              return company.openPositions > 10;
            default:
              return true;
          }
        });
      }
      
      return true;
    });
    
    setCompanies(filteredCompanies);
  };

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
          <FilterDropdown onFilterChange={handleFilterChange} />
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
                  <td className="px-6 py-4 relative">
                    <button 
                      type="button" 
                      className="p-2 hover:bg-neutral-700 rounded" 
                      title="More actions"
                      onClick={() => toggleDropdown(company.id)}
                    >
                      <MoreHorizontal size={18} className="text-neutral-400" />
                    </button>
                    
                    {/* Action Dropdown Menu */}
                    {activeDropdown === company.id && (
                      <div 
                        ref={(el) => {
                          dropdownRefs.current[company.id] = el;
                        }}
                        className="absolute right-4 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-800 border border-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1 divide-y divide-neutral-700">
                          {/* Communication */}
                          <div className="px-3 py-2">
                            <p className="text-xs font-medium text-neutral-400 mb-1">Communication</p>
                            <button 
                              onClick={() => handleCompanyAction('email', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <Mail size={16} className="mr-2 text-[#80BDCA]" />
                              Send Email
                            </button>
                            <button 
                              onClick={() => handleCompanyAction('call', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <Phone size={16} className="mr-2 text-[#80BDCA]" />
                              Call Company
                            </button>
                          </div>
                          
                          {/* Management */}
                          <div className="px-3 py-2">
                            <p className="text-xs font-medium text-neutral-400 mb-1">Management</p>
                            <button 
                              onClick={() => handleCompanyAction('edit', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <Edit size={16} className="mr-2 text-neutral-400" />
                              Edit Company
                            </button>
                            <button 
                              onClick={() => handleCompanyAction('positions', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <Users size={16} className="mr-2 text-neutral-400" />
                              Manage Positions
                            </button>
                            <button 
                              onClick={() => handleCompanyAction('view-note', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <FileText size={16} className="mr-2 text-neutral-400" />
                              View Notes
                            </button>
                            <button 
                              onClick={() => handleCompanyAction('website', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <Globe size={16} className="mr-2 text-neutral-400" />
                              Visit Website
                            </button>
                          </div>
                          
                          {/* Danger Zone */}
                          <div className="px-3 py-2">
                            <button 
                              onClick={() => handleCompanyAction('delete', company.id, company.name)}
                              className="w-full text-left px-4 py-2 text-sm text-red-400 flex items-center rounded-md hover:bg-neutral-700"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete Company
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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