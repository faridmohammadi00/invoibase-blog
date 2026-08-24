FROM public.ecr.aws/docker/library/node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV HUSKY=0
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN node .yarn/releases/yarn-3.6.1.cjs install --immutable

FROM public.ecr.aws/docker/library/node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max-old-space-size=1536
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.yarn ./.yarn
COPY . .
RUN node .yarn/releases/yarn-3.6.1.cjs build

FROM public.ecr.aws/docker/library/node:20-alpine AS runner
RUN apk add --no-cache libc6-compat wget
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
