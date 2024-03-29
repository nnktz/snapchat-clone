import { unstable_noStore as noStore } from 'next/cache'

import Message, { IMessageDocument } from '@/models/message.model'
import User, { IUserDocument } from '@/models/user.model'
import { connectToDB } from '@/lib/db'

export const getUsers = async (authUserId: string) => {
  noStore()

  try {
    const allUser: IUserDocument[] = await User.find({
      _id: {
        $ne: authUserId,
      },
    })

    const usersInfo = await Promise.all(
      allUser.map(async (user) => {
        const lastMessage: IMessageDocument | null = await Message.findOne({
          $or: [
            {
              sender: user._id,
              receiver: authUserId,
            },
            {
              sender: authUserId,
              receiver: user._id,
            },
          ],
        })
          .sort({
            createdAt: -1,
          })
          .populate('sender', 'fullName avatar _id')
          .populate('receiver', 'fullName avatar _id')
          .exec()

        return {
          _id: user._id,
          participants: [user],
          lastMessage: lastMessage
            ? {
                ...lastMessage.toJSON(),
                sender: lastMessage.sender,
                receiver: lastMessage.receiver,
              }
            : null,
        }
      }),
    )

    return usersInfo
  } catch (error) {
    console.error('Error get users: ', error)
    throw error
  }
}

export const getUserProfileById = async (userId: string) => {
  noStore()

  try {
    await connectToDB()

    const user: IUserDocument | null = await User.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    console.error('Error get user profile: ', error)
    throw error
  }
}
