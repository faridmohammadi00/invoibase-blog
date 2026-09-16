'use client'

import { FormEvent, useEffect, useState } from 'react'
import { subscribeNewsletterAction } from '@/lib/actions/newsletter'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const result = await subscribeNewsletterAction(email)
      if (!result.ok) {
        throw new Error(result.error)
      }

      setStatus('success')
      setMessage(result.message)
      setToast(result.message)
      setEmail('')
    } catch (error) {
      const nextMessage = error instanceof Error ? error.message : 'Something went wrong'
      setStatus('error')
      setMessage(nextMessage)
      setToast(nextMessage)
    }
  }

  return (
    <section className="not-prose my-10 rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8 dark:border-gray-800 dark:bg-gray-900/40">
      <p className="text-primary-500 text-[11px] font-semibold tracking-[0.18em] uppercase">
        Newsletter
      </p>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Get crypto invoicing insights
      </h3>
      <p className="mt-2 max-w-xl text-sm text-gray-600 dark:text-gray-300">
        Practical notes on non-custodial settlements, stablecoin rails, and freelancer payment
        workflows. No spam.
      </p>
      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          disabled={status === 'loading'}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          className="focus:border-primary-500 focus:ring-primary-500/30 w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:ring-2 disabled:opacity-60 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className="bg-primary-500 hover:bg-primary-600 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Subscribing…
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${
            status === 'success'
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {message}
        </p>
      ) : null}

      {toast ? (
        <div
          className={`fixed bottom-6 left-1/2 z-[110] max-w-sm -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium shadow-lg ${
            status === 'error'
              ? 'bg-rose-600 text-white'
              : 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
          }`}
        >
          {toast}
        </div>
      ) : null}
    </section>
  )
}
