import { Resend } from 'resend'
import { z } from 'zod'

export const newsletterEmailSchema = z.object({
  email: z.string().trim().email('Enter a valid email address').toLowerCase(),
})

export type NewsletterSubscribeResult = {
  ok: true
  alreadySubscribed: boolean
  message: string
}

export class NewsletterError extends Error {
  constructor(
    message: string,
    readonly status: number = 400
  ) {
    super(message)
    this.name = 'NewsletterError'
  }
}

const WELCOME_SUBJECT = 'Welcome to Invoibase Weekly — Web3 Financial Insights'

const isDuplicateContactError = (error: {
  message?: string
  name?: string
  statusCode?: number | null
}) => {
  const message = `${error.name || ''} ${error.message || ''}`.toLowerCase()
  return error.statusCode === 409 || /already|exists|duplicate|conflict/i.test(message)
}

const buildWelcomeHtml = (email: string): string => `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#090A0F;font-family:Inter,Arial,sans-serif;color:#F4F4F5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#090A0F;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="560" cellpadding="0" cellspacing="0" style="background:#12151E;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;">
            <tr><td style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#6366F1;font-weight:700;">Invoibase Weekly</td></tr>
            <tr><td style="padding-top:12px;font-size:22px;font-weight:700;color:#fff;">Welcome to Invoibase Weekly</td></tr>
            <tr><td style="padding-top:16px;font-size:14px;line-height:1.6;color:#A1A1AA;">
              Thanks for subscribing with <strong style="color:#fff;">${email}</strong>.
              You’ll get practical notes on non-custodial crypto invoicing, stablecoin rails, and Web3 financial workflows.
            </td></tr>
            <tr><td style="padding-top:24px;">
              <a href="https://blog.invoibase.com" style="display:inline-block;background:#6366F1;color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:600;">
                Read the blog
              </a>
            </td></tr>
            <tr><td style="padding-top:24px;font-size:12px;line-height:1.5;color:#71717A;">
              Sent by Invoibase Support · support@invoibase.com
            </td></tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

export const subscribeToNewsletter = async (
  rawEmail: unknown
): Promise<NewsletterSubscribeResult> => {
  const parsed = newsletterEmailSchema.safeParse(
    typeof rawEmail === 'string' ? { email: rawEmail } : rawEmail
  )

  if (!parsed.success) {
    throw new NewsletterError(parsed.error.issues[0]?.message || 'Enter a valid email address', 400)
  }

  const email = parsed.data.email
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    throw new NewsletterError(
      'Newsletter is not configured yet. Set RESEND_API_KEY and RESEND_AUDIENCE_ID.',
      503
    )
  }

  const resend = new Resend(apiKey)
  const from = process.env.RESEND_SUPPORT_FROM_EMAIL || 'Invoibase Support <support@invoibase.com>'

  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  })

  let alreadySubscribed = false

  if (error) {
    if (isDuplicateContactError(error)) {
      alreadySubscribed = true
    } else {
      throw new NewsletterError(error.message || 'Unable to subscribe right now', 400)
    }
  }

  if (!alreadySubscribed) {
    const welcome = await resend.emails.send({
      from,
      to: email,
      subject: WELCOME_SUBJECT,
      html: buildWelcomeHtml(email),
    })

    if (welcome.error) {
      throw new NewsletterError(
        welcome.error.message || 'Subscribed, but welcome email failed to send',
        502
      )
    }
  }

  return {
    ok: true,
    alreadySubscribed,
    message: alreadySubscribed
      ? "You're already subscribed!"
      : 'Subscribed. Check your inbox for a welcome email.',
  }
}
