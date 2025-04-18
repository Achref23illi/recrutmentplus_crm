// app/ai-assistant/page.jsx
'use client'

import { useState } from 'react'
import { FileText, Users, Edit3, Mail } from 'lucide-react'
import ToolCard from '../../components/ToolCard'

export default function AIAssistantPage() {
  const tools = [
    { id: 'resume',    title: 'Resume Analysis',    icon: FileText },
    { id: 'matching',  title: 'Candidate Matching',  icon: Users    },
    { id: 'questions', title: 'Interview Questions', icon: Edit3    },
    { id: 'emails',    title: 'Email Templates',     icon: Mail     },
  ]

  const [messages, setMessages] = useState([
    { sender: 'ai',   text: 'Hello! How can I assist you today?' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return

    // Append user message
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: input },
      { sender: 'ai',   text: 'Thinking…' },
    ])
    setInput('')

    // TODO: call your backend here and replace the placeholder
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>

      {/* Tool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} title={tool.title} icon={tool.icon} />
        ))}
      </div>

      {/* Chat panel */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`inline-block px-4 py-2 rounded-lg max-w-[70%] ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
