'use client'

import Image from 'next/image'
import { useRef, useState, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { sendMessageAction } from '@/actions/message'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { TextMessageSent } from '../svgs'
import { EmojiPopover } from './emoji-popover'

export const SendMsgInput = () => {
  const params = useParams<{ id: string }>()

  const receiverId = params.id

  const inputRef = useRef<HTMLInputElement>(null)
  const [messageContent, setMessageContent] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      startTransition(async () => {
        await sendMessageAction(receiverId, messageContent, 'text')
        setMessageContent('')
      })
    } catch (error) {
      console.error(error)
    } finally {
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sigBackgroundSecondaryHover">
        <Image
          src={'/images/camera.svg'}
          alt="camera icon"
          width={0}
          height={0}
          style={{ width: '20px', height: 'auto' }}
        />
      </div>

      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-1 items-center gap-1 rounded-full border border-sigColorBgBorder bg-sigBackgroundSecondaryHover"
      >
        <Input
          ref={inputRef}
          placeholder="Send a chat"
          className="h-full w-full rounded-full border-none bg-transparent outline-none focus:outline-transparent"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          disabled={isPending}
          autoFocus
        />

        <Button
          type="submit"
          disabled={isPending}
          size={'sm'}
          className="bg-transparent text-sigSnapChat hover:bg-transparent"
        >
          {!isPending && <TextMessageSent className="mr-1 scale-150" />}
          {isPending && <Loader2 className="h-6 w-6 animate-spin" />}
        </Button>
      </form>

      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sigBackgroundSecondaryHover text-white">
        <EmojiPopover />
      </div>
    </div>
  )
}
