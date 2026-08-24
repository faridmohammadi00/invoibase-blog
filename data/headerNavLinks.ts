export type HeaderNavLink = {
  href: string
  title: string
  external?: boolean
}

const headerNavLinks: HeaderNavLink[] = [
  { href: '/', title: 'Blog Home' },
  { href: '/tags', title: 'Tags' },
  { href: '/about', title: 'About' },
  { href: 'https://invoibase.com', title: 'Launch App →', external: true },
]

export default headerNavLinks
