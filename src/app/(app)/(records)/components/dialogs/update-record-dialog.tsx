'use client'

import { Record } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { getOneRecord } from '../../actions'
import RecordsForm from '../records-form'

import MainDialog from '@/components/ui/main-dialog'

const UpdateRecordDialog = () => {
   const [record, setRecord] = useState({} as Record)

   const searchParams = useSearchParams()
   const router = useRouter()

   const recId = searchParams.get('recId')

   useEffect(() => {
      const getData = async () => {
         const res = await getOneRecord(recId!)

         if (res.record) setRecord(res.record)
      }

      if (recId) getData()
   }, [recId])

   return (
      <MainDialog
         title="Edit record"
         open={recId ? true : false}
         onOpenChange={() => (recId ? router.back() : router.push('?recId'))}
         noBtn
      >
         <RecordsForm isEdit record={record} type={record.type} />
      </MainDialog>
   )
}

export default UpdateRecordDialog
