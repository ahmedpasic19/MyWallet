import React from 'react'

import dynamic from 'next/dynamic'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import { getUserTransfers } from './actions'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddTransferDialog = dynamic(() => import('./components/dialogs/add-transfer-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})
const TransfersTable = dynamic(() => import('./components/transfers-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

export default async function TransfersPage() {
   const data = await getUserTransfers()

   return (
      <div className="page">
         <H4>Transfers</H4>
         <div className="mb-2 w-full flex items-start">
            <AddTransferDialog />
         </div>
         <div className="w-full ">
            <TransfersTable data={data?.transfers} />
         </div>
      </div>
   )
}
