'use client'

import { Category } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import DeleteCategoryDialog from './dialogs/delete-category-dialog'
import UpdateCategoryDialog from './dialogs/update-category-diablog'
import { DataTable } from '@/components/ui/data-table'

const CategoriesTable = ({ data }: { data: Category[] }) => {
   const tableData = useMemo(() => (Array.isArray(data) ? data : []), [data])
   const columns: ColumnDef<Category>[] = [
      {
         accessorKey: 'name',
         header: 'Name',
      },
      {
         accessorKey: 'budget',
         header: 'Monthy Budget',
      },
      {
         accessorKey: 'note',
         header: 'Note',
      },
      {
         accessorKey: 'createdAt',
         header: 'Date Added',
         cell: ({ row }) => format(new Date(row.original.createdAt), 'dd.MM.yyyy'),
      },
      {
         accessorKey: 'actions',
         header: 'Actions',
         cell: ({ row }) => {
            return (
               <ul className="flex gap-2">
                  <Link href={`?dCat=${row.original.id}`}>
                     <TrashIcon />
                  </Link>

                  <Link href={`?catId=${row.original.id}`}>
                     <EditIcon />
                  </Link>
               </ul>
            )
         },
      },
   ]

   return (
      <div className="w-full">
         <DataTable columns={columns} data={tableData} />
         <DeleteCategoryDialog />
         <UpdateCategoryDialog />
      </div>
   )
}

export default CategoriesTable
