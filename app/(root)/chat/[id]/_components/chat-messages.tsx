'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { PopulatedDoc } from 'mongoose'
import type { Session } from 'next-auth'

import { cn } from '@/lib/utils'
import { IMessageDocument } from '@/models/message.model'

import { ChatPreviewImage } from './chat-preview-image'

interface ChatMessagesProps {
  messages: IMessageDocument[] | PopulatedDoc<IMessageDocument>[]
  session: Session | null
}

export const ChatMessages = ({ messages, session }: ChatMessagesProps) => {
  const lastMsgRef = useRef<HTMLDivElement>(null)

  const [isPreviewImage, setIsPreviewImage] = useState({ open: false, imageUrl: '' })

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      {messages.map((message, index) => {
        const amISender = message.sender._id === session?.user._id
        const senderFullName = message.sender.fullName.toUpperCase()
        const isMessageImage = message.messageType === 'image'
        const isPrevMessageFromSameSender =
          index > 0 && messages[index - 1].sender._id === message.sender._id

        const handleImageLoad = () => {
          lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' })
        }

        return (
          <div className="w-full" key={message._id} ref={lastMsgRef}>
            {!isPrevMessageFromSameSender && (
              <p
                className={cn(
                  'mt-2 text-xs font-bold',
                  amISender ? 'text-sigSnapImg' : 'text-sigSnapChat',
                )}
              >
                {amISender ? 'ME' : senderFullName}
              </p>
            )}

            <div
              className={cn(
                'border-l-2',
                amISender ? 'border-l-sigSnapImg' : 'border-l-sigSnapChat',
              )}
            >
              <div className="flex w-1/2 items-center rounded-sm p-2">
                {isMessageImage ? (
                  <div className="relative">
                    <Image
                      src={message.content}
                      width={200}
                      height={200}
                      className="h-auto w-auto cursor-pointer object-cover"
                      alt="image"
                      onLoad={handleImageLoad}
                      onClick={() => setIsPreviewImage({ open: true, imageUrl: message.content })}
                    />
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        )
      })}

      <ChatPreviewImage
        imageUrl={isPreviewImage.imageUrl}
        onOpenChange={() => setIsPreviewImage({ open: false, imageUrl: '' })}
        open={isPreviewImage.open}
      />
    </>
  )
}
