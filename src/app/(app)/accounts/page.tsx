import React from 'react'

import dynamic from 'next/dynamic'

import DashboardTableSkeleton from '../dashboard/components/skeleton/dashboard-table-skeleton'

import { getUserAccounts } from './actions'
import ButtonSkeleton from '@/components/skeleton/button-skeleton'
import { H4 } from '@/components/ui/typography'

const AddAccountDialog = dynamic(() => import('./components/dialogs/add-account-dialog'), {
   ssr: false,
   loading: () => <ButtonSkeleton />,
})
const AccountsTable = dynamic(() => import('./components/accounts-table'), {
   ssr: false,
   loading: () => <DashboardTableSkeleton noBtn />,
})

export default async function AccountsPage() {
   const data = await getUserAccounts()

   return (
      <div className="page">
         <H4>Accounts</H4>
         <div className="mb-2 w-full flex items-start">
            <AddAccountDialog />
         </div>
         <div className="w-full ">
            <AccountsTable data={data?.accounts} />
         </div>
      </div>
   )
}
