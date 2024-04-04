import React, { Suspense } from 'react'

import Link from 'next/link'

import ButtonSkeleton from '../skeleton/button-skeleton'
import { buttonVariants } from '../ui/button'

import AuthBtns from './authbtns'
import { ModeToggle } from './theme-toggle'
import { links } from '@/data/page-links'

const Navbar = () => {
   return (
      <nav className="fixed top-0 w-full bg-card dark:bg-dark drop-shadow-lg py-1 justify-between gap-4a sm:h-auto h-12 hidden sm:flex">
         <ul className="sm:flex gap-2 hidden">
            {links.map((link) => (
               <Link
                  key={Math.random()}
                  href={link.href}
                  className={buttonVariants({ variant: 'link' })}
               >
                  {link.label}
               </Link>
            ))}
         </ul>

         <div className="hidden sm:flex gap-4">
            <Suspense fallback={<ButtonSkeleton />}>
               <ModeToggle />
               <AuthBtns />
            </Suspense>
         </div>
      </nav>
   )
}

export default Navbar
