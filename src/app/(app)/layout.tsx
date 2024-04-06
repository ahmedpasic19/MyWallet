import React from 'react'

import MobileMenu from '@/components/layout/mobile-menu'
import Navbar from '@/components/layout/navbar'

export default function AppLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <div>
         <Navbar />
         <MobileMenu />
         {children}
      </div>
   )
}
