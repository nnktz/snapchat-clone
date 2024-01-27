import { SendMsgInput } from '@/components/chat/send-msg-input'
import { ChatMessage } from './_components/chat-message'
import { ChatTopbar } from './_components/chat-topbar'

const ChatIdPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex h-screen flex-[3_3_0%] flex-col bg-sigMain px-4 text-white">
      <ChatTopbar />

      <div className="my-4 flex-1 overflow-y-auto rounded-xl border border-sigColorBgBorder bg-sigSurface px-3 py-2">
        <div className="flex flex-col">
          <ChatMessage />
        </div>
      </div>

      <SendMsgInput />
    </div>
  )
}

export default ChatIdPage
