import Link from 'next/link'

import { OauthButton } from '../../_components/oauth-button'

export const LoginCard = () => {
  return (
    <>
      <form action="" className="space-y-4">
        <OauthButton />
      </form>

      <div className="mt-4 text-center text-[13px]">
        <span>New SnapChat?</span>{' '}
        <Link href={'/sign-up'} className="mr-1 text-[13px] text-blue-500 hover:underline">
          Sign up
        </Link>
      </div>
    </>
  )
}
