'use client'

import { useEffect, useMemo, useState } from 'react'

export type TocItem = {
  value: string
  url: string
  depth: number
}

type TableOfContentsProps = {
  toc: TocItem[]
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const items = useMemo(() => toc.filter((item) => item.depth === 2 || item.depth === 3), [toc])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (!items.length) return

    const headingElements = items
      .map((item) => document.getElementById(item.url.replace(/^#/, '')))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!headingElements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0, 0.25, 0.5, 1],
      }
    )

    headingElements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="Table of contents" className="hidden xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
        <p className="text-primary-500 mb-3 text-[11px] font-semibold tracking-[0.18em] uppercase">
          On this page
        </p>
        <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800">
          {items.map((item) => {
            const id = item.url.replace(/^#/, '')
            const isActive = activeId === id
            return (
              <li key={item.url}>
                <a
                  href={item.url}
                  className={`block border-l-2 py-1 text-sm transition-colors ${
                    item.depth === 3 ? 'pl-6' : 'pl-4'
                  } ${
                    isActive
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                  }`}
                >
                  {item.value}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
