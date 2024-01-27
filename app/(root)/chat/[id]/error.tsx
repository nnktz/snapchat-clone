'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const Error = ({ error }: { error: Error & { digest?: string } }) => {
  let errorMessage = error.message

  if (error.message.startsWith('Cast to ObjectId failed')) {
    errorMessage = 'User not found'
  }

  return (
    <main className="flex flex-[3_3_0%] flex-col items-center justify-center bg-[#dad83cf4]">
      <Image src={'/images/hero.png'} alt="hero image" width={500} height={500} />
      <h2 className="text-center">{errorMessage}</h2>

      <Button
        asChild
        className="mt-4 rounded-md bg-sigSurface px-4 py-2 text-sm text-white transition-colors hover:bg-sigMain"
      >
        <Link href={'/chat'}>Go back to Chat</Link>
      </Button>
    </main>
  )
}

export default Error
