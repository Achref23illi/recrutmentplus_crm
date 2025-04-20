// app/automation/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'

interface Workflow {
  id: string
  name: string
  description: string
  enabled: boolean
}

const initialWorkflows: Workflow[] = [
  {
    id: 'wf1',
    name: 'New Application Notification',
    description: 'Email recruiter when a new candidate applies.',
    enabled: true,
  },
  {
    id: 'wf2',
    name: 'Interview Reminder',
    description: 'Send reminder 24h before interview.',
    enabled: false,
  },
  {
    id: 'wf3',
    name: 'Client Follow-Up',
    description: 'Ping client if awaiting decision for >7 days.',
    enabled: true,
  },
  {
    id: 'wf4',
    name: 'Task Deadline Reminder',
    description: 'Notify responsible user 1 day before task due.',
    enabled: false,
  },
]

export default function AutomationPage() {
  const [workflows, setWorkflows] = useState(initialWorkflows)

  const toggle = (id: string) => {
    setWorkflows(wfs =>
      wfs.map(w =>
        w.id === id ? { ...w, enabled: !w.enabled } : w
      )
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Automation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map(wf => (
          <Card key={wf.id} className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-800">{wf.name}</h3>
              <p className="text-sm text-gray-500">{wf.description}</p>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <label>
                <span className="sr-only">{`Toggle ${wf.name}`}</span>
                <input
                  type="checkbox"
                  checked={wf.enabled}
                  onChange={() => toggle(wf.id)}
                  className="sr-only"
                  title={`Toggle ${wf.name}`}
                />
              </label>
              <span
                className={`w-11 h-6 rounded-full transition-colors ${
                  wf.enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    wf.enabled ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </span>
            </label>
          </Card>
        ))}
      </div>
    </div>
  )
}
