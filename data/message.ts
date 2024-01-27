import { connectToDB } from '@/lib/db'
import Chat, { IChatDocument } from '@/models/chat.model'

export const getMessages = async (currentUserId: string, otherUserId: string) => {
  try {
    await connectToDB()

    const chat: IChatDocument | null = await Chat.findOne({
      participants: {
        $all: [currentUserId, otherUserId],
      },
    }).populate({
      path: 'messages',
      populate: {
        path: 'sender',
        model: 'User',
        select: 'fullName',
      },
    })

    if (!chat) {
      return []
    }

    const messages = chat.messages

    return JSON.parse(JSON.stringify(messages))
  } catch (error) {
    console.error('Error get messages: ', error)
    throw error
  }
}
