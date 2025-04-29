// components/ui/modal.tsx
'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { animations } from '@/lib/animations'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop overlay with fade-in animation */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm ${animations.fadeIn}`} 
        onClick={onClose}
      />
      
      {/* Modal container with slide-up animation */}
      <div 
        className={`relative bg-neutral-900 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden ${animations.fadeInUp} ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 ${animations.buttonTransition}`}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}