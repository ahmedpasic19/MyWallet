'use client'

import { Transfer } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { EditIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'

import DeleteTransferDialog from './dialogs/delete-record-dialog'
import UpdateTransferDialog from './dialogs/update-record-dialog'
import { DataTable } from '@/components/ui/data-table'

const TransfersTable = ({ data }: { data: Transfer[] }) => {
   const tableData = useMemo(() => (Array.isArray(data) ? data : []), [data])
   const columns: ColumnDef<Transfer>[] = [
      {
         accessorKey: 'title',
         header: 'Title',
      },
      {
         accessorKey: 'amount',
         header: 'Amount',
      },
      {
         accessorKey: 'accountFrom.name',
         header: 'Account From',
      },
      {
         accessorKey: 'accountTo.name',
         header: 'Account To',
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
                  <Link href={`?dTra=${row.original.id}`}>
                     <TrashIcon />
                  </Link>

                  <Link href={`?traId=${row.original.id}`}>
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
         <DeleteTransferDialog />
         <UpdateTransferDialog />
      </div>
   )
}

export default TransfersTable
