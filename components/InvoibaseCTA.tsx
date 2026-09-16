import Link from './Link'

type InvoibaseCTAProps = {
  title?: string
  description?: string
  href?: string
  ctaLabel?: string
}

export default function InvoibaseCTA({
  title = 'Ready to issue non-custodial crypto invoices?',
  description = 'Create USD invoices that settle wallet-to-wallet in USDC, USDT, and more — with no custody and no waiting.',
  href = 'https://invoibase.com/dashboard',
  ctaLabel = 'Launch App →',
}: InvoibaseCTAProps) {
  return (
    <aside className="not-prose border-primary-500/30 from-primary-500/10 my-10 overflow-hidden rounded-2xl border bg-gradient-to-br via-transparent to-cyan-500/10 p-6 sm:p-8">
      <p className="text-primary-500 text-[11px] font-semibold tracking-[0.18em] uppercase">
        Invoibase
      </p>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl dark:text-gray-100">
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
        {description}
      </p>
      <div className="mt-6">
        <Link
          href={href}
          className="bg-primary-500 hover:bg-primary-600 inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold !text-white no-underline shadow-sm transition"
        >
          {ctaLabel}
        </Link>
      </div>
    </aside>
  )
}
