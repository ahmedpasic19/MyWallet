import React, { Suspense } from 'react'

import AccountsList from '../accounts/components/accounts-list'
import AccountsListSkeleton from '../accounts/components/skeleton/accounts-list-skeleton'

export default function DashboardPage() {
   return (
      <div className="flex justify-center">
         <section className="mt-10 w-full max-w-2xl">
            <Suspense fallback={<AccountsListSkeleton />}>
               <AccountsList />
            </Suspense>
         </section>
      </div>
   )
}
