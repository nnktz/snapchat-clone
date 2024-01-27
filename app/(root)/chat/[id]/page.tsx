import { auth } from '@/auth'
import { getMessages } from '@/data/message'

import { SendMsgInput } from '@/components/chat/send-msg-input'
import { ChatMessages } from './_components/chat-messages'
import { ChatTopbar } from './_components/chat-topbar'

const ChatIdPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth()

  const messages = session ? await getMessages(session.user._id, params.id) : []

  return (
    <div className="flex h-screen flex-[3_3_0%] flex-col bg-sigMain px-4 text-white">
      <ChatTopbar userId={params.id} />

      <div className="my-4 flex-1 overflow-y-auto rounded-xl border border-sigColorBgBorder bg-sigSurface px-3 py-2">
        <div className="flex flex-col">
          <ChatMessages messages={messages} session={session} />
        </div>
      </div>

      <SendMsgInput />
    </div>
  )
}

export default ChatIdPage
