import React, { Suspense } from 'react'

import { getUserTransfers } from './actions'
import AddTransferDialog from './components/dialogs/add-transfer-dialog'
import TransfersTable from './components/transfers-table'

export default async function TransfersPage() {
   const data = await getUserTransfers()

   return (
      <div className="h-screen pt-5 flex flex-col items-center px-20">
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddTransferDialog />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <TransfersTable data={data?.transfers} />
            </Suspense>
         </div>
      </div>
   )
}
