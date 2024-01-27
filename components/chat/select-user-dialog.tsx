import { Search } from 'lucide-react'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { UserCard } from './user-card'
import { Button } from '../ui/button'
import { TextMessageSent } from '../svgs'

interface SelectUserDialogProps {
  selectedFile?: string
  onClose: () => void
  onPrev: () => void
}

export const SelectUserDialog = ({ selectedFile, onClose, onPrev }: SelectUserDialogProps) => {
  const handleSendMessage = () => {
    console.log('message sent')
  }

  return (
    <Dialog open={!!selectedFile}>
      <DialogContent
        className="max-w-xs border border-sigColorBgBorder bg-sigMain text-white"
        onInteractOutside={onClose}
      >
        <DialogHeader>
          <div className="flex gap-2 rounded-full border border-sigColorBgBorder bg-sigSurface p-1 text-gray-400">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="To:"
              className="w-full border-none bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <p className="py-2 font-semibold">Chats:</p>

          <div className="flex max-h-48 flex-col overflow-auto rounded-md bg-sigSurface">
            <UserCard />
          </div>
        </DialogHeader>

        <DialogFooter className="mx-auto flex items-center">
          <DialogClose asChild>
            <Button
              variant={'destructive'}
              size={'sm'}
              onClick={onClose}
              className="rounded-full bg-sigSnapImg"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button size={'sm'} onClick={onPrev} className="rounded-full px-4">
            Prev
          </Button>

          <Button
            size={'sm'}
            onClick={handleSendMessage}
            className="gap-1 rounded-full bg-sigSnapChat hover:bg-sigButtonHover"
          >
            Send To <TextMessageSent className="my-auto scale-95 text-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
