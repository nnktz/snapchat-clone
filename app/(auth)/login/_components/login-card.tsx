'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'

import { loginAction } from '@/actions/login'

import { OauthButton } from '../../_components/oauth-button'

export const LoginCard = () => {
  const [errorMessage, dispatch] = useFormState(loginAction, '')

  return (
    <>
      <form action={dispatch} className="space-y-4">
        <OauthButton />
      </form>

      <div className="mt-4 text-center text-[13px]">
        <span>New SnapChat?</span>{' '}
        <Link href={'/sign-up'} className="mr-1 text-[13px] text-blue-500 hover:underline">
          Sign up
        </Link>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    </>
  )
}
