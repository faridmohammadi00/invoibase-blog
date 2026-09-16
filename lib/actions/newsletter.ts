'use server'

import {
  NewsletterError,
  subscribeToNewsletter,
  type NewsletterSubscribeResult,
} from '@/lib/newsletter'

export const subscribeNewsletterAction = async (
  email: string
): Promise<NewsletterSubscribeResult | { ok: false; error: string }> => {
  try {
    return await subscribeToNewsletter(email)
  } catch (error) {
    if (error instanceof NewsletterError) {
      return { ok: false, error: error.message }
    }
    return { ok: false, error: 'Internal server error' }
  }
}
