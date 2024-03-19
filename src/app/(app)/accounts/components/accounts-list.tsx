import React from 'react'

import { PlusIcon } from 'lucide-react'

import { getUserAccountsWithTotal } from '../actions'

import AccountCard, { Card } from './account-card'
import AddAccountDialog from './dialogs/add-account-dialog'

export default async function AccountsList() {
   const accountsData = await getUserAccountsWithTotal()

   return (
      <ul className="grid grid-cols-3 gap-4 w-full">
         {accountsData.accounts.map((acc) => (
            <AccountCard key={Math.random()} account={acc} />
         ))}
         <Card href="?addAcc=true">
            <div className="flex items-center justify-center h-full">
               <PlusIcon /> Add new
            </div>
         </Card>

         <AddAccountDialog noBtn />
      </ul>
   )
}
