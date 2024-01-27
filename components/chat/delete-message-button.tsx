'use client'

import { Loader2, Trash } from 'lucide-react'

import { Button } from '../ui/button'

export const DeleteMessageButton = () => {
  const pending = false

  return (
    <form action="" className="flex flex-col">
      <Button className="h-12 w-12 rounded-full bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover">
        {!pending ? <Trash /> : <Loader2 className="h-4 w-4 animate-spin" />}
      </Button>
    </form>
  )
}
