import React from 'react'

import { getUserAccounts } from '../actions'

import AccountCard from './account-card'
import AddAccountDialog from './dialogs/add-account-dialog'

export default async function AccountsList() {
   const accountsData = await getUserAccounts()

   return (
      <ul className="grid grid-cols-4 gap-4">
         {accountsData.accounts.map((acc) => (
            <AccountCard key={Math.random()} account={acc} />
         ))}
         <AddAccountDialog />
      </ul>
   )
}
