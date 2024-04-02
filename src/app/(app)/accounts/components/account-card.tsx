import { WalletAccounts } from '@prisma/client'

import React from 'react'

import { CreditCardIcon } from 'lucide-react'

import Box from '@/components/ui/box'
import { formatCurrency, round } from '@/lib/utils'

const AccountCard = ({ account }: { account: Partial<WalletAccounts> & { total: number } }) => {
   return (
      <Box href={`?accId=${account.id}`}>
         <div>
            <CreditCardIcon /> <h1>{account.name}</h1>
         </div>
         <strong>{formatCurrency(round(account.total || 0))}</strong>
      </Box>
   )
}
export default AccountCard
