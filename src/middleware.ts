import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
   const { nextUrl } = req
   const isLoggedIn = !!req.auth

   console.log('islogged in', isLoggedIn)

   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
   const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
   const isAuthRoute = authRoutes.includes(nextUrl.pathname)
   const isLandingPage = nextUrl.pathname === '/'

   if (isLandingPage) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
   }

   if (isApiAuthRoute) {
      return
   }

   if (isAuthRoute) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      return
   }

   if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname
      if (nextUrl.search) {
         callbackUrl += nextUrl.search
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl)

      console.log('callback URL', encodedCallbackUrl)

      return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
   }

   return
})

// Optionally, don't invoke Middleware on some paths
export const config = {
   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/(api|trpc)(.*)'],
}
