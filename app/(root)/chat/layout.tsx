import { ChatSidebar } from './_components/chat-sidebar'

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="flex h-screen">
      <ChatSidebar />
      {children}
    </main>
  )
}

export default ChatLayout
