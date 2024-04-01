import React from 'react'

import { getUserRecordsByType } from '../../(records)/actions'
import AddRecordDialog from '../../(records)/components/dialogs/add-record-dialog'
import RecordsTable from '../../(records)/components/records-table'

import { H4 } from '@/components/ui/typography'

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
