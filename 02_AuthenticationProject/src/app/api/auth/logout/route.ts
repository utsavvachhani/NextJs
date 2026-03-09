import { NextResponse } from 'next/server'

export async function POST() {
  // In a real app, you would clear cookies here
  return NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  )
}
