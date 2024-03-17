'use client'

import { WalletAccounts } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { getOneAccount } from '../../actions'
import AccountsForm from '../accounts-form'

import MainDialog from '@/components/ui/main-dialog'

const UpdateAccountDialog = () => {
   const [account, setAccount] = useState({} as WalletAccounts)

   const searchParams = useSearchParams()
   const router = useRouter()

   const accId = searchParams.get('accId')

   useEffect(() => {
      const getData = async () => {
         const res = await getOneAccount(accId!)

         if (res.account) setAccount(res.account)
      }

      if (accId) getData()
   }, [accId])

   return (
      <MainDialog
         title="Edit account"
         open={accId ? true : false}
         onOpenChange={() => (accId ? router.back() : router.push('?accId'))}
         noBtn
      >
         <AccountsForm isEdit account={account} />
      </MainDialog>
   )
}

export default UpdateAccountDialog
