import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

import type { AuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '@/env/server.mjs'

const db = new PrismaClient()

export const options: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        name: { label: 'Name', type: 'text', placeholder: 'jhondoe' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-expect-error // credentials type
      async authorize(credentials) {
        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
          username: credentials?.name,
          password: credentials?.password,
        })

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
        }

        const res = await fetch(
          `${env.NEXTAUTH_URL}/api/auth/login`,
          requestOptions
        )

        if (res.ok) {
          const response = (await res.json()) as
            | { user: User; access_token: string }
            | undefined
          console.log('res', response)

          // check if user exists
          if (response?.user && response?.access_token) {
            return { ...response.user, access_token: response.access_token }
          }
        } else {
          // Return null if login fails
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NODE_ENV === 'development',
}
