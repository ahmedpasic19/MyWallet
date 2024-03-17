import { WalletAccounts } from '@prisma/client'

import React from 'react'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'

const AccountCard = ({ account }: { account: WalletAccounts }) => {
   return (
      <Card variant="tertiary">
         <CardHeader>
            <CardTitle>{account.name}</CardTitle>
         </CardHeader>
      </Card>
   )
}

export default AccountCard
