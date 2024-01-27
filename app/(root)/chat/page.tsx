import Image from 'next/image'
import { ChatCamera } from './_components/chat-camera'

const ChatPage = () => {
  return (
    <main className="flex flex-grow items-center bg-sigMain px-2">
      <div className="flex h-[96%] w-full items-center justify-center rounded-3xl bg-chat bg-right-bottom px-6">
        <ChatCamera />

        <div className="hidden lg:block">
          <Image src={'/images/snapemoji.png'} alt="snap avatar" width={500} height={500} />
        </div>
      </div>
    </main>
  )
}

export default ChatPage
