import React from 'react'

import AccountCardSkeleton from './account-card-skeleton'

const AccountsListSkeleton = () => {
   return (
      <ul className="sm:grid grid-cols-3 gap-4 w-full flex flex-col">
         {[1, 2, 3, 4].map((acc) => (
            <AccountCardSkeleton key={acc} />
         ))}
      </ul>
   )
}

export default AccountsListSkeleton
