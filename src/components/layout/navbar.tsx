import React, { Suspense } from 'react'

import Link from 'next/link'

import { buttonVariants } from '../ui/button'

import AuthBtns from './authbtns'
import { links } from '@/data/page-links'

const Navbar = () => {
   return (
      <nav className="bg-white dark:bg-dark drop-shadow-lg py-1 flex justify-between gap-4a sm:h-auto h-12">
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
         <div className="hidden sm:block">
            <Suspense fallback={'Loading...'}>
               <AuthBtns />
            </Suspense>
         </div>
      </nav>
   )
}

export default Navbar
