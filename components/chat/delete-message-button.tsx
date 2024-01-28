'use client'

import { Loader2, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'

import { deleteChatAction } from '@/actions/chat'

import { Button } from '../ui/button'

export const DeleteMessageButton = () => {
  const { id: userId } = useParams<{ id: string }>()

  const onDelete = deleteChatAction.bind(null, userId)

  const [errorMessage, dispatch] = useFormState(onDelete, null)
  const { pending } = useFormStatus()

  return (
    <form action={dispatch} className="flex flex-col">
      <Button
        disabled={pending}
        className="h-12 w-12 rounded-full bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover"
      >
        {!pending ? <Trash /> : <Loader2 className="h-4 w-4 animate-spin" />}
      </Button>

      {errorMessage ? <p className="text-red-500">{errorMessage}</p> : null}
    </form>
  )
}
