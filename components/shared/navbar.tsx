import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

export const Navbar = () => {
  return (
    <header className="flex w-full items-center justify-between px-8 py-4">
      <Link href={'/'}>
        <Image src={'/images/logo.svg'} alt="logo" width={40} height={40} className="select-none" />
      </Link>

      <div className="flex space-x-1">
        <Button className="bg-transparent text-black hover:bg-primary/5">Stories</Button>
        <Button className="bg-transparent text-black hover:bg-primary/5">Spotlight</Button>
        <Button className="bg-transparent text-black hover:bg-primary/5" asChild>
          <Link href={'/chat'}>Chat</Link>
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button className="rounded-full bg-black p-3 text-xs text-white md:text-sm">
          Watch tutorial
        </Button>

        <form action="">
          <Button className="rounded-full bg-black p-3 text-xs text-white md:text-sm">
            <LogOut className="cursor-pointer" />
          </Button>
        </form>
      </div>
    </header>
  )
}
