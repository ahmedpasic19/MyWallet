'use client'

import { InputHTMLAttributes } from 'react'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type TProps = InputHTMLAttributes<HTMLInputElement> & {
   desc?: string
   name: string
   label: string
   placeholder?: string
}

export function DateField({ desc, placeholder, name, label, ...props }: TProps) {
   const form = useFormContext()

   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel>{label}</FormLabel>
               <Popover>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant={'outline'}
                           className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                           )}
                        >
                           {field.value ? format(field.value, 'PPP') : <span>{placeholder}</span>}
                           <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                        mode="single"
                        selected={field.value}
                        // @ts-expect-error // date picker onChange type
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                        initialFocus
                        {...props}
                     />
                  </PopoverContent>
               </Popover>
               {desc ? <FormDescription>{desc}</FormDescription> : null}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
