import { IUserDocument } from '@/models/user.model'

import { Avatar, AvatarImage } from '../ui/avatar'
import { cn } from '@/lib/utils'

interface UserCardProps {
  user: IUserDocument
  handleSelectUser: (user: IUserDocument) => void
  selectedUser: IUserDocument | null
}

export const UserCard = ({ user, handleSelectUser, selectedUser }: UserCardProps) => {
  // const imgUrl = 'https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png'

  const isSelected = selectedUser?._id === user._id

  return (
    <div
      onClick={() => handleSelectUser(user)}
      className={cn(
        'flex cursor-pointer items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover',
        isSelected && 'bg-sigBackgroundFeedHover',
      )}
    >
      <Avatar className="cursor-pointer hover:bg-sigButtonSecondaryHover">
        <AvatarImage src={user.avatar} />
      </Avatar>

      <span>{user.fullName}</span>
    </div>
  )
}
