import React, { Suspense } from 'react'

import { getUserRecordsByType } from '../actions'
import AddRecordDialog from '../components/dialogs/add-record-dialog'
import RecordsTable from '../components/records-table'

export default async function ExpensePage() {
   const data = await getUserRecordsByType('EXPENSE')

   return (
      <div className="page">
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddRecordDialog type="EXPENSE" />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <RecordsTable data={data?.records} type="EXPENSE" />
            </Suspense>
         </div>
      </div>
   )
}
