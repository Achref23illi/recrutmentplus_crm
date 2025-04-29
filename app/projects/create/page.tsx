'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  CalendarClock,
  GripVertical,
  Check,
  X,
  //UserCircle2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

// Types definition
interface Task {
  id: string
  text: string
  completed: boolean
  assignee?: string
  dueDate?: string
}

interface TeamMember {
  id: string
  name: string
  avatar?: string
  role: string
}

// Sample team members data
const sampleTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Peterson', role: 'Senior Recruiter' },
  { id: '2', name: 'Emma Thompson', role: 'HR Manager' },
  { id: '3', name: 'Michael Chen', role: 'Technical Recruiter' },
  { id: '4', name: 'Sarah Williams', role: 'Talent Acquisition' },
  { id: '5', name: 'Robert Garcia', role: 'HR Specialist' },
]

export default function CreateProjectPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Define job requirements', completed: false },
    { id: '2', text: 'Create job posting', completed: false },
    { id: '3', text: 'Schedule interviews', completed: false },
  ])
  const [newTask, setNewTask] = useState('')
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([])
  const [taskInEdit, setTaskInEdit] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: `task-${Date.now()}`,
        text: newTask.trim(),
        completed: false
      }])
      setNewTask('')
    }
  }

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  // Start editing a task
  const startEditTask = (task: Task) => {
    setTaskInEdit(task.id)
    setEditText(task.text)
  }

  // Save edited task
  const saveEditTask = () => {
    if (taskInEdit && editText.trim()) {
      setTasks(tasks.map(task => 
        task.id === taskInEdit ? { ...task, text: editText.trim() } : task
      ))
      setTaskInEdit(null)
    }
  }

  // Cancel editing task
  const cancelEditTask = () => {
    setTaskInEdit(null)
  }

  // Toggle assignee selection
  const toggleAssignee = (memberId: string) => {
    setSelectedAssignees(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    )
  }

  // Get assignee name by id
  const getAssigneeName = (id: string) => {
    const member = sampleTeamMembers.find(member => member.id === id)
    return member ? member.name : ''
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would save to backend
    console.log({
      title,
      description,
      dueDate,
      tasks,
      assignees: selectedAssignees.map(id => sampleTeamMembers.find(m => m.id === id))
    })
    
    // Navigate back to projects
    router.push('/projects')
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/projects" className="p-2 rounded-lg hover:bg-neutral-800 mr-2">
            <ArrowLeft size={20} className="text-neutral-400" />
          </Link>
          <h1 className="text-2xl font-bold text-[#80BDCA]">Create New Project</h1>
        </div>
        <button 
          onClick={handleSubmit}
          disabled={!title.trim()} 
          className={`inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg transition ${!title.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#123040]'}`}
        >
          <Save className="mr-2" size={18} /> Save Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="bg-neutral-800 border-none shadow-md">
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Project Title"
                  className="w-full bg-transparent border-none text-2xl font-semibold text-white placeholder-neutral-500 focus:outline-none focus:ring-0"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the recruitment project..."
                  className="w-full border border-neutral-700 bg-neutral-900 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">Due Date</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
                    <CalendarClock size={18} />
                  </div>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-neutral-700 bg-neutral-900 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                  />
                </div>
              </div>

              {/* Tasks Section */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tasks</h3>
                <div className="space-y-1 mb-4">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className="flex items-center p-3 rounded-lg border border-neutral-700 bg-neutral-700/20 group"
                    >
                      <div className="cursor-move text-neutral-500">
                        <GripVertical size={18} />
                      </div>
                      
                      <div 
                        className={`flex-shrink-0 h-5 w-5 rounded border cursor-pointer ml-2 flex items-center justify-center ${
                          task.completed 
                            ? 'bg-[#37A794] border-[#37A794]' 
                            : 'border-neutral-500 hover:border-[#80BDCA]'
                        }`}
                        onClick={() => toggleTaskCompletion(task.id)}
                      >
                        {task.completed && <Check size={14} className="text-white" />}
                      </div>
                      
                      <div className="ml-3 flex-1">
                        {taskInEdit === task.id ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full bg-neutral-800 border border-[#1D4E5F] rounded py-1 px-2 text-white focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && saveEditTask()}
                          />
                        ) : (
                          <span 
                            className={`text-sm ${task.completed ? 'line-through text-neutral-500' : 'text-white'}`}
                            onClick={() => startEditTask(task)}
                          >
                            {task.text}
                          </span>
                        )}
                      </div>
                      
                      {taskInEdit === task.id ? (
                        <div className="flex space-x-2">
                          <button 
                            onClick={saveEditTask}
                            className="p-1 text-[#80BDCA] hover:text-[#37A794] hover:bg-neutral-700 rounded"
                          >
                            <Check size={18} />
                          </button>
                          <button 
                            onClick={cancelEditTask}
                            className="p-1 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-neutral-400 hover:text-red-400 hover:bg-neutral-700 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Task Input */}
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a task..."
                    className="flex-1 border border-neutral-700 bg-neutral-900 rounded-lg rounded-r-none px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1D4E5F]"
                    onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  />
                  <button
                    onClick={addTask}
                    disabled={!newTask.trim()}
                    className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg rounded-l-none border border-neutral-700"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - Team Assignment */}
        <div>
          <Card className="bg-neutral-800 border-none shadow-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Assign Team Members</h3>
              
              {/* Selected Assignees */}
              {selectedAssignees.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-400 mb-2">Selected ({selectedAssignees.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignees.map(id => (
                      <div 
                        key={id}
                        className="inline-flex items-center bg-[#1D4E5F]/20 text-[#80BDCA] rounded-lg pl-2 pr-1 py-1"
                      >
                        <div className="h-6 w-6 rounded-full bg-[#1D4E5F]/60 text-[#80BDCA] flex items-center justify-center text-xs font-medium mr-1">
                          {getInitials(getAssigneeName(id))}
                        </div>
                        <span className="text-xs font-medium mr-1">{getAssigneeName(id)}</span>
                        <button 
                          onClick={() => toggleAssignee(id)}
                          className="p-1 hover:bg-[#1D4E5F]/30 rounded-full"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members List */}
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-neutral-400 mb-2">Team Members</h4>
                {sampleTeamMembers.map(member => (
                  <div 
                    key={member.id}
                    onClick={() => toggleAssignee(member.id)}
                    className={`flex items-center p-2 rounded-lg cursor-pointer ${
                      selectedAssignees.includes(member.id)
                        ? 'bg-[#1D4E5F]/20 border border-[#1D4E5F]/30'
                        : 'hover:bg-neutral-700/30'
                    }`}
                  >
                    <div className="h-8 w-8 rounded-full bg-[#1D4E5F]/40 text-[#80BDCA] flex items-center justify-center text-sm font-medium">
                      {getInitials(member.name)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{member.name}</p>
                      <p className="text-xs text-neutral-400">{member.role}</p>
                    </div>
                    {selectedAssignees.includes(member.id) && (
                      <div className="ml-auto bg-[#1D4E5F] rounded-full p-0.5">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}