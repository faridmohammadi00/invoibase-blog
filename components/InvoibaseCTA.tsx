import Link from './Link'

type InvoibaseCTAProps = {
  title: string
  description: string
  href?: string
}

const InvoibaseCTA = ({
  title,
  description,
  href = 'https://invoibase.com',
}: InvoibaseCTAProps) => (
  <aside className="not-prose border-primary-200/70 bg-primary-50/80 dark:border-primary-900/60 dark:bg-primary-950/40 my-10 rounded-2xl border p-6">
    <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{title}</h2>
    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    <Link
      href={href}
      className="bg-primary-500 hover:bg-primary-600 mt-5 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition"
    >
      Launch Invoibase →
    </Link>
  </aside>
)

export default InvoibaseCTA
