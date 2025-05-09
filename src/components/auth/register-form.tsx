'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useState, useTransition } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { register } from '@/actions/register'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterSchema } from '@/schemas/auth.schema'

export const RegisterForm = () => {
   const [error, setError] = useState<string | undefined>('')
   const [success, setSuccess] = useState<string | undefined>('')
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         email: '',
         password: '',
         name: '',
      },
   })

   const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setError('')
      setSuccess('')

      startTransition(() => {
         register(values).then((data) => {
            setError(data.error)
            setSuccess(data.success)
         })
      })
   }

   return (
      <CardWrapper
         headerLabel="Create an account"
         headerDescription="Enter your details to create a new account"
         backButtonLabel="Already have an account?"
         backButtonHref="/auth/login"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-[#cfcfcf]">Name</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-[#1a1a1a] outline-[#ffbe1b] text-[#cfcfcf]"
                                 {...field}
                                 disabled={isPending}
                                 placeholder="John Doe"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-[#cfcfcf]">Email</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-[#1a1a1a] outline-[#ffbe1b] text-[#cfcfcf]"
                                 {...field}
                                 disabled={isPending}
                                 placeholder="john.doe@example.com"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-[#cfcfcf]">Password</FormLabel>
                           <FormControl>
                              <Input
                                 className="bg-[#1a1a1a] outline-[#ffbe1b] text-[#cfcfcf]"
                                 {...field}
                                 disabled={isPending}
                                 placeholder="******"
                                 type="password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-[#51A800] hover:bg-[#51a800] disabled:bg-[#51a800]/90 text-black"
               >
                  Create an account
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
