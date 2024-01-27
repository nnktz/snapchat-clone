import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/lib/utils'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ImageMessageSVG, TextMessageSVGReceived, TextMessageSent } from '@/components/svgs'

export const ChatItem = ({ chat }: { chat: any }) => {
  const userToChat = chat.participants[0]

  const imgUrl = 'https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png'

  const lastMessage = chat.lastMessage
  const lastMessageType = lastMessage?.messageType

  const formattedDate = lastMessage ? formatDate(lastMessage?.createdAt) : formatDate(new Date())

  const amISender = lastMessage && lastMessage.sender._id !== userToChat?._id
  const isMsgOpened = lastMessage?.opened

  let messageStatus: string

  let iconComponent: JSX.Element

  if (amISender) {
    messageStatus = isMsgOpened ? 'Opened' : 'Sent'

    iconComponent =
      lastMessageType === 'text' ? (
        <TextMessageSent
          className={isMsgOpened ? 'text-sigSnapChat' : 'fill-current text-sigSnapChat'}
        />
      ) : (
        <ImageMessageSVG
          className={isMsgOpened ? 'text-sigSnapImg' : 'fill-current text-sigSnapImg'}
        />
      )
  } else {
    if (!lastMessage) {
      iconComponent = <TextMessageSVGReceived className="fill-current" />
      messageStatus = 'Say hi!'
    } else {
      messageStatus = isMsgOpened ? 'Received' : 'Show message'
      iconComponent =
        lastMessageType === 'text' ? (
          <TextMessageSVGReceived
            className={!isMsgOpened ? 'fill-current text-sigSnapChat' : 'text-sigSnapChat'}
          />
        ) : (
          <ImageMessageSVG
            className={!isMsgOpened ? 'fill-current text-sigSnapImg' : 'text-sigSnapImg'}
          />
        )
    }
  }

  return (
    <Link href={`/chat/${userToChat?._id}`}>
      <li className="flex cursor-pointer items-center border-b  border-b-sigColorBgBorder bg-sigSurface p-2 hover:bg-sigColorBgBorder">
        <Avatar className="h-14 w-14 bg-black">
          <AvatarImage src={userToChat?.avatar || imgUrl} />
        </Avatar>

        <div className="ml-3">
          <p>{userToChat?.fullName}</p>
          <p className="flex gap-1 text-xs text-gray-400">
            {iconComponent}
            {messageStatus} - {formattedDate}
          </p>
        </div>

        <Image
          src={'/images/camera.svg'}
          alt="camera icon"
          height={0}
          width={0}
          style={{ width: '20px', height: 'auto' }}
          className="ml-auto hover:scale-95"
        />
      </li>
    </Link>
  )
}
