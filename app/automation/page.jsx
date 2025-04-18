'use client'

import { useState } from 'react'
import { Zap } from 'lucide-react'
import Toggle from '../../components/Toggle'

export default function AutomationPage() {
  const workflows = [
    {
      id: 1,
      title: 'New Application Notification',
      desc: 'Email recruiters when a new candidate applies',
    },
    {
      id: 2,
      title: 'Interview Scheduler',
      desc: 'Auto-send calendar invites when an interview is booked',
    },
    {
      id: 3,
      title: 'Task Reminder',
      desc: 'Remind team about upcoming tasks and deadlines',
    },
    {
      id: 4,
      title: 'Follow‑Up Reminder',
      desc: 'Ping candidates to follow up post‑interview',
    },
  ]

  const [enabledMap, setEnabledMap] = useState(
    workflows.reduce((m, wf) => ({ ...m, [wf.id]: true }), {})
  )

  const toggle = (id) =>
    setEnabledMap((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Automations</h1>
        <div className="flex items-center text-gray-600 space-x-1">
          <Zap className="w-6 h-6" />
          <span className="text-sm">Manage your workflows</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="bg-white p-5 rounded-lg shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">{wf.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{wf.desc}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  enabledMap[wf.id] ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {enabledMap[wf.id] ? 'Enabled' : 'Disabled'}
              </span>
              <Toggle
                enabled={enabledMap[wf.id]}
                onChange={() => toggle(wf.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
