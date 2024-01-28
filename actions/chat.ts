'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { connectToDB } from '@/lib/db'
import Chat from '@/models/chat.model'
import Message from '@/models/message.model'

export const deleteChatAction = async (userId: string) => {
  try {
    await connectToDB()

    const { user } = (await auth()) || {}

    if (!user) {
      return
    }

    const chat = await Chat.findOne({
      participants: {
        $all: [user._id, userId],
      },
    })

    if (!chat) {
      return
    }

    const messageIds = chat.messages.map((messageId) => messageId.toString())

    await Message.deleteMany({
      _id: {
        $in: messageIds,
      },
    })

    await Chat.deleteOne({
      _id: chat._id,
    })

    revalidatePath('/chat/[id]', 'page')
  } catch (error) {
    console.error('Error deleting chat: ', error)
    throw error
  }

  redirect('/chat')
}
