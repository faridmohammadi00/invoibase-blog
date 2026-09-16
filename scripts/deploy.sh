#!/usr/bin/env bash
set -euo pipefail

BLOG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_DIR="${COMPOSE_DIR:-$(cd "$BLOG_DIR/../invoibase" && pwd)}"
COMPOSE=(docker compose)

log() {
  printf '[blog-deploy] %s\n' "$*"
}

wait_healthy() {
  local attempts="${1:-60}"
  local i=0
  cd "$COMPOSE_DIR"
  while ((i < attempts)); do
    local status
    status="$("${COMPOSE[@]}" ps --status running --format '{{.Service}} {{.Health}}' 2>/dev/null | awk '$1=="blog" {print $2; exit}')"
    if [[ "$status" == "healthy" ]]; then
      return 0
    fi
    sleep 2
    ((i += 1))
  done
  log "Timed out waiting for blog to become healthy"
  "${COMPOSE[@]}" ps
  "${COMPOSE[@]}" logs --tail 80 blog || true
  exit 1
}

cd "$BLOG_DIR"

if [[ "${SKIP_GIT_PULL:-0}" != "1" ]]; then
  log "Pulling latest from origin"
  git fetch --all --prune
  git pull --ff-only
fi

if [[ ! -f "$BLOG_DIR/.env" ]]; then
  log "Missing $BLOG_DIR/.env"
  exit 1
fi

if [[ ! -f "$COMPOSE_DIR/docker-compose.yml" ]]; then
  log "Missing compose file at $COMPOSE_DIR/docker-compose.yml"
  exit 1
fi

log "Building blog image"
cd "$COMPOSE_DIR"
"${COMPOSE[@]}" build blog

log "Rolling blog container"
"${COMPOSE[@]}" up -d --no-deps --force-recreate blog
wait_healthy 90

log "Verifying origin"
curl -fsS -o /dev/null -H 'Host: blog.invoibase.com' http://127.0.0.1/
log "Deploy complete"
