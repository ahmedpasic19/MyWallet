import React, { Suspense } from 'react'

import { getUserRecordsByType } from '../actions'
import AddRecordDialog from '../components/dialogs/add-record-dialog'
import RecordsTable from '../components/records-table'

export default async function ExpensePage() {
   const data = await getUserRecordsByType('EXPENSE')

   return (
      <div className="h-screen pt-5 flex flex-col items-center px-20">
         <div className="mb-2 w-full flex items-start">
            <AddRecordDialog type="EXPENSE" />
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <RecordsTable data={data?.records} />
            </Suspense>
         </div>
      </div>
   )
}
