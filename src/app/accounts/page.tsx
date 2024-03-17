import React, { Suspense } from 'react'

import { getUserAccounts } from './actions'
import AccountsTable from './components/accounts-table'
import AddAccountDialog from './components/dialogs/add-account-dialog'

export default async function AccountsPage() {
   const data = await getUserAccounts()

   return (
      <div className="h-screen pt-5 flex flex-col items-center px-20">
         <div className="mb-2 w-full flex items-start">
            <AddAccountDialog />
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <AccountsTable data={data?.accounts} />
            </Suspense>
         </div>
      </div>
   )
}
