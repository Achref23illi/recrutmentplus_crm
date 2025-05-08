'use client'

import { useState } from 'react'
import { useOffice } from '@/contexts/OfficeContext'
import { motion, AnimatePresence } from 'framer-motion'

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Hospitality',
  'Construction',
  'Real Estate',
  'Other'
]

const companyStatuses = [
  'Active',
  'Passive',
  'Lead',
  'Former Client',
  'Prospect'
]

interface AddCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (companyData: { 
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
    officeId: string;
  }) => void
}

export function AddCompanyModal({ isOpen, onClose, onSubmit }: AddCompanyModalProps) {
  const { currentOffice, offices, userAccessLevel } = useOffice()

  const [form, setForm] = useState({
    name: '',
    website: '',
    industry: industries[0],
    employeeCount: '',
    status: companyStatuses[0],
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    notes: '',
    officeId: currentOffice.id // Default to current office
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      name: '',
      website: '',
      industry: industries[0],
      employeeCount: '',
      status: companyStatuses[0],
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      notes: '',
      officeId: currentOffice.id
    })
    onClose()
  }

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      transition: { 
        duration: 0.2
      } 
    }
  }

  const staggerFormItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  }

  const formItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  // Custom Modal component with Framer Motion
  const AnimatedModal = ({ children }: { children: React.ReactNode }) => (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ 
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            <motion.div
              className="bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-neutral-700 flex justify-between items-center">
                <h2 className="text-lg font-medium text-white">Add Company</h2>
                <button 
                  onClick={onClose}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="p-5">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  return (
    <AnimatedModal>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4"
        variants={staggerFormItems}
        initial="hidden"
        animate="visible"
      >
        {/* Company Name */}
        <motion.div variants={formItemVariants}>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Company Name</label>
          <motion.input
            whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
            transition={{ duration: 0.2 }}
            title="Company Name"
            placeholder="Enter company name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
          />
        </motion.div>

        {/* Website & Industry */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={formItemVariants}>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Website</label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
              transition={{ duration: 0.2 }}
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              title="Company Website"
              placeholder="e.g. https://example.com"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Industry</label>
            <motion.select
              whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
              transition={{ duration: 0.2 }}
              name="industry"
              value={form.industry}
              onChange={handleChange}
              title="Industry"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </motion.select>
          </div>
        </motion.div>

        {/* Employee Count & Status */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={formItemVariants}>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Number of Employees</label>
            <motion.input
              whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
              transition={{ duration: 0.2 }}
              type="text"
              name="employeeCount"
              value={form.employeeCount}
              onChange={handleChange}
              title="Employee Count"
              placeholder="e.g. 50-100"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Status</label>
            <motion.select
              whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
              transition={{ duration: 0.2 }}
              name="status"
              value={form.status}
              onChange={handleChange}
              title="Company Status"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
            >
              {companyStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </motion.select>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div variants={formItemVariants}>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Location</label>
          <motion.input
            whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
            transition={{ duration: 0.2 }}
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            title="Company Location"
            placeholder="e.g. New York, NY, USA"
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
          />
        </motion.div>

        {/* Primary Contact Information */}
        <motion.div variants={formItemVariants}>
          <h4 className="font-medium text-neutral-200 mb-2">Primary Contact</h4>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Name</label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
                transition={{ duration: 0.2 }}
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                title="Contact Person Name"
                placeholder="Enter contact name"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Email</label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
                transition={{ duration: 0.2 }}
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                title="Contact Email"
                placeholder="Enter contact email"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1">Contact Phone</label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
                transition={{ duration: 0.2 }}
                type="tel"
                name="contactPhone"
                value={form.contactPhone}
                onChange={handleChange}
                title="Contact Phone"
                placeholder="Enter contact phone"
                className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
              />
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        <motion.div variants={formItemVariants}>
          <label className="block text-sm font-medium text-neutral-300 mb-1">Notes</label>
          <motion.textarea
            whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
            transition={{ duration: 0.2 }}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            title="Company Notes"
            placeholder="Additional information about this company..."
            className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
          />
        </motion.div>

        {/* Office Selection (for Super Admin only) */}
        {userAccessLevel === 'superAdmin' && (
          <motion.div variants={formItemVariants}>
            <label className="block text-sm font-medium text-neutral-300 mb-1">Office</label>
            <motion.select
              whileFocus={{ boxShadow: "0 0 0 2px #1D4E5F" }}
              transition={{ duration: 0.2 }}
              name="officeId"
              value={form.officeId}
              onChange={handleChange}
              title="Company Office"
              className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F] transition-shadow"
            >
              {offices.map(office => (
                <option key={office.id} value={office.id}>{office.city}</option>
              ))}
            </motion.select>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div 
          className="flex justify-end gap-3 pt-4"
          variants={formItemVariants}
        >
          <motion.button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700 transition-colors"
            whileHover={{ 
              backgroundColor: "rgba(64, 64, 64, 0.8)",
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="px-6 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition-colors"
            whileHover={{ 
              backgroundColor: "rgba(18, 48, 64, 1)", 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            Save Company
          </motion.button>
        </motion.div>
      </motion.form>
    </AnimatedModal>
  )
}