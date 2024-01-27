'use client'

import { useRef, useTransition } from 'react'
import { Loader2, SmilePlus } from 'lucide-react'
import { useParams } from 'next/navigation'

import { sendMessageAction } from '@/actions/message'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Emoji } from './emoji'
import { readFileAsDataURL } from '@/lib/utils'

const emojis = [
  { src: '/emojis/like.gif', alt: 'like' },
  { src: '/emojis/dislike.gif', alt: 'dislike' },
  { src: '/emojis/mind-blown.gif', alt: 'mind blown' },
  { src: '/emojis/laugh.gif', alt: 'laugh' },
  { src: '/emojis/fire.gif', alt: 'fire' },
  { src: '/emojis/question.gif', alt: 'question' },
  { src: '/emojis/love.gif', alt: 'love' },
]

export const EmojiPopover = () => {
  const { id } = useParams<{ id: string }>()
  const popoverRef = useRef<HTMLButtonElement>(null)
  const [isPending, startTransition] = useTransition()

  const handleSendMessage = (imgUrl: string) => {
    try {
      startTransition(async () => {
        const blob = await fetch(imgUrl).then((response) => response.blob())
        const dataUrl = await readFileAsDataURL(blob)

        await sendMessageAction(id, dataUrl, 'image')
      })
    } catch (error) {
      console.error('Error sending emoji message: ', error)
    }
  }

  return (
    <Popover>
      <PopoverTrigger ref={popoverRef} asChild>
        <Button
          disabled={isPending}
          ref={popoverRef}
          className="h-11 w-11 max-w-min rounded-full bg-transparent hover:bg-transparent"
        >
          {!isPending ? (
            <SmilePlus className="scale-150" />
          ) : (
            <Loader2 className="h-8 w-8 animate-spin" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="max-w-80 border border-sigColorBgBorder bg-sigMain">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {emojis.map((item) => (
            <Emoji key={item.src} {...item} onClick={() => handleSendMessage(item.src)} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
