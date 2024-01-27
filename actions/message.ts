'use server'

import { v2 as cloudinary } from 'cloudinary'

import { auth } from '@/auth'
import { connectToDB } from '@/lib/db'
import Message, { IMessageDocument } from '@/models/message.model'
import Chat, { IChatDocument } from '@/models/chat.model'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const sendMessageAction = async (
  receiverId: string,
  content: string,
  messageType: 'text' | 'image',
) => {
  try {
    const session = await auth()

    if (!session) {
      return
    }

    await connectToDB()

    const senderId = session.user._id

    let uploadedResponse

    if (messageType === 'image') {
      uploadedResponse = await cloudinary.uploader.upload(content)
    }

    const newMessage: IMessageDocument = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content: uploadedResponse?.secure_url || content,
      messageType,
    })

    let chat: IChatDocument | null = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    })

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      })
    } else {
      chat.messages.push(newMessage._id)
      await chat.save()
    }

    return newMessage
  } catch (error: any) {
    console.error('Error send message: ', error.message)
    throw error
  }
}
