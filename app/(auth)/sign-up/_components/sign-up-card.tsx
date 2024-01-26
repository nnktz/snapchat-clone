import Link from 'next/link'

import { OauthButton } from '../../_components/oauth-button'

export const SignUpCard = () => {
  return (
    <>
      <form action="" className="space-y-4">
        <OauthButton />
      </form>

      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account?</span>{' '}
        <Link href={'/login'} className="mr-1 text-[13px] text-blue-500 hover:underline">
          Log in
        </Link>
      </div>
    </>
  )
}
