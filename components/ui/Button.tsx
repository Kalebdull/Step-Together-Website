'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'danger' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-200 cursor-pointer select-none'

const variants = {
  primary: 'bg-rust text-white border border-rust hover:bg-rust-dark hover:border-rust-dark',
  ghost: 'bg-transparent text-cream border border-cream hover:bg-cream hover:text-navy',
  secondary: 'bg-cream text-navy border border-cream-dark hover:bg-cream-dark',
  danger: 'bg-red-600 text-white border border-red-600 hover:bg-red-700',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-3 text-sm rounded-md',
  lg: 'px-8 py-4 text-base rounded-md',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export function LinkButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonProps & { href: string }) {
  return (
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.a>
  )
}
