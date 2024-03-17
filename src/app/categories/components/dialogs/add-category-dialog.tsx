'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import CategoriesForm from '../categories-form'

import MainDialog from '@/components/ui/main-dialog'

const AddCategoryDialog = () => {
   const searchParams = useSearchParams()
   const router = useRouter()

   const isOpen = searchParams.get('addCategory') === 'true'

   return (
      <MainDialog
         title="Add new category"
         open={isOpen}
         onOpenChange={() => (isOpen ? router.back() : router.push('?addCategory=true'))}
         btnLabel="Add new"
      >
         <CategoriesForm />
      </MainDialog>
   )
}

export default AddCategoryDialog
