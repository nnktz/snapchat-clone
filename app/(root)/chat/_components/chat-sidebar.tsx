import Image from 'next/image'
import { Search } from 'lucide-react'

import { auth } from '@/auth'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogoutButton } from '@/components/shared/logout-button'
import { ChatList } from './chat-list'

export const ChatSidebar = async () => {
  const session = await auth()

  return (
    <aside className="flex flex-[1_1_0%] flex-col bg-black text-white">
      <div className="sticky top-0 z-50 bg-black">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <div className="relative">
            <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
              <AvatarImage src={session?.user?.image!} />
            </Avatar>
          </div>

          <Button className="relative h-8 w-8 rounded-full bg-sigButton p-2 text-white hover:bg-sigButtonHover">
            <Image src={'/images/chat.svg'} fill alt="chat icon" />
          </Button>

          <LogoutButton />
        </div>

        <div className="p-4">
          <div className="flex gap-2 rounded-full border border-sigColorBgBorder bg-sigSurface p-1 text-gray-400">
            <Search className="w-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search"
              className="border-none bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <ChatList />
    </aside>
  )
}
