import type { Blog } from 'contentlayer/generated'

export type RelatedPostItem = {
  slug: string
  title: string
  summary?: string
  date: string
  tags?: string[]
}

export const getRelatedPosts = (
  current: Pick<Blog, 'slug' | 'tags'>,
  allPosts: Blog[],
  limit = 3
): RelatedPostItem[] => {
  const currentTags = new Set((current.tags || []).map((tag) => tag.toLowerCase()))

  const scored = allPosts
    .filter((post) => !post.draft && post.slug !== current.slug)
    .map((post) => {
      const overlap = (post.tags || []).reduce(
        (count, tag) => count + (currentTags.has(tag.toLowerCase()) ? 1 : 0),
        0
      )
      return { post, overlap }
    })
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })

  return scored.slice(0, limit).map(({ post }) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    date: post.date,
    tags: post.tags,
  }))
}
