import Message, { IMessageDocument } from '@/models/message.model'
import User, { IUserDocument } from '@/models/user.model'

export const getUsers = async (authUserId: string) => {
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
