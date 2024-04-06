'use client'

import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { buttonVariants } from '../ui/button'

import { useCurrentUser } from '@/hooks/use-current-user'

const AuthBtns = () => {
   const user = useCurrentUser()

   const handleSignout = async () => {
      signOut()
   }

   function getUserInitials(name: string) {
      // Extract only the first and last words from the name
      const words = name.match(/\S+/g)

      // If there are at least two words, extract initials from them
      if (words && words.length >= 2) {
         const firstName = words[0]
         const lastName = words[words.length - 1]
         return firstName[0].toUpperCase() + lastName[0].toUpperCase()
      } else {
         // If less than two words, return an empty string
         return ''
      }
   }

   if (user) {
      return (
         <div className="flex gap-4">
            <div className="hidden sm:block">
               {user.image ? (
                  <Avatar>
                     <AvatarImage src={user.image} />
                     <AvatarFallback>{getUserInitials(user.name || '')}</AvatarFallback>
                  </Avatar>
               ) : null}
            </div>
            <button onClick={handleSignout} className={buttonVariants({ variant: 'ghost' })}>
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
