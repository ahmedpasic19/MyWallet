import React, { Suspense } from 'react'

import AccountsList from '../accounts/components/accounts-list'
import AccountsListSkeleton from '../accounts/components/skeleton/accounts-list-skeleton'
import CategoriesList from '../categories/components/categories-list'
import CategoriesListSkeleton from '../categories/components/skeleton/categories-list-skeleton'
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
         <section className="flex flex-col gap-4 mt-10">
            <div>
               <H4>Goals</H4>
               <Suspense fallback={<GoalsListSkeleton />}>
                  <GoalsList />
               </Suspense>
            </div>

            <div>
               <H4>Categories</H4>
               <Suspense fallback={<CategoriesListSkeleton />}>
                  <CategoriesList />
               </Suspense>
            </div>
         </section>
      </div>
   )
}
