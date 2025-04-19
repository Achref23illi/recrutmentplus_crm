// app/calendar/page.jsx
'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Video } from 'lucide-react'
import AddEventModal from '../../components/AddEventModal'

export default function CalendarPage() {
  // Sample current date (April 2025)
  const [currentMonth, setCurrentMonth] = useState(3) // 0-indexed, so 3 is April
  const [currentYear, setCurrentYear] = useState(2025)
  const [view, setView] = useState('month') // 'month', 'week', 'day'
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false)
  
  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ]
  
  // Day names for display
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Calculate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  
  // Calculate first day of month (0 = Sunday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  
  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Interview with Michael Chen',
      date: new Date(2025, 3, 15, 10, 0), // April 15, 2025 at 10:00
      endDate: new Date(2025, 3, 15, 11, 0),
      type: 'interview',
      location: 'Conference Room A',
      attendees: ['Sarah Johnson', 'David Miller'],
      description: 'First round technical interview for Frontend Developer position',
    },
    {
      id: 2,
      title: 'Team Sync Meeting',
      date: new Date(2025, 3, 15, 14, 0), // April 15, 2025 at 14:00
      endDate: new Date(2025, 3, 15, 15, 0),
      type: 'meeting',
      location: 'Zoom',
      attendees: ['Recruitment Team'],
      description: 'Weekly recruitment team sync up',
    },
    {
      id: 3,
      title: 'Call with Jessica Reynolds',
      date: new Date(2025, 3, 18, 11, 30), // April 18, 2025 at 11:30
      endDate: new Date(2025, 3, 18, 12, 0),
      type: 'call',
      location: 'Phone',
      attendees: ['Sarah Johnson'],
      description: 'Discuss UX Designer role and salary expectations',
    },
    {
      id: 4,
      title: 'Interview with Thomas Wilson',
      date: new Date(2025, 3, 20, 13, 0), // April 20, 2025 at 13:00
      endDate: new Date(2025, 3, 20, 14, 30),
      type: 'interview',
      location: 'Conference Room B',
      attendees: ['Sarah Johnson', 'Marketing Manager'],
      description: 'Second round interview for Marketing Specialist position',
    },
    {
      id: 5,
      title: 'Onboarding prep for new hires',
      date: new Date(2025, 3, 22, 9, 0), // April 22, 2025 at 9:00
      endDate: new Date(2025, 3, 22, 10, 30),
      type: 'task',
      location: 'HR Office',
      attendees: ['Sarah Johnson', 'HR Assistant'],
      description: 'Prepare onboarding materials for next week\'s new hires',
    }
  ])

  // Function to check if a date has events
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.getDate() === date && 
      event.date.getMonth() === currentMonth && 
      event.date.getFullYear() === currentYear
    )
  }

  // Event type styles
  const getEventTypeStyles = (type) => {
    switch(type) {
      case 'interview':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'meeting':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'call':
        return 'bg-amber-100 border-amber-300 text-amber-800';
      case 'task':
        return 'bg-emerald-100 border-emerald-300 text-emerald-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  }

  // Function to handle month navigation
  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  // Format time to 12-hour format
  const formatTime = (date) => {
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    
    return `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`
  }

  // Handle adding a new event from the modal
  const handleAddEvent = (newEvent) => {
    if (newEvent) {
      setEvents(prevEvents => [...prevEvents, newEvent])
    }
    setIsAddEventModalOpen(false)
  }

  // Generate calendar days array
  const generateCalendarDays = () => {
    const days = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }
  
  const calendarDays = generateCalendarDays()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--foreground)]">Calendar</h1>
          <button 
            onClick={() => setIsAddEventModalOpen(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors"
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>Add Event</span>
          </button>
        </div>
        <p className="text-[var(--muted-foreground)]">
          Manage your recruitment schedule and appointments
        </p>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 rounded-full bg-[var(--secondary)] hover:bg-[var(--muted)] transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-[var(--foreground)]" />
          </button>
          
          <h2 className="text-xl font-medium text-[var(--foreground)]">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 rounded-full bg-[var(--secondary)] hover:bg-[var(--muted)] transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-[var(--foreground)]" />
          </button>
        </div>
        
        <div className="flex bg-[var(--secondary)] p-1 rounded-lg">
          {['month', 'week', 'day'].map((v) => (
            <button
              key={v}
              className={`px-4 py-1 text-sm rounded-md transition-colors capitalize ${
                view === v
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'hover:bg-[var(--muted)] text-[var(--foreground)]'
              }`}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Month Calendar View */}
      {view === 'month' && (
        <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft overflow-hidden">
          {/* Day names header */}
          <div className="grid grid-cols-7 bg-[var(--secondary)]">
            {dayNames.map((day, index) => (
              <div 
                key={day} 
                className={`p-2 text-center text-sm font-medium text-[var(--foreground)] ${
                  index === 0 || index === 6 ? 'text-[var(--muted-foreground)]' : ''
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 auto-rows-fr border-t border-[var(--border)]">
            {calendarDays.map((day, i) => {
              // Get events for this day
              const dayEvents = day ? getEventsForDate(day) : []
              
              // Check if it's today
              const isToday = day === 19 && currentMonth === 3 && currentYear === 2025
              
              // Weekend check
              const dayOfWeek = (firstDayOfMonth + (day || 0) - 1) % 7
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
              
              return (
                <div 
                  key={i}
                  className={`min-h-[120px] p-2 border-b border-r border-[var(--border)] ${
                    !day ? 'bg-[var(--secondary)] opacity-50' : 
                    isWeekend ? 'bg-[var(--background)]' : 'bg-[var(--card)]'
                  }`}
                >
                  {day && (
                    <>
                      <div className="flex items-center justify-between mb-1">
                        <span 
                          className={`h-7 w-7 flex items-center justify-center text-sm rounded-full ${
                            isToday ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-medium' : 
                            'text-[var(--foreground)]'
                          }`}
                        >
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs text-[var(--muted-foreground)]">{dayEvents.length} events</span>
                        )}
                      </div>
                      
                      <div className="space-y-1 overflow-y-auto max-h-[80px]">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div 
                            key={event.id}
                            className={`px-2 py-1 text-xs rounded border-l-2 truncate cursor-pointer ${getEventTypeStyles(event.type)}`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="text-xs opacity-80">{formatTime(event.date)}</div>
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-[var(--primary)] font-medium">
                            + {dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Upcoming Events Sidebar */}
      <div className="bg-[var(--card)] rounded-lg border border-[var(--border)] shadow-soft p-5">
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-4">Upcoming Events</h3>
        
        <div className="space-y-4">
          {events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 5)
            .map(event => (
              <div 
                key={event.id}
                className="border-l-4 rounded-r-lg px-4 py-3 bg-[var(--background)] hover:bg-[var(--muted)] transition-colors"
                style={{ borderLeftColor: event.type === 'interview' ? 'var(--blue-500)' : 
                                           event.type === 'meeting' ? 'var(--purple-500)' : 
                                           event.type === 'call' ? 'var(--amber-500)' : 
                                           'var(--emerald-500)' }}
              >
                <h4 className="font-medium text-[var(--foreground)]">{event.title}</h4>
                
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center text-[var(--muted-foreground)]">
                    <Clock className="h-3.5 w-3.5 mr-2" />
                    {formatTime(event.date)} - {formatTime(event.endDate)}
                    <span className="mx-2 text-xs">•</span>
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  
                  <div className="flex items-center text-[var(--muted-foreground)]">
                    {event.location.toLowerCase().includes('zoom') || event.location.toLowerCase().includes('phone') ? (
                      <Video className="h-3.5 w-3.5 mr-2" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5 mr-2" />
                    )}
                    {event.location}
                  </div>
                  
                  <div className="flex items-center text-[var(--muted-foreground)]">
                    <Users className="h-3.5 w-3.5 mr-2" />
                    {event.attendees.join(', ')}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={handleAddEvent}
      />
    </div>
  )
}
