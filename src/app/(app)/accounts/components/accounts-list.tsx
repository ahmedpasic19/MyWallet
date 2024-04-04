import React from 'react'

import { PlusIcon } from 'lucide-react'

import { getUserAccountsWithTotal } from '../actions'

import AccountCard from './account-card'
import AddAccountDialog from './dialogs/add-account-dialog'
import Box from '@/components/ui/box'

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
