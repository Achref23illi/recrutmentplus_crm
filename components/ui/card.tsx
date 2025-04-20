// components/ui/card.tsx
'use client'

import React, { HTMLAttributes, ReactNode } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  "rounded-lg overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 border border-neutral-700 shadow-sm",
        elevated: "bg-neutral-800 shadow-md border-none",
        ghost: "bg-transparent border-none shadow-none",
        outline: "bg-neutral-800 border border-neutral-700 shadow-none",
        primary: "bg-neutral-800 border-l-4 border-l-[#1D4E5F] border-t border-r border-b border-neutral-700 shadow-sm",
        secondary: "bg-neutral-800 border-l-4 border-l-[#37A794] border-t border-r border-b border-neutral-700 shadow-sm"
      },
      padding: {
        none: "",
        sm: "p-3",
        default: "p-4",
        md: "p-5",
        lg: "p-6",
      },
      hover: {
        true: "transition-shadow duration-200 hover:shadow-lg hover:shadow-black/30",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      hover: false
    }
  }
)

interface CardProps extends HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof cardVariants> {
  children: ReactNode
  className?: string
}

export function Card({ 
  children, 
  className = '', 
  variant,
  padding,
  hover,
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, hover }), className)}
      {...props}
    >
      {children}
    </div>
  )
}