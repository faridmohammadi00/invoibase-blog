import { NextRequest, NextResponse } from 'next/server'
import { NewsletterError, subscribeToNewsletter } from '@/lib/newsletter'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as unknown
    const result = await subscribeToNewsletter(body)
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof NewsletterError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
