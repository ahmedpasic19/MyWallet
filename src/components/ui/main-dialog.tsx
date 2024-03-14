import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const MainDialog = ({
  btnLabel,
  title,
  desc,
  children,
  onOpenChange,
  open,
}: {
  btnLabel: string
  title: string
  desc?: string
  children: React.ReactNode
  onOpenChange: () => void
  open: boolean
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{btnLabel}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {children}

          {desc && desc.length && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default MainDialog
