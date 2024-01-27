'use client'

import { useRef } from 'react'
import { SmilePlus } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Emoji } from './emoji'

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
  const popoverRef = useRef<HTMLButtonElement>(null)

  return (
    <Popover>
      <PopoverTrigger ref={popoverRef} asChild>
        <Button
          ref={popoverRef}
          className="h-11 w-11 max-w-min rounded-full bg-transparent hover:bg-transparent"
        >
          <SmilePlus className="scale-150" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="max-w-80 border border-sigColorBgBorder bg-sigMain">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {emojis.map((item) => (
            <Emoji key={item.src} {...item} onClick={() => {}} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
