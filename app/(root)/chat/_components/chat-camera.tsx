'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { readFileAsDataURL } from '@/lib/utils'

import { ImageReviewDialog } from '@/components/chat/image-review-dialog'
import { SelectUserDialog } from '@/components/chat/select-user-dialog'

export const ChatCamera = () => {
  const imgRef = useRef<HTMLInputElement>(null)

  const [selectedFile, setSelectedFile] = useState('')
  const [step, setStep] = useState(0)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const dataUrl = await readFileAsDataURL(file)
      setSelectedFile(dataUrl)
    }
  }

  const closeDialog = () => {
    setSelectedFile('')
    setStep(0)
  }

  return (
    <>
      <div className="mx-auto flex aspect-[9/16] h-[80%] flex-col items-center justify-center rounded-md border border-sigColorBgBorder bg-black bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter lg:mx-0">
        <div
          onClick={() => imgRef.current!.click()}
          className="cursor-pointer rounded-full border border-gray-100 bg-white bg-opacity-30 bg-clip-padding p-8 backdrop-blur-xl backdrop-filter"
        >
          <Image
            src={'/images/camera.svg'}
            alt="camera icon"
            height={0}
            width={0}
            style={{ width: '150px', height: 'auto' }}
            className="select-none hover:opacity-90"
          />

          <input
            type="file"
            name="image"
            id="image"
            hidden
            accept="image/*"
            ref={imgRef}
            onChange={handleFileChange}
          />
        </div>

        <p className="mt-4 w-2/3 text-center font-semibold text-white">
          Click the camera to send your code.
        </p>
      </div>

      {step === 0 ? (
        <ImageReviewDialog
          selectedFile={selectedFile}
          onClose={closeDialog}
          onImageChange={() => imgRef.current!.click()}
          setStep={setStep}
        />
      ) : (
        <SelectUserDialog
          selectedFile={selectedFile}
          onClose={closeDialog}
          onPrev={() => setStep(0)}
        />
      )}
    </>
  )
}
