import Link from 'next/link'
import React from 'react'
import { ChevronLeft } from 'lucide-react'

import { getUserProfileById } from '@/data/user'

import { Button } from '@/components/ui/button'
import { ChatUserInfo } from './chat-user-info'
import { DeleteMessageButton } from '@/components/chat/delete-message-button'

export const ChatTopbar = async ({ userId }: { userId: string }) => {
  const user = await getUserProfileById(userId)

  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <div className="flex gap-2">
        <Button
          asChild
          className="h-11 w-11 rounded-full bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover"
        >
          <Link href={'/chat'}>
            <ChevronLeft className="min-w-7" />
          </Link>
        </Button>

        <ChatUserInfo data={user} />
      </div>

      <DeleteMessageButton />
    </div>
  )
}
