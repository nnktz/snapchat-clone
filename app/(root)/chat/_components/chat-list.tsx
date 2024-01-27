import { auth } from '@/auth'
import { getUsers } from '@/data/user'

import { ChatItem } from './chat-item'

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
