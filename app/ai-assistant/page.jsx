// app/ai-assistant/page.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Send, Mic, FileText, MoreHorizontal, Paperclip,
  PlusCircle, Trash2, Save, AlertCircle, Bot, Sparkles,
  GraduationCap, MessageSquare, RefreshCw
} from 'lucide-react'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello, I'm your recruitment assistant. How can I help you today?",
      timestamp: new Date(Date.now() - 60000).toISOString()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activePrompt, setActivePrompt] = useState(null)
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Sample prompts
  const suggestedPrompts = [
    {
      id: 1,
      title: 'Create job description',
      icon: FileText,
      prompt: 'Help me create a detailed job description for a Senior Frontend Developer position.'
    },
    {
      id: 2,
      title: 'Draft rejection email',
      icon: MessageSquare,
      prompt: 'Draft a polite rejection email for candidates who didn\'t pass the initial interview.'
    },
    {
      id: 3,
      title: 'Interview questions',
      icon: GraduationCap,
      prompt: 'Suggest 10 technical interview questions for a Full Stack Developer position.'
    },
    {
      id: 4,
      title: 'Analyze resume',
      icon: Sparkles,
      prompt: 'Here\'s a resume. Can you analyze it and highlight key skills and experience?'
    }
  ]

  // Sample saved prompts
  const savedPrompts = [
    {
      id: 'saved-1',
      title: 'Onboarding checklist',
      prompt: 'Generate a comprehensive onboarding checklist for new hires in the engineering department.'
    },
    {
      id: 'saved-2',
      title: 'Performance review template',
      prompt: 'Create a template for conducting a 6-month performance review.'
    }
  ]

  // Handle message submission
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    }
    setMessages([...messages, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  // Generate a mock response based on the input
  const generateResponse = (input) => {
    // This is just a simple mock response function
    if (input.toLowerCase().includes('job description')) {
      return `Here's a draft job description for a Senior Frontend Developer:\n\n**Senior Frontend Developer**\n\nWe're looking for an experienced Frontend Developer to join our team. You'll work on building responsive web applications using modern JavaScript frameworks.\n\n**Requirements:**\n- 5+ years of experience with React, Vue.js or Angular\n- Strong TypeScript skills\n- Experience with responsive design and CSS frameworks\n- Familiarity with agile development methodologies\n\nWould you like me to expand on any section or add more details?`;
    } else if (input.toLowerCase().includes('interview questions')) {
      return "Here are some technical interview questions for a Full Stack Developer:\n\n1. Explain the difference between REST and GraphQL APIs.\n2. How do you handle state management in React applications?\n3. Describe your experience with database optimization.\n4. How would you implement authentication in a web application?\n5. Explain the concept of microservices architecture.\n\nWould you like more questions or specific questions about certain technologies?";
    } else if (input.toLowerCase().includes('rejection')) {
      return "Here's a draft rejection email:\n\nDear [Candidate Name],\n\nThank you for your interest in the [Position] role at [Company Name] and for taking the time to interview with our team.\n\nAfter careful consideration, we have decided to proceed with other candidates whose qualifications more closely match our current needs. We appreciate your time and interest in our company.\n\nWe encourage you to apply for future positions that match your skills and experience.\n\nBest regards,\n[Your Name]\n[Your Title]\n[Company Name]";
    } else {
      return "I understand you're asking about " + input + ". How can I help you specifically with this recruitment task? I can assist with job descriptions, interview questions, candidate evaluations, and more.";
    }
  }

  // Format timestamps
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Use suggested prompt
  const useSuggestedPrompt = (prompt) => {
    setInputValue(prompt)
    setActivePrompt(null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex flex-col space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">AI Assistant</h1>
          <button className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors">
            <RefreshCw className="mr-2 h-4 w-4" />
            <span>New Chat</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Your AI-powered recruitment assistant
        </p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex flex-col flex-1 bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft mr-0 md:mr-4 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === 'user' 
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' 
                      : 'bg-[var(--secondary)] text-[var(--foreground)]'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center mb-2">
                      <div className="h-6 w-6 rounded-full bg-[var(--primary)] flex items-center justify-center mr-2">
                        <Bot className="h-3.5 w-3.5 text-[var(--primary-foreground)]" />
                      </div>
                      <span className="font-medium">AI Assistant</span>
                      <span className="ml-2 text-xs opacity-80">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {message.role === 'user' && (
                    <div className="flex justify-end mt-1">
                      <span className="text-xs opacity-80">{formatTime(message.timestamp)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-3 bg-[var(--secondary)] text-[var(--foreground)]">
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 rounded-full bg-[var(--primary)] flex items-center justify-center mr-2">
                      <Bot className="h-3.5 w-3.5 text-[var(--primary-foreground)]" />
                    </div>
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[var(--primary)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions - Show when no messages or after AI response */}
          {(messages.length === 1 || (messages.length > 1 && messages[messages.length - 1].role === 'assistant' && !isLoading)) && (
            <div className="p-4 border-t border-[var(--border)]">
              <h3 className="text-sm font-medium text-[var(--foreground)] mb-3">Suggested prompts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => useSuggestedPrompt(prompt.prompt)}
                    className="text-left flex items-start p-3 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] hover:bg-[var(--secondary)] transition-colors"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[var(--primary)] bg-opacity-10 flex items-center justify-center mr-3 text-[var(--primary)] flex-shrink-0">
                      <prompt.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[var(--foreground)]">{prompt.title}</h4>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mt-0.5">{prompt.prompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-[var(--border)] p-4">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about recruitment..."
                className="w-full pl-4 pr-20 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button 
                  type="button"
                  className="p-1.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <button 
                  type="button"
                  className="p-1.5 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button 
                  type="submit"
                  className="p-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
            
            <div className="mt-2 text-center">
              <span className="text-xs text-[var(--muted-foreground)]">
                AI may produce inaccurate information. Consider verifying important information.
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar - Saved Prompts */}
        <div className="hidden md:block w-72 bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft overflow-hidden">
          <div className="p-4 border-b border-[var(--border)]">
            <h2 className="text-lg font-medium text-[var(--foreground)]">Saved Prompts</h2>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              {savedPrompts.map((saved) => (
                <div 
                  key={saved.id}
                  className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                  onClick={() => useSuggestedPrompt(saved.prompt)}
                >
                  <h3 className="text-sm font-medium text-[var(--foreground)]">{saved.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">{saved.prompt}</p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button className="flex items-center justify-center w-full py-2 border border-dashed border-[var(--border)] rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)] transition-colors">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span className="text-sm">Save current prompt</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium text-[var(--foreground)]">AI Assistant Tips</h3>
              
              <div className="p-3 bg-[var(--secondary)] rounded-lg text-xs">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-[var(--primary)] mr-2 mt-0.5" />
                  <p className="text-[var(--foreground)]">Be specific with your questions for better responses.</p>
                </div>
              </div>
              
              <div className="p-3 bg-[var(--secondary)] rounded-lg text-xs">
                <div className="flex items-start">
                  <Sparkles className="h-4 w-4 text-[var(--primary)] mr-2 mt-0.5" />
                  <p className="text-[var(--foreground)]">Ask for specific formats if you need structured data like job descriptions or interview questions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
