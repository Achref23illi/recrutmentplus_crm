// components/ui/modal.tsx
'use client'

import React, { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal panel */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div 
          className={cn(
            "relative transform overflow-hidden rounded-lg bg-neutral-800 border border-neutral-700 text-left shadow-xl transition-all w-full max-w-lg",
            className
          )}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-700">
            <h3 className="text-lg font-medium text-white">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-full transition-colors"
              title="Close modal"
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
    </div>
  )
}