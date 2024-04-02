'use client'

import React from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'

const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
      <SessionProvider>
         <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
         >
            {children}
         </NextThemesProvider>
         <Toaster />
      </SessionProvider>
   )
}

export default Providers
