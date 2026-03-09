import { NextResponse } from 'next/server'
import { mockUsers } from '@/lib/api-store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (mockUsers.find(u => u.email === email)) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      )
    }

    const newUser = { id: Date.now().toString(), email, name, password }
    mockUsers.push(newUser)

    return NextResponse.json(
      { message: 'Signup successful', user: { id: newUser.id, email, name } },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
