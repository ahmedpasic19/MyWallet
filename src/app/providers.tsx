import React from 'react'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { auth } from '@/auth'
import { Toaster } from '@/components/ui/sonner'

export default async function Providers({ children }: { children: React.ReactNode }) {
   const session = await auth()
   return (
      <SessionProvider session={session}>
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
