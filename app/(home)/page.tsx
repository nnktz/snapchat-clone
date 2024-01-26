import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from '@/components/shared/navbar'
import { Button } from '@/components/ui/button'
import { auth } from '@/auth'

const HomePage = async () => {
  const session = await auth()

  return (
    <div className="bg-[#fffc00]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center">
        <Navbar />

        <main className="mt-4 flex flex-1 flex-col items-center justify-center px-8 md:flex-row">
          <div className="h-full flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold md:text-6xl">SnapChat 4 programers!</h1>

            <p className="mt-4 text-xl font-semibold">
              Share your code with your friends to get feedback and improve your code.
            </p>

            <div className="mt-4">
              <p className="mt-2 text-lg font-semibold">What are you waiting for?</p>
            </div>

            {!session ? (
              <Button
                asChild
                className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-black text-white md:mx-0"
              >
                <Link href={'/login'} className="max-w-max">
                  <Image src={'/images/logo.svg'} alt="logo" width={20} height={20} />
                  Login in to explore
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-black text-white md:mx-0"
              >
                <Link href={'/chat'} className="max-w-max">
                  <Image src={'/images/logo.svg'} alt="logo" width={20} height={20} />
                  Start chatting
                </Link>
              </Button>
            )}
          </div>

          <div className="flex-1 md:flex md:w-full">
            <Image src={'/images/hero.png'} alt="avatar" width={651} height={621} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage
