'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  className?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, className = '', children }: ModalProps) {
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      transition: { 
        duration: 0.2
      } 
    }
  }

  // Close on escape key press
  React.useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop/Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            onClick={onClose}
            data-testid="modal-overlay"
          />
          
          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{ 
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
          >
            {/* Modal Content */}
            <motion.div
              className={`bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-content"
            >
              {title && (
                <div className="p-5 border-b border-neutral-700 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-white">{title}</h2>
                  <motion.button 
                    onClick={onClose}
                    className="text-neutral-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid="modal-close-button"
                  >
                    <X size={24} />
                  </motion.button>
                </div>
              )}
              <div className="p-5">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}