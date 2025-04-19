'use client'

import { useState } from 'react'
import Toggle from '../../components/Toggle'
import { Save, User, Globe, Bell, Shield, Mail } from 'lucide-react'

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [browserNotif, setBrowserNotif] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Settings</h1>
        <p className="text-[var(--muted-foreground)]">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            {[
              { icon: User, label: 'Profile' },
              { icon: Globe, label: 'Preferences' },
              { icon: Bell, label: 'Notifications' },
              { icon: Shield, label: 'Security' },
              { icon: Mail, label: 'Email' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center w-full px-4 py-2.5 text-left rounded-lg text-[var(--foreground)]
                  hover:bg-[var(--secondary)] transition-colors"
              >
                <item.icon className="h-5 w-5 mr-3 text-[var(--primary)]" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Profile Section */}
          <section className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
            <h2 className="text-xl font-medium text-[var(--foreground)] mb-4">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Sarah"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Johnson"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="sarah.johnson@example.com"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  defaultValue="HR Manager"
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]
                    focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--primary)]"
                />
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
            <h2 className="text-xl font-medium text-[var(--foreground)] mb-4">Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Language
                </label>
                <select
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]
                  text-[var(--foreground)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Spanish</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Timezone
                </label>
                <select
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)]
                  text-[var(--foreground)] appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                >
                  <option>UTC-12</option>
                  <option>UTC-8</option>
                  <option>UTC</option>
                  <option>UTC+1</option>
                  <option>UTC+2</option>
                  <option>UTC+5:30</option>
                  <option>UTC+10</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-[var(--foreground)]">Dark Mode</span>
                <Toggle enabled={darkMode} onChange={setDarkMode} />
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-[var(--card)] p-6 rounded-lg shadow-soft border border-[var(--border)]">
            <h2 className="text-xl font-medium text-[var(--foreground)] mb-4">Notifications</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[var(--foreground)]">Email Notifications</div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Receive updates about new candidates, interviews and other important events
                  </div>
                </div>
                <Toggle enabled={emailNotif} onChange={setEmailNotif} />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-[var(--foreground)]">Browser Notifications</div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    Get real-time notifications in your browser
                  </div>
                </div>
                <Toggle enabled={browserNotif} onChange={setBrowserNotif} />
              </div>
              
              <div className="pt-4 mt-2 border-t border-[var(--border)]">
                <h3 className="text-sm font-medium text-[var(--foreground)] mb-2">Notification Types</h3>
                <div className="space-y-2">
                  {['New candidates', 'Interview reminders', 'Application status changes', 'Team mentions'].map(item => (
                    <div key={item} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={item.replace(/\s+/g, '-').toLowerCase()} 
                        defaultChecked 
                        className="h-4 w-4 rounded border-[var(--border)] text-[var(--primary)]" 
                      />
                      <label 
                        htmlFor={item.replace(/\s+/g, '-').toLowerCase()}
                        className="ml-2 text-sm text-[var(--foreground)]"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              className="inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] 
              hover:bg-[var(--primary-light)] transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
