# How to Build on Lakebed — a field guide

A short, opinionated guide to building on [Lakebed](https://lakebed.dev) — what a
**capsule** is, the 5-minute build, RPC-instead-of-REST, realtime-by-default, how
it sits next to Vercel and somewhere.tech, and the honest edges of the pre-release
alpha.

It is itself a Lakebed capsule (dogfood), and it's **self-demonstrating**: a single
shared ladybug crawls the page — one row of state, the same for everyone; catch her
and she burrows, then pops up somewhere random for every viewer, live.

**Live:** https://howto.lakebed.app — *unofficial; written from hands-on use of the
pre-release (pre-GA) alpha.*

## Structure

- **`server/index.ts`** — the whole backend: one `bug` table (separate `desktop` /
  `mobile` rows so each device class shares its own coordinate) + a `move` mutation.
- **`client/index.tsx`** — the page (Preact). Light brutalist design, fonts inlined
  as base64 `@font-face`, the deterministic clock-driven ladybug, and the guide
  content.

## Deploy

The claimed/anonymous auto-decision is flaky, so force the dev token:

```sh
LAKEBED_TOKEN="$(python3 -c "import json;print(json.load(open('$HOME/.lakebed/developer-auth.json'))['profiles']['https://api.lakebed.dev']['token'])")" \
  npx -y lakebed@0.0.25 deploy --json
```

`lakebed.json` pins the deploy id so redeploys update the same capsule (and the
`howto.lakebed.app` subdomain).
