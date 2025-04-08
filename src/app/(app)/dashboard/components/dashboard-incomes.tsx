import React from 'react'

import dynamic from 'next/dynamic'

import { getUserRecordsByType } from '../../(records)/actions'

import DashboardTableSkeleton from './skeleton/dashboard-table-skeleton'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddRecordDialog = dynamic(
   () => import('../../(records)/components/dialogs/add-record-dialog'),
   {
      ssr: false,
      loading: () => <ButtonSkeleton />,
   },
)
const RecordsTable = dynamic(() => import('../../(records)/components/records-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

export default async function DashboardIncomes() {
   const incomeData = await getUserRecordsByType('INCOME')

   return (
      <>
         <div className="flex w-full justify-between">
            <H4>Income</H4>
            <AddRecordDialog type="INCOME" />
         </div>
         <RecordsTable
            data={incomeData?.records}
            type="INCOME"
            hiddenColumns={['category.name', 'goal.name', 'note', 'date', 'createdAt']}
         />
      </>
   )
}
