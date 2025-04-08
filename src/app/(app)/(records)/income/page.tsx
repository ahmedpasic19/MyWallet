import React from 'react'

import dynamic from 'next/dynamic'

import DashboardTableSkeleton from '../../dashboard/components/skeleton/dashboard-table-skeleton'
import { getUserRecordsByType } from '../actions'

import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddRecordDialog = dynamic(() => import('../components/dialogs/add-record-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})
const RecordsTable = dynamic(() => import('../components/records-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

export default async function IncomePage() {
   const data = await getUserRecordsByType('INCOME')

   return (
      <div className="page">
         <H4>Income</H4>
         <div className="mb-2 w-full flex items-start">
            <AddRecordDialog type="INCOME" />
         </div>
         <div className="w-full ">
            <RecordsTable data={data?.records} type="INCOME" />
         </div>
      </div>
   )
}
