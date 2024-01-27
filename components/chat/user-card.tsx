import { Avatar, AvatarImage } from '../ui/avatar'

export const UserCard = () => {
  const imgUrl = 'https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png'

  return (
    <div className="flex cursor-pointer items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover">
      <Avatar className="cursor-pointer hover:bg-sigButtonSecondaryHover">
        <AvatarImage src={imgUrl} />
      </Avatar>

      <span>John Doe</span>
    </div>
  )
}
