// app/calendar/page.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  List,
  Grid,
  MoreHorizontal
} from 'lucide-react'
import { AddEventModal } from './AddEventModal'
import { FilterDropdown } from './FilterDropdown'

// Sample calendar data
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sample events data
const initialEvents = [
  { id: 1, title: 'Interview with Emma Thompson', type: 'interview', date: '2025-04-20', time: '10:00 AM', duration: 60 },
  { id: 2, title: 'Client Meeting - TechCorp', type: 'meeting', date: '2025-04-20', time: '2:30 PM', duration: 45 },
  { id: 3, title: 'Screening Call - UI/UX Designer', type: 'screening', date: '2025-04-21', time: '9:15 AM', duration: 30 },
  { id: 4, title: 'Team Weekly Sync', type: 'internal', date: '2025-04-22', time: '11:00 AM', duration: 60 },
  { id: 5, title: 'Candidate Follow-up', type: 'followup', date: '2025-04-23', time: '3:00 PM', duration: 15 },
  { id: 6, title: 'Interview Panel - Senior Dev', type: 'interview', date: '2025-04-24', time: '1:00 PM', duration: 90 },
];

// Map filter IDs to actual values
const eventTypeIdToValue: Record<string, string> = {
  'type-interview': 'interview',
  'type-meeting': 'meeting',
  'type-screening': 'screening',
  'type-internal': 'internal',
  'type-followup': 'followup'
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 20)); // April 20, 2025
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleFilterChange = (filters: {
    eventTypes: string[];
    dateRange: {
      from: string;
      to: string;
    }
  }) => {
    // Apply filters to events
    const filtered = events.filter(event => {
      // Check event type filter
      if (filters.eventTypes.length > 0) {
        const typeValues = filters.eventTypes.map(id => eventTypeIdToValue[id]);
        if (!typeValues.includes(event.type)) {
          return false;
        }
      }
      
      // Check date range
      if (filters.dateRange.from && event.date < filters.dateRange.from) {
        return false;
      }
      
      if (filters.dateRange.to && event.date > filters.dateRange.to) {
        return false;
      }
      
      return true;
    });
    
    setFilteredEvents(filtered);
  };

  // Generate days for the current month view
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay();
    
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Previous month days to display
    const prevMonthDays = startingDayOfWeek;
    
    // Calculate days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();
    
    const days = [];
    
    // Add previous month days
    for (let i = 0; i < prevMonthDays; i++) {
      const day = daysInPrevMonth - prevMonthDays + i + 1;
      days.push({
        date: new Date(prevMonthYear, prevMonth, day),
        isCurrentMonth: false,
        hasEvents: false
      });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const hasEvents = filteredEvents.some(event => event.date === dateString);
      
      days.push({
        date,
        isCurrentMonth: true,
        isToday: i === 20, // Hardcoded for demo
        hasEvents
      });
    }
    
    // Add next month days to complete the grid
    const totalDaysToShow = 42; // 6 rows of 7 days
    const nextMonthDays = totalDaysToShow - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        date: new Date(nextMonthYear, nextMonth, i),
        isCurrentMonth: false,
        hasEvents: false
      });
    }
    
    return days;
  };
  
  const days = generateCalendarDays();
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const handleAddEvent = (eventData: { 
    title: string; 
    type: string; 
    date: string; 
    startTime: string;
    duration: number;
    description: string;
    attendees: string;
    location: string;
  }) => {
    // Format the time to match the existing format
    const hour = parseInt(eventData.startTime.split(':')[0]);
    const minute = parseInt(eventData.startTime.split(':')[1]);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedTime = `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
    
    // Create new event
    const newEvent = {
      id: events.length + 1,
      title: eventData.title,
      type: eventData.type,
      date: eventData.date,
      time: formattedTime,
      duration: eventData.duration
    };
    
    // Add event to state
    setEvents([...events, newEvent]);
  };
  
  return (
    <div className="space-y-8">
      {/* Page Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold text-[#80BDCA]">Calendar</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* View options */}
          <div className="flex p-1 bg-neutral-800 border border-neutral-700 rounded-lg">
            <button 
              onClick={() => setView('month')}
              className={`px-3 py-1.5 rounded-lg text-sm ${view === 'month' 
                ? 'bg-[#1D4E5F] text-white' 
                : 'text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <Grid size={16} className="inline mr-1.5" /> Month
            </button>
            <button 
              onClick={() => setView('week')}
              className={`px-3 py-1.5 rounded-lg text-sm ${view === 'week' 
                ? 'bg-[#1D4E5F] text-white' 
                : 'text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <List size={16} className="inline mr-1.5" /> Week
            </button>
          </div>
          
          <FilterDropdown onFilterChange={handleFilterChange} />
          
          <button
            onClick={() => setIsAddModalOpen(true)} 
            className="inline-flex items-center px-4 py-2 bg-[#1D4E5F] text-white rounded-lg hover:bg-[#123040] transition"
          >
            <Plus className="mr-2" size={16} /> New Event
          </button>
        </div>
      </div>

      {/* Calendar Container */}
      <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-5">
        {/* Calendar Header and Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button onClick={prevMonth} title="Previous Month" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            <h3 className="text-xl font-medium text-white mx-3">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={nextMonth} title="Next Month" className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg">
              <ChevronRight size={20} />
            </button>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 text-sm bg-neutral-700 text-white rounded-lg hover:bg-neutral-600">
            <CalendarIcon size={14} className="mr-1.5" /> Today
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border border-neutral-700 rounded-lg overflow-hidden">
          {/* Day headers */}
          {DAYS.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-neutral-400 bg-neutral-700/40 border-b border-neutral-700">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((day, index) => (
            <div 
              key={index} 
              className={`min-h-[100px] p-2 border-b border-r border-neutral-700 ${
                !day.isCurrentMonth 
                  ? 'bg-neutral-800/40 text-neutral-500' 
                  : day.isToday 
                    ? 'bg-[#1D4E5F]/10 relative after:absolute after:top-1 after:right-1 after:h-2 after:w-2 after:bg-[#1D4E5F] after:rounded-full' 
                    : 'bg-neutral-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className={day.isToday ? 'font-bold text-[#80BDCA]' : ''}>{day.date.getDate()}</span>
                {day.hasEvents && <span className="h-1.5 w-1.5 rounded-full bg-[#37A794]" />}
              </div>
              
              {/* Event indicators */}
              {day.hasEvents && day.isCurrentMonth && (
                <div className="mt-2 space-y-1">
                  {filteredEvents
                    .filter(event => event.date === day.date.toISOString().split('T')[0])
                    .slice(0, 2)
                    .map(event => (
                      <div 
                        key={event.id} 
                        className={`text-xs px-1.5 py-1 rounded truncate ${
                          event.type === 'interview' ? 'bg-[#1D4E5F]/20 text-[#80BDCA]' : 
                          event.type === 'meeting' ? 'bg-purple-900/30 text-purple-300' :
                          event.type === 'screening' ? 'bg-blue-900/30 text-blue-300' :
                          event.type === 'internal' ? 'bg-neutral-700/70 text-neutral-300' :
                          'bg-amber-900/30 text-amber-300'
                        }`}
                      >
                        {event.time} {event.title}
                      </div>
                    ))
                  }
                  
                  {filteredEvents.filter(event => event.date === day.date.toISOString().split('T')[0]).length > 2 && (
                    <div className="text-xs text-neutral-400 pl-1">
                      +{filteredEvents.filter(event => event.date === day.date.toISOString().split('T')[0]).length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
      
      {/* Today's Events */}
      <Card className="bg-neutral-800 border border-neutral-700 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-[#80BDCA]">Today&apos;s Schedule</h3>
          <div className="text-sm text-neutral-400">April 20, 2025</div>
        </div>
        
        <div className="space-y-3">
          {filteredEvents
            .filter(event => event.date === '2025-04-20')
            .map(event => (
              <div key={event.id} className="flex p-3 bg-neutral-700/30 rounded-lg border border-neutral-700 hover:border-[#1D4E5F]/40 transition-colors">
                <div className="w-16 text-right mr-4">
                  <div className="text-sm font-medium text-neutral-300">{event.time}</div>
                  <div className="text-xs text-neutral-400">{event.duration}m</div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{event.title}</div>
                  <div className="mt-1 flex items-center">
                    <span className={`inline-block h-2 w-2 rounded-full mr-2 ${
                      event.type === 'interview' ? 'bg-[#1D4E5F]' : 
                      event.type === 'meeting' ? 'bg-purple-500' :
                      event.type === 'screening' ? 'bg-blue-500' :
                      event.type === 'internal' ? 'bg-neutral-500' :
                      'bg-amber-500'
                    }`} />
                    <span className="text-xs text-neutral-400 capitalize">{event.type}</span>
                  </div>
                </div>
                <button title="More options" className="p-1 self-start text-neutral-400 hover:text-white hover:bg-neutral-700 rounded">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))
          }
        </div>
      </Card>

      {/* Add Event Modal */}
      <AddEventModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddEvent}
      />
    </div>
  )
}