import React from 'react'

import { buttonVariants } from './button'
import MainDrawer from './main-drawer'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import useMediaQuery from '@/hooks/use-media-query'

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
   const isDesktop = useMediaQuery('(min-width: 768px)')

   if (isDesktop)
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

   return (
      <MainDrawer
         title={title}
         open={open}
         onOpenChange={onOpenChange}
         btnLabel={btnLabel}
         noBtn={noBtn}
      >
         {children}
      </MainDrawer>
   )
}

export default MainDialog
