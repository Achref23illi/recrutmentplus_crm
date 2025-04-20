// app/ai-assistant/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  FileText,
  Users,
  Slack,
  Mail,
  Send
} from 'lucide-react'

const tools = [
  { id: 'resume', name: 'Resume Analysis', icon: <FileText size={20} /> },
  { id: 'matching', name: 'Candidate Matching', icon: <Users size={20} /> },
  { id: 'questions', name: 'Interview Questions', icon: <Slack size={20} /> },
  { id: 'email', name: 'Email Templates', icon: <Mail size={20} /> },
]

export default function AIAssistantPage() {
  const [activeTool, setActiveTool] = useState(tools[0].id)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState<string | null>(null)

  const handleRun = () => {
    // TODO: call AI API based on activeTool and prompt
    setResponse(`(This is a mock response for "${activeTool}" with prompt: "${prompt}")`)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">AI Assistant</h2>

      {/* Tool selector */}
      <div className="flex space-x-4">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`flex items-center px-4 py-2 rounded-lg transition ${
              activeTool === tool.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tool.icon}
            <span className="ml-2">{tool.name}</span>
          </button>
        ))}
      </div>

      {/* Prompt & run */}
      <Card>
        <textarea
          rows={4}
          placeholder={`Enter prompt for ${tools.find(t => t.id === activeTool)?.name}…`}
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRun}
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Send className="mr-2" size={16} /> Run
        </button>
      </Card>

      {/* Response */}
      {response && (
        <Card>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Response</h3>
          <p className="whitespace-pre-wrap text-gray-700">{response}</p>
        </Card>
      )}
    </div>
  )
}
