'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

type GiscusSettings = {
  repo: string
  repositoryId: string
  category: string
  categoryId: string
  mapping?: string
  strict?: string
  reactions?: string
  metadata?: string
  inputPosition?: string
  theme?: string
  darkTheme?: string
  themeURL?: string
  lang?: string
}

const isConfigured = (value?: string): boolean =>
  Boolean(value && value.trim() && !value.includes('R_...') && !value.includes('DIC_...'))

const getGiscusConfig = (): GiscusSettings | null => {
  const comments = siteMetadata.comments as
    | { provider?: string; giscusConfig?: GiscusSettings }
    | undefined
  if (!comments || comments.provider !== 'giscus' || !comments.giscusConfig) {
    return null
  }
  return comments.giscusConfig
}

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const giscus = getGiscusConfig()

  useEffect(() => {
    setMounted(true)
  }, [])

  const commentsTheme = useMemo(() => {
    if (!giscus) return 'light'
    if (giscus.themeURL) return giscus.themeURL
    const isDark = theme === 'dark' || resolvedTheme === 'dark'
    return isDark ? giscus.darkTheme || 'transparent_dark' : giscus.theme || 'light'
  }, [giscus, resolvedTheme, theme])

  if (!giscus) {
    return null
  }

  const ready =
    isConfigured(giscus.repo) &&
    isConfigured(giscus.repositoryId) &&
    isConfigured(giscus.categoryId)

  if (!ready) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <p className="font-medium text-gray-700 dark:text-gray-200">Comments coming soon</p>
        <p className="mt-2">
          Enable GitHub Discussions on the blog repo, then set Giscus IDs from{' '}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600"
          >
            giscus.app
          </a>{' '}
          in <code className="rounded bg-gray-100 px-1 dark:bg-gray-800">.env.local</code>.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full text-left">
      {loadComments && mounted ? (
        <Giscus
          id={`giscus-${slug}`}
          repo={giscus.repo as `${string}/${string}`}
          repoId={giscus.repositoryId}
          category={giscus.category}
          categoryId={giscus.categoryId}
          mapping={(giscus.mapping || 'pathname') as 'pathname'}
          strict={(giscus.strict || '0') as '0' | '1'}
          reactionsEnabled={(giscus.reactions || '1') as '0' | '1'}
          emitMetadata={(giscus.metadata || '0') as '0' | '1'}
          inputPosition={(giscus.inputPosition || 'bottom') as 'top' | 'bottom'}
          theme={commentsTheme}
          lang={giscus.lang || 'en'}
          loading="lazy"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoadComments(true)}
          className="bg-primary-500 hover:bg-primary-600 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
        >
          Load Comments
        </button>
      )}
    </div>
  )
}
