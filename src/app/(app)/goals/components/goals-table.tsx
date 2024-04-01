'use client'

import { Goal } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { TrashIcon } from 'lucide-react'
import Link from 'next/link'

import DeleteGoalDialog from './dialogs/delete-goal-dialog'
import UpdateGoalDialog from './dialogs/update-goal-diablog'
import { DataTable } from '@/components/ui/data-table'

const GoalsTable = ({ data }: { data: Goal[] }) => {
   const tableData = useMemo(() => (Array.isArray(data) ? data : []), [data])
   const columns: ColumnDef<Goal>[] = [
      {
         accessorKey: 'name',
         header: 'Name',
      },
      {
         accessorKey: 'target',
         header: 'Target',
      },
      {
         accessorKey: 'initialAmount',
         header: 'Initial Amount',
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
                  <Link href={`?dGoal=${row.original.id}`}>
                     <TrashIcon />
                  </Link>

                  {/* <Link href={`?goalId=${row.original.id}`}>
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
         <DeleteGoalDialog />
         <UpdateGoalDialog />
      </div>
   )
}

export default GoalsTable
