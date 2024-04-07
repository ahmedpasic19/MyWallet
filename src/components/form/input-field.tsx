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
import { Input } from '../ui/input'

type TProps = InputHTMLAttributes<HTMLInputElement> & {
   desc?: string
   name: string
   label: string
   placeholder?: string
}

const InputField = ({ desc, placeholder, name, label, ...props }: TProps) => {
   const form = useFormContext()

   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel>{label}</FormLabel>
               <FormControl>
                  <Input
                     type={props.type ?? 'text'}
                     placeholder={placeholder}
                     {...field}
                     {...props}
                  />
               </FormControl>
               {desc ? <FormDescription>{desc}</FormDescription> : null}
               <FormMessage />
            </FormItem>
         )}
      />
   )
}

export default InputField
