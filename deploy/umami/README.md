# Umami — self-hosted analytics for opensmell-web

This brings up a self-hosted [Umami](https://umami.is) instance (app + Postgres)
so the opensmell-web analytics tracker and the `/admin` dashboard embed have a
real backend. Nothing here is wired to the public site until you set the three
env vars below.

## 1. Deploy the Umami app

You have a few zero/low-ops options — pick one:

### Option A — Docker Compose (any VM / VPS / Railway / Render)

```bash
cp .env.example .env        # then fill in DB_PASSWORD and a long APP_SECRET
docker compose up -d
```

The app is then at `http://localhost:3000` (or the port you map). Behind a real
domain you'd proxy it with Caddy/Nginx/Traefik and enable HTTPS.

### Option B — Railway (one click, automatic HTTPS)

1. New project → **Deploy from template** → search **Umami**.
2. It provisions Umami + Postgres for you. No compose file needed.
3. Copy the public URL it gives you (this is your `NEXT_PUBLIC_UMAMI_URL`).

### Option C — Vercel

Umami can also run on Vercel with a managed Postgres (Neon/Supabase), but the
Docker/Railway options above are simpler for a full app with a DB.

## 2. First-run setup (any option)

1. Open the app, log in with the default credentials:
   - username `admin`
   - password `umami`
   (change both immediately → Settings → Profile.)
2. **Settings → Websites → Add website.** Domain = your opensmell-web domain
   (e.g. `opensmell.xyz`). This creates a `websiteId` (a long UUID) — copy it.
3. **Settings → Websites → select the site → Share.** Enable shared access and
   copy the share URL (the `/share/<id>` link). This is what the `/admin`
   dashboard embeds.

## 3. Wire opensmell-web to it

Umami is completely **inert unless configured**. On the host where opensmell-web
is built (Vercel), set these three env vars, then redeploy/rebuild:

| Env var | Value |
| --- | --- |
| `NEXT_PUBLIC_UMAMI_URL` | the public URL of your Umami app (no trailing slash), e.g. `https://umami.example.com` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | the websiteId UUID from step 2 |
| `NEXT_PUBLIC_UMAMI_SHARE_URL` | the `/share/<id>` share link from step 2 |

> `NEXT_PUBLIC_*` values are baked into the JS bundle at build time, so you must
> **rebuild** the site after setting them (not just redeploy cached assets).

## What gets tracked once configured

- Page views (auto via `data-auto-track`).
- Article reads → custom `article_view` events.
- Desktop download clicks on the Osmograph page → custom `download` events.
- All of it shows up on the dashboard embed at `/admin`.

## Files

- `docker-compose.yml` — Umami + Postgres, ready to run.
- `.env.example` — the only secrets you need: Postgres password + app secret.
