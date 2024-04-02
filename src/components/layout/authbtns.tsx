'use client'

import { signOut } from 'next-auth/react'

import { buttonVariants } from '../ui/button'

import { useCurrentUser } from '@/hooks/use-current-user'

const AuthBtns = () => {
   const user = useCurrentUser()

   const handleSignout = async () => {
      signOut()
   }

   if (user) {
      return (
         <div className="flex gap-4">
            <p>Signed in as {user?.email}</p>
            <button onClick={handleSignout} className="font-semibold">
               Sign out
            </button>
         </div>
      )
   }

   return (
      <div className="flex items-center">
         <a href="/api/auth/signin" className={buttonVariants({ variant: 'link' })}>
            Sign in
         </a>
      </div>
   )
}

export default AuthBtns
