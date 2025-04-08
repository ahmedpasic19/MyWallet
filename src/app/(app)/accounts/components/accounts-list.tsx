import React from 'react'

import { PlusIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

import { getUserAccountsWithTotal } from '../actions'

import AccountCard from './account-card'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import Box from '@/components/ui/box'

const AddAccountDialog = dynamic(() => import('./dialogs/add-account-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})

export default async function AccountsList() {
   const accountsData = await getUserAccountsWithTotal()

   return (
      <ul className="sm:grid sm:grid-cols-3 gap-4 w-full flex flex-col">
         {accountsData.accounts?.map((acc) => <AccountCard key={Math.random()} account={acc} />)}
         <Box href="?addAcc=true">
            <div className="flex items-center justify-center h-full">
               <PlusIcon /> Add new
            </div>
         </Box>

         <AddAccountDialog noBtn />
      </ul>
   )
}
