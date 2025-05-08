import { useState, useRef, useEffect } from 'react';
import { useOffice } from '@/contexts/OfficeContext';
import { Building, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OfficeSelector = () => {
  const { offices, currentOffice, changeOffice, hasMultipleOfficeAccess } = useOffice();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Only render if user has access to multiple offices
  if (!hasMultipleOfficeAccess) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Building size={18} className="text-[#80BDCA]" />
        <span>{currentOffice.city}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-md bg-neutral-800 border border-neutral-700 shadow-lg z-50"
          >
            <div className="py-1">
              {offices.map((office) => (
                <motion.button
                  key={office.id}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    currentOffice.id === office.id
                      ? 'bg-[#1D4E5F]/20 text-[#80BDCA]'
                      : 'text-white hover:bg-neutral-700'
                  }`}
                  onClick={() => {
                    changeOffice(office.id);
                    setIsOpen(false);
                  }}
                  whileHover={{ backgroundColor: currentOffice.id === office.id 
                    ? 'rgba(29, 78, 95, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {office.city}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
