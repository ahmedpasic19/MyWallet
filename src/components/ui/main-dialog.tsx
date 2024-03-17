import React from 'react'

import { buttonVariants } from './button'
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
   noBtn,
}: {
   btnLabel?: string
   title: string
   desc?: string
   children: React.ReactNode
   onOpenChange: () => void
   open: boolean
   noBtn?: boolean
}) => {
   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         {!noBtn ? <DialogTrigger className={buttonVariants()}>{btnLabel}</DialogTrigger> : null}
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
