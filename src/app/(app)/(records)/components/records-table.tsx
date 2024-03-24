'use client'

import { Record, RecordType } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import DeleteRecordDialog from './dialogs/delete-record-dialog'
import UpdateRecordDialog from './dialogs/update-record-dialog'
import { DataTable } from '@/components/ui/data-table'

const RecordsTable = ({ data, type }: { data: Record[]; type: RecordType }) => {
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
                  <Link
                     href={`?dRec=${row.original.id}&type=${row.original.type.toLocaleLowerCase()}`}
                  >
                     <TrashIcon />
                  </Link>

                  <Link
                     href={`?recId=${row.original.id}&type=${row.original.type.toLocaleLowerCase()}`}
                  >
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
         <DeleteRecordDialog type={type} />
         <UpdateRecordDialog type={type} />
      </div>
   )
}

export default RecordsTable
