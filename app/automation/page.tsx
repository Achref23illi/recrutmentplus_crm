// app/automation/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Plus, Info, ExternalLink, Mail, Clock, UserCheck, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import CreateWorkflowModal from './CreateWorkflowModal'

interface Workflow {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: 'mail' | 'clock' | 'user-check' | 'alert'
  triggers: string
  lastRun: string | null
}

const initialWorkflows: Workflow[] = [
  {
    id: 'wf1',
    name: 'New Application Notification',
    description: 'Email recruiter when a new candidate applies.',
    enabled: true,
    icon: 'mail',
    triggers: 'When a new application is submitted',
    lastRun: '2025-04-18 14:32'
  },
  {
    id: 'wf2',
    name: 'Interview Reminder',
    description: 'Send reminder 24h before interview.',
    enabled: false,
    icon: 'clock',
    triggers: 'Daily at 9:00 AM',
    lastRun: null
  },
  {
    id: 'wf3',
    name: 'Client Follow-Up',
    description: 'Ping client if awaiting decision for >7 days.',
    enabled: true,
    icon: 'user-check',
    triggers: 'When candidate status = "Client Review" for 7+ days',
    lastRun: '2025-04-19 09:15'
  },
  {
    id: 'wf4',
    name: 'Task Deadline Reminder',
    description: 'Notify responsible user 1 day before task due.',
    enabled: false,
    icon: 'alert',
    triggers: 'Daily at 10:00 AM',
    lastRun: null
  },
  {
    id: 'wf5',
    name: 'Candidate Onboarding',
    description: 'Send welcome email and onboarding materials when candidate is hired.',
    enabled: true,
    icon: 'mail',
    triggers: 'When candidate status changes to "Hired"',
    lastRun: '2025-04-15 16:45'
  },
  {
    id: 'wf6',
    name: 'Application Status Update',
    description: 'Send weekly status updates to candidates in the pipeline.',
    enabled: false,
    icon: 'mail',
    triggers: 'Every Monday at 8:00 AM',
    lastRun: null
  }
]

export default function AutomationPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const toggle = (id: string) => {
    setWorkflows(wfs =>
      wfs.map(w =>
        w.id === id ? { ...w, enabled: !w.enabled } : w
      )
    )
  }

  const getIcon = (type: string) => {
    switch(type) {
      case 'mail':
        return <Mail size={20} className="text-[#80BDCA]" />;
      case 'clock':
        return <Clock size={20} className="text-[#80BDCA]" />;
      case 'user-check':
        return <UserCheck size={20} className="text-[#80BDCA]" />;
      case 'alert':
        return <AlertTriangle size={20} className="text-[#80BDCA]" />;
      default:
        return <Mail size={20} className="text-[#80BDCA]" />;
    }
  };

  const handleSaveWorkflow = (newWorkflow: Workflow) => {
    setWorkflows(prevWorkflows => [newWorkflow, ...prevWorkflows]);
  }

  return (
    <div className="space-y-8">
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Automation</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/automation/logs"
            className="inline-flex items-center px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-700"
          >
            <Info size={18} className="mr-2" /> Activity Logs
          </Link>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
          >
            <Plus className="mr-2" size={18} /> Create Workflow
          </button>
        </div>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map(wf => (
          <Card 
            key={wf.id} 
            className={`bg-neutral-800 border border-neutral-700 shadow-sm overflow-hidden transition-all duration-200 ${
              wf.enabled ? 'border-l-4 border-l-[#37A794]' : ''
            }`}
            hover={true}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`p-2.5 rounded-lg ${wf.enabled ? 'bg-[#37A794]/20' : 'bg-neutral-700/50'}`}>
                    {getIcon(wf.icon)}
                  </div>
                  <h3 className="font-medium text-white text-lg">{wf.name}</h3>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={wf.enabled}
                      onChange={() => toggle(wf.id)}
                      className="sr-only"
                      aria-label={`Toggle ${wf.name} workflow`}
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        wf.enabled ? 'bg-[#37A794]' : 'bg-neutral-600'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                          wf.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                </label>
              </div>
              
              <p className="mt-4 text-neutral-400 text-sm">{wf.description}</p>
              
              <div className="mt-4 pt-4 border-t border-neutral-700">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start">
                    <span className="text-xs text-neutral-500 w-20">Triggers:</span>
                    <span className="text-xs text-neutral-300">{wf.triggers}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-xs text-neutral-500 w-20">Last run:</span>
                    <span className="text-xs text-neutral-300">{wf.lastRun || 'Never'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/automation/${wf.id}`}
                  className="text-xs text-[#80BDCA] hover:text-[#51B3A2] inline-flex items-center"
                >
                  Configure <ExternalLink size={12} className="ml-1" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Add New Workflow Card - Updated to use modal instead of navigation */}
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="group border-2 border-dashed border-neutral-700 rounded-lg flex items-center justify-center h-64 hover:border-[#1D4E5F] transition-colors"
          aria-label="Create new workflow"
        >
          <div className="flex flex-col items-center space-y-2 text-center p-4">
            <div className="h-12 w-12 rounded-full bg-neutral-700/50 group-hover:bg-[#1D4E5F]/20 flex items-center justify-center transition-colors">
              <Plus size={24} className="text-neutral-400 group-hover:text-[#80BDCA] transition-colors" />
            </div>
            <p className="text-neutral-400 group-hover:text-[#80BDCA] font-medium transition-colors">Create New Workflow</p>
            <p className="text-neutral-500 text-sm">Automate repetitive tasks and notifications</p>
          </div>
        </button>
      </div>

      {/* Create Workflow Modal */}
      <CreateWorkflowModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSave={handleSaveWorkflow} 
      />
    </div>
  )
}