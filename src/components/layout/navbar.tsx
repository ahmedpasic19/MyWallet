import React, { Suspense } from 'react'

import Link from 'next/link'

import { buttonVariants } from '../ui/button'

import AuthBtns from './authbtns'

const Navbar = () => {
   const links = [
      { label: 'Dashboard', href: '/dashboard ' },
      { label: 'Accounts', href: '/accounts' },
   ]
   return (
      <nav className="bg-white dark:bg-dark drop-shadow-lg p-4 flex justify-between gap-4">
         <ul className="flex gap-2">
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
         <Suspense fallback={'Loading...'}>
            <AuthBtns />
         </Suspense>
      </nav>
   )
}

export default Navbar
