'use client'

import { Transfer } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { getOneTransfer } from '../../actions'
import TransfersForm from '../transfers-form'

import MainDialog from '@/components/ui/main-dialog'

const UpdateTransferDialog = () => {
   const [transfer, setTransfer] = useState({} as Transfer)

   const searchParams = useSearchParams()
   const router = useRouter()

   const traId = searchParams.get('traId')

   useEffect(() => {
      const getData = async () => {
         const res = await getOneTransfer(traId!)

         if (res.transfer) setTransfer(res.transfer)
      }

      if (traId) getData()
   }, [traId])

   return (
      <MainDialog
         title="Edit transfer"
         open={traId ? true : false}
         onOpenChange={() => (traId ? router.back() : router.push('?traId'))}
         noBtn
      >
         <TransfersForm isEdit transfer={transfer} />
      </MainDialog>
   )
}

export default UpdateTransferDialog
