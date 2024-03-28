'use client'

import React, { Suspense, useState } from 'react'

import Link from 'next/link'

import { buttonVariants } from '../ui/button'

import AuthBtns from './authbtns'
import { links } from '@/data/page-links'

const MobileMenu = () => {
   const [isOpen, setIsOpen] = useState(false)

   const toggleMenu = () => {
      setIsOpen(!isOpen)
   }

   return (
      <div className="absolute min-h-screen sm:hidden block">
         {/* Hamburger icon */}
         <button
            className="fixed top-5 right-5 md:hidden focus:outline-none flex flex-col gap-1 w-5 h-full"
            onClick={toggleMenu}
         >
            <span className="p-[1px] w-full bg-primary"></span>
            <span className="p-[1px] w-full bg-primary"></span>
            <span className="p-[1px] w-full bg-primary"></span>
         </button>

         {/* Mobile menu */}
         <div
            className={`${
               isOpen ? 'translate-x-0' : 'translate-x-full'
            } fixed inset-y-0 right-0 z-40 w-3/4 max-w-xs bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out z-100`}
         >
            <div className="p-4">
               <nav className="w-full flex flex-col gap-4 items-start">
                  {links.map((link) => (
                     <Link
                        key={Math.random()}
                        href={link.href}
                        className={buttonVariants({ variant: 'link' })}
                        onClick={toggleMenu}
                     >
                        {link.label}
                     </Link>
                  ))}
                  <Suspense fallback={'Loading...'}>
                     <AuthBtns />
                  </Suspense>
               </nav>
            </div>
         </div>

         {/* Overlay */}
         {isOpen && (
            <div className="fixed inset-0 z-30 bg-black opacity-50" onClick={toggleMenu}></div>
         )}
      </div>
   )
}

export default MobileMenu
