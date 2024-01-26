import NextAuth from 'next-auth'
import github from 'next-auth/providers/github'
import { connectToDB } from './lib/db'
import User from './models/user.model'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'github') {
        await connectToDB()

        try {
          const user = await User.findOne({ email: profile?.email })

          if (!user) {
            const newUser = await User.create({
              username: profile?.login,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.avatar_url,
            })

            await newUser.save()
          }

          return true
        } catch (error) {
          console.error(error)
          return false
        }
      }

      return false
    },
  },
})
