'use client'

import Image from 'next/image'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'

export const OauthButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending} className="flex w-full gap-2">
      <Image src={'/images/github.svg'} alt="github logo" width={20} height={20} /> Login in with
      Github
    </Button>
  )
}
