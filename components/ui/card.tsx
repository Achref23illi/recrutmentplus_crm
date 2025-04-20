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
        default: "bg-white shadow-sm border border-gray-200",
        elevated: "bg-white shadow-md border-none",
        ghost: "bg-transparent border-none shadow-none",
        outline: "bg-white border border-gray-200 shadow-none"
      },
      padding: {
        none: "",
        sm: "p-3",
        default: "p-4",
        md: "p-5",
        lg: "p-6",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default"
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
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
