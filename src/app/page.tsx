import { ArrowUpDown, BarChart3, CreditCard, Leaf, LineChart, PieChart, Wallet } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import { IMAGES } from '@/assets/urls'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const poppins = Poppins({
   weight: ['400', '500', '600', '700'],
   subsets: ['latin'],
})

export default function Home() {
   return (
      <div
         className={cn(
            poppins.className,
            'flex min-h-screen flex-col',
            'bg-[#212121] text-[#cfcfcf]',
         )}
      >
         <header className="sticky top-0 z-40 w-full border-b border-[#1f1f1f] bg-[#212121]/70 backdrop-blur-md">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
               <div className="flex gap-2 items-center text-xl font-bold">
                  <Wallet className="h-6 w-6 text-[#FFBE1B]" />
                  <span>MyWallet</span>
               </div>
               <div className="flex flex-1 items-center justify-end space-x-4">
                  <nav className="flex items-center space-x-6">
                     <Link
                        href="#features"
                        className="text-sm font-medium transition-colors hover:text-[#FFBE1B]"
                     >
                        Features
                     </Link>
                     <Link
                        href="#testimonials"
                        className="text-sm font-medium transition-colors hover:text-[#FFBE1B] mx-4"
                     >
                        Testimonials
                     </Link>
                     <Link
                        href="#pricing"
                        className="text-sm font-medium transition-colors hover:text-[#FFBE1B]"
                     >
                        Pricing
                     </Link>
                     <Link
                        href={'/auth/register'}
                        className={`${buttonVariants({ variant: 'default:' })} ml-4 bg-[#FFBE1B] text-[#0f0f0f] hover:bg-[#FFBE1B]/90`}
                     >
                        Sign Up
                     </Link>
                  </nav>
               </div>
            </div>
         </header>
         <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
               <div className="container px-4 md:px-6">
                  <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                     <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                           <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                              Take Control of Your Finances
                           </h1>
                           <p className="max-w-[600px] text-[#a0a0a0] md:text-xl">
                              MyWallet helps you track expenses, manage budgets, and achieve your
                              financial goals with ease.
                           </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                           <Link
                              href={'/auth/register'}
                              className={`${buttonVariants({ variant: 'default:', size: 'lg' })} ml-4 bg-[#FFBE1B] text-[#0f0f0f] hover:bg-[#FFBE1B]/90`}
                           >
                              Get Started
                           </Link>
                        </div>
                     </div>
                     <div className="flex items-center justify-center">
                        <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px]">
                           <div className="absolute inset-0 bg-gradient-to-r from-[#FFBE1B]/20 to-[#51A800]/20 rounded-full blur-3xl" />
                           <Image
                              src={IMAGES.LOGO_IMAGE}
                              alt="Dashboard Preview"
                              className="relative z-10 mx-auto h-auto max-w-full rounded-lg shadow-xl"
                              width={450}
                              height={450}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section id="features" className="w-full py-12 md:py-24 lg:py-32">
               <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                     <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-[#FFBE1B] px-3 py-1 text-sm text-[#0f0f0f]">
                           Features
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                           Everything You Need to Manage Your Money
                        </h2>
                        <p className="max-w-[900px] text-[#a0a0a0] md:text-xl">
                           MyWallet provides powerful tools to help you understand and improve your
                           financial health.
                        </p>
                     </div>
                  </div>
                  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                     <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="rounded-full bg-[#FFBE1B]/20 p-3">
                           <BarChart3 className="h-6 w-6 text-[#FFBE1B]" />
                        </div>
                        <h3 className="text-xl font-bold">Expense Tracking</h3>
                        <p className="text-center text-[#a0a0a0]">
                           Easily log and categorize your expenses to see where your money is going.
                        </p>
                     </div>
                     <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="rounded-full bg-[#51A800]/20 p-3">
                           <PieChart className="h-6 w-6 text-[#51A800]" />
                        </div>
                        <h3 className="text-xl font-bold">Budget Planning</h3>
                        <p className="text-center text-[#a0a0a0]">
                           {
                              "Create custom budgets and get alerts when you're approaching your limits."
                           }
                        </p>
                     </div>
                     <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="rounded-full bg-[#FFBE1B]/20 p-3">
                           <LineChart className="h-6 w-6 text-[#FFBE1B]" />
                        </div>
                        <h3 className="text-xl font-bold">Financial Insights</h3>
                        <p className="text-center text-[#a0a0a0]">
                           Get personalized insights and recommendations to improve your financial
                           health.
                        </p>
                     </div>
                     <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="rounded-full bg-[#51A800]/20 p-3">
                           <CreditCard className="h-6 w-6 text-[#51A800]" />
                        </div>
                        <h3 className="text-xl font-bold">Bill Reminders</h3>
                        <p className="text-center text-[#a0a0a0]">
                           Never miss a payment with automated bill reminders and payment tracking.
                        </p>
                     </div>
                     <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="rounded-full bg-[#FFBE1B]/20 p-3">
                           <ArrowUpDown className="h-6 w-6 text-[#FFBE1B]" />
                        </div>
                        <h3 className="text-xl font-bold">Income Tracking</h3>
                        <p className="text-center text-[#a0a0a0]">
                           Track multiple income sources and analyze your earning patterns over
                           time.
                        </p>
                     </div>
                     <div className="flex flex-col items-center space-y-2 rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="rounded-full bg-[#51A800]/20 p-3">
                           <Leaf className="h-6 w-6 text-[#51A800]" />
                        </div>
                        <h3 className="text-xl font-bold">Goal Setting</h3>
                        <p className="text-center text-[#a0a0a0]">
                           Set financial goals and track your progress with visual indicators and
                           milestones.
                        </p>
                     </div>
                  </div>
               </div>
            </section>
            <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
               <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                     <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-[#FFBE1B] px-3 py-1 text-sm text-[#0f0f0f]">
                           Testimonials
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                           What Our Users Say
                        </h2>
                        <p className="max-w-[900px] text-[#a0a0a0] md:text-xl">
                           Thousands of people have transformed their financial lives with MyWallet.
                        </p>
                     </div>
                  </div>
                  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                     <div className="flex flex-col justify-between rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="space-y-2">
                           <p className="text-[#a0a0a0]">
                              {`"MyWallet has completely changed how I manage my money. I finally have
                              clarity on my spending habits and have saved over $3,000 in just six
                              months!"`}
                           </p>
                        </div>
                        <div className="mt-6 flex items-center">
                           <div className="h-10 w-10 rounded-full bg-[#FFBE1B]/20" />
                           <div className="ml-4">
                              <p className="text-sm font-medium">Sarah Johnson</p>
                              <p className="text-sm text-[#a0a0a0]">Marketing Manager</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-between rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="space-y-2">
                           <p className="text-[#a0a0a0]">
                              {`"The budgeting features are incredible. I can easily set limits for
                              different categories and the app notifies me when I'm getting close to
                              my limit. Game changer!"`}
                           </p>
                        </div>
                        <div className="mt-6 flex items-center">
                           <div className="h-10 w-10 rounded-full bg-[#51A800]/20" />
                           <div className="ml-4">
                              <p className="text-sm font-medium">Michael Chen</p>
                              <p className="text-sm text-[#a0a0a0]">Software Engineer</p>
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-col justify-between rounded-lg border border-[#1f1f1f] p-6 shadow-sm">
                        <div className="space-y-2">
                           <p className="text-[#a0a0a0]">
                              {`"As a freelancer with irregular income, MyWallet has been essential
                              for managing my finances. The insights help me plan for taxes and lean
                              months."`}
                           </p>
                        </div>
                        <div className="mt-6 flex items-center">
                           <div className="h-10 w-10 rounded-full bg-[#FFBE1B]/20" />
                           <div className="ml-4">
                              <p className="text-sm font-medium">Emma Rodriguez</p>
                              <p className="text-sm text-[#a0a0a0]">Freelance Designer</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
               <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                     <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-[#FFBE1B] px-3 py-1 text-sm text-[#0f0f0f]">
                           Pricing
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                           Simple, Transparent Pricing
                        </h2>
                        <p className="max-w-[900px] text-[#a0a0a0] md:text-xl">
                           Choose the plan that works best for your financial needs.
                        </p>
                     </div>
                  </div>
                  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
                     <div className="flex flex-col rounded-lg border border-[#1f1f1f] shadow-sm">
                        <div className="p-6">
                           <h3 className="text-2xl font-bold">Free</h3>
                           <div className="mt-4 text-3xl font-bold">$0</div>
                           <p className="mt-1 text-sm text-[#a0a0a0]">Forever free</p>
                           <ul className="mt-6 space-y-3">
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Basic expense tracking
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Up to 3 budgets
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Monthly reports
                              </li>
                           </ul>
                        </div>
                        <div className="flex flex-col p-6 pt-0">
                           <Button className="bg-[#FFBE1B] text-[#0f0f0f] hover:bg-[#FFBE1B]/90">
                              Get Started
                           </Button>
                        </div>
                     </div>
                     <div className="relative flex flex-col rounded-lg border border-[#1f1f1f] shadow-sm">
                        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-[#FFBE1B] px-3 py-1 text-xs font-medium text-[#0f0f0f]">
                           Popular
                        </div>
                        <div className="p-6">
                           <h3 className="text-2xl font-bold">Premium</h3>
                           <div className="mt-4 text-3xl font-bold">$9.99</div>
                           <p className="mt-1 text-sm text-[#a0a0a0]">Per month, billed monthly</p>
                           <ul className="mt-6 space-y-3">
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Advanced expense tracking
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Unlimited budgets
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Bill reminders
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Financial insights
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Goal tracking
                              </li>
                           </ul>
                        </div>
                        <div className="flex flex-col p-6 pt-0">
                           <Button className="bg-[#FFBE1B] text-[#0f0f0f] hover:bg-[#FFBE1B]/90">
                              Get Started
                           </Button>
                        </div>
                     </div>
                     <div className="flex flex-col rounded-lg border border-[#1f1f1f] shadow-sm">
                        <div className="p-6">
                           <h3 className="text-2xl font-bold">Business</h3>
                           <div className="mt-4 text-3xl font-bold">$19.99</div>
                           <p className="mt-1 text-sm text-[#a0a0a0]">Per month, billed monthly</p>
                           <ul className="mt-6 space-y-3">
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Everything in Premium
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Business expense categories
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Tax preparation reports
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Multiple users
                              </li>
                              <li className="flex items-center">
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 h-4 w-4 text-[#51A800]"
                                 >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
                                 Priority support
                              </li>
                           </ul>
                        </div>
                        <div className="flex flex-col p-6 pt-0">
                           <Button
                              variant="outline"
                              className="bg-[#51A800] hover:bg-[#51A800]/90 text-[#0f0f0f] border-none"
                           >
                              Contact Sales
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
               <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                  <div className="space-y-2">
                     <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                        Ready to take control of your finances?
                     </h2>
                     <p className="max-w-[600px] text-[#a0a0a0] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Join thousands of users who have transformed their financial lives with
                        MyWallet.
                     </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                     <Link
                        href={'/auth/register'}
                        className={`${buttonVariants({ variant: 'default:', size: 'lg' })} ml-4 bg-[#FFBE1B] text-[#0f0f0f] hover:bg-[#FFBE1B]/90`}
                     >
                        Get Started
                     </Link>
                  </div>
               </div>
            </section>
         </main>
         <footer className="w-full border-t border-[#1f1f1f] py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
               <div className="flex gap-2 items-center text-lg font-bold">
                  <Wallet className="h-5 w-5 text-[#FFBE1B]" />
                  <span>MyWallet</span>
               </div>
               <p className="text-center text-sm leading-loose text-[#a0a0a0] md:text-left">
                  © 2025 MyWallet. All rights reserved.
               </p>
               <div className="flex gap-4">
                  <Link href="#" className="text-sm text-[#a0a0a0] hover:text-[#cfcfcf]">
                     Terms
                  </Link>
                  <Link href="#" className="text-sm text-[#a0a0a0] hover:text-[#cfcfcf]">
                     Privacy
                  </Link>
                  <Link href="#" className="text-sm text-[#a0a0a0] hover:text-[#cfcfcf]">
                     Contact
                  </Link>
               </div>
            </div>
         </footer>
      </div>
   )
}
