import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { connectToDB } from '@/lib/db'
import User, { IUserDocument } from '@/models/user.model'

export async function GET(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return
    }

    await connectToDB()

    const users: IUserDocument[] = await User.find()

    const filteredUsers = users.filter(
      (user) => user._id.toString() !== session.user._id.toString(),
    )

    return NextResponse.json(filteredUsers)
  } catch (error) {
    console.error('Error while fetching users: ', error)
    throw error
  }
}
