import { auth } from '@/auth'
import { getUsers } from '@/data/user'

import { ChatItem } from './chat-item'
import { Skeleton } from '@/components/ui/skeleton'

export const ChatList = async () => {
  const session = await auth()

  const chats = session?.user ? await getUsers(session.user._id) : []

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {chats.map((chat) => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
      </ul>
    </nav>
  )
}

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 px-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="flex items-center space-x-4" key={i}>
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
