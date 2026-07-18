# Cloudflare Workers Static Assets deployment

## Goal

Deploy the existing Vue/Vite corporate website manually from the local machine with Wrangler. Keep the site static and preserve the current five HTML entry points.

## Architecture

- Vite remains the only application build tool and writes production files to `dist/`.
- Cloudflare Workers Static Assets serves the contents of `dist/` directly.
- No Worker entry point, assets binding, Pages Functions, SPA fallback, or Cloudflare Vite plugin is added.
- `wrangler.jsonc` is the source of truth for the Worker name, compatibility date, and assets directory.

## Repository changes

1. Add Wrangler as a development dependency so deployments use the lockfile version.
2. Add `wrangler.jsonc` with:
   - project name `wakyou-main-site`;
   - current compatibility date;
   - `assets.directory` set to `./dist`.
3. Add an npm `deploy` script that builds the site and runs `wrangler deploy`.
4. Add `.wrangler/` to `.gitignore` for local Wrangler state.

## Deployment flow

1. The operator runs `npx wrangler login` once.
2. The operator runs `npm run deploy`.
3. Vite rebuilds all five pages into `dist/`.
4. Wrangler uploads the static output and prints the deployed `workers.dev` URL.

Custom-domain setup remains an account-level Cloudflare action and is outside this repository change.

## Failure behavior

- A failed Vite build stops the deployment before upload.
- Authentication or Cloudflare API failures make Wrangler exit unsuccessfully without changing source files.
- Unknown paths use Workers Static Assets' normal 404 behavior; this multi-page site does not use SPA fallback.

## Verification

- Run the production build and confirm all five HTML files exist in `dist/`.
- Run Wrangler's non-deploying configuration validation/help path to confirm the checked-in configuration loads.
- Do not perform a real deployment until the operator has authenticated and explicitly runs `npm run deploy`.
