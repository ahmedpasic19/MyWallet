import React, { Suspense } from 'react'

import AccountsList from '../accounts/components/accounts-list'
import CategoriesList from '../categories/components/categories-list'
import GoalsList from '../goals/components/goals-list'

import DashboardExpenses from './components/dashboard-expenses'
import DashboardIncomes from './components/dashboard-incomes'
import DashboardTransfers from './components/dashboard-transfers'
import DashboardTableSkeleton from './components/skeleton/dashboard-table-skeleton'
import ListSkeleton from '@/components/skeleton/list-skeleton'
import { H4 } from '@/components/ui/typography'

export default async function DashboardPage() {
   return (
      <div className="flex sm:flex-row flex-col justify-center gap-5 pb-10 sm:px-0 px-5">
         <section className="mt-10 w-full max-w-2xl flex flex-col gap-4">
            <div>
               <H4>Accounts</H4>
               <Suspense fallback={<ListSkeleton />}>
                  <AccountsList />
               </Suspense>
            </div>

            <Suspense fallback={<DashboardTableSkeleton />}>
               <DashboardExpenses />
            </Suspense>

            <Suspense fallback={<DashboardTableSkeleton />}>
               <DashboardIncomes />
            </Suspense>

            <Suspense fallback={<DashboardTableSkeleton />}>
               <DashboardTransfers />
            </Suspense>
         </section>
         <section className="flex flex-col gap-4 mt-10">
            <div>
               <H4>Goals</H4>
               <Suspense fallback={<ListSkeleton />}>
                  <GoalsList />
               </Suspense>
            </div>

            <div>
               <H4>Categories</H4>
               <Suspense fallback={<ListSkeleton />}>
                  <CategoriesList />
               </Suspense>
            </div>
         </section>
      </div>
   )
}
