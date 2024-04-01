import React from 'react'

import { getUserRecordsByType } from '../../(records)/actions'
import AddRecordDialog from '../../(records)/components/dialogs/add-record-dialog'
import RecordsTable from '../../(records)/components/records-table'

import { H4 } from '@/components/ui/typography'

export default async function DashboardExpenses() {
   const expenseData = await getUserRecordsByType('EXPENSE')

   return (
      <>
         <div className="flex w-full justify-between">
            <H4>Expense</H4>
            <AddRecordDialog type="EXPENSE" />
         </div>
         <RecordsTable
            data={expenseData.records}
            type="EXPENSE"
            hiddenColumns={['category.name', 'goal.name', 'note', 'date', 'createdAt']}
         />
      </>
   )
}
