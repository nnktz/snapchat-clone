import { Avatar, AvatarImage } from '@/components/ui/avatar'

export const ChatUserInfo = () => {
  return (
    <div className="flex cursor-pointer items-center gap-2 rounded-full bg-sigButtonSecondary px-3 py-1 font-semibold text-white hover:bg-sigButtonSecondaryHover">
      <Avatar className="flex h-8 w-8 items-center justify-center rounded-full">
        <AvatarImage src={'/images/logo.svg'} />
      </Avatar>

      <span>{'hihi'}</span>
    </div>
  )
}
