'use client'

import { WalletAccounts } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { TrashIcon } from 'lucide-react'
import Link from 'next/link'

import DeleteAccountDialog from './dialogs/delete-account-dialog'
import UpdateAccountDialog from './dialogs/update-account-diablog'
import { DataTable } from '@/components/ui/data-table'

const AccountsTable = ({ data }: { data: WalletAccounts[] }) => {
   const tableData = useMemo(() => (Array.isArray(data) ? data : []), [data])
   const columns: ColumnDef<WalletAccounts>[] = [
      {
         accessorKey: 'name',
         header: 'Name',
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
               <ul className="flex items-center justify-center">
                  <Link href={`?dAcc=${row.original.id}`}>
                     <TrashIcon />
                  </Link>

                  {/* <Link href={`?accId=${row.original.id}`}>
                     <EditIcon />
                  </Link> */}
               </ul>
            )
         },
      },
   ]

   return (
      <div className="w-full">
         <DataTable columns={columns} data={tableData} />
         <DeleteAccountDialog />
         <UpdateAccountDialog />
      </div>
   )
}

export default AccountsTable
