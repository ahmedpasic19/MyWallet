import type { ReactNode } from 'react'

import { Wallet } from 'lucide-react'
import Link from 'next/link'

import { Social } from './social'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface CardWrapperProps {
   children: ReactNode
   headerLabel: string
   headerDescription: string
   backButtonLabel: string
   backButtonHref: string
   showSocial?: boolean
}

export const CardWrapper = ({
   children,
   headerLabel,
   headerDescription,
   backButtonLabel,
   backButtonHref,
   showSocial = false,
}: CardWrapperProps) => {
   return (
      <div className="flex w-[500px] flex-col items-center justify-center bg-[#0f0f0f] text-[#cfcfcf] p-4 border-none rounded-md">
         <div className="mb-8 flex items-center gap-2 text-2xl font-bold">
            <Wallet className="h-8 w-8 text-[#FFBE1B]" />
            <span>MyWallet</span>
         </div>

         <Card className="w-full max-w-md border-[#1f1f1f] bg-[#0f0f0f] shadow-lg">
            <div className="px-6 py-5">
               <div className="flex flex-col items-center justify-center">
                  <h1 className="text-2xl font-semibold text-[#cfcfcf] w-full text-start">
                     {headerLabel}
                  </h1>
               </div>
               <div className="flex flex-col items-center justify-center">
                  <p className="text-sm font-semibol text-[#a0a0a0] w-full text-start pr-8">
                     {headerDescription}
                  </p>
               </div>
            </div>
            <CardContent>{children}</CardContent>
            {showSocial && (
               <CardFooter className="flex flex-col space-y-4">
                  <div className="relative flex items-center justify-center w-full">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-[#2f2f2f]"></span>
                     </div>
                     <span className="relative bg-[#0f0f0f] px-2 text-xs text-[#a0a0a0]">
                        OR CONTINUE WITH
                     </span>
                  </div>
                  <Social />
               </CardFooter>
            )}
            <div className="mt-4 mb-6 text-center text-sm text-[#a0a0a0]">
               <Link href={backButtonHref} className="text-[#FFBE1B] hover:underline">
                  {backButtonLabel}
               </Link>
            </div>
         </Card>
      </div>
   )
}
