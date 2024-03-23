import React from 'react'

import { getUserRecordsByType } from '../../(records)/actions'
import RecordsTable from '../../(records)/components/records-table'

import { H4 } from '@/components/ui/typography'

export default async function DashboardIncomes() {
   const incomeData = await getUserRecordsByType('INCOME')

   return (
      <>
         <H4>Income</H4>
         <RecordsTable data={incomeData?.records} />
      </>
   )
}
