'use client'

import { Category } from '@prisma/client'

import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { getOneCategory } from '../../actions'
import CategoriesForm from '../categories-form'

import MainDialog from '@/components/ui/main-dialog'

const UpdateAccountDialog = () => {
   const [category, setCategory] = useState({} as Category)

   const searchParams = useSearchParams()
   const router = useRouter()

   const catId = searchParams.get('catId')

   useEffect(() => {
      const getData = async () => {
         const res = await getOneCategory(catId!)

         if (res.category) setCategory(res.category)
      }

      if (catId) getData()
   }, [catId])

   return (
      <MainDialog
         title="Edit category"
         open={catId ? true : false}
         onOpenChange={() => (catId ? router.back() : router.push('?catId'))}
         noBtn
      >
         <CategoriesForm isEdit category={category} />
      </MainDialog>
   )
}

export default UpdateAccountDialog
