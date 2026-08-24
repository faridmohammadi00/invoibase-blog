# Invoibase Blog

MDX blog for [blog.invoibase.com](https://blog.invoibase.com), based on [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog).

## Stack

- Next.js App Router
- Contentlayer2 + MDX
- Tailwind CSS + Pliny SEO

## Develop

```bash
yarn install
yarn dev
```

App runs on [http://localhost:3000](http://localhost:3000).

## Content

Add posts under `data/blog/*.mdx`. Authors live in `data/authors/`.

## Branding

Site config: `data/siteMetadata.js`  
Navigation: `data/headerNavLinks.ts`  
Primary color: indigo `#6366f1` in `css/tailwind.css`

## Deploy

Point the `blog.invoibase.com` domain at this Next.js app (Vercel project recommended). Set `siteUrl` remains `https://blog.invoibase.com`.
