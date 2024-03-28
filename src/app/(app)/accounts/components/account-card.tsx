import { WalletAccounts } from '@prisma/client'

import React from 'react'

import { CreditCardIcon } from 'lucide-react'
import Link, { LinkProps } from 'next/link'

import { formatCurrency, round } from '@/lib/utils'

export const Card = ({ children, ...props }: LinkProps & { children: React.ReactNode }) => {
   return (
      <Link
         {...props}
         className="bg-white sm:min-w-52 shadow-md rounded-md flex flex-col p-4 cursor-pointer hover:bg-gray-50"
      >
         {children}
      </Link>
   )
}

const AccountCard = ({ account }: { account: Partial<WalletAccounts> & { total: number } }) => {
   return (
      <Card href={`?accId=${account.id}`}>
         <div>
            <CreditCardIcon /> <h1>{account.name}</h1>
         </div>
         <div>{formatCurrency(round(account.total || 0))}</div>
      </Card>
   )
}
export default AccountCard
