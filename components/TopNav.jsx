// components/TopNav.jsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Bell, MessageCircle, ChevronDown, Search, Settings, LogOut, 
  User, Calendar, FileText, Mail, Phone, Check, Clock, Info, AlertCircle
} from 'lucide-react'

export default function TopNav() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  
  const notificationsRef = useRef(null)
  const messagesRef = useRef(null)
  const profileRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setMessagesOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Sample notifications
  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'New candidate applied for Frontend Developer',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'reminder',
      message: 'Interview with John Smith in 30 minutes',
      time: '25 min ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      message: 'Offer accepted by Emily Wilson',
      time: '1 hour ago',
      read: false
    },
    {
      id: 4,
      type: 'warning',
      message: 'Background check pending for 3 candidates',
      time: '2 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      message: 'Team meeting scheduled for tomorrow',
      time: '5 hours ago',
      read: true
    }
  ]

  // Sample messages
  const messages = [
    {
      id: 1,
      sender: 'Michael Chen',
      avatar: '/avatars/michael.jpg',
      message: 'When can we schedule the technical interview?',
      time: '10 min ago',
      read: false
    },
    {
      id: 2,
      sender: 'Jessica Reynolds',
      avatar: '/avatars/jessica.jpg',
      message: "I've reviewed the candidate profiles",
      time: '30 min ago',
      read: false
    },
    {
      id: 3,
      sender: 'Robert Taylor',
      avatar: '/avatars/robert.jpg',
      message: 'The new job posting is ready for review',
      time: '1 hour ago',
      read: false
    }
  ]

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'success':
        return <Check className="h-4 w-4 text-emerald-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />
      case 'reminder':
        return <Clock className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <header className="flex items-center justify-between py-3 px-6 bg-[var(--card)] border-b border-[var(--border)] shadow-soft">
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-[var(--muted-foreground)]" />
        </div>
        <input
          type="text"
          placeholder="Search candidates, companies, or tasks..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
        />
      </div>

      <div className="flex items-center space-x-5">
        {/* Notifications Dropdown */}
        <div className="relative" ref={notificationsRef}>
          <button 
            onClick={() => {
              setNotificationsOpen(!notificationsOpen)
              setMessagesOpen(false)
              setProfileOpen(false)
            }}
            className="flex items-center justify-center"
          >
            <Bell className="h-5 w-5 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-[var(--accent)] text-white text-[10px] flex items-center justify-center rounded-full">
              5
            </div>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <h3 className="font-medium text-[var(--foreground)]">Notifications</h3>
                <button className="text-xs text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors font-medium">
                  Mark all as read
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-[var(--border)]">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-[var(--secondary)] transition-colors ${notification.read ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-[var(--secondary)] flex items-center justify-center flex-shrink-0 mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <p className={`text-sm ${notification.read ? 'text-[var(--muted-foreground)]' : 'text-[var(--foreground)]'}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-[var(--primary)] ml-2 mt-1.5"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-2 border-t border-[var(--border)] text-center">
                <button className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Messages Dropdown */}
        <div className="relative" ref={messagesRef}>
          <button 
            onClick={() => {
              setMessagesOpen(!messagesOpen)
              setNotificationsOpen(false)
              setProfileOpen(false)
            }}
            className="flex items-center justify-center"
          >
            <MessageCircle className="h-5 w-5 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-[var(--accent)] text-white text-[10px] flex items-center justify-center rounded-full">
              3
            </div>
          </button>

          {messagesOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-lg z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <h3 className="font-medium text-[var(--foreground)]">Messages</h3>
                <button className="text-xs text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors font-medium">
                  View inbox
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto divide-y divide-[var(--border)]">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className="px-4 py-3 hover:bg-[var(--secondary)] transition-colors"
                  >
                    <div className="flex items-start">
                      {message.avatar ? (
                        <img
                          src={message.avatar}
                          alt={message.sender}
                          className="h-9 w-9 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-9 w-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-medium mr-3">
                          {message.sender.split(' ').map(name => name[0]).join('')}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[var(--foreground)]">
                          {message.sender}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                          {message.message}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{message.time}</p>
                      </div>
                      {!message.read && (
                        <div className="h-2 w-2 rounded-full bg-[var(--primary)] ml-2 mt-1.5"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3 border-t border-[var(--border)] flex justify-center">
                <button className="w-full text-sm py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-light)] transition-colors">
                  Send new message
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => {
              setProfileOpen(!profileOpen)
              setNotificationsOpen(false)
              setMessagesOpen(false)
            }}
            className="flex items-center space-x-3 pl-4 border-l border-[var(--border)] cursor-pointer"
          >
            <div className="h-9 w-9 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] font-medium">
              SJ
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--foreground)]">Sarah Johnson</span>
              <span className="text-xs text-[var(--muted-foreground)]">HR Manager</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-[var(--muted-foreground)] transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-60 bg-[var(--card)] border border-[var(--border)] shadow-lg rounded-lg z-50 overflow-hidden">
              <div className="p-4 border-b border-[var(--border)] text-center">
                <div className="h-16 w-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] text-xl font-medium mx-auto">
                  SJ
                </div>
                <h3 className="mt-2 font-medium text-[var(--foreground)]">Sarah Johnson</h3>
                <p className="text-xs text-[var(--muted-foreground)]">HR Manager • RecruitmentPlus CRM</p>
              </div>

              <div className="py-1">
                <a href="/profile" className="flex items-center px-4 py-2.5 hover:bg-[var(--secondary)] transition-colors">
                  <User className="h-4 w-4 text-[var(--muted-foreground)] mr-3" />
                  <span className="text-sm text-[var(--foreground)]">My Profile</span>
                </a>
                <a href="/calendar" className="flex items-center px-4 py-2.5 hover:bg-[var(--secondary)] transition-colors">
                  <Calendar className="h-4 w-4 text-[var(--muted-foreground)] mr-3" />
                  <span className="text-sm text-[var(--foreground)]">My Calendar</span>
                </a>
                <a href="/documents" className="flex items-center px-4 py-2.5 hover:bg-[var(--secondary)] transition-colors">
                  <FileText className="h-4 w-4 text-[var(--muted-foreground)] mr-3" />
                  <span className="text-sm text-[var(--foreground)]">My Documents</span>
                </a>
              </div>

              <div className="py-1 border-t border-[var(--border)]">
                <a href="/settings" className="flex items-center px-4 py-2.5 hover:bg-[var(--secondary)] transition-colors">
                  <Settings className="h-4 w-4 text-[var(--muted-foreground)] mr-3" />
                  <span className="text-sm text-[var(--foreground)]">Settings</span>
                </a>
                <a href="/logout" className="flex items-center px-4 py-2.5 hover:bg-[var(--secondary)] transition-colors">
                  <LogOut className="h-4 w-4 text-[var(--muted-foreground)] mr-3" />
                  <span className="text-sm text-[var(--foreground)]">Sign out</span>
                </a>
              </div>

              <div className="p-4 border-t border-[var(--border)] bg-[var(--secondary)]">
                <div className="flex items-center mb-2">
                  <Mail className="h-4 w-4 text-[var(--muted-foreground)] mr-2" />
                  <span className="text-xs text-[var(--muted-foreground)] truncate">sarah.johnson@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-[var(--muted-foreground)] mr-2" />
                  <span className="text-xs text-[var(--muted-foreground)]">(555) 123-4567</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
