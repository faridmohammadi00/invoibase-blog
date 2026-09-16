import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ReadingProgress from '@/components/ReadingProgress'
import SocialShare from '@/components/SocialShare'
import TableOfContents, { type TocItem } from '@/components/TableOfContents'
import NewsletterForm from '@/components/NewsletterForm'
import RelatedPosts, { type RelatedPostItem } from '@/components/RelatedPosts'
import InvoibaseCTA from '@/components/InvoibaseCTA'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
  toc?: TocItem[]
  relatedPosts?: RelatedPostItem[]
}

export default function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  toc = [],
  relatedPosts = [],
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, summary } = content
  const basePath = path.split('/')[0]
  const shareUrl = `${siteMetadata.siteUrl}/${path}`

  return (
    <>
      <ReadingProgress />
      <SocialShare title={title} url={shareUrl} summary={summary} />
      <SectionContainer>
        <ScrollTopAndComment />
        <article>
          <header className="pt-6 pb-8">
            <div className="space-y-4 text-center">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <PageTitle>{title}</PageTitle>
              <ul className="flex flex-wrap justify-center gap-4">
                {authorDetails.map((author) => (
                  <li className="flex items-center space-x-2" key={author.name}>
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <div className="gap-10 pb-8 xl:grid xl:grid-cols-[minmax(0,1fr)_220px]">
            <div className="min-w-0">
              <div className="prose dark:prose-invert max-w-none pt-2 pb-8">{children}</div>

              <InvoibaseCTA />

              {tags?.length ? (
                <div className="flex flex-wrap gap-2 py-4">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              ) : null}

              <RelatedPosts posts={relatedPosts} />
              <NewsletterForm />

              <div className="pt-4 pb-2 text-sm text-gray-700 dark:text-gray-300">
                <Link href={editUrl(filePath)}>View on GitHub</Link>
              </div>

              {siteMetadata.comments && (
                <div
                  className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}

              {(next || prev) && (
                <div className="flex flex-col gap-4 border-t border-gray-200 py-6 sm:flex-row sm:justify-between dark:border-gray-800">
                  {prev?.path ? (
                    <div>
                      <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Previous
                      </p>
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {prev.title}
                      </Link>
                    </div>
                  ) : (
                    <span />
                  )}
                  {next?.path ? (
                    <div className="sm:text-right">
                      <p className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                        Next
                      </p>
                      <Link
                        href={`/${next.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {next.title}
                      </Link>
                    </div>
                  ) : null}
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={`/${basePath}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </div>

            <TableOfContents toc={toc} />
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
