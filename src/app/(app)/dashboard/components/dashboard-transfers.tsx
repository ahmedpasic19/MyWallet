import React from 'react'

import { getUserTransfers } from '../../transfers/actions'
import TransfersTable from '../../transfers/components/transfers-table'

import { H4 } from '@/components/ui/typography'

export default async function DashboardTransfers() {
   const transfersData = await getUserTransfers()

   return (
      <>
         <H4>Transfers</H4>
         <TransfersTable data={transfersData.transfers} />
      </>
   )
}
