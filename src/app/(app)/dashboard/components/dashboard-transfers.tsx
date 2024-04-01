import React from 'react'

import { getUserTransfers } from '../../transfers/actions'
import AddTransferDialog from '../../transfers/components/dialogs/add-transfer-dialog'
import TransfersTable from '../../transfers/components/transfers-table'

import { H4 } from '@/components/ui/typography'

export default async function DashboardTransfers() {
   const transfersData = await getUserTransfers()

   return (
      <>
         <div className="flex w-full justify-between">
            <H4>Transfers</H4>
            <AddTransferDialog />
         </div>
         <TransfersTable
            data={transfersData.transfers}
            hiddenColumns={['createdAt', 'date', 'note']}
         />
      </>
   )
}
