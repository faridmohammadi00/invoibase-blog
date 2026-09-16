import Link from './Link'

export type RelatedPostItem = {
  slug: string
  title: string
  summary?: string
  date: string
  tags?: string[]
}

type RelatedPostsProps = {
  posts: RelatedPostItem[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null

  return (
    <section className="not-prose my-10">
      <p className="text-primary-500 text-[11px] font-semibold tracking-[0.18em] uppercase">
        Keep reading
      </p>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Related posts
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group hover:border-primary-400 dark:hover:border-primary-500 rounded-2xl border border-gray-200 p-4 transition dark:border-gray-800"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <h4 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
              {post.title}
            </h4>
            {post.summary ? (
              <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-500 dark:text-gray-400">
                {post.summary}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
