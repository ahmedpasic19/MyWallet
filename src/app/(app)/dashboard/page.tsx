import React, { Suspense } from 'react'

import AccountsList from '../accounts/components/accounts-list'
import AccountsListSkeleton from '../accounts/components/skeleton/accounts-list-skeleton'
import GoalsList from '../goals/components/goals-list'
import GoalsListSkeleton from '../goals/components/skeleton/goals-list-skeleton'

import { H4 } from '@/components/ui/typography'

export default function DashboardPage() {
   return (
      <div className="flex justify-center gap-5">
         <section className="mt-10 w-full max-w-2xl">
            <H4>Accounts</H4>
            <Suspense fallback={<AccountsListSkeleton />}>
               <AccountsList />
            </Suspense>
         </section>
         <section className="mt-10">
            <H4>Goals</H4>
            <Suspense fallback={<GoalsListSkeleton />}>
               <GoalsList />
            </Suspense>
         </section>
      </div>
   )
}
