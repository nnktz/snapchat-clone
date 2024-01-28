import Image from 'next/image'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'

interface ImageReviewDialogProps {
  selectedFile?: string
  onClose: () => void
  onImageChange: () => void
  setStep?: React.Dispatch<React.SetStateAction<number>>
}

export const ImageReviewDialog = ({
  selectedFile,
  onClose,
  onImageChange,
  setStep,
}: ImageReviewDialogProps) => {
  return (
    <Dialog open={!!selectedFile} onOpenChange={onClose}>
      <DialogContent
        className="flex h-[80vh] max-w-xl flex-col border-sigColorBgBorder bg-sigMain text-white md:max-w-3xl"
        onInteractOutside={onClose}
      >
        <DialogHeader className="flex-1">
          <div className="relative my-auto flex h-3/4 items-center">
            {selectedFile && (
              <Image
                src={selectedFile}
                alt="selected file"
                fill
                className="mx-auto rounded-md border border-sigColorBgBorder object-contain"
              />
            )}
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

          <Button size={'sm'} onClick={onImageChange} className="rounded-full px-4">
            Change
          </Button>

          <Button
            size={'sm'}
            onClick={() => setStep && setStep(1)}
            className="rounded-full bg-sigSnapChat px-4 hover:bg-sigButtonHover"
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
