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
import { motion, AnimatePresence } from 'framer-motion'
import { useOffice } from '@/contexts/OfficeContext'

interface Company {
  id: string
  name: string
  industry: string
  openPositions: number
  contact: string
  officeId: string // Add officeId to identify which office the company belongs to
}

// Dummy data for now
const sampleCompanies: Company[] = [
  { id: '1', name: 'TechCorp', industry: 'Tech', openPositions: 5, contact: 'hr@techcorp.com', officeId: '1' },
  { id: '2', name: 'MediHealth', industry: 'Healthcare', openPositions: 2, contact: 'hiring@medihealth.com', officeId: '1' },
  { id: '3', name: 'FinTrust', industry: 'Finance', openPositions: 8, contact: 'careers@fintrust.com', officeId: '2' },
  { id: '4', name: 'EcoSolutions', industry: 'Environmental', openPositions: 3, contact: 'jobs@ecosolutions.com', officeId: '2' },
  { id: '5', name: 'DataVision', industry: 'Tech', openPositions: 6, contact: 'hiring@datavision.com', officeId: '3' },
  { id: '6', name: 'BuildWell', industry: 'Construction', openPositions: 4, contact: 'hr@buildwell.com', officeId: '3' },
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
  const [searchQuery, setSearchQuery] = useState('')

  const { currentOffice, userAccessLevel } = useOffice()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.2 
      } 
    }
  }

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      transformOrigin: "top right",
      y: -5
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      y: -5,
      transition: { 
        duration: 0.2 
      } 
    }
  }

  const iconButtonVariants = {
    hover: { 
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  }

  const primaryButtonVariants = {
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(18, 48, 64, 1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  }

  const secondaryButtonVariants = {
    hover: { 
      scale: 1.02,
      backgroundColor: "rgba(64, 64, 64, 0.8)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  }

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
        // Remove the company from state to demonstrate animation
        setCompanies(companies.filter(company => company.id !== companyId));
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
      officeId: currentOffice.id // Assign to current office
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

  // Handle search query
  useEffect(() => {
    // For superAdmin, we can show all companies or filter by the selected office
    if (userAccessLevel === 'superAdmin') {
      if (searchQuery) {
        // If there's a search query, filter by both search and office
        const filtered = sampleCompanies.filter(company => 
          (company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.contact.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setCompanies(filtered);
      } else {
        // Just filter by selected office if no search
        setCompanies(sampleCompanies);
      }
    } else {
      // Non-superAdmin users can only see companies from their office
      const filtered = sampleCompanies.filter(company => 
        company.officeId === currentOffice.id &&
        (searchQuery ? 
          (company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          company.contact.toLowerCase().includes(searchQuery.toLowerCase())) : true
        )
      );
      setCompanies(filtered);
    }
  }, [currentOffice.id, searchQuery, userAccessLevel]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Companies</h2>
        </motion.div>
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <motion.input 
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-64 border border-neutral-700 bg-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
              whileFocus={{ boxShadow: "0 0 0 2px rgba(29, 78, 95, 0.5)" }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <FilterDropdown onFilterChange={handleFilterChange} />
          <motion.button 
            className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700"
            variants={secondaryButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Download size={18} className="mr-2" /> Export
          </motion.button>
          <motion.button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
            variants={primaryButtonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Plus className="mr-2" size={18} /> Add Company
          </motion.button>
        </motion.div>
      </div>

      {/* Table of companies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Card className="overflow-hidden border border-neutral-700 shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-neutral-700/30 border-b border-neutral-700">
                  <motion.th 
                    className="px-6 py-3 text-sm font-medium text-neutral-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Company
                  </motion.th>
                  <motion.th 
                    className="px-6 py-3 text-sm font-medium text-neutral-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    Industry
                  </motion.th>
                  <motion.th 
                    className="px-6 py-3 text-sm font-medium text-neutral-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Open Positions
                  </motion.th>
                  <motion.th 
                    className="px-6 py-3 text-sm font-medium text-neutral-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    Contact
                  </motion.th>
                  {userAccessLevel === 'superAdmin' && (
                    <motion.th 
                      className="px-6 py-3 text-sm font-medium text-neutral-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Office
                    </motion.th>
                  )}
                  <motion.th 
                    className="px-6 py-3 text-sm font-medium text-neutral-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.65 }}
                  >
                    Actions
                  </motion.th>
                </tr>
              </thead>
              <motion.tbody 
                className="divide-y divide-neutral-700"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {companies.map(company => (
                    <motion.tr 
                      key={company.id} 
                      className="hover:bg-neutral-700/20"
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                      layout
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <motion.div 
                            className="h-10 w-10 rounded-lg bg-[#1D4E5F]/30 flex items-center justify-center text-[#80BDCA]"
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: "rgba(29, 78, 95, 0.5)" 
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Building size={20} />
                          </motion.div>
                          <div className="ml-3">
                            <p className="font-medium text-white">{company.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.span 
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#1D4E5F]/20 text-[#80BDCA]"
                          whileHover={{ 
                            backgroundColor: "rgba(29, 78, 95, 0.4)",
                            scale: 1.05
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {company.industry}
                        </motion.span>
                      </td>
                      <td className="px-6 py-4">
                        <motion.div 
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Briefcase size={16} className="mr-2 text-[#51B3A2]" />
                          <span className="text-white">{company.openPositions}</span>
                        </motion.div>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-400">{company.contact}</td>
                      {userAccessLevel === 'superAdmin' && (
                        <td className="px-6 py-4">
                          <motion.span 
                            className="px-2 py-1 text-xs rounded-full bg-[#1D4E5F]/20 text-[#80BDCA]"
                          >
                            {currentOffice.city || 'Unknown'}
                          </motion.span>
                        </td>
                      )}
                      <td className="px-6 py-4 relative">
                        <motion.button 
                          type="button" 
                          className="p-2 hover:bg-neutral-700 rounded" 
                          title="More actions"
                          onClick={() => toggleDropdown(company.id)}
                          variants={iconButtonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <MoreHorizontal size={18} className="text-neutral-400" />
                        </motion.button>
                        
                        {/* Action Dropdown Menu */}
                        <AnimatePresence>
                          {activeDropdown === company.id && (
                            <motion.div 
                              ref={(el) => {
                                dropdownRefs.current[company.id] = el;
                              }}
                              className="absolute right-4 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-800 border border-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              <div className="py-1 divide-y divide-neutral-700">
                                {/* Communication */}
                                <div className="px-3 py-2">
                                  <p className="text-xs font-medium text-neutral-400 mb-1">Communication</p>
                                  <motion.button 
                                    onClick={() => handleCompanyAction('email', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Mail size={16} className="mr-2 text-[#80BDCA]" />
                                    Send Email
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCompanyAction('call', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Phone size={16} className="mr-2 text-[#80BDCA]" />
                                    Call Company
                                  </motion.button>
                                </div>
                                
                                {/* Management */}
                                <div className="px-3 py-2">
                                  <p className="text-xs font-medium text-neutral-400 mb-1">Management</p>
                                  <motion.button 
                                    onClick={() => handleCompanyAction('edit', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Edit size={16} className="mr-2 text-neutral-400" />
                                    Edit Company
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCompanyAction('positions', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Users size={16} className="mr-2 text-neutral-400" />
                                    Manage Positions
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCompanyAction('view-note', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <FileText size={16} className="mr-2 text-neutral-400" />
                                    View Notes
                                  </motion.button>
                                  <motion.button 
                                    onClick={() => handleCompanyAction('website', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-white flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Globe size={16} className="mr-2 text-neutral-400" />
                                    Visit Website
                                  </motion.button>
                                </div>
                                
                                {/* Danger Zone */}
                                <div className="px-3 py-2">
                                  <motion.button 
                                    onClick={() => handleCompanyAction('delete', company.id, company.name)}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 flex items-center rounded-md hover:bg-neutral-700"
                                    whileHover={{ 
                                      backgroundColor: "rgba(220, 38, 38, 0.1)",
                                      x: 2
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Company
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
          <div className="flex items-center justify-between px-6 py-3 border-t border-neutral-700 bg-neutral-800">
            <div className="text-sm text-neutral-400">
              Showing <span className="font-medium text-neutral-300">1</span> to <span className="font-medium text-neutral-300">{companies.length}</span> of <span className="font-medium text-neutral-300">15</span> companies
            </div>
            <div className="flex items-center space-x-2">
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700 disabled:opacity-50 disabled:hover:bg-transparent" 
                disabled 
                title="Previous page"
                variants={secondaryButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded bg-[#1D4E5F] text-white text-sm hover:bg-[#123040]"
                variants={primaryButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                1
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" 
                title="Go to page 2"
                variants={secondaryButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                2
              </motion.button>
              <motion.button 
                className="px-3 py-1 border border-neutral-700 rounded text-sm text-neutral-400 hover:bg-neutral-700" 
                title="Next page"
                variants={secondaryButtonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Add Company Modal */}
      <AddCompanyModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCompany}
      />
    </motion.div>
  )
}