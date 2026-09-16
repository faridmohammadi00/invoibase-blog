/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Invoibase Blog — Crypto Invoicing & Web3 Financial Insights',
  author: 'Invoibase Team',
  headerTitle: 'Invoibase Blog',
  description:
    'Learn about non-custodial crypto payments, Web3 accounting, freelancer invoicing, and multi-chain settlements.',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://blog.invoibase.com',
  siteRepo: 'https://github.com/faridmohammadi00/invoibase-blog',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'info@invoibase.com',
  github: 'https://github.com/faridmohammadi00/invoibase',
  x: 'https://x.com/invoibase',
  linkedin: 'https://www.linkedin.com',
  locale: 'en-US',
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'resend',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      // Get values from https://giscus.app after enabling Discussions on the repo
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'faridmohammadi00/invoibase-blog',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'General',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      strict: '0',
      reactions: '1',
      metadata: '0',
      inputPosition: 'bottom',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
