import React from 'react'

import AccountsList from './components/accounts-list'

export default function AccountsPage() {
   return (
      <div className="h-screen pt-5 flex justify-center">
         <div className="w-full px-20">
            <AccountsList />
         </div>
      </div>
   )
}
