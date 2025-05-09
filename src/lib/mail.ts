import { Resend } from 'resend'

import { env as serverEnv } from '@/env/server.mjs'

const resend = new Resend(serverEnv.RESEND_API_KEY)

const domain = serverEnv.NEXTAUTH_URL

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
   await resend.emails.send({
      from: serverEnv.MAIL_FROM,
      to: email,
      subject: '2FA Code',
      html: `<p>Your 2FA code: ${token}</p>`,
   })
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
   const resetLink = `${domain}/auth/new-password?token=${token}`

   await resend.emails.send({
      from: serverEnv.MAIL_FROM,
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
   })
}

export const sendVerificationEmail = async (email: string, token: string) => {
   const confirmLink = `${domain}/auth/new-verification?token=${token}`

   await resend.emails.send({
      from: serverEnv.MAIL_FROM,
      to: email,
      subject: 'Confirm your email',
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
   })
}
