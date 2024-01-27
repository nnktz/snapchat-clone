'use client'

import Image from 'next/image'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

const messages = [
  {
    _id: '1',
    content: 'hello e',
    sender: {
      _id: '1',
      fullName: 'Son Tung',
    },
    messageType: 'text',
  },
  {
    _id: '2',
    content: 'chao xin',
    sender: {
      _id: '2',
      fullName: 'Thao Vy',
    },
    messageType: 'text',
  },
  {
    _id: '3',
    content: 'anh oi',
    sender: {
      _id: '2',
      fullName: 'Thao Vy',
    },
    messageType: 'text',
  },
  {
    _id: '4',
    content: 'Sao z cung',
    sender: {
      _id: '1',
      fullName: 'Son Tung',
    },
    messageType: 'text',
  },
  {
    _id: '5',
    content: 'minh lam quen nhe',
    sender: {
      _id: '2',
      fullName: 'Thao Vy',
    },
    messageType: 'text',
  },
  {
    _id: '6',
    content: 'oke trien luon',
    sender: {
      _id: '1',
      fullName: 'Son Tung',
    },
    messageType: 'text',
  },
]

export const ChatMessage = () => {
  const lastMsgRef = useRef<HTMLDivElement>(null)

  const session = { user: { _id: '1' } }

  return (
    <>
      {messages.map((message, index) => {
        const amISender = message.sender._id === session.user._id
        const senderFullName = message.sender.fullName.toUpperCase()
        const isMessageImage = message.messageType === 'image'
        const isPrevMessageFromSameSender =
          index > 0 && messages[index - 1].sender._id === message.sender._id

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
    </>
  )
}
