import React, { Suspense } from 'react'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import { getUserAccounts } from './actions'
import AccountsTable from './components/accounts-table'
import AddAccountDialog from './components/dialogs/add-account-dialog'
import { H4 } from '@/components/ui/typography'

export default async function AccountsPage() {
   const data = await getUserAccounts()

   return (
      <div className="page">
         <H4>Accounts</H4>
         <div className="mb-2 w-full flex items-start">
            <Suspense>
               <AddAccountDialog />
            </Suspense>
         </div>
         <div className="w-full ">
            <Suspense fallback={<DashboardTableSkeleton noBtn />}>
               <AccountsTable data={data?.accounts} />
            </Suspense>
         </div>
      </div>
   )
}
