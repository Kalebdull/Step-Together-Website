import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react'

const inputBase =
  'w-full px-4 py-3 rounded-md bg-white border border-cream-dark text-navy placeholder-navy/40 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-rust/30 focus:border-rust transition-colors duration-200'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-navy/80">{label}</label>}
      <input ref={ref} className={`${inputBase} ${error ? 'border-red-400' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-navy/80">{label}</label>}
      <textarea ref={ref} className={`${inputBase} resize-none ${error ? 'border-red-400' : ''} ${className}`} rows={4} {...props} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', children, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-navy/80">{label}</label>}
      <select ref={ref} className={`${inputBase} ${error ? 'border-red-400' : ''} ${className}`} {...props}>
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
)
Select.displayName = 'Select'
