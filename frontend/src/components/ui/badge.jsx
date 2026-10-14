import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-transparent bg-slate-900 text-white',
        secondary: 'border border-transparent bg-slate-100 text-slate-900',
        destructive: 'border border-transparent bg-red-500 text-white',
        outline: 'border text-slate-950',
        // Theme-aware variant — uses CSS variables
        theme: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, style, ...props }) {
  const themeStyle =
    variant === 'theme'
      ? {
          background: 'var(--theme-elevated)',
          color: 'var(--theme-primary)',
          border: '1px solid var(--theme-border)',
          ...style,
        }
      : style

  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={themeStyle}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
