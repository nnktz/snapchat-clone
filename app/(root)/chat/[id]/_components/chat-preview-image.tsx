import Image from 'next/image'

import { Dialog, DialogContent } from '@/components/ui/dialog'

interface ChatPreviewImageProps {
  open: boolean
  onOpenChange: () => void
  imageUrl: string
}

export const ChatPreviewImage = ({ open, onOpenChange, imageUrl }: ChatPreviewImageProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="h-3/4 max-w-4xl border border-sigColorBgBorder bg-sigMain text-white outline-none"
        autoFocus={false}
      >
        <Image src={imageUrl} alt="preview image" fill className="object-contain p-2" />
      </DialogContent>
    </Dialog>
  )
}
