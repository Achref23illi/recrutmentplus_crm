'use client'

import { useState } from 'react'
import { Search, Filter, Plus, Building2, MapPin, Users, Briefcase, Phone, Mail, Globe, MoreHorizontal, ChevronDown } from 'lucide-react'
import AddCompanyModal from '../../components/AddCompanyModal'

export default function CompaniesPage() {
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCompanies, setSelectedCompanies] = useState([])
  
  const industryOptions = ['All Industries', 'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing']
  const [activeIndustry, setActiveIndustry] = useState('All Industries')

  // Sample companies data
  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: 'Innovatech Solutions',
      logo: 'IS',
      industry: 'Technology',
      location: 'San Francisco, CA',
      size: '50-100',
      openPositions: 5,
      contactPerson: 'David Miller',
      email: 'david@innovatech.com',
      phone: '(415) 555-1234',
      website: 'innovatech.com',
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      name: 'MediCare Group',
      logo: 'MG',
      industry: 'Healthcare',
      location: 'Boston, MA',
      size: '500-1000',
      openPositions: 12,
      contactPerson: 'Sarah Johnson',
      email: 'sjohnson@medicare.org',
      phone: '(617) 555-2345',
      website: 'medicaregroup.org',
      lastActivity: '5 days ago'
    },
    {
      id: 3,
      name: 'Global Finance Partners',
      logo: 'GF',
      industry: 'Finance',
      location: 'New York, NY',
      size: '1000+',
      openPositions: 8,
      contactPerson: 'Michael Chen',
      email: 'm.chen@gfp.com',
      phone: '(212) 555-3456',
      website: 'globalfinancepartners.com',
      lastActivity: 'Today'
    },
    {
      id: 4,
      name: 'EduTech Ventures',
      logo: 'EV',
      industry: 'Education',
      location: 'Austin, TX',
      size: '10-50',
      openPositions: 3,
      contactPerson: 'Jessica Reynolds',
      email: 'jreynolds@edutech.io',
      phone: '(512) 555-4567',
      website: 'edutech.io',
      lastActivity: '1 week ago'
    },
    {
      id: 5,
      name: 'RetailNow Inc.',
      logo: 'RN',
      industry: 'Retail',
      location: 'Chicago, IL',
      size: '100-500',
      openPositions: 7,
      contactPerson: 'Robert Wilson',
      email: 'rwilson@retailnow.com',
      phone: '(312) 555-5678',
      website: 'retailnow.com',
      lastActivity: '3 days ago'
    }
  ])

  // Industry color mapping
  const industryColor = (industry) => {
    switch(industry) {
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Healthcare': return 'bg-green-100 text-green-800';
      case 'Finance': return 'bg-purple-100 text-purple-800';
      case 'Education': return 'bg-amber-100 text-amber-800';
      case 'Retail': return 'bg-orange-100 text-orange-800';
      case 'Manufacturing': return 'bg-slate-100 text-slate-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const handleToggleSelect = (id) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== id))
    } else {
      setSelectedCompanies([...selectedCompanies, id])
    }
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCompanies(companies.map((c) => c.id))
    } else {
      setSelectedCompanies([])
    }
  }

  // Handle adding a new company
  const handleAddCompany = (newCompany) => {
    setCompanies(prevCompanies => [newCompany, ...prevCompanies])
    setIsAddCompanyModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Companies</h1>
          <button 
            onClick={() => setIsAddCompanyModalOpen(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Company</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Manage client companies and track open positions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
          </div>
          <input
            type="text"
            placeholder="Search companies by name, industry or location..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--secondary)] transition-colors"
          >
            <Filter className="mr-2 h-4 w-4 text-[var(--primary)]" />
            <span>Filters</span>
          </button>

          <div className="flex overflow-x-auto no-scrollbar space-x-2">
            {industryOptions.map((industry) => (
              <button 
                key={industry}
                className={`px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors ${
                  activeIndustry === industry
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--muted)]'
                }`}
                onClick={() => setActiveIndustry(industry)}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Panel - Display when filterOpen is true */}
      {filterOpen && (
        <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] shadow-soft grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Size</label>
            <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
              <option>Any Size</option>
              <option>1-10</option>
              <option>10-50</option>
              <option>50-100</option>
              <option>100-500</option>
              <option>500-1000</option>
              <option>1000+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Open Positions</label>
            <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
              <option>Any</option>
              <option>1-5</option>
              <option>6-10</option>
              <option>11-20</option>
              <option>20+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Location</label>
            <select className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)]">
              <option>Any Location</option>
              <option>New York</option>
              <option>San Francisco</option>
              <option>Boston</option>
              <option>Chicago</option>
              <option>Austin</option>
            </select>
          </div>

          <div className="md:col-span-3 flex justify-end space-x-2">
            <button className="px-3 py-2 rounded-md text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              Clear All
            </button>
            <button className="px-3 py-2 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)]">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div 
            key={company.id} 
            className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft overflow-hidden hover:shadow-medium transition-shadow"
          >
            <div className="p-5 border-b border-[var(--border)]">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] flex items-center justify-center font-bold text-xl">
                  {company.logo}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-lg text-[var(--foreground)]">{company.name}</h3>
                  <div className="flex items-center text-[var(--muted-foreground)] text-sm mt-0.5">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {company.location}
                  </div>
                </div>
                <button className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Industry</div>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${industryColor(company.industry)}`}>
                      {company.industry}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Company Size</div>
                  <div className="text-sm text-[var(--foreground)] mt-1">
                    <div className="flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1 text-[var(--muted-foreground)]" />
                      {company.size} employees
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Open Positions</div>
                  <div className="text-sm text-[var(--foreground)] mt-1">
                    <div className="flex items-center">
                      <Briefcase className="h-3.5 w-3.5 mr-1 text-[var(--primary)]" />
                      {company.openPositions} positions
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[var(--muted-foreground)]">Last Activity</div>
                  <div className="text-sm text-[var(--foreground)] mt-1">{company.lastActivity}</div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-xs text-[var(--muted-foreground)] mb-2">Contact Person</div>
                <h4 className="text-sm font-medium text-[var(--foreground)]">{company.contactPerson}</h4>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-[var(--muted-foreground)]">
                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                    {company.email}
                  </div>
                  <div className="flex items-center text-xs text-[var(--muted-foreground)]">
                    <Phone className="h-3.5 w-3.5 mr-1.5" />
                    {company.phone}
                  </div>
                  <div className="flex items-center text-xs text-[var(--primary)]">
                    <Globe className="h-3.5 w-3.5 mr-1.5" />
                    {company.website}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-5 py-3 bg-[var(--background)] border-t border-[var(--border)]">
              <div className="flex justify-between">
                <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)] font-medium">
                  View Details
                </button>
                <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)] font-medium">
                  View Positions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-[var(--muted-foreground)]">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{companies.length}</span> of <span className="font-medium">{companies.length}</span> companies
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-[var(--border)] rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--secondary)]">
            Previous
          </button>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((page) => (
              <button 
                key={page} 
                className={`px-3 py-1 rounded-md text-sm ${
                  page === 1 
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
                    : 'hover:bg-[var(--secondary)] text-[var(--foreground)]'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="px-3 py-1 border border-[var(--border)] rounded-md text-sm text-[var(--foreground)] hover:bg-[var(--secondary)]">
            Next
          </button>
        </div>
      </div>

      {/* Add Company Modal */}
      <AddCompanyModal
        isOpen={isAddCompanyModalOpen}
        onClose={(newCompany) => {
          if (newCompany) {
            handleAddCompany(newCompany)
          } else {
            setIsAddCompanyModalOpen(false)
          }
        }}
      />
    </div>
  )
}
