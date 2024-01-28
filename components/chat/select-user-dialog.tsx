'use client'

import { Loader2, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { IUserDocument } from '@/models/user.model'
import { sendMessageAction } from '@/actions/message'

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog'
import { UserCard } from './user-card'
import { Button } from '../ui/button'
import { TextMessageSent } from '../svgs'

interface SelectUserDialogProps {
  selectedFile: string
  onClose: () => void
  onPrev: () => void
}

export const SelectUserDialog = ({ selectedFile, onClose, onPrev }: SelectUserDialogProps) => {
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState<IUserDocument | null>(null)
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [isFetchingUsers, setIsFetchingUsers] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetchingUsers(true)

      try {
        const res = await fetch('/api/chat/get-users')

        const data = await res.json()

        setUsers(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsFetchingUsers(false)
      }
    }

    fetchUsers()
  }, [])

  const onSend = async () => {
    setIsSendingMessage(true)

    try {
      await sendMessageAction(selectedUser?._id, selectedFile, 'image').then(() =>
        router.push(`/chat/${selectedUser?._id}`),
      )
    } catch (error) {
      console.error(error)
    } finally {
      setIsSendingMessage(false)
    }
  }

  return (
    <Dialog open={!!selectedFile}>
      <DialogContent
        className="max-w-xs border border-sigColorBgBorder bg-sigMain text-white"
        onInteractOutside={onClose}
      >
        <DialogHeader className="p-3">
          <div className="m flex gap-2 rounded-full border border-sigColorBgBorder bg-sigSurface p-1 text-gray-400">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="To:"
              className="w-full border-none bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <p className="py-2 font-semibold">Chats:</p>

          {users.map((user: IUserDocument) => (
            <div
              key={user._id}
              className="flex max-h-48 flex-col overflow-auto rounded-md bg-sigSurface"
            >
              <UserCard
                user={user}
                handleSelectUser={(user: IUserDocument) => setSelectedUser(user)}
                selectedUser={selectedUser}
              />
            </div>
          ))}

          {isFetchingUsers && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
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
            disabled={isSendingMessage || !selectedUser}
            size={'sm'}
            onClick={onSend}
            className="gap-1 rounded-full bg-sigSnapChat hover:bg-sigButtonHover"
          >
            {isSendingMessage ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                Send To <TextMessageSent className="my-auto scale-95 text-white" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
