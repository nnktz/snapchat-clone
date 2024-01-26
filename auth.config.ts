import { NextAuthConfig, Session } from 'next-auth'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    async authorized({ auth, request }) {
      const user = auth?.user

      const isVisitingChatPage = request.nextUrl.pathname.startsWith('/chat')

      const isVisitingAuthPage =
        request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/sign-up')

      if (!user && isVisitingChatPage) {
        return false
      }

      if (user && isVisitingAuthPage) {
        return Response.redirect(new URL('/chat', request.nextUrl))
      }

      return true
    },
  },
}
