import Image from 'next/image'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { TextMessageSent } from '../svgs'
import { EmojiPopover } from './emoji-popover'

export const SendMsgInput = () => {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sigBackgroundSecondaryHover">
        <Image
          src={'/images/camera.svg'}
          alt="camera icon"
          width={0}
          height={0}
          style={{ width: '20px', height: 'auto' }}
        />
      </div>

      <form
        action=""
        className="flex flex-1 items-center gap-1 rounded-full border border-sigColorBgBorder bg-sigBackgroundSecondaryHover"
      >
        <Input
          placeholder="Send a chat"
          className="h-full w-full rounded-full border-none bg-transparent outline-none focus:outline-transparent"
        />

        <Button
          type="submit"
          size={'sm'}
          className="bg-transparent text-sigSnapChat hover:bg-transparent"
        >
          <TextMessageSent className="mr-1 scale-150" />
        </Button>
      </form>

      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-sigBackgroundSecondaryHover text-white">
        <EmojiPopover />
      </div>
    </div>
  )
}
