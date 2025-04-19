// components/CreateWorkflowModal.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Zap, PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

export default function CreateWorkflowModal({ isOpen, onClose }) {
  const [workflow, setWorkflow] = useState({
    name: '',
    description: '',
    triggers: [{ type: 'event', value: 'New application received' }],
    actions: [{ type: 'email', value: 'Send follow-up email' }],
    status: 'active'
  })
  
  const [triggerExpanded, setTriggerExpanded] = useState(true)
  const [actionExpanded, setActionExpanded] = useState(true)
  
  const modalRef = useRef(null)
  const initialFocusRef = useRef(null)

  // Available trigger types
  const triggerTypes = [
    { id: 'event', label: 'Event Based' },
    { id: 'schedule', label: 'Scheduled' },
    { id: 'status', label: 'Status Changed' },
    { id: 'manual', label: 'Manual Trigger' }
  ]
  
  // Available trigger values based on type
  const triggerValues = {
    'event': [
      'New application received', 
      'Document uploaded',
      'Candidate created',
      'Position opened'
    ],
    'schedule': [
      'Daily at 9:00 AM',
      'Weekly on Monday',
      'Monthly on the 1st',
      'Custom schedule'
    ],
    'status': [
      'Candidate status changed to "Interviewing"',
      'Candidate status changed to "Hired"',
      'Candidate status changed to "Rejected"',
      'Position status changed to "Filled"'
    ],
    'manual': [
      'Button clicked',
      'Form submitted'
    ]
  }
  
  // Available action types
  const actionTypes = [
    { id: 'email', label: 'Send Email' },
    { id: 'notification', label: 'Send Notification' },
    { id: 'task', label: 'Create Task' },
    { id: 'update', label: 'Update Record' },
    { id: 'api', label: 'API Call' }
  ]
  
  // Available action values based on type
  const actionValues = {
    'email': [
      'Send follow-up email',
      'Send interview invitation',
      'Send rejection email',
      'Send offer letter'
    ],
    'notification': [
      'Notify hiring manager',
      'Notify recruiter',
      'Notify team members',
      'Notify candidate'
    ],
    'task': [
      'Create review task',
      'Create interview preparation task',
      'Create onboarding task',
      'Create feedback submission task'
    ],
    'update': [
      'Update candidate status',
      'Update position details',
      'Update interview schedule',
      'Update hiring process'
    ],
    'api': [
      'Post to job board',
      'Sync with HRIS',
      'Send data to analytics',
      'Update external calendar'
    ]
  }

  useEffect(() => {
    function handleEscape(e) {
      if (e.key === 'Escape') onClose()
    }
    
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent scrolling of the body when modal is open
      document.body.style.overflow = 'hidden'
      // Set focus to the first input when modal opens
      setTimeout(() => {
        if (initialFocusRef.current) initialFocusRef.current.focus()
      }, 0)
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  const handleChange = (e) => {
    const { name, value } = e.target
    setWorkflow(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTriggerTypeChange = (index, value) => {
    const newTriggers = [...workflow.triggers]
    newTriggers[index] = {
      ...newTriggers[index],
      type: value,
      value: triggerValues[value][0]
    }
    setWorkflow(prev => ({
      ...prev,
      triggers: newTriggers
    }))
  }

  const handleTriggerValueChange = (index, value) => {
    const newTriggers = [...workflow.triggers]
    newTriggers[index] = {
      ...newTriggers[index],
      value: value
    }
    setWorkflow(prev => ({
      ...prev,
      triggers: newTriggers
    }))
  }

  const handleActionTypeChange = (index, value) => {
    const newActions = [...workflow.actions]
    newActions[index] = {
      ...newActions[index],
      type: value,
      value: actionValues[value][0]
    }
    setWorkflow(prev => ({
      ...prev,
      actions: newActions
    }))
  }

  const handleActionValueChange = (index, value) => {
    const newActions = [...workflow.actions]
    newActions[index] = {
      ...newActions[index],
      value: value
    }
    setWorkflow(prev => ({
      ...prev,
      actions: newActions
    }))
  }

  const addTrigger = () => {
    setWorkflow(prev => ({
      ...prev,
      triggers: [
        ...prev.triggers,
        { type: 'event', value: triggerValues['event'][0] }
      ]
    }))
  }

  const removeTrigger = (index) => {
    if (workflow.triggers.length === 1) return
    const newTriggers = [...workflow.triggers]
    newTriggers.splice(index, 1)
    setWorkflow(prev => ({
      ...prev,
      triggers: newTriggers
    }))
  }

  const addAction = () => {
    setWorkflow(prev => ({
      ...prev,
      actions: [
        ...prev.actions,
        { type: 'email', value: actionValues['email'][0] }
      ]
    }))
  }

  const removeAction = (index) => {
    if (workflow.actions.length === 1) return
    const newActions = [...workflow.actions]
    newActions.splice(index, 1)
    setWorkflow(prev => ({
      ...prev,
      actions: newActions
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newWorkflow = {
      ...workflow,
      id: Date.now(),
      lastRun: 'Never',
      runCount: 0,
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
    
    onClose(newWorkflow)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--card)] rounded-lg shadow-xl border border-[var(--border)]"
      >
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-[var(--primary-light)] flex items-center justify-center text-[var(--primary-foreground)] mr-3">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Create New Workflow</h2>
          </div>
          <button 
            onClick={() => onClose()}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[var(--secondary)] transition-colors"
          >
            <X className="h-5 w-5 text-[var(--muted-foreground)]" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Workflow Details */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Workflow Name*
                </label>
                <input
                  ref={initialFocusRef}
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={workflow.name}
                  onChange={handleChange}
                  placeholder="e.g. New Application Follow-up"
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="2"
                  value={workflow.description}
                  onChange={handleChange}
                  placeholder="Describe what this workflow does"
                  className="block w-full rounded-lg border border-[var(--border)] py-3 px-3 bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
            </div>

            {/* Triggers Section */}
            <div className="border border-[var(--border)] rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 bg-[var(--secondary)] cursor-pointer"
                onClick={() => setTriggerExpanded(!triggerExpanded)}
              >
                <div className="flex items-center">
                  <h3 className="text-[var(--foreground)] font-medium">Triggers</h3>
                  <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs rounded-full px-2 py-0.5 ml-2">
                    {workflow.triggers.length}
                  </span>
                </div>
                <button type="button">
                  {triggerExpanded ? 
                    <ChevronUp className="h-5 w-5 text-[var(--muted-foreground)]" /> : 
                    <ChevronDown className="h-5 w-5 text-[var(--muted-foreground)]" />
                  }
                </button>
              </div>
              
              {triggerExpanded && (
                <div className="p-4 space-y-4">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Define what will start this workflow
                  </p>
                  
                  {workflow.triggers.map((trigger, index) => (
                    <div key={index} className="flex items-start space-x-3 pt-3">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-[var(--muted-foreground)] mb-1">
                            Trigger Type
                          </label>
                          <select
                            value={trigger.type}
                            onChange={(e) => handleTriggerTypeChange(index, e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] py-2 px-3 bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                          >
                            {triggerTypes.map(type => (
                              <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-[var(--muted-foreground)] mb-1">
                            Trigger Event
                          </label>
                          <select
                            value={trigger.value}
                            onChange={(e) => handleTriggerValueChange(index, e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] py-2 px-3 bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                          >
                            {triggerValues[trigger.type].map(value => (
                              <option key={value} value={value}>{value}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeTrigger(index)}
                        className="mt-6 text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                        disabled={workflow.triggers.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addTrigger}
                    className="mt-2 flex items-center text-[var(--primary)] hover:text-[var(--primary-light)] text-sm transition-colors"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Another Trigger
                  </button>
                </div>
              )}
            </div>

            {/* Actions Section */}
            <div className="border border-[var(--border)] rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 bg-[var(--secondary)] cursor-pointer"
                onClick={() => setActionExpanded(!actionExpanded)}
              >
                <div className="flex items-center">
                  <h3 className="text-[var(--foreground)] font-medium">Actions</h3>
                  <span className="bg-[var(--primary)] text-[var(--primary-foreground)] text-xs rounded-full px-2 py-0.5 ml-2">
                    {workflow.actions.length}
                  </span>
                </div>
                <button type="button">
                  {actionExpanded ? 
                    <ChevronUp className="h-5 w-5 text-[var(--muted-foreground)]" /> : 
                    <ChevronDown className="h-5 w-5 text-[var(--muted-foreground)]" />
                  }
                </button>
              </div>
              
              {actionExpanded && (
                <div className="p-4 space-y-4">
                  <p className="text-sm text-[var(--muted-foreground)]">
                    Define what actions to take when the workflow runs
                  </p>
                  
                  {workflow.actions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 pt-3">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-[var(--muted-foreground)] mb-1">
                            Action Type
                          </label>
                          <select
                            value={action.type}
                            onChange={(e) => handleActionTypeChange(index, e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] py-2 px-3 bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                          >
                            {actionTypes.map(type => (
                              <option key={type.id} value={type.id}>{type.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-[var(--muted-foreground)] mb-1">
                            Action Details
                          </label>
                          <select
                            value={action.value}
                            onChange={(e) => handleActionValueChange(index, e.target.value)}
                            className="w-full rounded-lg border border-[var(--border)] py-2 px-3 bg-[var(--background)] text-[var(--foreground)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                          >
                            {actionValues[action.type].map(value => (
                              <option key={value} value={value}>{value}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeAction(index)}
                        className="mt-6 text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                        disabled={workflow.actions.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addAction}
                    className="mt-2 flex items-center text-[var(--primary)] hover:text-[var(--primary-light)] text-sm transition-colors"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Another Action
                  </button>
                </div>
              )}
            </div>
            
            {/* Workflow Status */}
            <div className="flex items-start space-x-3">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="active" 
                      checked={workflow.status === 'active'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[var(--primary)] border-[var(--border)] focus:ring-[var(--ring)]" 
                    />
                    <span className="ml-2 text-sm text-[var(--foreground)]">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="status" 
                      value="inactive" 
                      checked={workflow.status === 'inactive'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[var(--primary)] border-[var(--border)] focus:ring-[var(--ring)]" 
                    />
                    <span className="ml-2 text-sm text-[var(--foreground)]">Inactive</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end p-6 border-t border-[var(--border)] bg-[var(--secondary)]">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted-foreground)] transition-colors mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
            >
              Create Workflow
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}