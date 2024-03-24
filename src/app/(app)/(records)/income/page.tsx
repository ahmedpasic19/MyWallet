import React, { Suspense } from 'react'

import { getUserRecordsByType } from '../actions'
import AddRecordDialog from '../components/dialogs/add-record-dialog'
import RecordsTable from '../components/records-table'

export default async function IncomePage() {
   const data = await getUserRecordsByType('INCOME')

   return (
      <div className="h-screen pt-5 flex flex-col items-center px-20">
         <div className="mb-2 w-full flex items-start">
            <AddRecordDialog type="INCOME" />
         </div>
         <div className="w-full ">
            <Suspense fallback={<p>Loading...</p>}>
               <RecordsTable data={data?.records} type="INCOME" />
            </Suspense>
         </div>
      </div>
   )
}
