'use server'

import { signIn } from '@/auth'

export const loginAction = async () => {
  try {
    await signIn('github')
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error
    }

    return error.message
  }
}
