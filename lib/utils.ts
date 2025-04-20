// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function for conditionally joining Tailwind CSS classes together
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}