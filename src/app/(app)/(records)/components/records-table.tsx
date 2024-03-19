'use client'

import { Record } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import DeleteRecordDialog from './dialogs/delete-record-dialog'
import UpdateRecordDialog from './dialogs/update-record-dialog'
import { DataTable } from '@/components/ui/data-table'

const RecordsTable = ({ data }: { data: Record[] }) => {
   const tableData = useMemo(() => (Array.isArray(data) ? data : []), [data])
   const columns: ColumnDef<Record>[] = [
      {
         accessorKey: 'title',
         header: 'Title',
      },
      {
         accessorKey: 'amount',
         header: 'Amount',
      },
      {
         accessorKey: 'category.name',
         header: 'Category',
      },
      {
         accessorKey: 'goal.name',
         header: 'Goal',
      },
      {
         accessorKey: 'account.name',
         header: 'Account',
      },
      {
         accessorKey: 'note',
         header: 'Note',
      },
      {
         accessorKey: 'date',
         header: 'Date',
         cell: ({ row }) => format(new Date(row.original.date), 'dd.MM.yyyy'),
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
                  <Link href={`?dRec=${row.original.id}`}>
                     <TrashIcon />
                  </Link>

                  <Link href={`?recId=${row.original.id}`}>
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
         <DeleteRecordDialog />
         <UpdateRecordDialog />
      </div>
   )
}

export default RecordsTable
