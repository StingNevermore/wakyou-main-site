# Cloudflare Workers Static Assets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add reproducible local Wrangler deployment of the existing Vue/Vite `dist/` output to Cloudflare Workers Static Assets.

**Architecture:** Vite continues to build the five-page static site. An assets-only Wrangler configuration uploads `dist/` directly, without Worker code, an assets binding, or SPA fallback.

**Tech Stack:** Vue 3, Vite 6, Wrangler 4, Cloudflare Workers Static Assets

## Global Constraints

- Worker name: `wakyou-main-site`.
- Compatibility date: `2026-07-18`.
- Static asset directory: `./dist`.
- Do not add Worker code, Pages configuration, Pages Functions, an assets binding, SPA fallback, or the Cloudflare Vite plugin.
- Do not perform a real deployment during implementation verification.

---

### Task 1: Add Workers Static Assets deployment

**Files:**
- Create: `wrangler.jsonc`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: Vite's existing `npm run build` command and `dist/` output.
- Produces: `npm run deploy`, which builds the site and invokes `wrangler deploy` using `wrangler.jsonc`.

- [ ] **Step 1: Confirm the deployment configuration is absent**

Run:

```bash
test ! -f wrangler.jsonc
node -e 'const p=require("./package.json"); if (p.scripts.deploy) process.exit(1)'
```

Expected: both commands exit 0 because Cloudflare deployment support has not been added yet.

- [ ] **Step 2: Install the project-local Wrangler CLI**

Run:

```bash
npm install --save-dev wrangler
```

Expected: `package.json` contains `wrangler` in `devDependencies` and `package-lock.json` records the installed version.

- [ ] **Step 3: Add the assets-only Wrangler configuration**

Create `wrangler.jsonc`:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "wakyou-main-site",
  "compatibility_date": "2026-07-18",
  "assets": {
    "directory": "./dist"
  }
}
```

- [ ] **Step 4: Add the deployment command and ignore local state**

Add this script to `package.json`:

```json
"deploy": "npm run build && wrangler deploy"
```

Append this entry to `.gitignore`:

```gitignore
.wrangler/
```

- [ ] **Step 5: Verify the build output and Wrangler configuration without deploying**

Run:

```bash
npm run build
test -f dist/index.html
test -f dist/business.html
test -f dist/company.html
test -f dist/profile.html
test -f dist/contact.html
npx wrangler deploy --dry-run
git diff --check
```

Expected: Vite builds successfully, all five HTML entry points exist, Wrangler completes a dry run without authentication or upload, and `git diff --check` reports no errors.

- [ ] **Step 6: Commit the deployment support**

```bash
git add .gitignore package.json package-lock.json wrangler.jsonc
git commit -m "chore: support Cloudflare Workers deployment"
```
