'use client'

import React, { InputHTMLAttributes } from 'react'

import { useFormContext } from 'react-hook-form'

import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type TProps = InputHTMLAttributes<HTMLInputElement> & {
   desc?: string
   name: string
   label: string
   placeholder?: string
   options: { label: string; value: string }[]
   value?: string
}

const SelectField = ({ desc, placeholder, name, label, options, value, ...props }: TProps) => {
   const form = useFormContext()

   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value} value={value}>
                  <FormControl>
                     <SelectTrigger>
                        <SelectValue placeholder={placeholder} {...props} />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     {options.map((option) => (
                        <SelectItem key={Math.random()} value={option.value}>
                           {option.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {desc ? <FormDescription>{desc}</FormDescription> : null}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default SelectField
