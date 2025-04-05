import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const poppins = Poppins({
   weight: ['400', '500', '600', '700'],
   subsets: ['latin'],
})

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div
         className={cn(
            poppins.className,
            'flex min-h-screen flex-col justify-center items-center',
            'bg-[#0f0f0f] text-[#cfcfcf]',
         )}
      >
         {children}
      </div>
   )
}

export default AuthLayout
