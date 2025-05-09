'use client'

import { zodResolver } from '@hookform/resolvers/zod'

import { useState, useTransition } from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { login } from '@/actions/login'
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
import { LoginSchema } from '@/schemas/auth.schema'

export const LoginForm = () => {
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get('callbackUrl')
   const urlError =
      searchParams.get('error') === 'OAuthAccountNotLinked'
         ? 'Email already in use with different provider!'
         : ''

   const [showTwoFactor, setShowTwoFactor] = useState(false)
   const [error, setError] = useState<string | undefined>('')
   const [success, setSuccess] = useState<string | undefined>('')
   const [isPending, startTransition] = useTransition()

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      setError('')
      setSuccess('')

      startTransition(() => {
         login(values, callbackUrl)
            .then((data) => {
               if (data?.error) {
                  form.reset()
                  setError(data.error)
               }

               if (data?.success) {
                  form.reset()
                  setSuccess(data.success)
               }

               if (data?.twoFactor) {
                  setShowTwoFactor(true)
               }
            })
            .catch(() => setError('Something went wrong'))
      })
   }

   return (
      <CardWrapper
         headerLabel="Welcome back"
         headerDescription="Enter your email and password to access your account"
         backButtonLabel="Don't have an account?"
         backButtonHref="/auth/register"
         showSocial
      >
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  {showTwoFactor && (
                     <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-[#cfcfcf]">Two Factor Code</FormLabel>
                              <FormControl>
                                 <Input
                                    className="bg-[#1a1a1a] outline-[#ffbe1b] text-[#cfcfcf]"
                                    {...field}
                                    disabled={isPending}
                                    placeholder="123456"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  )}
                  {!showTwoFactor && (
                     <>
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
                                 <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal text-[#FFBE1B]"
                                 >
                                    <Link href="/auth/reset">Forgot password?</Link>
                                 </Button>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </>
                  )}
               </div>
               <FormError message={error || urlError} />
               <FormSuccess message={success} />
               <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full bg-[#51A800] hover:bg-[#51a800] disabled:bg-[#51a800]/90 text-black"
               >
                  {showTwoFactor ? 'Confirm' : 'Login'}
               </Button>
            </form>
         </Form>
      </CardWrapper>
   )
}
