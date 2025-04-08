import React from 'react'

import dynamic from 'next/dynamic'

import { getUserTransfers } from '../../transfers/actions'

import DashboardTableSkeleton from './skeleton/dashboard-table-skeleton'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddTransferDialog = dynamic(
   () => import('../../transfers/components/dialogs/add-transfer-dialog'),
   {
      ssr: false,
      loading: () => <ButtonSkeleton />,
   },
)
const TransfersTable = dynamic(() => import('../../transfers/components/transfers-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

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
