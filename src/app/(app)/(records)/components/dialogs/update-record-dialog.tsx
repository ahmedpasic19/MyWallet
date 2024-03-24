'use client'

import { Record, RecordType } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { getOneRecord } from '../../actions'
import RecordsForm from '../records-form'

import MainDialog from '@/components/ui/main-dialog'

type TProps = {
   type: RecordType
}

const UpdateRecordDialog = ({ type }: TProps) => {
   const [record, setRecord] = useState({} as Record)

   const searchParams = useSearchParams()
   const router = useRouter()

   const recId = searchParams.get('recId')
   const paramsType = searchParams.get('type')?.toUpperCase() as RecordType

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
         open={recId && paramsType === type ? true : false}
         onOpenChange={() => (recId ? router.back() : router.push('?recId'))}
         noBtn
      >
         <RecordsForm isEdit record={record} type={record.type} />
      </MainDialog>
   )
}

export default UpdateRecordDialog
