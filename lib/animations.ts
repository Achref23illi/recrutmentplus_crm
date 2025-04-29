// lib/animations.ts
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines class names and handles potential conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation class groups
export const animations = {
  fadeIn: "animate-fadeIn",
  fadeInUp: "animate-fadeInUp",
  fadeInDown: "animate-fadeInDown",
  slideInLeft: "animate-slideInLeft",
  slideInRight: "animate-slideInRight",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  spin: "animate-spin",
  
  // Hover animations
  hoverScale: "transition-transform duration-200 hover:scale-105",
  hoverScaleSmall: "transition-transform duration-200 hover:scale-102",
  hoverShadow: "transition-shadow duration-200 hover:shadow-lg hover:shadow-black/20",
  
  // Interactive transitions
  buttonTransition: "transition-all duration-200",
  smoothTransition: "transition-all duration-300 ease-in-out",
  
  // Card animations
  cardHover: "transition-all duration-200 hover:shadow-lg hover:shadow-black/20 hover:border-[#1D4E5F]/50",
}

// Stagger children animations (useful for lists)
export function getStaggeredAnimation(index: number, baseDelay = 50) {
  return {
    style: {
      animationDelay: `${index * baseDelay}ms`,
    },
  }
}