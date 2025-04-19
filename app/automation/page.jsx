'use client'

import { useState } from 'react'
import Toggle from '../../components/Toggle'
import ToolCard from '../../components/ToolCard'
import CreateWorkflowModal from '../../components/CreateWorkflowModal'
import { 
  Zap, Mail, Calendar, Briefcase, AlarmCheck, FileCheck, 
  Plus, Settings, ChevronDown, Clock, Check, AlertTriangle
} from 'lucide-react'

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState('workflows')
  const [isCreateWorkflowModalOpen, setIsCreateWorkflowModalOpen] = useState(false)
  
  // Sample workflows data
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'New Application Follow-up',
      description: 'Automatically send follow-up emails when new applications are received',
      triggers: ['New application received'],
      actions: ['Send email', 'Create task'],
      status: 'active',
      lastRun: '2 hours ago',
      runCount: 45,
      created: 'Mar 15, 2025'
    },
    {
      id: 2,
      name: 'Interview Reminder',
      description: 'Send reminders to hiring managers and candidates before scheduled interviews',
      triggers: ['Interview scheduled'],
      actions: ['Send email', 'Send calendar invite'],
      status: 'active',
      lastRun: '30 minutes ago',
      runCount: 128,
      created: 'Feb 3, 2025'
    },
    {
      id: 3,
      name: 'Candidate Rejection',
      description: 'Send personalized rejection emails to candidates after decision',
      triggers: ['Candidate status changed to "Rejected"'],
      actions: ['Send email', 'Update database'],
      status: 'inactive',
      lastRun: '1 week ago',
      runCount: 67,
      created: 'Mar 30, 2025'
    },
    {
      id: 4,
      name: 'Resume Screening',
      description: 'Automatically screen and score incoming resumes based on job requirements',
      triggers: ['New resume uploaded'],
      actions: ['AI analysis', 'Score calculation', 'Create candidate profile'],
      status: 'active',
      lastRun: '1 day ago',
      runCount: 213,
      created: 'Jan 12, 2025'
    }
  ])

  // Handle adding a new workflow from the modal
  const handleAddWorkflow = (newWorkflow) => {
    if (newWorkflow) {
      // Format triggers and actions arrays to match the existing structure
      const formattedWorkflow = {
        ...newWorkflow,
        triggers: newWorkflow.triggers.map(t => t.value),
        actions: newWorkflow.actions.map(a => a.value)
      }
      setWorkflows(prevWorkflows => [...prevWorkflows, formattedWorkflow])
    }
    setIsCreateWorkflowModalOpen(false)
  }

  // Toggle workflow status
  const toggleWorkflowStatus = (id) => {
    setWorkflows(prevWorkflows => prevWorkflows.map(workflow => 
      workflow.id === id 
        ? { ...workflow, status: workflow.status === 'active' ? 'inactive' : 'active' }
        : workflow
    ))
  }

  // Sample tools data
  const tools = [
    {
      id: 1,
      name: 'Email Templates',
      description: 'Create and manage reusable email templates for various stages of recruitment',
      icon: Mail,
      status: 'connected',
      usageCount: 152
    },
    {
      id: 2,
      name: 'Calendar Integration',
      description: 'Sync with Google Calendar and Microsoft Outlook for scheduling',
      icon: Calendar,
      status: 'connected',
      usageCount: 89
    },
    {
      id: 3,
      name: 'Job Board Posting',
      description: 'Automatically post job openings to multiple job boards',
      icon: Briefcase,
      status: 'disconnected',
      usageCount: 0
    },
    {
      id: 4,
      name: 'Candidate Scoring',
      description: 'AI-based scoring system for candidate evaluation',
      icon: FileCheck,
      status: 'connected',
      usageCount: 213
    },
    {
      id: 5,
      name: 'Task Automation',
      description: 'Create and assign tasks based on recruitment workflow stages',
      icon: AlarmCheck,
      status: 'connected',
      usageCount: 178
    }
  ]

  // Sample activity data
  const activities = [
    { id: 1, workflow: 'New Application Follow-up', status: 'success', time: '2 hours ago', message: 'Sent follow-up email to Michael Chen' },
    { id: 2, workflow: 'Interview Reminder', status: 'success', time: '30 minutes ago', message: 'Sent interview reminder to Jessica Reynolds and Hiring Manager' },
    { id: 3, workflow: 'Resume Screening', status: 'warning', time: '1 day ago', message: 'Resume format not recognized for Thomas Wilson' },
    { id: 4, workflow: 'New Application Follow-up', status: 'error', time: '3 hours ago', message: 'Failed to send email to ahmed.h@example.com' },
    { id: 5, workflow: 'Interview Reminder', status: 'success', time: '2 days ago', message: 'Sent interview reminder to Priya Patel and Hiring Manager' }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Automation</h1>
          <button 
            onClick={() => setIsCreateWorkflowModalOpen(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Workflow</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Streamline your recruitment process with automated workflows
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[var(--border)]">
        <div className="flex space-x-8">
          {['workflows', 'tools', 'activity', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {tab === 'workflows' && <Zap className="mr-2 h-4 w-4 inline-block" />}
              {tab === 'tools' && <Settings className="mr-2 h-4 w-4 inline-block" />}
              {tab === 'activity' && <Clock className="mr-2 h-4 w-4 inline-block" />}
              {tab === 'settings' && <Settings className="mr-2 h-4 w-4 inline-block" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Workflows Tab Content */}
      {activeTab === 'workflows' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft p-6 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-medium text-[var(--foreground)]">
                {workflows.filter(w => w.status === 'active').length} Active Workflows
              </h3>
              <p className="text-[var(--muted-foreground)] text-sm text-center mt-2">
                Automate your recruitment tasks with custom workflows
              </p>
              <button className="mt-4 text-[var(--primary)] font-medium text-sm flex items-center">
                Manage All Workflows
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft p-6 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-emerald-500 bg-opacity-10 flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-medium text-[var(--foreground)]">453 Tasks Automated</h3>
              <p className="text-[var(--muted-foreground)] text-sm text-center mt-2">
                Last 30 days automation statistics
              </p>
              <button className="mt-4 text-[var(--primary)] font-medium text-sm flex items-center">
                View Statistics
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft p-6 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-amber-500 bg-opacity-10 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-medium text-[var(--foreground)]">26.5 Hours Saved</h3>
              <p className="text-[var(--muted-foreground)] text-sm text-center mt-2">
                Estimated time saved through automation
              </p>
              <button className="mt-4 text-[var(--primary)] font-medium text-sm flex items-center">
                View Details
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Workflows List */}
          <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
              <h2 className="text-lg font-medium text-[var(--foreground)]">All Workflows</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[var(--muted-foreground)]">Sort by:</span>
                <select className="text-sm border-none bg-transparent text-[var(--foreground)] focus:outline-none focus:ring-0">
                  <option>Recently Updated</option>
                  <option>Name (A-Z)</option>
                  <option>Most Used</option>
                </select>
              </div>
            </div>
            
            <div className="divide-y divide-[var(--border)]">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="p-5 hover:bg-[var(--secondary)] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-[var(--foreground)]">{workflow.name}</h3>
                        <span className={`ml-3 px-2 py-0.5 rounded-full text-xs ${
                          workflow.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-[var(--muted-foreground)] mt-1">{workflow.description}</p>
                    </div>
                    
                    <Toggle 
                      enabled={workflow.status === 'active'} 
                      onChange={() => toggleWorkflowStatus(workflow.id)} 
                    />
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-[var(--muted-foreground)]">Triggers</div>
                      <div className="text-sm text-[var(--foreground)] mt-1">
                        {workflow.triggers.map((trigger, i) => (
                          <span key={i} className="inline-block bg-[var(--secondary)] px-2 py-1 rounded-md text-xs mr-2 mb-1">
                            {trigger}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-[var(--muted-foreground)]">Actions</div>
                      <div className="text-sm text-[var(--foreground)] mt-1">
                        {workflow.actions.map((action, i) => (
                          <span key={i} className="inline-block bg-[var(--secondary)] px-2 py-1 rounded-md text-xs mr-2 mb-1">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-[var(--muted-foreground)]">Statistics</div>
                      <div className="text-sm text-[var(--foreground)] mt-1 space-x-4">
                        <span>Last run: {workflow.lastRun}</span>
                        <span>Run count: {workflow.runCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-end space-x-2">
                    <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm">
                      View Analytics
                    </button>
                    <button className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] text-sm">
                      Edit
                    </button>
                    <button className="text-[var(--primary)] hover:text-[var(--primary-light)] text-sm font-medium">
                      Duplicate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools Tab Content */}
      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              description={tool.description}
              icon={<tool.icon className="h-5 w-5" />}
              status={tool.status}
              usageCount={tool.usageCount}
            />
          ))}
        </div>
      )}

      {/* Activity Tab Content */}
      {activeTab === 'activity' && (
        <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h2 className="text-lg font-medium text-[var(--foreground)]">Recent Activity</h2>
            <button className="text-[var(--primary)] hover:text-[var(--primary-light)] text-sm">
              View All
            </button>
          </div>
          
          <div>
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start p-4 border-b border-[var(--border)] hover:bg-[var(--secondary)] transition-colors">
                <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                  activity.status === 'success' ? 'bg-emerald-100 text-emerald-500' :
                  activity.status === 'warning' ? 'bg-amber-100 text-amber-500' :
                  'bg-red-100 text-red-500'
                }`}>
                  {activity.status === 'success' && <Check className="h-3.5 w-3.5" />}
                  {activity.status === 'warning' && <AlertTriangle className="h-3.5 w-3.5" />}
                  {activity.status === 'error' && <AlertTriangle className="h-3.5 w-3.5" />}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-[var(--foreground)] font-medium">{activity.workflow}</h4>
                    <span className="text-xs text-[var(--muted-foreground)]">{activity.time}</span>
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1">{activity.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 text-center">
            <button className="text-[var(--primary)] hover:text-[var(--primary-light)] text-sm">
              Load More
            </button>
          </div>
        </div>
      )}

      {/* Settings Tab Content */}
      {activeTab === 'settings' && (
        <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-[var(--foreground)]">Automation Settings</h2>
            <p className="text-[var(--muted-foreground)]">Configure global automation settings</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Enable Automation System</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Turn on/off all automated workflows</p>
              </div>
              <Toggle enabled={true} />
            </div>
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Email Notifications</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Receive notifications when workflows run</p>
              </div>
              <Toggle enabled={true} />
            </div>
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Activity Logging</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Log all automation activities</p>
              </div>
              <Toggle enabled={true} />
            </div>
            
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Error Handling</h3>
                <p className="text-sm text-[var(--muted-foreground)]">How to handle workflow errors</p>
              </div>
              <select className="p-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm">
                <option>Notify and continue</option>
                <option>Pause workflow</option>
                <option>Retry 3 times</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[var(--foreground)] font-medium">Workflow Concurrency</h3>
                <p className="text-sm text-[var(--muted-foreground)]">Maximum number of workflows to run simultaneously</p>
              </div>
              <select className="p-2 rounded-md border border-[var(--border)] bg-[var(--background)] text-sm">
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>Unlimited</option>
              </select>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-4">
            <button className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Create Workflow Modal */}
      <CreateWorkflowModal
        isOpen={isCreateWorkflowModalOpen}
        onClose={handleAddWorkflow}
      />
    </div>
  )
}
