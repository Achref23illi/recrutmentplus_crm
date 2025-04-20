'use client'

import { JSX, useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { 
  Plus,
  Trash2,
  Mail,
  Clock,
  UserCheck,
  AlertTriangle,
  MessageSquare,
  FileText,
  Briefcase,
  Building,
  User,
  Calendar,
  ChevronRight,
  X
} from 'lucide-react'

// Types for workflow creation
interface TriggerOption {
  id: string
  label: string
  description: string
  icon: JSX.Element
  category: 'event' | 'schedule'
  needsConfig?: boolean
}

interface ActionOption {
  id: string
  label: string
  description: string
  icon: JSX.Element
  category: 'notification' | 'update' | 'integration'
  needsConfig?: boolean
}

const triggerOptions: TriggerOption[] = [
  {
    id: 'new-application',
    label: 'New Application',
    description: 'Trigger when a new candidate applies',
    icon: <User size={20} className="text-[#80BDCA]" />,
    category: 'event',
  },
  {
    id: 'status-change',
    label: 'Status Change',
    description: 'Trigger when a candidate status changes',
    icon: <ChevronRight size={20} className="text-[#80BDCA]" />,
    category: 'event',
    needsConfig: true
  },
  {
    id: 'interview-scheduled',
    label: 'Interview Scheduled',
    description: 'Trigger when an interview is scheduled',
    icon: <Calendar size={20} className="text-[#80BDCA]" />,
    category: 'event',
  },
  {
    id: 'daily',
    label: 'Daily Schedule',
    description: 'Run once every day at specified time',
    icon: <Clock size={20} className="text-[#80BDCA]" />,
    category: 'schedule',
    needsConfig: true
  },
  {
    id: 'weekly',
    label: 'Weekly Schedule',
    description: 'Run once a week on specified day and time',
    icon: <Clock size={20} className="text-[#80BDCA]" />,
    category: 'schedule',
    needsConfig: true
  },
  {
    id: 'job-posting',
    label: 'Job Posting Updated',
    description: 'Trigger when a job posting is created or updated',
    icon: <Briefcase size={20} className="text-[#80BDCA]" />,
    category: 'event',
  },
  {
    id: 'company-added',
    label: 'New Company Added',
    description: 'Trigger when a new company is added to the system',
    icon: <Building size={20} className="text-[#80BDCA]" />,
    category: 'event',
  },
  {
    id: 'deadline-approaching',
    label: 'Deadline Approaching',
    description: 'Trigger when a task deadline is within X days',
    icon: <AlertTriangle size={20} className="text-[#80BDCA]" />,
    category: 'event',
    needsConfig: true
  },
]

const actionOptions: ActionOption[] = [
  {
    id: 'send-email',
    label: 'Send Email',
    description: 'Send an email to specified recipients',
    icon: <Mail size={20} className="text-[#80BDCA]" />,
    category: 'notification',
    needsConfig: true
  },
  {
    id: 'send-notification',
    label: 'Send Team Notification',
    description: 'Send an in-app notification to team members',
    icon: <MessageSquare size={20} className="text-[#80BDCA]" />,
    category: 'notification',
    needsConfig: true
  },
  {
    id: 'update-status',
    label: 'Update Candidate Status',
    description: 'Change the status of a candidate automatically',
    icon: <ChevronRight size={20} className="text-[#80BDCA]" />,
    category: 'update',
    needsConfig: true
  },
  {
    id: 'create-task',
    label: 'Create Task',
    description: 'Create a new task for team members',
    icon: <FileText size={20} className="text-[#80BDCA]" />,
    category: 'update',
    needsConfig: true
  },
  {
    id: 'slack-notification',
    label: 'Send Slack Message',
    description: 'Send a message to a Slack channel',
    icon: <MessageSquare size={20} className="text-[#80BDCA]" />,
    category: 'integration',
    needsConfig: true
  },
  {
    id: 'calendar-event',
    label: 'Create Calendar Event',
    description: 'Add an event to the calendar',
    icon: <Calendar size={20} className="text-[#80BDCA]" />,
    category: 'update',
    needsConfig: true
  },
  {
    id: 'generate-report',
    label: 'Generate Report',
    description: 'Generate and send a report',
    icon: <FileText size={20} className="text-[#80BDCA]" />,
    category: 'integration',
    needsConfig: true
  },
]

// Default workflow template
const defaultWorkflowTemplate: {
  name: string;
  description: string;
  triggers: { id: string; config: Record<string, unknown> }[];
  actions: { id: string; config: Record<string, unknown> }[];
  enabled: boolean;
  icon: 'mail' | 'clock' | 'user-check' | 'alert';
} = {
  name: '',
  description: '',
  triggers: [],
  actions: [],
  enabled: true,
  icon: 'mail'
};

interface CreateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workflow: {
    id: string;
    name: string;
    description: string;
    triggers: string;
    actions: { id: string; config: Record<string, unknown> }[];
    enabled: boolean;
    icon: 'mail' | 'clock' | 'user-check' | 'alert';
    lastRun: null | string;
  }) => void;
}

export default function CreateWorkflowModal({ isOpen, onClose, onSave }: CreateWorkflowModalProps) {
  const [workflow, setWorkflow] = useState({...defaultWorkflowTemplate})
  const [step, setStep] = useState<'info' | 'triggers' | 'actions' | 'review'>('info')
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  
  const resetModal = () => {
    setWorkflow({...defaultWorkflowTemplate});
    setStep('info');
    setSelectedTrigger(null);
    setSelectedAction(null);
  };
  
  const handleClose = () => {
    resetModal();
    onClose();
  };
  
  // Update workflow name and description
  const updateWorkflowInfo = (field: 'name' | 'description' | 'icon', value: string) => {
    setWorkflow(prev => ({
      ...prev,
      [field]: value
    }))
  }
  
  // Add trigger to workflow
  const addTrigger = (triggerId: string) => {
    const trigger = triggerOptions.find(t => t.id === triggerId)
    if (trigger) {
      setWorkflow(prev => ({
        ...prev,
        triggers: [...prev.triggers, { id: triggerId, config: {} }]
      }))
      setSelectedTrigger(null)
    }
  }
  
  // Remove trigger from workflow
  const removeTrigger = (index: number) => {
    setWorkflow(prev => ({
      ...prev,
      triggers: prev.triggers.filter((_, i) => i !== index)
    }))
  }
  
  // Add action to workflow
  const addAction = (actionId: string) => {
    const action = actionOptions.find(a => a.id === actionId)
    if (action) {
      setWorkflow(prev => ({
        ...prev,
        actions: [...prev.actions, { id: actionId, config: {} }]
      }))
      setSelectedAction(null)
    }
  }
  
  // Remove action from workflow
  const removeAction = (index: number) => {
    setWorkflow(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }))
  }
  
  // Get trigger or action details by ID
  const getTriggerById = (id: string) => triggerOptions.find(t => t.id === id)
  const getActionById = (id: string) => actionOptions.find(a => a.id === id)
  
  // Navigate between steps
  const goToNextStep = () => {
    if (step === 'info') setStep('triggers')
    else if (step === 'triggers') setStep('actions')
    else if (step === 'actions') setStep('review')
  }
  
  const goToPreviousStep = () => {
    if (step === 'review') setStep('actions')
    else if (step === 'actions') setStep('triggers')
    else if (step === 'triggers') setStep('info')
  }
  
  // Save workflow
  const saveWorkflow = () => {
    // Generate a unique ID for the workflow
    const newWorkflow = {
      ...workflow,
      id: `wf${Date.now()}`,
      lastRun: null,
      // Format triggers for display
      triggers: workflow.triggers.length > 0 
        ? workflow.triggers.map(t => getTriggerById(t.id)?.label).join(', ')
        : 'No triggers'
    };
    
    onSave(newWorkflow);
    handleClose();
  }
  
  // Determine if current step is complete and can proceed
  const canProceed = () => {
    if (step === 'info') {
      return workflow.name.trim() !== '' && workflow.description.trim() !== ''
    } else if (step === 'triggers') {
      return workflow.triggers.length > 0
    } else if (step === 'actions') {
      return workflow.actions.length > 0
    }
    return true
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Workflow">
      <div className="max-w-4xl mx-auto w-full bg-neutral-800 rounded-lg border border-neutral-700 shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-neutral-700">
          <h2 className="text-xl font-semibold text-[#80BDCA]">Create Workflow</h2>
          <button 
            onClick={handleClose} 
            className="text-neutral-400 hover:text-white"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700">
          <div className="flex items-center w-full">
            <div className={`flex flex-col items-center ${
              step === 'info' ? 'text-[#80BDCA]' : 'text-neutral-400'
            }`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 'info' 
                  ? 'bg-[#1D4E5F] text-white' 
                  : step === 'triggers' || step === 'actions' || step === 'review'
                  ? 'bg-[#1D4E5F]/30 text-[#80BDCA]'
                  : 'bg-neutral-700 text-neutral-400'
              }`}>
                1
              </div>
              <div className="text-xs mt-1">Basic Info</div>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${
              step === 'info' ? 'bg-neutral-700' : 'bg-[#1D4E5F]/30'
            }`}></div>
            
            <div className={`flex flex-col items-center ${
              step === 'triggers' ? 'text-[#80BDCA]' : 'text-neutral-400'
            }`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 'triggers' 
                  ? 'bg-[#1D4E5F] text-white' 
                  : step === 'actions' || step === 'review'
                  ? 'bg-[#1D4E5F]/30 text-[#80BDCA]'
                  : 'bg-neutral-700 text-neutral-400'
              }`}>
                2
              </div>
              <div className="text-xs mt-1">Triggers</div>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${
              step === 'info' || step === 'triggers' ? 'bg-neutral-700' : 'bg-[#1D4E5F]/30'
            }`}></div>
            
            <div className={`flex flex-col items-center ${
              step === 'actions' ? 'text-[#80BDCA]' : 'text-neutral-400'
            }`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 'actions' 
                  ? 'bg-[#1D4E5F] text-white' 
                  : step === 'review'
                  ? 'bg-[#1D4E5F]/30 text-[#80BDCA]'
                  : 'bg-neutral-700 text-neutral-400'
              }`}>
                3
              </div>
              <div className="text-xs mt-1">Actions</div>
            </div>
            
            <div className={`flex-1 h-0.5 mx-2 ${
              step === 'info' || step === 'triggers' || step === 'actions' ? 'bg-neutral-700' : 'bg-[#1D4E5F]/30'
            }`}></div>
            
            <div className={`flex flex-col items-center ${
              step === 'review' ? 'text-[#80BDCA]' : 'text-neutral-400'
            }`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === 'review' 
                  ? 'bg-[#1D4E5F] text-white' 
                  : 'bg-neutral-700 text-neutral-400'
              }`}>
                4
              </div>
              <div className="text-xs mt-1">Review</div>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Basic Info Step */}
          {step === 'info' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Workflow Name</label>
                  <input
                    type="text"
                    value={workflow.name}
                    onChange={(e) => updateWorkflowInfo('name', e.target.value)}
                    placeholder="Enter workflow name"
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                  <textarea
                    value={workflow.description}
                    onChange={(e) => updateWorkflowInfo('description', e.target.value)}
                    placeholder="Describe what this workflow does"
                    rows={3}
                    className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">Icon</label>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => updateWorkflowInfo('icon', 'mail')}
                      className={`p-3 rounded-lg ${workflow.icon === 'mail' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                    >
                      <Mail size={20} className="text-[#80BDCA]" />
                    </button>
                    <button 
                      onClick={() => updateWorkflowInfo('icon', 'clock')}
                      className={`p-3 rounded-lg ${workflow.icon === 'clock' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                    >
                      <Clock size={20} className="text-[#80BDCA]" />
                    </button>
                    <button 
                      onClick={() => updateWorkflowInfo('icon', 'user-check')}
                      className={`p-3 rounded-lg ${workflow.icon === 'user-check' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                    >
                      <UserCheck size={20} className="text-[#80BDCA]" />
                    </button>
                    <button 
                      onClick={() => updateWorkflowInfo('icon', 'alert')}
                      className={`p-3 rounded-lg ${workflow.icon === 'alert' ? 'bg-[#1D4E5F]/20 ring-1 ring-[#1D4E5F]' : 'bg-neutral-700 hover:bg-neutral-600'}`}
                    >
                      <AlertTriangle size={20} className="text-[#80BDCA]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Triggers Step */}
          {step === 'triggers' && (
            <div className="space-y-6">
              <p className="text-neutral-400 text-sm">Choose what will start your workflow</p>
              
              {/* Added Triggers */}
              {workflow.triggers.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h4 className="text-neutral-300 text-sm font-medium">Added Triggers:</h4>
                  {workflow.triggers.map((trigger, index) => {
                    const triggerDetails = getTriggerById(trigger.id)
                    return triggerDetails ? (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg border border-neutral-700"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-neutral-700/50 rounded-lg mr-3">
                            {triggerDetails.icon}
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">{triggerDetails.label}</div>
                            <div className="text-xs text-neutral-400">{triggerDetails.description}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeTrigger(index)} 
                          className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded"
                          title="Remove trigger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : null
                  })}
                </div>
              )}
              
              {/* Trigger Selection */}
              <div>
                <div className="flex flex-col space-y-1 mb-4">
                  <label htmlFor="trigger-select" className="text-sm font-medium text-neutral-300">Add a trigger:</label>
                  <select 
                    id="trigger-select"
                    title="Select a trigger"
                    className="border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    value={selectedTrigger || ''}
                    onChange={e => setSelectedTrigger(e.target.value || null)}
                  >
                    <option value="">Select a trigger...</option>
                    <optgroup label="Events">
                      {triggerOptions.filter(t => t.category === 'event').map(trigger => (
                        <option key={trigger.id} value={trigger.id}>
                          {trigger.label}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Schedules">
                      {triggerOptions.filter(t => t.category === 'schedule').map(trigger => (
                        <option key={trigger.id} value={trigger.id}>
                          {trigger.label}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                
                {selectedTrigger && (
                  <button
                    onClick={() => addTrigger(selectedTrigger)}
                    className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] flex items-center"
                  >
                    <Plus size={16} className="mr-2" /> Add Trigger
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Actions Step */}
          {step === 'actions' && (
            <div className="space-y-6">
              <p className="text-neutral-400 text-sm">Choose what happens when your workflow runs</p>
              
              {/* Added Actions */}
              {workflow.actions.length > 0 && (
                <div className="space-y-3 mb-4">
                  <h4 className="text-neutral-300 text-sm font-medium">Added Actions:</h4>
                  {workflow.actions.map((action, index) => {
                    const actionDetails = getActionById(action.id)
                    return actionDetails ? (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-neutral-700/30 rounded-lg border border-neutral-700"
                      >
                        <div className="flex items-center">
                          <div className="p-2 bg-neutral-700/50 rounded-lg mr-3">
                            {actionDetails.icon}
                          </div>
                          <div>
                            <div className="text-sm text-white font-medium">{actionDetails.label}</div>
                            <div className="text-xs text-neutral-400">{actionDetails.description}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeAction(index)} 
                          className="p-2 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded"
                          title="Remove action"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : null
                  })}
                </div>
              )}
              
              {/* Action Selection */}
              <div>
                <div className="flex flex-col space-y-1 mb-4">
                  <label className="text-sm font-medium text-neutral-300">Add an action:</label>
                  <select 
                    className="border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    value={selectedAction || ''}
                    onChange={e => setSelectedAction(e.target.value || null)}
                  >
                    <option value="">Select an action...</option>
                    <optgroup label="Notifications">
                      {actionOptions.filter(a => a.category === 'notification').map(action => (
                        <option key={action.id} value={action.id}>
                          {action.label}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Updates">
                      {actionOptions.filter(a => a.category === 'update').map(action => (
                        <option key={action.id} value={action.id}>
                          {action.label}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Integrations">
                      {actionOptions.filter(a => a.category === 'integration').map(action => (
                        <option key={action.id} value={action.id}>
                          {action.label}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                
                {selectedAction && (
                  <button
                    onClick={() => addAction(selectedAction)}
                    className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] flex items-center"
                  >
                    <Plus size={16} className="mr-2" /> Add Action
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Review Step */}
          {step === 'review' && (
            <div className="space-y-6">
              <p className="text-neutral-400 text-sm">Review your workflow before saving</p>
              
              <div className="space-y-4 mt-4">
                <div className="p-4 bg-neutral-700/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Basic Information</h4>
                  <div className="flex flex-col space-y-1.5 mb-4">
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 w-32">Name:</span>
                      <span className="text-sm text-white">{workflow.name}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm text-neutral-500 w-32">Description:</span>
                      <span className="text-sm text-white">{workflow.description}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-neutral-500 w-32">Icon:</span>
                      <div className="p-2 bg-neutral-700/50 rounded-lg">
                        {workflow.icon === 'mail' && <Mail size={20} className="text-[#80BDCA]" />}
                        {workflow.icon === 'clock' && <Clock size={20} className="text-[#80BDCA]" />}
                        {workflow.icon === 'user-check' && <UserCheck size={20} className="text-[#80BDCA]" />}
                        {workflow.icon === 'alert' && <AlertTriangle size={20} className="text-[#80BDCA]" />}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-700/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Triggers</h4>
                  <div className="space-y-2">
                    {workflow.triggers.map((trigger, index) => {
                      const triggerDetails = getTriggerById(trigger.id);
                      return triggerDetails ? (
                        <div key={index} className="flex items-center">
                          <div className="p-1 bg-neutral-700/50 rounded-lg mr-2.5">
                            {triggerDetails.icon}
                          </div>
                          <span className="text-sm text-white">{triggerDetails.label}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="p-4 bg-neutral-700/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Actions</h4>
                  <div className="space-y-2">
                    {workflow.actions.map((action, index) => {
                      const actionDetails = getActionById(action.id);
                      return actionDetails ? (
                        <div key={index} className="flex items-center">
                          <div className="p-1 bg-neutral-700/50 rounded-lg mr-2.5">
                            {actionDetails.icon}
                          </div>
                          <span className="text-sm text-white">{actionDetails.label}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-between p-6 border-t border-neutral-700">
          {step === 'info' ? (
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={goToPreviousStep}
              className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600"
            >
              Previous
            </button>
          )}
          
          {step === 'review' ? (
            <button
              onClick={saveWorkflow}
              className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1D4E5F]"
              disabled={!canProceed()}
            >
              Save Workflow
            </button>
          ) : (
            <button
              onClick={goToNextStep}
              className="px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1D4E5F]"
              disabled={!canProceed()}
            >
              Next Step
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}