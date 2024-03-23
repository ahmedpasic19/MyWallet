import React from 'react'

import { getUserRecordsByType } from '../../(records)/actions'
import RecordsTable from '../../(records)/components/records-table'

import { H4 } from '@/components/ui/typography'

export default async function DashboardExpenses() {
   const expenseData = await getUserRecordsByType('EXPENSE')

   return (
      <>
         <H4>Expense</H4>
         <RecordsTable data={expenseData.records} />
      </>
   )
}
