import React from 'react'

import { cn } from '@/lib/utils'

const Loading = ({ size = 'default', color = 'primary' }) => {
   const spinnerClasses = cn(
      'animate-spin',
      {
         'w-5 h-5': size === 'sm',
         'w-8 h-8': size === 'default',
         'w-12 h-12': size === 'lg',
      },
      {
         'text-primary': color === 'primary',
         'text-destructive': color === 'destructive',
         'text-secondary': color === 'secondary',
         'text-accent': color === 'accent',
      },
   )

   return (
      <svg
         className={spinnerClasses}
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
      >
         <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
         ></circle>
         <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.005 8.005 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.386 0-6.425-1.343-8.656-3.531z"
         ></path>
      </svg>
   )
}

export default Loading
