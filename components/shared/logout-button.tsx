import { LogOut } from 'lucide-react'

import { logoutAction } from '@/actions/logout'

import { Button } from '../ui/button'

export const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <Button className="rounded-full bg-black p-3 text-xs text-white md:text-sm">
        <LogOut className="cursor-pointer" />
      </Button>
    </form>
  )
}
