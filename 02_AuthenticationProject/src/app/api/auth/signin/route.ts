import { NextResponse } from 'next/server'
import { mockUsers } from '@/lib/api-store'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing email or password' },
        { status: 400 }
      )
    }

    const user = mockUsers.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // In a real app, you would set a cookie here
    return NextResponse.json(
      { message: 'Login successful', user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
