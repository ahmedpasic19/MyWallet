import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function round(number: number, precision = 0) {
   const multiplier = Math.pow(10, precision)
   return Math.round(number * multiplier) / multiplier
}

export function formatCurrency(
   amount: number,
   currency: string = 'USD',
   locale: string = 'en-US',
): string {
   return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
   }).format(amount)
}
